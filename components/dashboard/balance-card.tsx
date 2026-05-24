"use client";

import { useState } from "react";
import { ArrowDownToLine, ExternalLink, RefreshCcw } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { TransactionDialog } from "@/components/dashboard/transaction-dialog";
import { depositUnifiedBalance, extractTransaction } from "@/lib/appkit-actions";
import {
  BRIDGE_CHAINS,
  getChainLabel,
  getChainParams,
  requestSwitchChain,
  type SupportedDepositChain
} from "@/lib/arc";
import { saveTransaction } from "@/lib/transactions";
import { validateAmount } from "@/lib/validators";
import { cn, formatUsdLike } from "@/lib/utils";
import { useUnifiedBalance } from "@/hooks/use-unified-balance";
import { useWalletStore } from "@/store/wallet-store";

const depositChains: Array<{
  label: string;
  value: SupportedDepositChain;
  description: string;
}> = BRIDGE_CHAINS.map((chain) => ({
  label: getChainLabel(chain),
  value: chain,
  description: `Deposit test USDC from ${getChainLabel(chain)} into Unified Balance.`
}));

export function BalanceCard() {
  const { balance, loading, refresh } = useUnifiedBalance();
  const adapter = useWalletStore((state) => state.adapter);
  const provider = useWalletStore((state) => state.provider);
  const address = useWalletStore((state) => state.address);
  const [open, setOpen] = useState(false);
  const [depositing, setDepositing] = useState(false);
  const [amount, setAmount] = useState("10");
  const [chain, setChain] = useState<SupportedDepositChain>("Base_Sepolia");
  const [txOpen, setTxOpen] = useState(false);
  const [tx, setTx] = useState<ReturnType<typeof extractTransaction> | null>(null);

  const total = balance?.totalConfirmedBalance ?? "0";
  const pending = balance?.totalPendingBalance ?? "0";

  async function submitDeposit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const amountError = validateAmount(amount);
    if (amountError) {
      toast.error(amountError);
      return;
    }

    if (!adapter || !provider || !address) {
      toast.error("Connect your wallet first.");
      return;
    }

    setDepositing(true);

    try {
      await requestSwitchChain(provider, getChainParams(chain));

      const result = await depositUnifiedBalance({
        adapter,
        amount,
        chain
      });

      const txDetails = extractTransaction(result);
      setTx(txDetails);
      setTxOpen(true);

      void saveTransaction(address, {
        id: crypto.randomUUID(),
        type: "deposit",
        token: "USDC",
        amount,
        chain,
        state: "success",
        hash: txDetails.hash,
        explorerUrl: txDetails.explorerUrl,
        createdAt: Date.now()
      });

      toast.success("Deposit submitted", {
        description: "Your Unified Balance will update after confirmation."
      });

      setOpen(false);
      await refresh();
    } catch (error) {
      toast.error("Deposit failed", {
        description: error instanceof Error ? error.message : "Please try again."
      });
    } finally {
      setDepositing(false);
    }
  }

  return (
    <>
      <Card className="glass overflow-hidden rounded-[1.5rem] shadow-card">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 p-5">
          <div>
            <CardTitle className="text-base text-muted-foreground">Unified Balance</CardTitle>
            <div className="mt-3 flex items-baseline gap-2">
              {loading ? (
                <Skeleton className="h-12 w-44" />
              ) : (
                <p className="text-4xl font-black tracking-tight">
                  {formatUsdLike(total)}
                </p>
              )}
              <span className="text-sm font-semibold text-muted-foreground">USDC</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Pending: {pending} USDC
            </p>
          </div>

          <Badge className="rounded-full bg-primary/15 text-primary">USDC primary</Badge>
        </CardHeader>

        <CardContent className="p-5 pt-0">
          <div className="grid gap-3 sm:grid-cols-2">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="h-12 gap-2 rounded-2xl">
                  <ArrowDownToLine className="size-4" />
                  Deposit
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-3xl">
                <form onSubmit={submitDeposit}>
                  <DialogHeader>
                    <DialogTitle>Deposit to Unified Balance</DialogTitle>
                    <DialogDescription>
                      Deposit test USDC from a supported chain into your Circle
                      Gateway-backed Unified Balance.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="mt-6 grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="deposit-amount">Amount</Label>
                      <Input
                        id="deposit-amount"
                        inputMode="decimal"
                        placeholder="10.00"
                        value={amount}
                        onChange={(event) => setAmount(event.target.value)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label>Source chain</Label>
                      <Select
                        value={chain}
                        onValueChange={(value) => setChain(value as SupportedDepositChain)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {depositChains.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        {depositChains.find((item) => item.value === chain)?.description}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-emerald-950/10 bg-lime-50 p-4 text-sm text-muted-foreground dark:border-white/10 dark:bg-white/[0.055]">
                      Need test USDC?{" "}
                      <a
                        href="https://faucet.circle.com"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-primary hover:underline"
                      >
                        Open Circle faucet <ExternalLink className="size-3" />
                      </a>
                    </div>
                  </div>

                  <DialogFooter className="mt-6">
                    <Button type="submit" disabled={depositing} className="w-full">
                      {depositing ? "Depositing..." : "Deposit USDC"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Button
              variant="secondary"
              className="h-12 gap-2 rounded-2xl"
              onClick={() => void refresh()}
              disabled={loading}
            >
              <RefreshCcw className={cn("size-4", loading && "animate-spin")} />
              Refresh
            </Button>
          </div>

          <div className="mt-4 rounded-2xl border border-emerald-950/10 bg-white/70 p-4 dark:border-white/10 dark:bg-white/[0.055]">
            <p className="text-sm font-medium">Balance sources</p>
            {balance?.breakdown?.length ? (
              <div className="mt-3 grid gap-2">
                {balance.breakdown.slice(0, 4).map((item, index) => (
                  <div
                    key={`${JSON.stringify(item)}-${index}`}
                    className="flex items-center justify-between rounded-xl bg-emerald-950/[0.035] px-3 py-2 text-xs dark:bg-white/[0.055]"
                  >
                    <span className="max-w-[65%] truncate text-muted-foreground">
                      {item.chain ?? item.blockchain ?? item.source ?? `Source ${index + 1}`}
                    </span>
                    <span className="font-semibold">
                      {item.confirmedBalance ?? item.balance ?? "0"} USDC
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">
                No deposited USDC detected yet.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <TransactionDialog
        open={txOpen}
        onOpenChange={setTxOpen}
        title="Deposit submitted"
        description="Your transaction was submitted. Open the explorer to track confirmation."
        tx={tx}
      />
    </>
  );
}
