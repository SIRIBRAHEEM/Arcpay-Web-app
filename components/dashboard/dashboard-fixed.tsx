"use client";

import Link from "next/link";
import {
  ArrowDownToLine,
  ArrowRight,
  History,
  Link2,
  Send,
  WalletCards,
  Waypoints,
  type LucideIcon
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

const workflowSteps = [
  {
    icon: WalletCards,
    title: "Check balance",
    description: "Start with funds and network state before taking action."
  },
  {
    icon: Send,
    title: "Pay",
    description: "Send USDC or EURC from the main action area."
  },
  {
    icon: Link2,
    title: "Request",
    description: "Create a QR invoice or shareable payment link."
  },
  {
    icon: Waypoints,
    title: "Bridge",
    description: "Move USDC between Arc and supported testnets."
  }
];

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-3 flex min-w-0 flex-col gap-1 sm:mb-4">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-primary/80">
        {eyebrow}
      </p>
      <h2 className="text-xl font-black tracking-tight text-teal-950 dark:text-lime-50 sm:text-2xl">
        {title}
      </h2>
      <p className="max-w-2xl text-sm leading-6 text-teal-950/65 dark:text-lime-50/70">
        {description}
      </p>
    </div>
  );
}

function WorkflowStep({
  icon: Icon,
  title,
  description,
  index
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <div className="flex min-w-0 gap-3 rounded-[1.1rem] border border-slate-950/10 bg-white/75 p-3.5 dark:border-white/10 dark:bg-white/[0.06]">
      <div className="grid size-10 shrink-0 place-items-center rounded-2xl bg-blue-100 text-blue-700 dark:bg-blue-400/10 dark:text-blue-200">
        <Icon className="size-4" />
      </div>

      <div className="min-w-0">
        <div className="flex min-w-0 items-center gap-2">
          <span className="text-xs font-black text-orange-600 dark:text-orange-300">
            0{index + 1}
          </span>
          <p className="truncate font-black text-teal-950 dark:text-lime-50">
            {title}
          </p>
        </div>
        <p className="mt-1 text-xs leading-5 text-teal-950/60 dark:text-lime-50/62">
          {description}
        </p>
      </div>
    </div>
  );
}

export function DashboardFixed() {
  return (
    <main className="premium-dashboard-bg min-h-screen overflow-x-hidden px-3 pb-20 pt-3 text-foreground sm:px-5 sm:pt-4 lg:px-8">
      <EventWatcher />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 sm:gap-6">
        <DashboardHeader />

        <section aria-labelledby="dashboard-overview" className="grid w-full min-w-0 gap-4">
          <div className="sr-only" id="dashboard-overview">
            ArcPay dashboard overview
          </div>
          <PremiumDashboardHero />
        </section>

        <section aria-labelledby="dashboard-priority" className="grid w-full min-w-0 gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)] lg:items-start">
          <div className="grid min-w-0 gap-4">
            <SectionHeader
              eyebrow="Overview"
              title="Know your money first"
              description="Balance and key wallet status sit at the top so users understand their funds before sending, requesting, or bridging."
            />
            <BalanceCard />
          </div>

          <div className="grid min-w-0 gap-4 lg:pt-[6.55rem]">
            <ProtocolStatusCard />

            <Card className="glass w-full min-w-0 overflow-hidden rounded-[1.25rem] sm:rounded-[1.5rem]">
              <CardContent className="grid gap-3 p-3.5 sm:p-5">
                <div className="flex min-w-0 items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-black text-teal-950 dark:text-lime-50">
                      Dashboard flow
                    </p>
                    <p className="mt-1 text-xs leading-5 text-teal-950/60 dark:text-lime-50/62">
                      Ordered by the way a real user thinks: check, pay, request, then bridge.
                    </p>
                  </div>
                  <Badge variant="secondary" className="shrink-0">
                    Clear path
                  </Badge>
                </div>

                <div className="grid gap-2.5">
                  {workflowSteps.map((step, index) => (
                    <WorkflowStep key={step.title} {...step} index={index} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section aria-labelledby="dashboard-actions" className="grid w-full min-w-0 gap-4">
          <SectionHeader
            eyebrow="Core actions"
            title="Pay and request stay side by side"
            description="The two most common payment tasks are grouped together so users can immediately choose whether they are sending money or collecting money."
          />

          <div className="grid w-full min-w-0 gap-4 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:items-start">
            <SendPanel />
            <ReceivePanel />
          </div>
        </section>

        <section aria-labelledby="dashboard-movement" className="grid w-full min-w-0 gap-4 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:items-start">
          <div className="grid min-w-0 gap-4">
            <SectionHeader
              eyebrow="Move funds"
              title="Bridge only when needed"
              description="Bridging is kept in its own section because it is more advanced than everyday pay/request actions."
            />
            <BridgePanel />
          </div>

          <div className="grid min-w-0 gap-4 xl:pt-[6.55rem]">
            <TxHistory />
          </div>
        </section>

        <section aria-labelledby="dashboard-help" className="grid w-full min-w-0 gap-4 md:grid-cols-3">
          <div className="sr-only" id="dashboard-help">
            Dashboard guidance
          </div>

          <Card className="glass rounded-[1.25rem] sm:rounded-[1.5rem]">
            <CardContent className="p-4 sm:p-5">
              <ArrowDownToLine className="size-5 text-primary" />
              <p className="mt-4 font-black text-teal-950 dark:text-lime-50">Fund first</p>
              <p className="mt-2 text-sm leading-6 text-teal-950/62 dark:text-lime-50/68">
                Top up with test USDC before trying payments or bridge flows.
              </p>
            </CardContent>
          </Card>

          <Card className="glass rounded-[1.25rem] sm:rounded-[1.5rem]">
            <CardContent className="p-4 sm:p-5">
              <History className="size-5 text-primary" />
              <p className="mt-4 font-black text-teal-950 dark:text-lime-50">Track clearly</p>
              <p className="mt-2 text-sm leading-6 text-teal-950/62 dark:text-lime-50/68">
                Activity appears after local actions and detected USDC transfers.
              </p>
            </CardContent>
          </Card>

          <Card className="glass rounded-[1.25rem] sm:rounded-[1.5rem]">
            <CardContent className="p-4 sm:p-5">
              <Waypoints className="size-5 text-primary" />
              <p className="mt-4 font-black text-teal-950 dark:text-lime-50">Bridge with context</p>
              <p className="mt-2 text-sm leading-6 text-teal-950/62 dark:text-lime-50/68">
                The bridge section explains source gas and destination before submit.
              </p>
            </CardContent>
          </Card>
        </section>

        <div className="flex flex-col items-start justify-between gap-3 rounded-[1.25rem] border border-slate-950/10 bg-white/70 p-4 dark:border-white/10 dark:bg-white/[0.05] sm:flex-row sm:items-center sm:p-5">
          <div className="min-w-0">
            <p className="font-black text-teal-950 dark:text-lime-50">Need test funds?</p>
            <p className="mt-1 text-sm text-teal-950/62 dark:text-lime-50/68">
              Use the faucet before testing payments, requests, and bridge routes.
            </p>
          </div>

          <Button asChild className="w-full shrink-0 rounded-2xl sm:w-auto">
            <Link href="https://faucet.circle.com" target="_blank" rel="noreferrer">
              Open faucet
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
