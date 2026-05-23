"use client";

import { useState } from "react";
import { ArrowRight, Send, ShieldCheck, WalletCards } from "lucide-react";
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
import {
  extractTransaction,
  sendArcToken,
  spendUnifiedUsdc,
  type ArcStableToken
} from "@/lib/appkit-actions";
import { ARC_TESTNET_PARAMS, requestSwitchChain } from "@/lib/arc";
import { saveTransaction } from "@/lib/transactions";
import { validateAddress, validateAmount } from "@/lib/validators";
import { useWalletStore } from "@/store/wallet-store";

export function SendPanel() {
  const adapter = useWalletStore((state) => state.adapter);
  const provider = useWalletStore((state) => state.provider);
  const address = useWalletStore((state) => state.address);
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [token, setToken] = useState<ArcStableToken>("USDC");
  const [loading, setLoading] = useState(false);
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

      saveTransaction(address, {
        id: crypto.randomUUID(),
        type: "send",
        token,
        amount,
        chain: "Arc_Testnet",
        state: "success",
        hash: txDetails.hash,
        explorerUrl: txDetails.explorerUrl,
        memo: `Payment to ${recipient.slice(0, 8)}...${recipient.slice(-4)}`,
        createdAt: Date.now()
      });

      toast.success("Payment submitted", {
        description:
          token === "USDC"
            ? "USDC is being spent from your Unified Balance."
            : `${token} is being sent on Arc Testnet.`
      });

      setAmount("");
      setRecipient("");
    } catch (error) {
      toast.error("Payment failed", {
        description: error instanceof Error ? error.message : "Please try again."
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Card className="glass overflow-hidden rounded-[1.5rem] shadow-card">
        <CardHeader className="space-y-4 p-6">
          <div className="flex items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <Send className="size-5 text-primary" />
              Pay
            </CardTitle>

            <Badge className="gap-2 rounded-full border-lime-300/20 bg-lime-300/10 text-lime-100">
              <ShieldCheck className="size-3.5" />
              Wallet signed
            </Badge>
          </div>

          <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.05] p-4">
            <p className="text-sm text-muted-foreground">Fast payment route</p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm font-semibold">
              <WalletCards className="size-4 text-primary" />
              Unified Balance
              <ArrowRight className="size-4 text-muted-foreground" />
              Recipient on Arc Testnet
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 pt-0">
          <form onSubmit={submit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="send-amount">Amount</Label>
              <div className="grid grid-cols-[1fr_132px] gap-2">
                <Input
                  id="send-amount"
                  inputMode="decimal"
                  placeholder="125.00"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                />
                <Select
                  value={token}
                  onValueChange={(value) => setToken(value as ArcStableToken)}
                >
                  <SelectTrigger aria-label="Payment token">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USDC">USDC</SelectItem>
                    <SelectItem value="EURC">EURC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="send-recipient">Destination</Label>
              <Input
                id="send-recipient"
                placeholder="0x..."
                value={recipient}
                onChange={(event) => setRecipient(event.target.value)}
              />
            </div>

            <Button type="submit" size="lg" disabled={loading} className="h-12 rounded-2xl">
              {loading ? (
                "Submitting payment..."
              ) : (
                <>
                  <Send className="mr-2 size-4" />
                  Send payment
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
        description="Your payment was submitted. Open the explorer to track confirmation."
        tx={tx}
      />
    </>
  );
}
