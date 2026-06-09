"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  LayoutDashboard,
  ShieldCheck,
  WalletCards
} from "lucide-react";
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

function RowLabel({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-w-0 flex-col justify-center rounded-[1.25rem] border border-slate-950/10 bg-white/70 p-4 dark:border-white/10 dark:bg-white/[0.05] lg:min-h-[8.5rem]">
      <div className="mb-3 flex size-10 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 dark:bg-blue-400/10 dark:text-blue-200">
        <LayoutDashboard className="size-5" />
      </div>
      <p className="text-sm font-black uppercase tracking-[0.16em] text-primary/80">
        {title}
      </p>
      <p className="mt-2 text-sm leading-6 text-teal-950/62 dark:text-lime-50/68">
        {description}
      </p>
    </div>
  );
}

function QuickGuideCard() {
  return (
    <Card className="glass h-full w-full min-w-0 overflow-hidden rounded-[1.25rem] sm:rounded-[1.5rem]">
      <CardContent className="grid h-full content-start gap-4 p-4 sm:p-5">
        <div className="flex min-w-0 items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-black text-teal-950 dark:text-lime-50">
              Payment flow
            </p>
            <p className="mt-1 text-xs leading-5 text-teal-950/62 dark:text-lime-50/68">
              Built like a payment app: balance, actions, movement, history.
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
    <Card className="glass h-full w-full min-w-0 overflow-hidden rounded-[1.25rem] sm:rounded-[1.5rem]">
      <CardContent className="flex h-full flex-col p-4 sm:p-5">
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

        <Button asChild className="mt-auto h-11 w-full rounded-2xl">
          <Link href="https://faucet.circle.com" target="_blank" rel="noreferrer">
            Open faucet
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

function LayoutRuleCard() {
  return (
    <Card className="glass h-full w-full min-w-0 overflow-hidden rounded-[1.25rem] sm:rounded-[1.5rem]">
      <CardContent className="flex h-full flex-col justify-center p-4 text-sm leading-6 text-teal-950/65 dark:text-lime-50/68 sm:p-5">
        <div className="mb-3 flex items-center gap-2 font-black text-teal-950 dark:text-lime-50">
          <ShieldCheck className="size-4 text-primary" />
          PC grid rule
        </div>
        12-column desktop grid, equal gaps, row-based sections, and no sticky sidebar.
      </CardContent>
    </Card>
  );
}

export function DashboardFixed() {
  return (
    <main className="premium-dashboard-bg min-h-screen overflow-x-hidden px-3 pb-16 pt-3 text-foreground sm:px-5 sm:pb-20 sm:pt-4 lg:px-8">
      <EventWatcher />

      <div className="mx-auto grid w-full max-w-[1240px] gap-4 sm:gap-5 lg:gap-6">
        <DashboardHeader />

        <section
          aria-label="Dashboard overview"
          className="grid w-full min-w-0 gap-4 lg:grid-cols-12 lg:items-stretch lg:gap-5"
        >
          <div className="min-w-0 lg:col-span-8">
            <PremiumDashboardHero />
          </div>
          <div className="min-w-0 lg:col-span-4">
            <BalanceCard />
          </div>
        </section>

        <section
          aria-label="Primary payment actions"
          className="grid w-full min-w-0 gap-4 lg:grid-cols-12 lg:items-start lg:gap-5"
        >
          <div className="hidden min-w-0 lg:col-span-2 lg:block">
            <RowLabel
              title="Actions"
              description="Send and request stay in one clear payment row."
            />
          </div>
          <div className="min-w-0 lg:col-span-4">
            <SendPanel />
          </div>
          <div className="min-w-0 lg:col-span-6">
            <ReceivePanel />
          </div>
        </section>

        <section
          aria-label="Money movement and activity"
          className="grid w-full min-w-0 gap-4 lg:grid-cols-12 lg:items-start lg:gap-5"
        >
          <div className="hidden min-w-0 lg:col-span-2 lg:block">
            <RowLabel
              title="Movement"
              description="Bridge and history are grouped for tracking."
            />
          </div>
          <div className="min-w-0 lg:col-span-4">
            <BridgePanel />
          </div>
          <div className="min-w-0 lg:col-span-6">
            <TxHistory />
          </div>
        </section>

        <section
          aria-label="Dashboard support cards"
          className="grid w-full min-w-0 gap-4 md:grid-cols-2 lg:grid-cols-12 lg:items-stretch lg:gap-5"
        >
          <div className="min-w-0 lg:col-span-4">
            <ProtocolStatusCard />
          </div>
          <div className="min-w-0 lg:col-span-4">
            <QuickGuideCard />
          </div>
          <div className="min-w-0 lg:col-span-2">
            <FaucetCard />
          </div>
          <div className="min-w-0 lg:col-span-2">
            <LayoutRuleCard />
          </div>
        </section>
      </div>
    </main>
  );
}
