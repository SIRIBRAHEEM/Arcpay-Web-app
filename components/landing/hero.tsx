"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, LockKeyhole, Sparkles, Zap } from "lucide-react";
import { ConnectButton } from "@/components/connect-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const supportedAssets = ["USDC", "EURC", "Arc Testnet", "Unified Balance"];

export function Hero() {
  return (
    <section className="relative px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="ArcPay home">
          <div className="grid size-10 place-items-center rounded-2xl border border-white/10 bg-white/10 shadow-glow">
            <span className="text-lg font-black text-primary">A</span>
          </div>
          <div>
            <p className="text-base font-semibold tracking-tight">ArcPay</p>
            <p className="text-xs text-muted-foreground">Easy stablecoin payments</p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Button variant="ghost" className="hidden sm:inline-flex" asChild>
            <a href="https://faucet.circle.com" target="_blank" rel="noreferrer">
              Faucet
            </a>
          </Button>
          <ConnectButton redirectTo="/dashboard" />
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 pb-10 pt-20 lg:grid-cols-[1.08fr_0.92fr] lg:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Badge className="mb-6 gap-2 rounded-full border-primary/30 bg-primary/10 px-4 py-2 text-primary">
            <Sparkles className="size-3.5" />
            Built on ARC with Circle App Kit
          </Badge>

          <h1 className="max-w-4xl text-balance text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
            Pay anyone easily with stablecoins on{" "}
            <span className="bg-gradient-to-r from-primary to-cyan-300 bg-clip-text text-transparent">
              ARC
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            ArcPay brings an AnomaPay-like payments UX to Arc Testnet:
            connect a wallet, view your unified USDC balance, request funds,
            and send stablecoins in seconds.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ConnectButton redirectTo="/dashboard" size="lg" className="h-12 px-6" />
            <Button size="lg" variant="secondary" className="h-12 px-6" asChild>
              <a href="#how-it-works">
                See how it works
                <ArrowRight className="ml-2 size-4" />
              </a>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {supportedAssets.map((asset) => (
              <Badge
                key={asset}
                variant="secondary"
                className="rounded-full border-white/10 bg-white/[0.06] px-3 py-1.5 text-sm text-foreground"
              >
                {asset}
              </Badge>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="relative"
        >
          <div className="absolute -inset-16 -z-10 rounded-full bg-primary/10 blur-3xl" />
          <div className="glass relative overflow-hidden rounded-[2rem] p-5 shadow-card">
            <div className="rounded-[1.5rem] border border-white/10 bg-[#07111f]/90 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Unified Balance</p>
                  <p className="mt-2 text-4xl font-black tracking-tight">$2,840.00</p>
                </div>
                <Badge className="rounded-full bg-primary/15 text-primary">
                  Arc Testnet
                </Badge>
              </div>

              <div className="mt-6 grid gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Send</span>
                    <Zap className="size-4 text-primary" />
                  </div>
                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-bold">125.00</p>
                      <p className="text-sm text-muted-foreground">USDC</p>
                    </div>
                    <Button size="sm" className="rounded-full">
                      Pay now
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <LockKeyhole className="size-5 text-cyan-300" />
                    <p className="mt-3 text-sm font-medium">Non-custodial</p>
                    <p className="mt-1 text-xs text-muted-foreground">Wallet signed</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <BadgeCheck className="size-5 text-primary" />
                    <p className="mt-3 text-sm font-medium">USDC gas</p>
                    <p className="mt-1 text-xs text-muted-foreground">Stable fees</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
