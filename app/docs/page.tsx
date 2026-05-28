import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Code2,
  ExternalLink,
  Globe2,
  Layers3,
  Map,
  Rocket,
  ShieldCheck,
  Sparkles,
  WalletCards
} from "lucide-react";
import { ArcPayLogoFull } from "@/components/arcpay-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "ArcPay Docs",
  description:
    "A clean product document for ArcPay: vision, features, user flows, supported chains, roadmap, and the journey of building stablecoin payments on Arc Testnet."
};

const quickActions = [
  "Connect wallet",
  "Send money",
  "Request money",
  "Bridge funds",
  "Exchange tokens",
  "Track activity"
];

const problems = [
  "Users do not always know which chain they are on.",
  "Wallet connection can feel scary for new users.",
  "Payment requests are not always clean or shareable.",
  "Bridge flows can be hard to understand.",
  "Users may not know if they have enough gas.",
  "Most crypto interfaces feel too technical."
];

const coreFeatures = [
  {
    title: "Wallet Login",
    body:
      "ArcPay allows users to connect an EVM wallet and continue into the dashboard. The signup and login experience is designed to feel clean, simple, and beginner-friendly. There is also a passkey-ready flow to make access feel more familiar for users who are not deeply technical."
  },
  {
    title: "Dashboard",
    body:
      "The dashboard is the main control center. From one screen, users can access balance, send payment, request money, bridge assets, exchange tokens, and view activity. The goal is to keep everything organized in one place."
  },
  {
    title: "Send Payment",
    body:
      "ArcPay allows users to send USDC to another wallet address on Arc Testnet. This feature is built to make stablecoin sending simple, direct, and easy to understand."
  },
  {
    title: "Request Money With QR Code",
    body:
      "Users can create a payment request with an optional amount and memo. ArcPay then generates a shareable request link and QR code, making the app feel closer to a real payment product."
  },
  {
    title: "Bridge",
    body:
      "ArcPay includes bridge support for supported testnet chains. This helps users move assets into the right place before making payments."
  },
  {
    title: "Token Exchange",
    body:
      "ArcPay includes a Token Exchange section for Arc Testnet. The goal is to support same-chain exchange between USDC, EURC, and cirBTC. This feature is still being tested and improved with Circle App Kit and connected wallets."
  },
  {
    title: "Activity History",
    body:
      "ArcPay keeps recent activity locally for the connected wallet so users can see what they have done recently without searching manually."
  }
];

const supportedChains = [
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

const supportedAssets = ["USDC", "EURC", "cirBTC"];

const techStack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Circle App Kit",
  "Viem",
  "Zustand",
  "qrcode.react",
  "Framer Motion",
  "Vercel"
];

const designDirection = [
  "Deep navy background",
  "Polished blue",
  "Warm orange accents",
  "Glassmorphism cards",
  "Clean dashboard spacing",
  "Smooth UI animations",
  "Strong dark-mode support",
  "Mobile-first layout"
];

const roadmap = [
  {
    phase: "Phase 1",
    title: "Foundation",
    status: "Completed",
    points: [
      "Built the landing page",
      "Set up the Next.js project",
      "Added responsive layout",
      "Created the ArcPay brand system",
      "Deployed the app on Vercel"
    ]
  },
  {
    phase: "Phase 2",
    title: "Authentication and Wallet Access",
    status: "Completed",
    points: [
      "Added signup and login pages",
      "Added EVM wallet connection",
      "Added wallet discovery",
      "Added passkey-ready access flow",
      "Improved auth page branding with ArcPay logo"
    ]
  },
  {
    phase: "Phase 3",
    title: "Core Payment Dashboard",
    status: "Completed",
    points: [
      "Added dashboard layout",
      "Added balance card",
      "Added send payment panel",
      "Added request money panel",
      "Added QR code request flow",
      "Added activity history",
      "Improved dark-mode UI"
    ]
  },
  {
    phase: "Phase 4",
    title: "Bridge and Multi-Chain UI",
    status: "Completed / Active",
    points: [
      "Added bridge panel",
      "Added supported testnet chains",
      "Added chain logos",
      "Added source and destination chain selection",
      "Improved bridge UI and error handling"
    ]
  },
  {
    phase: "Phase 5",
    title: "Token Exchange",
    status: "In Progress",
    points: [
      "Added Token Exchange section",
      "Added support for USDC, EURC, and cirBTC",
      "Connected exchange flow to Circle App Kit",
      "Testing wallet confirmation and environment setup",
      "Improving error messages and transaction feedback"
    ]
  },
  {
    phase: "Phase 6",
    title: "Community Beta",
    status: "Next",
    points: [
      "Share ArcPay with the Arc community",
      "Collect feedback from testers",
      "Improve mobile layouts",
      "Fix issues from real wallet testing",
      "Improve transaction status updates"
    ]
  },
  {
    phase: "Phase 7",
    title: "Product Polish",
    status: "Next",
    points: [
      "Add better loading states",
      "Add clearer transaction confirmation modals",
      "Improve empty states",
      "Improve the request payment page",
      "Add onboarding help for new users"
    ]
  },
  {
    phase: "Phase 8",
    title: "Future Growth",
    status: "Future",
    points: [
      "Prepare for stronger security review",
      "Improve backend or session handling if needed",
      "Add analytics for product usage",
      "Explore merchant payment pages",
      "Explore invoice and payment link management",
      "Prepare a mainnet-ready version when the ecosystem is ready"
    ]
  }
];

export default function DocsPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f4f8ff] text-slate-950 dark:bg-[#06142d] dark:text-white">
      <section className="relative px-4 py-5 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(11,99,229,0.18),transparent_32%),radial-gradient(circle_at_88%_6%,rgba(255,130,0,0.16),transparent_30%)]" />

        <div className="relative mx-auto max-w-6xl">
          <div className="flex items-center justify-between gap-4 rounded-[1.4rem] border border-white/70 bg-white/70 px-3 py-3 shadow-[0_18px_60px_rgba(6,26,63,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.06] sm:px-4">
            <Link href="/" className="inline-flex min-w-0 items-center gap-3" aria-label="ArcPay home">
              <ArcPayLogoFull markClassName="size-9 sm:size-10" textClassName="hidden text-2xl sm:inline sm:text-3xl" />
            </Link>

            <div className="flex items-center gap-2">
              <ThemeToggle className="bg-white/80 shadow-sm dark:bg-white/[0.08]" />
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
            <Badge className="mb-5 rounded-full border-blue-500/15 bg-white/80 px-4 py-2 text-blue-950 shadow-sm dark:border-white/10 dark:bg-white/[0.08] dark:text-orange-100">
              <BookOpen className="mr-2 size-3.5" />
              ArcPay Product Document
            </Badge>

            <h1 className="text-balance text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-6xl">
              ArcPay: Building a simple stablecoin payment app on Arc Testnet
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg font-medium leading-8 text-slate-700 dark:text-white/76">
              Stablecoin payments should feel simple. That is the main reason ArcPay is being built.
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
        <article className="mx-auto max-w-5xl rounded-[2rem] border border-slate-950/10 bg-white/92 p-4 shadow-[0_30px_110px_rgba(6,26,63,0.12)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#071a3a]/82 sm:p-6 lg:p-7">
          <DocSection icon={<Sparkles className="size-5" />} title="Introduction">
            <p>
              ArcPay is a non-custodial stablecoin payment app built for Arc Testnet. The goal is to
              make it easier for users to send, request, bridge, and exchange testnet stablecoins
              through one clean dashboard without dealing with too much blockchain complexity.
            </p>
            <p>
              ArcPay is being built because stablecoin payments can become one of the most useful
              products in Web3, especially when the user experience feels simple, fast, and familiar.
            </p>
          </DocSection>

          <DocSection icon={<WalletCards className="size-5" />} title="What is ArcPay?">
            <p>
              ArcPay is a payment app designed to make stablecoin transactions easier on Arc. Users can
              connect their wallet, view their balance, send USDC, request money through a payment link
              or QR code, bridge assets across supported testnet chains, and exchange supported tokens
              on Arc Testnet.
            </p>
            <p>
              The app is built with a wallet-first approach, which means users remain in control of
              their funds. ArcPay does not hold user funds. It provides the interface and experience
              that makes the payment flow easier.
            </p>
          </DocSection>

          <DocSection icon={<Rocket className="size-5" />} title="Why ArcPay is being built">
            <p>
              Many Web3 payment tools still feel too complicated for normal users. A user often has to
              understand networks, wallet connections, gas fees, token balances, bridge routes,
              transaction approvals, and long wallet addresses before completing a simple payment.
            </p>
            <p>ArcPay is an attempt to reduce that stress. The ideal user flow should be simple:</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {quickActions.map((action) => (
                <InfoPill key={action}>{action}</InfoPill>
              ))}
            </div>
          </DocSection>

          <DocSection icon={<ShieldCheck className="size-5" />} title="The problem ArcPay is solving">
            <p>
              Stablecoin payments are powerful, but the current experience can be confusing. ArcPay is
              designed to make these actions feel more like a modern fintech app.
            </p>
            <div className="grid gap-3">
              {problems.map((problem) => (
                <CheckCard key={problem}>{problem}</CheckCard>
              ))}
            </div>
          </DocSection>

          <DocSection icon={<Layers3 className="size-5" />} title="Core features of ArcPay">
            <div className="grid gap-4">
              {coreFeatures.map((feature, index) => (
                <div key={feature.title} className="rounded-[1.5rem] border border-blue-500/10 bg-blue-50/80 p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.065]">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-500">
                    Feature {index + 1}
                  </p>
                  <h3 className="mt-2 text-xl font-black text-slate-950 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-[0.98rem] font-medium leading-8 text-slate-700 dark:text-white/76">
                    {feature.body}
                  </p>
                </div>
              ))}
            </div>
          </DocSection>

          <DocSection icon={<Globe2 className="size-5" />} title="Supported chains">
            <p>ArcPay currently includes UI support for these chains:</p>
            <TagGrid items={supportedChains} />
          </DocSection>

          <DocSection icon={<Sparkles className="size-5" />} title="Supported assets">
            <p>ArcPay focuses on testnet stablecoin and payment assets. USDC is the primary payment asset in the app.</p>
            <div className="flex flex-wrap gap-2">
              {supportedAssets.map((asset) => (
                <span key={asset} className="rounded-full bg-gradient-to-r from-blue-700 to-orange-500 px-4 py-2 text-sm font-black text-white shadow-[0_14px_40px_rgba(11,99,229,0.2)]">
                  {asset}
                </span>
              ))}
            </div>
          </DocSection>

          <DocSection icon={<Code2 className="size-5" />} title="Technology behind ArcPay">
            <p>
              ArcPay is built with modern Web3 and frontend tools. This stack was chosen because the
              app needs to feel fast, modern, responsive, and easy to maintain.
            </p>
            <TagGrid items={techStack} />
          </DocSection>

          <DocSection icon={<Sparkles className="size-5" />} title="Design direction">
            <p>
              ArcPay is designed to look premium, not like a random testnet demo. The visual direction
              is clean, modern, and fintech-inspired.
            </p>
            <TagGrid items={designDirection} />
          </DocSection>

          <DocSection icon={<Map className="size-5" />} title="Current roadmap">
            <div className="grid gap-4">
              {roadmap.map((item) => (
                <div key={item.phase} className="rounded-[1.5rem] border border-slate-950/10 bg-slate-50 p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.055]">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-500">
                        {item.phase}
                      </p>
                      <h3 className="mt-1 text-xl font-black text-slate-950 dark:text-white">
                        {item.title}
                      </h3>
                    </div>
                    <Badge className="rounded-full bg-blue-100 text-blue-950 dark:bg-orange-400/15 dark:text-orange-100">
                      {item.status}
                    </Badge>
                  </div>
                  <ul className="mt-4 grid gap-2 text-sm font-medium leading-6 text-slate-700 dark:text-white/76 sm:grid-cols-2">
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

          <DocSection icon={<Rocket className="size-5" />} title="What ArcPay means to me">
            <p>
              ArcPay is more than just a testnet app. It is part of a developer journey inside the Arc
              ecosystem: learning, improving, breaking things, fixing things, and slowly turning an idea
              into a real product.
            </p>
            <p>
              Every feature teaches more about product design, Web3 infrastructure, stablecoin payments,
              wallet flows, and the kind of user experience people actually need.
            </p>
            <p>The goal is not only to build an app. The goal is to build something useful.</p>
          </DocSection>

          <DocSection icon={<Sparkles className="size-5" />} title="Final thoughts">
            <p>
              ArcPay is still growing, but the foundation is already strong. It has wallet login, a
              dashboard, stablecoin sending, request money with QR code, bridge support, token exchange,
              activity history, and a premium interface.
            </p>
            <p>
              The mission is to keep improving ArcPay until it becomes one of the simplest ways to test
              and understand stablecoin payments on Arc.
            </p>
            <p>
              You can try ArcPay here:{" "}
              <a href="https://arcpay-web-app.vercel.app" target="_blank" rel="noreferrer" className="font-black text-blue-700 underline underline-offset-4 dark:text-orange-200">
                https://arcpay-web-app.vercel.app
              </a>
            </p>
          </DocSection>

          <div className="mt-6 rounded-[1.5rem] border border-orange-500/20 bg-orange-50 p-5 dark:border-orange-300/20 dark:bg-orange-400/10">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-orange-500" />
              <p className="text-sm font-medium leading-7 text-slate-700 dark:text-white/76">
                ArcPay is currently testnet software. It is not financial advice and should not be used
                with real funds unless the product is audited, production-ready, and configured for a
                supported mainnet environment.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center text-sm font-black text-slate-500 dark:text-white/50">
            Built by SIRIBRAHEEM.
          </div>
        </article>
      </section>
    </main>
  );
}

function DocSection({
  icon,
  title,
  children
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-5 first:mt-0 rounded-[1.75rem] border border-slate-950/[0.07] bg-white/86 p-5 shadow-[0_18px_55px_rgba(6,26,63,0.06)] dark:border-white/10 dark:bg-[#081f46]/72 sm:p-6">
      <div className="mb-5 flex items-start gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-blue-100 text-blue-700 ring-1 ring-blue-600/10 dark:bg-blue-400/10 dark:text-blue-200 dark:ring-white/10">
          {icon}
        </span>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-500">
            ArcPay docs
          </p>
          <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950 dark:text-white sm:text-3xl">
            {title}
          </h2>
        </div>
      </div>
      <div className="space-y-4 text-[1rem] font-medium leading-8 text-slate-700 dark:text-white/78 sm:text-[1.03rem]">
        {children}
      </div>
    </section>
  );
}

function InfoPill({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-blue-500/10 bg-white p-4 text-sm font-black text-blue-950 shadow-sm dark:border-white/10 dark:bg-white/[0.07] dark:text-white">
      {children}
    </div>
  );
}

function CheckCard({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-blue-500/10 bg-blue-50/80 p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.07]">
      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-orange-500" />
      <span className="text-sm font-semibold leading-6 text-slate-700 dark:text-white/78">{children}</span>
    </div>
  );
}

function TagGrid({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={item} className="rounded-full border border-blue-500/15 bg-white px-3 py-1.5 text-sm font-bold text-blue-950 shadow-sm dark:border-white/10 dark:bg-white/[0.08] dark:text-white">
          {item}
        </span>
      ))}
    </div>
  );
}
