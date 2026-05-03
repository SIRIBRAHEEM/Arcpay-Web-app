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
    value: "Native USDC",
    icon: Gauge
  },
  {
    label: "Security",
    value: "Wallet signed",
    icon: ShieldCheck
  }
];

export function SilverStatusCard() {
  return (
    <Card className="glass overflow-hidden rounded-[2rem]">
      <CardHeader className="p-6">
        <CardTitle className="flex items-center justify-between">
          <span>Network Status</span>
          <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
            Live
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="grid gap-3 p-6 pt-0 sm:grid-cols-2">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
          >
            <stat.icon className="size-5 text-blue-300" />
            <p className="mt-3 text-xs text-slate-400">{stat.label}</p>
            <p className="mt-1 font-bold text-slate-100">{stat.value}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
