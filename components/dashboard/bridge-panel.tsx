"use client";

import { useMemo, useState } from "react";
import { ArrowLeftRight, ExternalLink, Waypoints } from "lucide-react";
import { toast } from "sonner";
import { TransactionDialog } from "@/components/dashboard/transaction-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChainOption, SelectedChain } from "@/components/ui/chain-logo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from "@/components/ui/select";
import { bridgeUsdc, extractTransaction } from "@/lib/appkit-actions";
import {
  BRIDGE_CHAINS,
  getChainLabel,
  getChainParams,
  getNativeGasBalance,
  getNativeGasSymbol,
  isAppKitChain,
  requestSwitchChain,
  type AppKitChain
} from "@/lib/arc";
import { saveTransaction } from "@/lib/transactions";
import { validateAmount } from "@/lib/validators";
import { useWalletStore } from "@/store/wallet-store";

export function BridgePanel() {
  const adapter = useWalletStore((state) => state.adapter);
  const provider = useWalletStore((state) => state.provider);
  const address = useWalletStore((state) => state.address);

  const [amount, setAmount] = useState("");
  const [fromChain, setFromChain] = useState<AppKitChain>("Arc_Testnet");
  const [toChain, setToChain] = useState<AppKitChain>("Base_Sepolia");
  const [loading, setLoading] = useState(false);
  const [txOpen, setTxOpen] = useState(false);
  const [tx, setTx] = useState<ReturnType<typeof extractTransaction> | null>(null);

  const routeTitle = useMemo(() => {
    return `${getChainLabel(fromChain)} -> ${getChainLabel(toChain)}`;
  }, [fromChain, toChain]);

  function flipBridgeChains() {
    setFromChain(toChain);
    setToChain(fromChain);
  }

  function handleFromChainChange(value: string) {
    if (!isAppKitChain(value)) {
      toast.error("Choose a supported source chain.");
      return;
    }

    setFromChain(value);

    if (value === toChain) {
      setToChain(value === "Arc_Testnet" ? "Base_Sepolia" : "Arc_Testnet");
    }
  }

  function handleToChainChange(value: string) {
    if (!isAppKitChain(value)) {
      toast.error("Choose a supported destination chain.");
      return;
    }

    setToChain(value);

    if (value === fromChain) {
      setFromChain(value === "Arc_Testnet" ? "Base_Sepolia" : "Arc_Testnet");
    }
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
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

    if (fromChain === toChain) {
      toast.error("Choose two different chains.");
      return;
    }

    setLoading(true);

    try {
      if (!isAppKitChain(fromChain) || !isAppKitChain(toChain)) {
        throw new Error("Choose a supported bridge route, then try again.");
      }

      await requestSwitchChain(provider, getChainParams(fromChain));

      const gasBalance = await getNativeGasBalance(provider, address);
      const gasSymbol = getNativeGasSymbol(fromChain);

      if (gasBalance <= 0n) {
        throw new Error(
          `${getChainLabel(fromChain)} needs ${gasSymbol} for network fees. Add test ${gasSymbol}, then try again.`
        );
      }

      const result = await bridgeUsdc({
        adapter,
        amount,
        fromChain,
        toChain
      });

      const txDetails = extractTransaction(result);

      setTx(txDetails);
      setTxOpen(true);

      void saveTransaction(address, {
        id: crypto.randomUUID(),
        type: "bridge",
        token: "USDC",
        amount,
        chain: `${fromChain} -> ${toChain}`,
        state: "success",
        hash: txDetails.hash,
        explorerUrl: txDetails.explorerUrl,
        memo: `Bridge USDC to ${getChainLabel(toChain)}`,
        createdAt: Date.now()
      });

      toast.success("Bridge submitted", {
        description: `USDC is moving to ${getChainLabel(toChain)}`
      });

      setAmount("");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Please try again.";

      console.error("[ArcPay bridge]", message);

      toast.error("Bridge failed", {
        description: message
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Card className="glass overflow-hidden rounded-[1.5rem] shadow-card">
        <CardHeader className="space-y-3 p-5">
          <CardTitle className="flex items-center gap-2">
            <Waypoints className="size-5 text-primary" />
            Bridge USDC
          </CardTitle>

          <div className="rounded-[1.25rem] border border-emerald-950/10 bg-emerald-950/[0.035] p-4 dark:border-white/10 dark:bg-white/[0.075]">
            <p className="text-sm text-emerald-950/65 dark:text-lime-50/80">USDC bridge route</p>
            <p className="mt-2 text-lg font-black tracking-tight text-emerald-950 dark:text-lime-50">
              {routeTitle}
            </p>
          </div>
        </CardHeader>

        <CardContent className="p-5 pt-0">
          <form onSubmit={submit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="bridge-amount">Amount</Label>
              <Input
                id="bridge-amount"
                inputMode="decimal"
                placeholder="10.00"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
              <div className="grid gap-2">
                <Label>From chain</Label>
                <Select value={fromChain} onValueChange={handleFromChainChange}>
                  <SelectTrigger className="h-12 rounded-[1.25rem] px-3">
                    <SelectedChain chain={fromChain} />
                  </SelectTrigger>

                  <SelectContent>
                    {BRIDGE_CHAINS.map((chain) => (
                      <SelectItem key={chain} value={chain}>
                        <ChainOption chain={chain} />
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="mx-auto rounded-2xl"
                onClick={flipBridgeChains}
                aria-label="Flip bridge chains"
              >
                <ArrowLeftRight className="size-4" />
              </Button>

              <div className="grid gap-2">
                <Label>To chain</Label>
                <Select value={toChain} onValueChange={handleToChainChange}>
                  <SelectTrigger className="h-12 rounded-[1.25rem] px-3">
                    <SelectedChain chain={toChain} />
                  </SelectTrigger>

                  <SelectContent>
                    {BRIDGE_CHAINS.map((chain) => (
                      <SelectItem key={chain} value={chain}>
                        <ChainOption chain={chain} />
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4 text-sm leading-6 text-emerald-950 dark:text-lime-50">
              Keep source-chain USDC plus {getNativeGasSymbol(fromChain)} gas on{" "}
              {getChainLabel(fromChain)}.
            </div>

            <div className="rounded-2xl border border-emerald-950/10 bg-white/70 p-4 text-sm text-emerald-950/70 dark:border-white/10 dark:bg-white/[0.075] dark:text-lime-50/80">
              Need test funds?{" "}
              <a
                href="https://faucet.circle.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-primary hover:underline"
              >
                Open Circle faucet <ExternalLink className="size-3" />
              </a>
            </div>

            <Button type="submit" size="lg" disabled={loading} className="h-12 rounded-2xl">
              {loading ? (
                "Bridging..."
              ) : (
                <>
                  <Waypoints className="mr-2 size-4" />
                  Bridge USDC
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <TransactionDialog
        open={txOpen}
        onOpenChange={setTxOpen}
        title="Bridge submitted"
        description="Your bridge transaction was submitted. Cross-chain transfers may take time to complete."
        tx={tx}
      />
    </>
  );
}
