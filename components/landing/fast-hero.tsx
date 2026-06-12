import Link from "next/link";
import { ArrowRight, Link2, Send, ShieldCheck, WalletCards } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArcPayLogoMark } from "@/components/arcpay-logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const supportedAssets = ["USDC", "EURC", "Arc Testnet", "Circle App Kit"];

export function FastHero() {
  return (
    <section className="relative overflow-hidden px-4 pb-10 pt-4 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[linear-gradient(180deg,#f8f6ef_0%,#ffffff_58%,rgba(255,255,255,0)_100%)] dark:bg-[linear-gradient(180deg,#061833_0%,#07101f_58%,rgba(5,7,13,0)_100%)]" />

      <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="ArcPay home">
          <ArcPayLogoMark className="size-10 rounded-[0.95rem]" />
          <div>
            <p className="text-base font-black tracking-tight text-teal-950 dark:text-white">ArcPay</p>
            <p className="text-xs font-medium text-teal-950/60 dark:text-white/70">Stablecoin payments</p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" className="hidden rounded-full px-4 sm:inline-flex" asChild>
            <Link href="/login">Log in</Link>
          </Button>
          <Button className="rounded-full px-5" asChild>
            <Link href="/signup">Sign up</Link>
          </Button>
        </div>
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-8 pb-8 pt-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:pt-16">
        <div>
          <Badge className="mb-5 gap-2 rounded-full border-slate-950/10 bg-white/80 px-4 py-2 text-teal-950 shadow-sm dark:border-lime-200/20 dark:bg-white/[0.07] dark:text-lime-100">
            <ShieldCheck className="size-3.5" />
            Built for ARC stablecoin payments
          </Badge>

          <h1 className="max-w-4xl text-balance text-5xl font-black leading-[0.98] tracking-tight text-teal-950 dark:text-lime-50 sm:text-6xl lg:text-7xl">
            Premium stablecoin payments
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-teal-950/70 dark:text-lime-50/72 sm:text-xl">
            Pay, request, bridge, and manage USDC on Arc Testnet with a clean payment flow that feels fast on mobile and desktop.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="h-12 rounded-full px-7" asChild>
              <Link href="/signup">
                Create account
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" className="h-12 rounded-full px-7" asChild>
              <a href="#how-it-works">
                See how it works
                <ArrowRight className="ml-2 size-4" />
              </a>
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {supportedAssets.map((asset) => (
              <Badge key={asset} variant="secondary" className="rounded-full px-3 py-1.5 text-sm">
                {asset}
              </Badge>
            ))}
          </div>
        </div>

        <div className="rounded-[1.6rem] border border-slate-950/10 bg-white/95 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-white/[0.06] sm:p-5">
          <div className="rounded-[1.35rem] bg-teal-950 p-5 text-white dark:bg-[#071114]">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="grid size-11 place-items-center rounded-full bg-lime-200 text-teal-950">
                  <WalletCards className="size-5" />
                </div>
                <div>
                  <p className="text-sm text-white/60">ArcPay balance</p>
                  <p className="text-2xl font-black">$2,840.00</p>
                </div>
              </div>
              <Badge className="rounded-full border-lime-200/20 bg-lime-200/15 text-lime-100">ARC</Badge>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-4">
                <Send className="size-5 text-lime-200" />
                <p className="mt-3 font-black">Send</p>
                <p className="mt-1 text-sm text-white/60">Pay with USDC fast.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-4">
                <Link2 className="size-5 text-lime-200" />
                <p className="mt-3 font-black">Request</p>
                <p className="mt-1 text-sm text-white/60">Share QR invoices.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
