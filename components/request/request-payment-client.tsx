"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, Copy, FileText, Send, Store, WalletCards } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";
import { ConnectButton } from "@/components/connect-button";
import { TransactionDialog } from "@/components/dashboard/transaction-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { extractTransaction, sendArcToken, spendUnifiedUsdc, type ArcStableToken } from "@/lib/appkit-actions";
import { ARC_CHAIN_ID, ARC_TESTNET_PARAMS, requestSwitchChain } from "@/lib/arc";
import { saveTransaction } from "@/lib/transactions";
import { shortAddress } from "@/lib/utils";
import { validateAddress, validateAmount } from "@/lib/validators";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useWalletStore } from "@/store/wallet-store";

function normalizeToken(value: string | null): ArcStableToken {
  return value === "EURC" || value === "cirBTC" ? value : "USDC";
}

export function RequestPaymentClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const copy = useCopyToClipboard();
  const adapter = useWalletStore((state) => state.adapter);
  const provider = useWalletStore((state) => state.provider);
  const payerAddress = useWalletStore((state) => state.address);

  const recipient = searchParams.get("to") ?? "";
  const requestedAmount = searchParams.get("amount") ?? "";
  const token = normalizeToken(searchParams.get("token"));
  const memo = searchParams.get("memo") ?? "ArcPay payment request";
  const merchant = searchParams.get("merchant") ?? "ArcPay merchant";
  const invoice = searchParams.get("invoice") ?? "ArcPay invoice";
  const redirectTo = `/pay?${searchParams.toString()}`;

  const [amount, setAmount] = useState(requestedAmount);
  const [loading, setLoading] = useState(false);
  const [txOpen, setTxOpen] = useState(false);
  const [tx, setTx] = useState<ReturnType<typeof extractTransaction> | null>(null);

  const recipientError = validateAddress(recipient);
  const requestUri = useMemo(() => {
    if (recipientError) return "";
    const trimmed = amount.trim();

    if (!trimmed) return `ethereum:${recipient}@${ARC_CHAIN_ID}`;

    return `ethereum:${recipient}@${ARC_CHAIN_ID}?value=${encodeURIComponent(trimmed)}`;
  }, [amount, recipient, recipientError]);

  const invoiceSummary = useMemo(() => {
    const displayAmount = amount.trim() || "0.00";

    return `${merchant}\n${invoice}\nAmount: ${displayAmount} ${token}\nMemo: ${memo}\nRecipient: ${recipient}`;
  }, [amount, invoice, merchant, memo, recipient, token]);

  async function submitPayment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (recipientError) {
      toast.error(recipientError);
      return;
    }

    const amountError = validateAmount(amount);
    if (amountError) {
      toast.error(amountError);
      return;
    }

    if (!adapter || !provider || !payerAddress) {
      toast.error("Connect your wallet first.");
      return;
    }

    setLoading(true);

    try {
      await requestSwitchChain(provider, ARC_TESTNET_PARAMS);

      const result =
        token === "USDC"
          ? await spendUnifiedUsdc({ adapter, amount, recipient })
          : await sendArcToken({ adapter, amount, recipient, token });

      const txDetails = extractTransaction(result);

      setTx(txDetails);
      setTxOpen(true);

      void saveTransaction(payerAddress, {
        id: crypto.randomUUID(),
        type: "send",
        token,
        amount,
        recipient,
        chain: "Arc_Testnet",
        state: "success",
        hash: txDetails.hash,
        explorerUrl: txDetails.explorerUrl,
        memo: `${invoice} • ${memo}`,
        createdAt: Date.now()
      });

      void saveTransaction(recipient, {
        id: crypto.randomUUID(),
        type: "receive",
        token,
        amount,
        recipient: payerAddress,
        chain: "Arc_Testnet",
        state: "pending",
        hash: txDetails.hash,
        explorerUrl: txDetails.explorerUrl,
        memo: `${invoice} • ${memo}`,
        createdAt: Date.now()
      });

      toast.success("Payment submitted", {
        description: `${amount} ${token} is being sent on ArcPay.`
      });
    } catch (error) {
      toast.error("Payment failed", {
        description: error instanceof Error ? error.message : "Please try again."
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="premium-dashboard-bg min-h-screen overflow-x-hidden px-3 py-5 text-foreground sm:px-6 sm:py-6">
      <div className="mx-auto grid max-w-3xl gap-4">
        <Button
          type="button"
          variant="ghost"
          className="w-fit gap-2"
          onClick={() => router.back()}
        >
          <ArrowLeft className="size-4" />
          Back
        </Button>

        <Card className="glass overflow-hidden rounded-[1.5rem] shadow-card">
          <CardHeader className="space-y-3 p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <CardTitle className="flex items-center gap-2">
                <WalletCards className="size-5 text-primary" />
                ArcPay Invoice
              </CardTitle>

              <Badge className="rounded-full bg-primary/15 text-primary">{token}</Badge>
            </div>

            <p className="text-sm leading-6 text-muted-foreground">
              Review the invoice, connect your wallet, and pay on Arc Testnet.
            </p>
          </CardHeader>

          <CardContent className="grid gap-5 p-4 pt-0 sm:p-5 sm:pt-0">
            {recipientError ? (
              <div className="rounded-2xl border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
                This invoice link has an invalid recipient address.
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-[164px_1fr] md:items-center">
                <div className="mx-auto grid w-full max-w-44 place-items-center rounded-2xl border border-slate-950/10 bg-white p-3 dark:border-white/10 md:mx-0">
                  <QRCodeSVG value={requestUri} size={132} bgColor="#ffffff" fgColor="#050914" />
                </div>

                <div className="grid gap-3">
                  <div className="rounded-2xl border border-slate-950/10 bg-white/75 p-4 dark:border-white/10 dark:bg-white/[0.06]">
                    <p className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Store className="size-3.5" />
                      Merchant
                    </p>
                    <p className="mt-1 font-semibold">{merchant}</p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-950/10 bg-white/75 p-4 dark:border-white/10 dark:bg-white/[0.06]">
                      <p className="flex items-center gap-2 text-xs text-muted-foreground">
                        <FileText className="size-3.5" />
                        Invoice ID
                      </p>
                      <p className="mt-1 break-all font-semibold">{invoice}</p>
                    </div>

                    <div className="rounded-2xl border border-slate-950/10 bg-white/75 p-4 dark:border-white/10 dark:bg-white/[0.06]">
                      <p className="text-xs text-muted-foreground">Recipient</p>
                      <p className="mt-1 font-semibold">{shortAddress(recipient, 10)}</p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-950/10 bg-white/75 p-4 dark:border-white/10 dark:bg-white/[0.06]">
                    <p className="text-xs text-muted-foreground">Memo</p>
                    <p className="mt-1 font-semibold">{memo}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={submitPayment} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="request-pay-amount">Amount</Label>
                <Input
                  id="request-pay-amount"
                  inputMode="decimal"
                  placeholder="50.00"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                />
              </div>

              {payerAddress ? (
                <Button
                  type="submit"
                  size="lg"
                  disabled={loading || Boolean(recipientError)}
                  className="h-12 rounded-2xl"
                >
                  {loading ? (
                    "Submitting payment..."
                  ) : (
                    <>
                      <Send className="mr-2 size-4" />
                      Pay invoice
                    </>
                  )}
                </Button>
              ) : (
                <ConnectButton redirectTo={redirectTo} className="h-12 rounded-2xl" />
              )}
            </form>

            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="secondary"
                className="gap-2 rounded-2xl"
                onClick={() => void copy(requestUri, "Wallet request copied")}
                disabled={Boolean(recipientError)}
              >
                <Copy className="size-4" />
                Copy wallet URI
              </Button>

              <Button
                type="button"
                variant="secondary"
                className="gap-2 rounded-2xl"
                onClick={() => void copy(invoiceSummary, "Invoice copied")}
                disabled={Boolean(recipientError)}
              >
                <FileText className="size-4" />
                Copy invoice
              </Button>

              <Link href="/" className="inline-flex">
                <Button type="button" variant="outline" className="gap-2 rounded-2xl">
                  <CheckCircle2 className="size-4" />
                  Open ArcPay
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <TransactionDialog
        open={txOpen}
        onOpenChange={setTxOpen}
        title="Payment submitted"
        description="Your invoice payment was submitted. Open the explorer to track confirmation."
        tx={tx}
      />
    </main>
  );
}
