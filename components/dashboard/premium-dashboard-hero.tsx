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
    <Card className="glass overflow-hidden rounded-[1.5rem]">
      <CardContent className="relative p-6 sm:p-8">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(190,242,100,0.10)_1px,transparent_1px),linear-gradient(180deg,rgba(190,242,100,0.08)_1px,transparent_1px)] bg-[size:56px_56px]" />

        <div className="relative">
          <Badge className="gap-2 rounded-full border-lime-300/20 bg-lime-300/10 px-3 py-1.5 text-lime-100">
            <Zap className="size-3.5" />
            ArcPay Dashboard
          </Badge>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.95fr] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl">
                Pay, request, and move stablecoins on ARC.
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                A cleaner payment workspace for sending USDC, creating requests,
                bridging funds, and checking activity without leaving the app.
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
                  className="rounded-[1.25rem] border border-white/10 bg-white/[0.055] p-4"
                >
                  <div className="grid size-10 place-items-center rounded-full bg-lime-300/10 text-lime-100">
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
