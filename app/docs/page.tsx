import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink, Map, Rocket, ShieldCheck, Sparkles } from "lucide-react";
import { ArcPayLogoFull } from "@/components/arcpay-logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "ArcPay Docs",
  description:
    "Read the ArcPay product document, roadmap, features, supported chains, and vision for stablecoin payments on Arc Testnet."
};

const features = [
  "EVM wallet and passkey-ready access",
  "Send USDC on Arc Testnet",
  "Request money with payment links and QR code",
  "Bridge supported testnet stablecoins",
  "Exchange USDC, EURC, and cirBTC on Arc Testnet",
  "Local wallet activity history"
];

const chains = [
  "Arc Testnet",
  "Base Sepolia",
  "Optimism Sepolia",
  "Avalanche Fuji",
  "Arbitrum Sepolia",
  "Ethereum Sepolia",
  "Linea Sepolia",
  "Polygon Amoy",
  "Sonic Testnet",
  "Unichain Sepolia"
];

const roadmap = [
  {
    phase: "Phase 1",
    title: "Foundation",
    status: "Completed",
    points: ["Landing page", "Next.js setup", "Responsive layout", "ArcPay blue/orange brand", "Vercel deployment"]
  },
  {
    phase: "Phase 2",
    title: "Authentication and Wallet Access",
    status: "Completed",
    points: ["Signup and login pages", "EVM wallet connection", "Wallet discovery", "Passkey-ready flow", "ArcPay SVG branding"]
  },
  {
    phase: "Phase 3",
    title: "Core Payment Dashboard",
    status: "Completed",
    points: ["Dashboard layout", "Balance card", "Send payment", "Request money", "QR request flow", "Activity history"]
  },
  {
    phase: "Phase 4",
    title: "Bridge and Multi-Chain UI",
    status: "Completed / Active",
    points: ["Bridge panel", "Supported testnet chains", "Chain logos", "Route selection", "Bridge error handling"]
  },
  {
    phase: "Phase 5",
    title: "Token Exchange",
    status: "In Progress",
    points: ["USDC, EURC, and cirBTC support", "Circle App Kit exchange flow", "Wallet confirmation testing", "Vercel environment setup", "Better transaction feedback"]
  },
  {
    phase: "Phase 6",
    title: "Community Beta",
    status: "Next",
    points: ["Share with Arc community", "Collect tester feedback", "Improve mobile layout", "Fix real wallet edge cases", "Improve transaction status"]
  },
  {
    phase: "Phase 7",
    title: "Product Polish",
    status: "Next",
    points: ["Better loading states", "Confirmation modals", "Empty states", "Request page improvements", "New user onboarding"]
  },
  {
    phase: "Phase 8",
    title: "Growth and Mainnet Readiness",
    status: "Future",
    points: ["Security review", "Analytics", "Merchant payment pages", "Invoice links", "Mainnet-ready version"]
  }
];

export default function DocsPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f4f8ff] text-slate-950 dark:bg-[#06142d] dark:text-white">
      <section className="relative px-4 py-5 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(11,99,229,0.18),transparent_32%),radial-gradient(circle_at_88%_6%,rgba(255,130,0,0.16),transparent_30%)]" />

        <div className="relative mx-auto max-w-6xl">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <ArcPayLogoFull markClassName="size-10" textClassName="text-2xl sm:text-3xl" />
            </Link>

            <div className="flex items-center gap-2">
              <Button variant="secondary" className="rounded-full" asChild>
                <Link href="/">
                  <ArrowLeft className="mr-2 size-4" />
                  Home
                </Link>
              </Button>
              <Button className="hidden rounded-full sm:inline-flex" asChild>
                <Link href="/dashboard">
                  Open app
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-4xl text-center sm:mt-20">
            <Badge className="mb-5 rounded-full border-blue-500/15 bg-white/75 px-4 py-2 text-blue-950 shadow-sm dark:border-white/10 dark:bg-white/[0.08] dark:text-orange-100">
              <Sparkles className="mr-2 size-3.5" />
              ArcPay Product Document
            </Badge>

            <h1 className="text-balance text-4xl font-black tracking-tight sm:text-6xl">
              Building simple stablecoin payments on Arc Testnet
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-white/68">
              ArcPay is a non-custodial payment app built to make stablecoin sending, requests,
              bridging, and token exchange easier for the Arc community.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Button size="lg" className="rounded-full" asChild>
                <Link href="/dashboard">
                  Try ArcPay
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button size="lg" variant="secondary" className="rounded-full" asChild>
                <a href="https://arcpay-web-app.vercel.app" target="_blank" rel="noreferrer">
                  Live app
                  <ExternalLink className="ml-2 size-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-4 pb-16 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-4xl rounded-[2rem] border border-slate-950/10 bg-white/90 p-5 shadow-[0_30px_110px_rgba(6,26,63,0.12)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.07] sm:p-8 lg:p-10">
          <DocSection title="What is ArcPay?">
            <p>
              ArcPay is a non-custodial stablecoin payment app built for Arc Testnet. The goal is to
              make stablecoin payments feel simple, fast, and familiar for everyday users while still
              keeping the wallet-first nature of Web3.
            </p>
            <p>
              With ArcPay, users can connect their wallet, view their balance, send USDC, request
              money through a payment link or QR code, bridge assets across supported testnet chains,
              and exchange supported tokens on Arc Testnet.
            </p>
          </DocSection>

          <DocSection title="Why I am building ArcPay">
            <p>
              Stablecoin payments are powerful, but many Web3 payment tools still feel too technical.
              Users often need to understand networks, gas fees, bridges, approvals, and long wallet
              addresses before completing a simple payment.
            </p>
            <p>
              ArcPay is my attempt to reduce that stress. I want users to open the app and quickly
              understand what to do: connect wallet, send money, request money, bridge funds, exchange
              tokens, and track activity.
            </p>
          </DocSection>

          <DocSection title="Core features">
            <div className="grid gap-3 sm:grid-cols-2">
              {features.map((feature) => (
                <div key={feature} className="flex gap-3 rounded-2xl border border-blue-500/10 bg-blue-50/70 p-4 dark:border-white/10 dark:bg-white/[0.06]">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-orange-500" />
                  <span className="text-sm font-semibold leading-6">{feature}</span>
                </div>
              ))}
            </div>
          </DocSection>

          <DocSection title="Supported chains">
            <div className="flex flex-wrap gap-2">
              {chains.map((chain) => (
                <span key={chain} className="rounded-full border border-blue-500/15 bg-white px-3 py-1.5 text-sm font-bold text-blue-950 dark:border-white/10 dark:bg-white/[0.08] dark:text-white">
                  {chain}
                </span>
              ))}
            </div>
          </DocSection>

          <DocSection title="Supported assets">
            <div className="flex flex-wrap gap-2">
              {['USDC', 'EURC', 'cirBTC'].map((asset) => (
                <span key={asset} className="rounded-full bg-gradient-to-r from-blue-700 to-orange-500 px-4 py-2 text-sm font-black text-white shadow-[0_14px_40px_rgba(11,99,229,0.2)]">
                  {asset}
                </span>
              ))}
            </div>
          </DocSection>

          <DocSection title="Technology behind ArcPay">
            <p>
              ArcPay is built with Next.js, React, TypeScript, Tailwind CSS, Circle App Kit, Viem,
              Zustand, qrcode.react, Framer Motion, and Vercel. The stack was chosen to keep the app
              fast, modern, responsive, and easy to improve as the product grows.
            </p>
          </DocSection>

          <DocSection title="Roadmap">
            <div className="grid gap-4">
              {roadmap.map((item) => (
                <div key={item.phase} className="rounded-[1.5rem] border border-slate-950/10 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/[0.055]">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-500">{item.phase}</p>
                      <h3 className="mt-1 text-xl font-black">{item.title}</h3>
                    </div>
                    <Badge className="rounded-full bg-blue-100 text-blue-950 dark:bg-orange-400/15 dark:text-orange-100">
                      {item.status}
                    </Badge>
                  </div>
                  <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-600 dark:text-white/68 sm:grid-cols-2">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-2">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-orange-500" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </DocSection>

          <DocSection title="Final thoughts">
            <p>
              ArcPay is still growing, but the foundation is already strong. It has wallet login, a
              dashboard, stablecoin sending, request money with QR code, bridge support, token exchange,
              activity history, and a premium interface.
            </p>
            <p>
              My mission is to keep improving ArcPay until it becomes one of the simplest ways to test
              and understand stablecoin payments on Arc.
            </p>
          </DocSection>

          <div className="mt-10 rounded-[1.5rem] border border-orange-500/20 bg-orange-50 p-5 dark:border-orange-300/20 dark:bg-orange-400/10">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-orange-500" />
              <p className="text-sm leading-6 text-slate-700 dark:text-white/72">
                ArcPay is currently testnet software. It is not financial advice and should not be used
                with real funds unless the product is audited, production-ready, and configured for a
                supported mainnet environment.
              </p>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}

function DocSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 first:mt-0">
      <div className="mb-4 flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-2xl bg-blue-100 text-blue-700 dark:bg-blue-400/10 dark:text-blue-200">
          {title === "Roadmap" ? <Map className="size-5" /> : title === "Final thoughts" ? <Rocket className="size-5" /> : <Sparkles className="size-5" />}
        </span>
        <h2 className="text-2xl font-black tracking-tight">{title}</h2>
      </div>
      <div className="space-y-4 text-base leading-8 text-slate-600 dark:text-white/70">
        {children}
      </div>
    </section>
  );
}
