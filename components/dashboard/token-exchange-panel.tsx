"use client";

import { Repeat2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TokenExchangePanel() {
  return (
    <Card className="glass overflow-hidden rounded-[1.5rem] shadow-card arcpay-shine">
      <CardHeader className="space-y-3 p-4 sm:p-5">
        <CardTitle className="flex items-center gap-2">
          <Repeat2 className="size-5 text-primary" />
          Token Exchange
        </CardTitle>
        <p className="text-sm leading-6 text-slate-600 dark:text-white/68">
          Same-chain Arc Testnet exchange between USDC, EURC, and cirBTC.
        </p>
      </CardHeader>
      <CardContent className="p-4 pt-0 sm:p-5 sm:pt-0">
        <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4 text-sm leading-6 text-slate-700 dark:text-white/78">
          Arc Testnet token exchange is being prepared for Circle App Kit routing.
        </div>
      </CardContent>
    </Card>
  );
}
