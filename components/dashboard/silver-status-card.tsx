"use client";

import { Activity, CheckCircle2, Gauge, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  {
    label: "Mode",
    value: "DEX UI",
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

export function SilverStatusCard() {
  return (
    <Card className="glass overflow-hidden rounded-[2rem]">
      <CardHeader className="p-6">
        <CardTitle className="flex items-center justify-between">
          <span>Protocol Status</span>
          <span className="rounded-full border border-emerald-950/10 bg-lime-200 px-3 py-1 text-xs font-semibold text-emerald-950">
            Online
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="grid gap-3 p-6 pt-0 sm:grid-cols-2">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-emerald-950/10 bg-white/70 p-4"
          >
            <stat.icon className="size-5 text-emerald-800" />
            <p className="mt-3 text-xs text-emerald-950/50">{stat.label}</p>
            <p className="mt-1 font-bold text-emerald-950">{stat.value}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
