"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, WalletCards } from "lucide-react";
import { BalanceCard } from "@/components/dashboard/balance-card";
import { BridgePanel } from "@/components/dashboard/bridge-panel";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { EventWatcher } from "@/components/dashboard/event-watcher";
import { PremiumDashboardHero } from "@/components/dashboard/premium-dashboard-hero";
import { ProtocolStatusCard } from "@/components/dashboard/protocol-status-card";
import { ReceivePanel } from "@/components/dashboard/receive-panel";
import { SendPanel } from "@/components/dashboard/send-panel";
import { TxHistory } from "@/components/dashboard/tx-history";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function QuickGuideCard() {
  return (
    <Card className="glass w-full min-w-0 overflow-hidden rounded-[1.25rem] sm:rounded-[1.5rem]">
      <CardContent className="grid gap-4 p-4 sm:p-5">
        <div className="flex min-w-0 items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-black text-teal-950 dark:text-lime-50">
              Payment app flow
            </p>
            <p className="mt-1 text-xs leading-5 text-teal-950/62 dark:text-lime-50/68">
              Balance first, then pay, request, bridge, and activity.
            </p>
          </div>
          <Badge variant="secondary" className="shrink-0">
            Clean UX
          </Badge>
        </div>

        <div className="grid gap-2.5">
          {[
            ["01", "Check balance"],
            ["02", "Pay or request"],
            ["03", "Bridge when needed"],
            ["04", "Track activity"]
          ].map(([step, label]) => (
            <div
              key={step}
              className="flex items-center gap-3 rounded-2xl border border-slate-950/10 bg-white/75 px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.06]"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-blue-100 text-xs font-black text-blue-700 dark:bg-blue-400/10 dark:text-blue-200">
                {step}
              </span>
              <span className="min-w-0 truncate text-sm font-bold text-teal-950 dark:text-lime-50">
                {label}
              </span>
              <CheckCircle2 className="ml-auto size-4 shrink-0 text-primary" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function FaucetCard() {
  return (
    <Card className="glass w-full min-w-0 overflow-hidden rounded-[1.25rem] sm:rounded-[1.5rem]">
      <CardContent className="p-4 sm:p-5">
        <div className="flex min-w-0 items-start gap-3">
          <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-orange-100 text-orange-700 dark:bg-orange-400/10 dark:text-orange-200">
            <WalletCards className="size-5" />
          </div>

          <div className="min-w-0">
            <p className="font-black text-teal-950 dark:text-lime-50">Need test USDC?</p>
            <p className="mt-1 text-sm leading-6 text-teal-950/62 dark:text-lime-50/68">
              Fund first before testing payments, QR requests, and bridge routes.
            </p>
          </div>
        </div>

        <Button asChild className="mt-4 h-11 w-full rounded-2xl">
          <Link href="https://faucet.circle.com" target="_blank" rel="noreferrer">
            Open faucet
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export function DashboardFixed() {
  return (
    <main className="premium-dashboard-bg min-h-screen overflow-x-hidden px-3 pb-16 pt-3 text-foreground sm:px-5 sm:pb-20 sm:pt-4 lg:px-8">
      <EventWatcher />

      <div className="mx-auto grid w-full max-w-[1180px] gap-4 sm:gap-5">
        <DashboardHeader />

        <PremiumDashboardHero />

        <section
          aria-label="ArcPay payment dashboard"
          className="grid w-full min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_390px] lg:items-start"
        >
          <div className="order-2 grid w-full min-w-0 gap-4 lg:order-1">
            <div className="grid w-full min-w-0 gap-4 xl:grid-cols-2 xl:items-start">
              <div className="min-w-0">
                <SendPanel />
              </div>
              <div className="min-w-0">
                <ReceivePanel />
              </div>
            </div>

            <div className="grid w-full min-w-0 gap-4 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] xl:items-start">
              <div className="min-w-0">
                <BridgePanel />
              </div>
              <div className="min-w-0">
                <TxHistory />
              </div>
            </div>
          </div>

          <aside className="order-1 grid w-full min-w-0 gap-4 lg:sticky lg:top-24 lg:order-2 lg:self-start">
            <BalanceCard />

            <div className="grid w-full min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <ProtocolStatusCard />
              <QuickGuideCard />
            </div>

            <FaucetCard />

            <div className="hidden rounded-[1.25rem] border border-slate-950/10 bg-white/60 p-4 text-sm leading-6 text-teal-950/65 dark:border-white/10 dark:bg-white/[0.045] dark:text-lime-50/68 lg:block">
              <div className="mb-2 flex items-center gap-2 font-black text-teal-950 dark:text-lime-50">
                <ShieldCheck className="size-4 text-primary" />
                Layout rule
              </div>
              One clean sidebar for status and balance. One main column for actions and history.
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
