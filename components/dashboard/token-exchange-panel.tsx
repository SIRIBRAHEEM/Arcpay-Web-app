"use client";

import { useState } from "react";
import { ArrowDownUp, Repeat2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
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
import { exchangeArcToken } from "@/lib/exchange-actions";
import type { ArcStableToken } from "@/lib/appkit-actions";
import { getChainParams, getNativeGasBalance, requestSwitchChain } from "@/lib/arc";
import { createBrowserAdapter } from "@/lib/kit";
import { validateAmount } from "@/lib/validators";
import { useWalletStore } from "@/store/wallet-store";

const exchangeTokens: ArcStableToken[] = ["USDC", "EURC"];

export function TokenExchangePanel() {
  const provider = useWalletStore((state) => state.provider);
  const address = useWalletStore((state) => state.address);
  const [amount, setAmount] = useState("");
  const [fromToken, setFromToken] = useState<ArcStableToken>("USDC");
  const [toToken, setToToken] = useState<ArcStableToken>("EURC");
  const [loading, setLoading] = useState(false);

  // The key is inlined at build time via NEXT_PUBLIC_.
  // If missing, swap will fail — surface it early in the UI.
  const kitKey = process.env.NEXT_PUBLIC_KIT_KEY;
  const keyMissing =
    !kitKey ||
    kitKey.includes("your_") ||
    kitKey.includes("your_real") ||
    kitKey.length < 20;

  function flipTokens() {
    setFromToken(toToken);
    setToToken(fromToken);
  }

  function handleFromToken(value: string) {
    const token = value as ArcStableToken;
    if (!exchangeTokens.includes(token)) return;

    setFromToken(token);
    if (token === toToken) setToToken(token === "USDC" ? "EURC" : "USDC");
  }

  function handleToToken(value: string) {
    const token = value as ArcStableToken;
    if (!exchangeTokens.includes(token)) return;

    setToToken(token);
    if (token === fromToken) setFromToken(token === "USDC" ? "EURC" : "USDC");
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (keyMissing) {
      toast.error("Token Exchange is not configured. Add NEXT_PUBLIC_KIT_KEY in Vercel (see vercel.env.example).");
      return;
    }

    const amountError = validateAmount(amount);
    if (amountError) {
      toast.error(amountError);
      return;
    }

    if (!provider || !address) {
      toast.error("Connect your wallet first.");
      return;
    }

    if (fromToken === toToken) {
      toast.error("Choose two different tokens.");
      return;
    }

    setLoading(true);

    try {
      await requestSwitchChain(provider, getChainParams("Arc_Testnet"));

      const gasBalance = await getNativeGasBalance(provider, address);
      if (gasBalance <= 0n) {
        throw new Error("Need USDC on Arc Testnet for gas. Get test funds from faucet.circle.com.");
      }

      const freshAdapter = await createBrowserAdapter(provider);

      await exchangeArcToken({
        adapter: freshAdapter,
        amount,
        fromToken,
        toToken
      });

      toast.success(`Swapped ${amount} ${fromToken} → ${toToken}`, {
        description: "Check your updated balance in a few seconds."
      });
      setAmount("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Swap failed. Try a small amount of USDC.");
    } finally {
      setLoading(false);
    }
  }

  const canSubmit = !loading && !keyMissing && !!provider && !!address;

  return (
    <Card className="glass arcpay-shine w-full min-w-0 overflow-hidden rounded-[1.25rem] shadow-card sm:rounded-[1.5rem]">
      <CardHeader className="space-y-3 p-3.5 sm:p-5">
        <CardTitle className="flex min-w-0 items-center gap-2">
          <Repeat2 className="size-5 shrink-0 text-primary" />
          Token Exchange
        </CardTitle>
        <p className="text-sm leading-6 text-slate-600 dark:text-white/68">
          Same-chain swap USDC ↔ EURC on Arc Testnet. (cirBTC coming soon)
        </p>
      </CardHeader>
      <CardContent className="p-3.5 pt-0 sm:p-5 sm:pt-0">
        {keyMissing && (
          <div className="mb-4 flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-sm text-amber-700 dark:text-amber-300">
            <AlertTriangle className="mt-0.5 size-4 shrink-0" />
            <div>
              <div className="font-medium">Token Exchange requires setup</div>
              <div className="mt-1 text-xs opacity-90">
                Add your real Circle App Kit key as <span className="font-mono">NEXT_PUBLIC_KIT_KEY</span> in Vercel project settings.
                Use the <span className="font-mono">vercel.env.example</span> file (Settings → Environment Variables → Import).
                Then redeploy.
              </div>
            </div>
          </div>
        )}

        <form onSubmit={submit} className="grid w-full min-w-0 gap-4">
          <div className="grid min-w-0 gap-2">
            <Label htmlFor="exchange-amount">Amount</Label>
            <Input
              id="exchange-amount"
              inputMode="decimal"
              placeholder="1.00"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              disabled={keyMissing}
            />
          </div>

          <div className="grid w-full min-w-0 gap-3 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-end">
            <div className="grid min-w-0 gap-2">
              <Label>From</Label>
              <Select value={fromToken} onValueChange={handleFromToken} disabled={keyMissing}>
                <SelectTrigger className="h-12 rounded-[1.25rem] px-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {exchangeTokens.map((token) => (
                    <SelectItem key={token} value={token}>
                      {token}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="mx-auto size-10 rounded-2xl"
              onClick={flipTokens}
              aria-label="Flip tokens"
              disabled={keyMissing}
            >
              <ArrowDownUp className="size-4" />
            </Button>

            <div className="grid min-w-0 gap-2">
              <Label>To</Label>
              <Select value={toToken} onValueChange={handleToToken} disabled={keyMissing}>
                <SelectTrigger className="h-12 rounded-[1.25rem] px-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {exchangeTokens.map((token) => (
                    <SelectItem key={token} value={token}>
                      {token}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="w-full min-w-0 rounded-2xl border border-primary/20 bg-primary/10 p-3.5 text-sm leading-6 text-slate-700 dark:text-white/78 sm:p-4">
            Arc Testnet only. Need USDC balance + gas. Get test funds at faucet.circle.com
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={!canSubmit}
            className="h-12 w-full rounded-2xl bg-gradient-to-r from-blue-700 to-orange-500 shadow-[0_18px_45px_rgba(11,99,229,0.22)] hover:from-blue-800 hover:to-orange-600 disabled:opacity-60"
          >
            {loading ? (
              "Swapping..."
            ) : keyMissing ? (
              "Configure Kit key to enable Exchange"
            ) : (
              <>
                <Repeat2 className="mr-2 size-4" />
                Exchange tokens
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
