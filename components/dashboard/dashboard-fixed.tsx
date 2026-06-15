"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Link2, WalletCards } from "lucide-react";
import { BalanceCard } from "@/components/dashboard/balance-card";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { PremiumDashboardHero } from "@/components/dashboard/premium-dashboard-hero";
import { ProtocolStatusCard } from "@/components/dashboard/protocol-status-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useWalletStore } from "@/store/wallet-store";

function PanelLoader() {
  return (
    <Card className="glass min-h-[16rem] w-full min-w-0 overflow-hidden rounded-[1.25rem] sm:rounded-[1.5rem]">
      <CardContent className="grid h-full place-items-center p-5">
        <div className="grid gap-3 text-center">
          <div className="mx-auto size-10 animate-pulse rounded-2xl bg-primary/15" />
          <p className="text-sm font-semibold text-muted-foreground">Loading section...</p>
        </div>
      </CardContent>
    </Card>
  );
}

const EventWatcher = dynamic(
  () => import("@/components/dashboard/event-watcher").then((mod) => mod.EventWatcher),
  { ssr: false }
);

const SendPanel = dynamic(
  () => import("@/components/dashboard/send-panel").then((mod) => mod.SendPanel),
  { ssr: false, loading: PanelLoader }
);

const ReceivePanel = dynamic(
  () => import("@/components/dashboard/receive-panel").then((mod) => mod.ReceivePanel),
  { ssr: false, loading: PanelLoader }
);

const BridgePanel = dynamic(
  () => import("@/components/dashboard/bridge-panel").then((mod) => mod.BridgePanel),
  { ssr: false, loading: PanelLoader }
);

const TxHistory = dynamic(
  () => import("@/components/dashboard/tx-history").then((mod) => mod.TxHistory),
  { ssr: false, loading: PanelLoader }
);

function SectionTitle({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-w-0 items-end justify-between gap-3">
      <div className="min-w-0">
        <h2 className="text-lg font-black tracking-tight text-teal-950 dark:text-lime-50 sm:text-xl">
          {title}
        </h2>
        <p className="mt-1 max-w-3xl text-sm leading-6 text-teal-950/62 dark:text-lime-50/68">
          {description}
        </p>
      </div>
    </div>
  );
}

function RequestSlot() {
  const address = useWalletStore((state) => state.address);

  if (address) {
    return <ReceivePanel />;
  }

  return (
    <Card className="glass w-full min-w-0 self-start overflow-hidden rounded-[1.25rem] shadow-card sm:rounded-[1.5rem]">
      <CardContent className="grid gap-5 p-4 sm:p-5">
        <div>
          <div className="flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/15 bg-blue-50 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-blue-700 dark:border-blue-300/15 dark:bg-blue-400/10 dark:text-blue-200">
              <Link2 className="size-3.5" />
              Request Money
            </div>
            <Badge variant="secondary">QR ready</Badge>
          </div>

          <h3 className="mt-5 text-2xl font-black tracking-tight text-teal-950 dark:text-lime-50">
            Create a payment link or QR invoice
          </h3>
          <p className="mt-3 max-w-md text-sm leading-6 text-teal-950/64 dark:text-lime-50/70">
            Connect your wallet to generate a clean ArcPay invoice with amount, memo, merchant name, share link, and scannable QR code.
          </p>
        </div>

        <div className="rounded-[1.25rem] border border-slate-950/10 bg-white/70 p-4 dark:border-white/10 dark:bg-white/[0.06]">
          <div className="grid gap-2.5">
            {["QR invoice", "Shareable payment link", "USDC request on Arc"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm font-semibold text-teal-950 dark:text-lime-50">
                <CheckCircle2 className="size-4 shrink-0 text-primary" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
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
              The dashboard now follows a simple payment-app order.
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

export function DashboardFixed() {
  return (
    <main className="premium-dashboard-bg min-h-screen overflow-x-hidden px-3 pb-16 pt-3 text-foreground sm:px-5 sm:pb-20 sm:pt-4 lg:px-8">
      <EventWatcher />

      <div className="mx-auto grid w-full max-w-[1280px] gap-5 lg:gap-6">
        <DashboardHeader />

        <div className="dashboard-grid grid w-full min-w-0 grid-cols-1 items-start gap-4 md:grid-cols-2 lg:grid-cols-12 lg:gap-5">
          <section
            aria-label="Dashboard overview"
            className="grid min-w-0 md:col-span-2 lg:col-span-8"
          >
            <PremiumDashboardHero />
          </section>

          <section
            aria-label="Unified balance"
            className="grid min-w-0 md:col-span-2 lg:col-span-4"
          >
            <BalanceCard />
          </section>

          <section
            aria-label="Primary payment actions heading"
            className="min-w-0 md:col-span-2 lg:col-span-12 lg:pt-1"
          >
            <SectionTitle
              title="Payments"
              description="Send money or create a QR payment request from one clean row."
            />
          </section>

          <section
            aria-label="Pay"
            className="grid min-w-0 md:col-span-1 lg:col-span-6"
          >
            <SendPanel />
          </section>

          <section
            aria-label="Request money"
            className="grid min-w-0 md:col-span-1 lg:col-span-6"
          >
            <RequestSlot />
          </section>

          <section
            aria-label="Money movement and activity heading"
            className="min-w-0 md:col-span-2 lg:col-span-12 lg:pt-1"
          >
            <SectionTitle
              title="Movement & activity"
              description="Bridge funds and review transaction history without jumping around the page."
            />
          </section>

          <section
            aria-label="Bridge funds"
            className="grid min-w-0 md:col-span-1 lg:col-span-6"
          >
            <BridgePanel />
          </section>

          <section
            aria-label="Transaction activity"
            className="grid min-w-0 md:col-span-1 lg:col-span-6"
          >
            <TxHistory />
          </section>

          <section
            aria-label="Protocol status"
            className="grid min-w-0 md:col-span-1 lg:col-span-4"
          >
            <ProtocolStatusCard />
          </section>

          <section
            aria-label="Payment guide"
            className="grid min-w-0 md:col-span-1 lg:col-span-4"
          >
            <QuickGuideCard />
          </section>

          <section
            aria-label="Test funds"
            className="grid min-w-0 md:col-span-2 lg:col-span-4"
          >
            <FaucetCard />
          </section>
        </div>
      </div>
    </main>
  );
}
