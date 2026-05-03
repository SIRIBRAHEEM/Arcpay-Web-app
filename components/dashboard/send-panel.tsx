"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeftRight,
  ExternalLink,
  Repeat2,
  Sparkles,
  Waypoints
} from "lucide-react";
import { toast } from "sonner";
import { TransactionDialog } from "@/components/dashboard/transaction-dialog";
import { BridgeRouteAnimation } from "@/components/visuals/bridge-route-animation";
import { LottieSuccess } from "@/components/visuals/lottie-success";
import { SwapOrbitAnimation } from "@/components/visuals/swap-orbit-animation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChainLogo, ChainOption, SelectedChain } from "@/components/ui/chain-logo";
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
  bridgeUsdc,
  extractTransaction,
  swapStablecoins,
  type ArcStableToken
} from "@/lib/appkit-actions";
import {
  APPKIT_CHAIN_LABELS,
  BRIDGE_CHAINS,
  CHAIN_PARAMS_BY_APPKIT_CHAIN,
  requestSwitchChain,
  type AppKitChain
} from "@/lib/arc";
import { saveTransaction } from "@/lib/transactions";
import { validateAmount } from "@/lib/validators";
import { useWalletStore } from "@/store/wallet-store";

type Mode = "swap" | "bridge";

export function BridgeSwapPanel() {
  const adapter = useWalletStore((state) => state.adapter);
  const provider = useWalletStore((state) => state.provider);
  const address = useWalletStore((state) => state.address);

  const [mode, setMode] = useState<Mode>("swap");
  const [amount, setAmount] = useState("");
  const [tokenIn, setTokenIn] = useState<ArcStableToken>("USDC");
  const [tokenOut, setTokenOut] = useState<ArcStableToken>("EURC");
  const [fromChain, setFromChain] = useState<AppKitChain>("Arc_Testnet");
  const [toChain, setToChain] = useState<AppKitChain>("Base_Sepolia");
  const [loading, setLoading] = useState(false);
  const [txOpen, setTxOpen] = useState(false);
  const [tx, setTx] = useState<ReturnType<typeof extractTransaction> | null>(null);

  const title = mode === "swap" ? "Swap stablecoins" : "Bridge USDC";

  const description = useMemo(() => {
    if (mode === "swap") {
      return `${tokenIn} → ${tokenOut} on ${APPKIT_CHAIN_LABELS[fromChain]}`;
    }

    return `Move USDC from ${APPKIT_CHAIN_LABELS[fromChain]} to ${APPKIT_CHAIN_LABELS[toChain]}`;
  }, [fromChain, mode, toChain, tokenIn, tokenOut]);

  function flipSwapTokens() {
    setTokenIn(tokenOut);
    setTokenOut(tokenIn);
  }

  function flipBridgeChains() {
    setFromChain(toChain);
    setToChain(fromChain);
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

    if (mode === "swap" && tokenIn === tokenOut) {
      toast.error("Choose two different tokens.");
      return;
    }

    if (mode === "bridge" && fromChain === toChain) {
      toast.error("Choose two different chains.");
      return;
    }

    setLoading(true);

    try {
      await requestSwitchChain(provider, CHAIN_PARAMS_BY_APPKIT_CHAIN[fromChain]);

      if (mode === "swap") {
        const result = await swapStablecoins({
          adapter,
          amount,
          tokenIn,
          tokenOut,
          chain: fromChain
        });

        const txDetails = extractTransaction(result);

        setTx(txDetails);
        setTxOpen(true);

        saveTransaction(address, {
          id: crypto.randomUUID(),
          type: "swap",
          token: tokenOut,
          amount,
          chain: fromChain,
          state: "success",
          hash: txDetails.hash,
          explorerUrl: txDetails.explorerUrl,
          memo: `${tokenIn} → ${tokenOut}`,
          createdAt: Date.now()
        });

        toast.success("Swap submitted", {
          description: `${tokenIn} → ${tokenOut} on ${APPKIT_CHAIN_LABELS[fromChain]}`
        });
      } else {
        const result = await bridgeUsdc({
          adapter,
          amount,
          fromChain,
          toChain
        });

        const txDetails = extractTransaction(result);

        setTx(txDetails);
        setTxOpen(true);

        saveTransaction(address, {
          id: crypto.randomUUID(),
          type: "bridge",
          token: "USDC",
          amount,
          chain: `${fromChain} → ${toChain}`,
          state: "success",
          hash: txDetails.hash,
          explorerUrl: txDetails.explorerUrl,
          memo: `Bridge USDC to ${APPKIT_CHAIN_LABELS[toChain]}`,
          createdAt: Date.now()
        });

        toast.success("Bridge submitted", {
          description: `USDC is moving to ${APPKIT_CHAIN_LABELS[toChain]}`
        });
      }

      setAmount("");
    } catch (error) {
      toast.error(mode === "swap" ? "Swap failed" : "Bridge failed", {
        description: error instanceof Error ? error.message : "Please try again."
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Card className="glass overflow-hidden rounded-[2rem] shadow-card">
        <CardHeader className="space-y-4 p-6">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="size-5 text-primary" />
              Bridge & Swap
            </CardTitle>

            <Badge variant="secondary" className="rounded-full">
              Multi-chain
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-1">
            <button
              type="button"
              onClick={() => setMode("swap")}
              className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition ${
                mode === "swap"
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "text-muted-foreground hover:bg-white/10 hover:text-foreground"
              }`}
            >
              <Repeat2 className="size-4" />
              Swap
            </button>

            <button
              type="button"
              onClick={() => setMode("bridge")}
              className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition ${
                mode === "bridge"
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "text-muted-foreground hover:bg-white/10 hover:text-foreground"
              }`}
            >
              <Waypoints className="size-4" />
              Bridge
            </button>
          </div>
        </CardHeader>

        <CardContent className="p-6 pt-0">
          <form onSubmit={submit} className="grid gap-5">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.025] p-5">
              <p className="text-sm text-muted-foreground">{title}</p>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                {mode === "swap" ? (
                  <>
                    <Badge className="rounded-full bg-cyan-400/15 text-cyan-300">
                      {tokenIn}
                    </Badge>
                    <ArrowLeftRight className="size-4 text-muted-foreground" />
                    <Badge className="rounded-full bg-primary/15 text-primary">
                      {tokenOut}
                    </Badge>
                    <span className="text-sm text-muted-foreground">on</span>
                    <ChainLogo chain={fromChain} />
                    <span className="text-sm font-semibold">
                      {APPKIT_CHAIN_LABELS[fromChain]}
                    </span>
                  </>
                ) : (
                  <>
                    <ChainLogo chain={fromChain} />
                    <span className="text-sm font-semibold">
                      {APPKIT_CHAIN_LABELS[fromChain]}
                    </span>
                    <ArrowLeftRight className="size-4 text-muted-foreground" />
                    <ChainLogo chain={toChain} />
                    <span className="text-sm font-semibold">
                      {APPKIT_CHAIN_LABELS[toChain]}
                    </span>
                  </>
                )}
              </div>

              <p className="mt-3 text-lg font-black tracking-tight">
                {description}
              </p>
            </div>

            {loading ? (
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                <LottieSuccess variant="processing" className="h-24 w-full" />
                <p className="text-center text-sm font-semibold">
                  {mode === "swap" ? "Preparing swap route..." : "Preparing bridge route..."}
                </p>
              </div>
            ) : mode === "swap" ? (
              <SwapOrbitAnimation tokenIn={tokenIn} tokenOut={tokenOut} />
            ) : (
              <BridgeRouteAnimation
                fromLabel={APPKIT_CHAIN_LABELS[fromChain]}
                toLabel={APPKIT_CHAIN_LABELS[toChain]}
              />
            )}

            <div className="grid gap-2">
              <Label htmlFor="bridge-swap-amount">Amount</Label>
              <Input
                id="bridge-swap-amount"
                inputMode="decimal"
                placeholder="10.00"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
              />
            </div>

            {mode === "swap" ? (
              <div className="grid gap-3">
                <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
                  <div className="grid gap-2">
                    <Label>From token</Label>
                    <Select
                      value={tokenIn}
                      onValueChange={(value) => setTokenIn(value as ArcStableToken)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USDC">USDC</SelectItem>
                        <SelectItem value="EURC">EURC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="mx-auto rounded-2xl"
                    onClick={flipSwapTokens}
                    aria-label="Flip swap tokens"
                  >
                    <ArrowLeftRight className="size-4" />
                  </Button>

                  <div className="grid gap-2">
                    <Label>To token</Label>
                    <Select
                      value={tokenOut}
                      onValueChange={(value) => setTokenOut(value as ArcStableToken)}
                    >
                      <SelectTrigger>
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
                  <Label>Swap chain</Label>
                  <Select
                    value={fromChain}
                    onValueChange={(value) => setFromChain(value as AppKitChain)}
                  >
                    <SelectTrigger>
                      <SelectedChain chain={fromChain} />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="Arc_Testnet">
                        <ChainOption chain="Arc_Testnet" />
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <p className="text-xs text-muted-foreground">
                    Testnet swaps are safest on Arc Testnet for USDC and EURC.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid gap-3">
                <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
                  <div className="grid gap-2">
                    <Label>From chain</Label>
                    <Select
                      value={fromChain}
                      onValueChange={(value) => setFromChain(value as AppKitChain)}
                    >
                      <SelectTrigger>
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
                    <Select
                      value={toChain}
                      onValueChange={(value) => setToChain(value as AppKitChain)}
                    >
                      <SelectTrigger>
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

                <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4 text-sm text-primary">
                  Bridge supports USDC transfers. Your wallet must have test
                  USDC and native gas on the selected source chain.
                </div>
              </div>
            )}

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-muted-foreground">
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

            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="h-12 rounded-2xl"
            >
              {loading ? (
                mode === "swap" ? "Swapping..." : "Bridging..."
              ) : mode === "swap" ? (
                <>
                  <Repeat2 className="mr-2 size-4" />
                  Swap now
                </>
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
        title={mode === "swap" ? "Swap submitted" : "Bridge submitted"}
        description={
          mode === "swap"
            ? "Your swap transaction was submitted."
            : "Your bridge transaction was submitted. Cross-chain transfers may take time to complete."
        }
        tx={tx}
      />
    </>
  );
}
