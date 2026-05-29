"use client";

import { useState } from "react";
import { ArrowDownUp, Repeat2 } from "lucide-react";
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
        throw new Error("Arc Testnet needs USDC gas for network fees. Add test USDC, then try again.");
      }

      const freshAdapter = await createBrowserAdapter(provider);

      await exchangeArcToken({
        adapter: freshAdapter,
        amount,
        fromToken,
        toToken
      });

      toast.success("Token exchange submitted", {
        description: `${fromToken} to ${toToken} on Arc Testnet`
      });
      setAmount("");
    } catch (error) {
      toast.error("Token exchange failed", {
        description: error instanceof Error ? error.message : "Please try again."
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="glass overflow-hidden rounded-[1.5rem] shadow-card arcpay-shine">
      <CardHeader className="space-y-3 p-4 sm:p-5">
        <CardTitle className="flex items-center gap-2">
          <Repeat2 className="size-5 text-primary" />
          Token Exchange
        </CardTitle>
        <p className="text-sm leading-6 text-slate-600 dark:text-white/68">
          Same-chain Arc Testnet exchange between USDC and EURC. cirBTC will be enabled after its route is confirmed.
        </p>
      </CardHeader>
      <CardContent className="p-4 pt-0 sm:p-5 sm:pt-0">
        <form onSubmit={submit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="exchange-amount">Amount</Label>
            <Input
              id="exchange-amount"
              inputMode="decimal"
              placeholder="25.00"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-end">
            <div className="grid gap-2">
              <Label>From token</Label>
              <Select value={fromToken} onValueChange={handleFromToken}>
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
              aria-label="Flip exchange tokens"
            >
              <ArrowDownUp className="size-4" />
            </Button>

            <div className="grid gap-2">
              <Label>To token</Label>
              <Select value={toToken} onValueChange={handleToToken}>
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

          <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4 text-sm leading-6 text-slate-700 dark:text-white/78">
            Arc Testnet only. Test with USDC ↔ EURC first, keep enough USDC gas, and disable browser shields if the service cannot fetch.
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="h-12 rounded-2xl bg-gradient-to-r from-blue-700 to-orange-500 shadow-[0_18px_45px_rgba(11,99,229,0.22)] hover:from-blue-800 hover:to-orange-600"
          >
            {loading ? (
              "Submitting..."
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
