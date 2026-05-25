"use client";

import { Activity, CheckCircle2, Gauge, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  {
    label: "Network",
    value: "Arc Testnet",
    icon: Activity
  },
  {
    label: "Status",
    value: "Operational",
    icon: CheckCircle2
  },
  {
    label: "Gas",
    value: "USDC",
    icon: Gauge
  },
  {
    label: "Custody",
    value: "Wallet signed",
    icon: ShieldCheck
  }
];

export function ProtocolStatusCard() {
  return (
    <Card className="glass overflow-hidden rounded-[1.5rem]">
      <CardHeader className="p-4 sm:p-5">
        <CardTitle>Protocol Status</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-3 p-4 pt-0 sm:grid-cols-2 sm:p-5 sm:pt-0">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-950/10 bg-white/75 p-4 dark:border-white/10 dark:bg-white/[0.06]"
          >
            <stat.icon className="size-5 text-emerald-800 dark:text-lime-200" />
            <p className="mt-3 text-xs text-teal-950/50 dark:text-lime-50/50">{stat.label}</p>
            <p className="mt-1 font-bold text-teal-950 dark:text-lime-50">{stat.value}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
