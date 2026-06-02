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
  SelectTrigger
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { TransactionDialog } from "@/components/dashboard/transaction-dialog";
import { ChainOption, SelectedChain } from "@/components/ui/chain-logo";
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
      <Card className="glass w-full min-w-0 overflow-hidden rounded-[1.25rem] shadow-card sm:rounded-[1.5rem]">
        <CardHeader className="flex flex-col gap-3 space-y-0 p-3.5 sm:flex-row sm:items-start sm:justify-between sm:p-5">
          <div className="min-w-0">
            <CardTitle className="text-base text-muted-foreground">Unified Balance</CardTitle>
            <div className="mt-3 flex min-w-0 flex-wrap items-baseline gap-2">
              {loading ? (
                <Skeleton className="h-12 w-40 max-w-full sm:w-44" />
              ) : (
                <p className="min-w-0 break-words text-3xl font-black tracking-tight sm:text-4xl">
                  {formatUsdLike(total)}
                </p>
              )}
              <span className="text-sm font-semibold text-muted-foreground">USDC</span>
            </div>
            <p className="mt-2 break-words text-sm text-muted-foreground">
              Pending: {pending} USDC
            </p>
          </div>

          <Badge className="w-fit rounded-full bg-primary/15 text-primary">USDC primary</Badge>
        </CardHeader>

        <CardContent className="p-3.5 pt-0 sm:p-5 sm:pt-0">
          <div className="grid w-full min-w-0 gap-2.5 sm:grid-cols-2 sm:gap-3">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="h-12 w-full gap-2 rounded-2xl">
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
                          <SelectedChain chain={chain} />
                        </SelectTrigger>
                        <SelectContent>
                          {depositChains.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              <ChainOption chain={item.value} />
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        {depositChains.find((item) => item.value === chain)?.description}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-950/10 bg-lime-50 p-4 text-sm text-muted-foreground dark:border-white/10 dark:bg-white/[0.06]">
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
              className="h-12 w-full gap-2 rounded-2xl"
              onClick={() => void refresh()}
              disabled={loading}
            >
              <RefreshCcw className={cn("size-4", loading && "animate-spin")} />
              Refresh
            </Button>
          </div>

          <div className="mt-4 w-full min-w-0 rounded-2xl border border-slate-950/10 bg-white/75 p-3.5 dark:border-white/10 dark:bg-white/[0.06] sm:p-4">
            <p className="text-sm font-medium">Balance sources</p>
            {balance?.breakdown?.length ? (
              <div className="mt-3 grid w-full min-w-0 gap-2">
                {balance.breakdown.slice(0, 4).map((item, index) => (
                  <div
                    key={`${JSON.stringify(item)}-${index}`}
                    className="flex min-w-0 items-center justify-between gap-3 rounded-xl bg-slate-950/[0.035] px-3 py-2 text-xs dark:bg-white/[0.06]"
                  >
                    <span className="min-w-0 max-w-[60%] truncate text-muted-foreground sm:max-w-[65%]">
                      {item.chain ?? item.blockchain ?? item.source ?? `Source ${index + 1}`}
                    </span>
                    <span className="shrink-0 truncate font-semibold">
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
