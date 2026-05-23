"use client";

import { ArrowRightLeft, Link2, ShieldCheck, WalletCards, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const points = [
  {
    icon: WalletCards,
    label: "Unified Balance",
    value: "USDC-ready"
  },
  {
    icon: Link2,
    label: "Requests",
    value: "Shareable links"
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
  }
];

export function PremiumDashboardHero() {
  return (
    <Card className="glass overflow-hidden rounded-[1.25rem]">
      <CardContent className="relative p-5 sm:p-6">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,92,67,0.08)_1px,transparent_1px),linear-gradient(180deg,rgba(14,92,67,0.08)_1px,transparent_1px)] bg-[size:50px_50px] dark:bg-[linear-gradient(90deg,rgba(190,242,100,0.055)_1px,transparent_1px),linear-gradient(180deg,rgba(190,242,100,0.045)_1px,transparent_1px)]" />

        <div className="relative">
          <Badge className="gap-2 rounded-full border-emerald-950/10 bg-lime-200 px-3 py-1.5 text-emerald-950 dark:border-lime-200/20 dark:bg-lime-200/12 dark:text-lime-100">
            <Zap className="size-3.5" />
            ArcPay Dashboard
          </Badge>

          <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_0.95fr] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-3xl font-black tracking-tight text-emerald-950 dark:text-lime-50 sm:text-4xl">
                Pay, request, and move stablecoins on ARC.
              </h1>

              <p className="mt-3 max-w-2xl text-base leading-7 text-emerald-950/65 dark:text-lime-50/65">
                A cleaner payment workspace for sending USDC, creating requests,
                bridging funds, and checking activity without leaving the app.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
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
                  className="rounded-[1rem] border border-emerald-950/10 bg-white/80 p-4 dark:border-white/10 dark:bg-white/[0.055]"
                >
                  <div className="grid size-9 place-items-center rounded-full bg-emerald-950 text-lime-100 dark:bg-lime-200 dark:text-emerald-950">
                    <point.icon className="size-5" />
                  </div>

                  <p className="mt-3 text-xs text-emerald-950/50 dark:text-lime-50/50">{point.label}</p>
                  <p className="mt-1 font-bold text-emerald-950 dark:text-lime-50">{point.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
