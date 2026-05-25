"use client";

import { History, Link2, ShieldCheck, WalletCards } from "lucide-react";
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
    icon: History,
    label: "Activity",
    value: "Local history"
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
      <CardContent className="relative p-4 sm:p-6">
        <div className="relative">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-2xl font-black tracking-tight text-teal-950 dark:text-lime-50 sm:text-4xl">
                Pay, request, and bridge stablecoins on ARC.
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-teal-950/68 dark:text-lime-50/68 sm:text-base sm:leading-7">
                A cleaner payment workspace for sending USDC, creating requests,
                bridging funds, and checking local wallet activity without leaving the app.
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
                  className="flex min-w-0 items-center gap-3 rounded-[1rem] border border-slate-950/10 bg-white/75 p-3.5 dark:border-white/10 dark:bg-white/[0.06]"
                >
                  <div className="grid size-10 shrink-0 place-items-center rounded-2xl bg-teal-950 text-lime-100 dark:bg-lime-200 dark:text-teal-950">
                    <point.icon className="size-5" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-teal-950/50 dark:text-lime-50/50">{point.label}</p>
                    <p className="mt-1 truncate font-bold text-teal-950 dark:text-lime-50">{point.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
