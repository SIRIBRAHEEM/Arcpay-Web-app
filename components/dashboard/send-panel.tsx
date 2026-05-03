"use client";

import { useState } from "react";
import { ArrowRight, Repeat2, Send } from "lucide-react";
import { toast } from "sonner";
import { TransactionDialog } from "@/components/dashboard/transaction-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  extractTransaction,
  sendArcToken,
  spendUnifiedUsdc,
  swapUsdcToEurc
} from "@/lib/appkit-actions";
import { ARC_TESTNET_PARAMS, requestSwitchChain } from "@/lib/arc";
import { saveTransaction } from "@/lib/transactions";
import { validateAddress, validateAmount } from "@/lib/validators";
import { useWalletStore } from "@/store/wallet-store";

type SendToken = "USDC" | "EURC";

export function SendPanel() {
  const adapter = useWalletStore((state) => state.adapter);
  const provider = useWalletStore((state) => state.provider);
  const address = useWalletStore((state) => state.address);

  const [token, setToken] = useState<SendToken>("USDC");
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [memo, setMemo] = useState("");
  const [swapFirst, setSwapFirst] = useState(true);
  const [sending, setSending] = useState(false);
  const [txOpen, setTxOpen] = useState(false);
  const [tx, setTx] = useState<ReturnType<typeof extractTransaction> | null>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const amountError = validateAmount(amount);
    if (amountError) {
      toast.error(amountError);
      return;
    }

    const addressError = validateAddress(recipient);
    if (addressError) {
      toast.error(addressError);
      return;
    }

    if (!adapter || !provider || !address) {
      toast.error("Connect your wallet first.");
      return;
    }

    setSending(true);

    try {
      await requestSwitchChain(provider, ARC_TESTNET_PARAMS);

      let result: unknown;

      if (token === "USDC") {
        result = await spendUnifiedUsdc({
          adapter,
          amount,
          recipient
        });
      } else {
        if (swapFirst) {
          const swapResult = await swapUsdcToEurc({
            adapter,
            amount
          });

          const swapTx = extractTransaction(swapResult);

          saveTransaction(address, {
            id: crypto.randomUUID(),
            type: "swap",
            token: "EURC",
            amount,
            chain: "Arc_Testnet",
            state: "success",
            hash: swapTx.hash,
            explorerUrl: swapTx.explorerUrl,
            memo: "USDC → EURC before send",
            createdAt: Date.now()
          });
        }

        result = await sendArcToken({
          adapter,
          amount,
          recipient,
          token: "EURC"
        });
      }

      const txDetails = extractTransaction(result);
      setTx(txDetails);
      setTxOpen(true);

      saveTransaction(address, {
        id: crypto.randomUUID(),
        type: "send",
        token,
        amount,
        recipient,
        chain: "Arc_Testnet",
        state: "success",
        hash: txDetails.hash,
        explorerUrl: txDetails.explorerUrl,
        memo: memo.trim() || undefined,
        createdAt: Date.now()
      });

      toast.success("Payment submitted", {
        description:
          token === "USDC"
            ? "USDC was spent from your Unified Balance."
            : "EURC payment was submitted on Arc Testnet."
      });

      setAmount("");
      setRecipient("");
      setMemo("");
    } catch (error) {
      toast.error("Payment failed", {
        description: error instanceof Error ? error.message : "Please try again."
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <Card className="glass rounded-[2rem] shadow-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6">
          <CardTitle>Send</CardTitle>

          <Badge variant="secondary" className="rounded-full">
            Non-custodial
          </Badge>
        </CardHeader>

        <CardContent className="p-6 pt-0">
          <form className="grid gap-4" onSubmit={submit}>
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount</Label>

              <div className="grid grid-cols-[1fr_132px] gap-2">
                <Input
                  id="amount"
                  inputMode="decimal"
                  placeholder="25.00"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                />

                <Select
                  value={token}
                  onValueChange={(value) => setToken(value as SendToken)}
                >
                  <SelectTrigger aria-label="Token">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="USDC">USDC</SelectItem>
                    <SelectItem value="EURC">EURC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {token === "EURC" ? (
              <button
                type="button"
                onClick={() => setSwapFirst((value) => !value)}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left"
              >
                <div className="mt-0.5 grid size-8 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Repeat2 className="size-4" />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    {swapFirst ? "Swap USDC to EURC before sending" : "Send existing EURC"}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Arc Testnet swap supports USDC/EURC. Turn this off if your
                    wallet already has EURC on Arc.
                  </p>
                </div>
              </button>
            ) : null}

            <div className="grid gap-2">
              <Label htmlFor="recipient">Recipient address</Label>

              <Input
                id="recipient"
                placeholder="0x..."
                autoComplete="off"
                value={recipient}
                onChange={(event) => setRecipient(event.target.value)}
              />

              <p className="text-xs text-muted-foreground">
                ArcPay validates EVM addresses. ENS resolution is not enabled for this testnet app.
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="memo">Memo optional</Label>

              <Textarea
                id="memo"
                placeholder="Lunch, invoice #42, thanks..."
                value={memo}
                onChange={(event) => setMemo(event.target.value)}
                maxLength={160}
              />

              <p className="text-xs text-muted-foreground">
                Memo is stored locally only and is not written onchain.
              </p>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={sending}
              className="h-12 rounded-2xl"
            >
              {sending ? (
                "Sending..."
              ) : (
                <>
                  <Send className="mr-2 size-4" />
                  Send payment
                  <ArrowRight className="ml-2 size-4" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <TransactionDialog
        open={txOpen}
        onOpenChange={setTxOpen}
        title="Payment submitted"
        description="Your payment transaction was submitted to Arc Testnet."
        tx={tx}
      />
    </>
  );
}
