"use client";

import { ArrowRightLeft, ShieldCheck, Sparkles, WalletCards, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const points = [
  {
    icon: WalletCards,
    label: "Unified Balance",
    value: "USDC-ready"
  },
  {
    icon: ArrowRightLeft,
    label: "Bridge & Swap",
    value: "Multi-chain"
  },
  {
    icon: ShieldCheck,
    label: "Custody",
    value: "Wallet signed"
  },
  {
    icon: Zap,
    label: "Gas",
    value: "Native USDC"
  }
];

export function PremiumDashboardHero() {
  return (
    <Card className="glass overflow-hidden rounded-[2rem]">
      <CardContent className="relative p-6 sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(96,165,250,0.18),transparent_30%),radial-gradient(circle_at_90%_20%,rgba(34,211,238,0.12),transparent_28%)]" />

        <div className="relative">
          <Badge className="gap-2 rounded-full border-blue-300/20 bg-blue-400/10 px-3 py-1.5 text-blue-200">
            <Sparkles className="size-3.5" />
            Premium ArcPay Dashboard
          </Badge>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-4xl font-black tracking-tight text-slate-50 sm:text-5xl">
                Move stablecoins across ARC
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
                Bridge, swap, receive, and manage USDC with a clean non-custodial
                payment experience built for Arc Testnet.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <Badge variant="secondary">USDC</Badge>
                <Badge variant="secondary">EURC</Badge>
                <Badge variant="secondary">Arc Testnet</Badge>
                <Badge variant="secondary">Circle App Kit</Badge>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {points.map((point) => (
                <div
                  key={point.label}
                  className="rounded-3xl border border-white/10 bg-white/[0.045] p-4"
                >
                  <div className="grid size-10 place-items-center rounded-2xl bg-blue-400/10 text-blue-300">
                    <point.icon className="size-5" />
                  </div>

                  <p className="mt-4 text-xs text-slate-400">{point.label}</p>
                  <p className="mt-1 font-bold text-slate-100">{point.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
