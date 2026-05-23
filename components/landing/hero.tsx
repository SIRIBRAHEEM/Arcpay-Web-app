"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  Copy,
  Link2,
  LockKeyhole,
  Send,
  ShieldCheck,
  WalletCards,
  Zap
} from "lucide-react";
import { ConnectButton } from "@/components/connect-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const supportedAssets = ["USDC", "EURC", "ARC", "Circle App Kit"];
const demoAssets = ["USDC", "EURC", "WETH", "USDT"];

export function Hero() {
  const [mode, setMode] = useState<"pay" | "request">("pay");
  const [asset, setAsset] = useState("USDC");

  return (
    <section className="relative min-h-screen overflow-hidden px-4 pb-14 pt-4 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[42rem] bg-[linear-gradient(180deg,#d8f7dc_0%,#f8f2df_44%,rgba(248,242,223,0)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[linear-gradient(90deg,rgba(14,92,67,0.08)_1px,transparent_1px),linear-gradient(180deg,rgba(14,92,67,0.08)_1px,transparent_1px)] bg-[size:72px_72px] opacity-45" />

      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link
          href="/"
          className="relative z-10 flex items-center gap-3"
          aria-label="ArcPay home"
        >
          <div className="grid size-10 place-items-center rounded-full border border-emerald-900/10 bg-emerald-950 text-white shadow-[0_16px_40px_rgba(13,69,52,0.18)]">
            <span className="text-lg font-black">A</span>
          </div>
          <div>
            <p className="text-base font-black tracking-tight text-emerald-950">
              ArcPay
            </p>
            <p className="text-xs text-emerald-950/60">Private-feeling payments</p>
          </div>
        </Link>

        <div className="relative z-10 hidden items-center gap-7 rounded-full border border-emerald-950/10 bg-white/55 px-5 py-3 text-sm font-semibold text-emerald-950/70 shadow-[0_20px_50px_rgba(55,83,57,0.12)] backdrop-blur-xl lg:flex">
          <a href="#what-is-arcpay" className="hover:text-emerald-950">
            Product
          </a>
          <a href="#how-it-works" className="hover:text-emerald-950">
            How it works
          </a>
          <a href="#use-cases" className="hover:text-emerald-950">
            Use cases
          </a>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <Button
            variant="ghost"
            className="hidden text-emerald-950 hover:bg-emerald-950/5 sm:inline-flex"
            asChild
          >
            <a href="https://faucet.circle.com" target="_blank" rel="noreferrer">
              Faucet
            </a>
          </Button>
          <ConnectButton
            redirectTo="/dashboard"
            className="rounded-full bg-emerald-950 px-5 text-white hover:bg-emerald-900"
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 pb-10 pt-16 lg:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-5xl text-center"
        >
          <Badge className="mb-6 gap-2 rounded-full border-emerald-950/10 bg-white/60 px-4 py-2 text-emerald-950 shadow-sm">
            <ShieldCheck className="size-3.5" />
            Built for ARC stablecoin payments
          </Badge>

          <h1 className="text-balance text-5xl font-black leading-[0.96] tracking-tight text-emerald-950 sm:text-7xl lg:text-8xl">
            Private stablecoin payments
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-emerald-950/70 sm:text-xl">
            Pay, request, bridge, and manage USDC on Arc Testnet with the simple
            payment flow people expect from everyday money apps.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ConnectButton
              redirectTo="/dashboard"
              size="lg"
              className="h-12 rounded-full bg-emerald-950 px-7 text-white hover:bg-emerald-900"
              label="Try it now"
            />
            <Button
              size="lg"
              variant="secondary"
              className="h-12 rounded-full border-emerald-950/10 bg-white/70 px-7 text-emerald-950 hover:bg-white"
              asChild
            >
              <a href="#how-it-works">
                See how it works
                <ArrowRight className="ml-2 size-4" />
              </a>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {supportedAssets.map((asset) => (
              <Badge
                key={asset}
                variant="secondary"
                className="rounded-full border-emerald-950/10 bg-white/55 px-3 py-1.5 text-sm text-emerald-950/75"
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
          className="mx-auto w-full max-w-6xl"
        >
          <div className="grid overflow-hidden rounded-[2rem] border border-emerald-950/10 bg-[#fdfaf0] shadow-[0_34px_120px_rgba(28,72,51,0.18)] lg:grid-cols-[0.72fr_1fr]">
            <div className="border-b border-emerald-950/10 bg-emerald-950 p-5 text-white lg:border-b-0 lg:border-r lg:border-emerald-50/10 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-full bg-lime-200 text-emerald-950">
                    <WalletCards className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm text-white/55">ArcPay balance</p>
                    <p className="text-lg font-black">$2,840.00</p>
                  </div>
                </div>
                <Badge className="rounded-full border-lime-200/20 bg-lime-200/15 text-lime-100">
                  ARC
                </Badge>
              </div>

              <div className="mt-7 grid gap-3">
                <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/45">
                    Recent
                  </p>
                  <div className="mt-4 grid gap-3">
                    {[
                      ["Payroll", "-420.00", "USDC"],
                      ["Gateway deposit", "+750.00", "USDC"],
                      ["Coffee split", "-18.25", "EURC"]
                    ].map(([label, amount, token]) => (
                      <div
                        key={label}
                        className="flex items-center justify-between rounded-2xl bg-white/[0.06] px-3 py-2.5"
                      >
                        <div>
                          <p className="text-sm font-semibold">{label}</p>
                          <p className="text-xs text-white/45">{token} on Arc Testnet</p>
                        </div>
                        <p className="text-sm font-bold">{amount}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-4">
                    <LockKeyhole className="size-5 text-lime-200" />
                    <p className="mt-3 text-sm font-semibold">Wallet signed</p>
                    <p className="mt-1 text-xs text-white/45">You keep custody</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-4">
                    <BadgeCheck className="size-5 text-lime-200" />
                    <p className="mt-3 text-sm font-semibold">Share links</p>
                    <p className="mt-1 text-xs text-white/45">Requests in seconds</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-emerald-950/55">
                    Try it now
                  </p>
                  <h2 className="mt-1 text-2xl font-black tracking-tight text-emerald-950">
                    {mode === "pay" ? "Pay" : "Request"}
                  </h2>
                </div>

                <div className="grid grid-cols-2 rounded-full border border-emerald-950/10 bg-emerald-950/5 p-1">
                  {(["pay", "request"] as const).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setMode(item)}
                      className={`rounded-full px-4 py-2 text-sm font-bold capitalize transition ${
                        mode === item
                          ? "bg-emerald-950 text-white shadow-sm"
                          : "text-emerald-950/60 hover:text-emerald-950"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-4">
                <div className="rounded-3xl border border-emerald-950/10 bg-white p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-emerald-950/50">
                        {mode === "pay" ? "Send" : "Amount"}
                      </p>
                      <Input
                        aria-label="Demo amount"
                        inputMode="decimal"
                        defaultValue="125.00"
                        className="mt-1 h-auto border-0 bg-transparent p-0 text-5xl font-black tracking-tight text-emerald-950 shadow-none ring-0 focus-visible:ring-0"
                      />
                    </div>

                    <div className="relative">
                      <button
                        type="button"
                        className="flex items-center gap-2 rounded-full border border-emerald-950/10 bg-[#f7f1df] px-4 py-3 text-sm font-black text-emerald-950"
                        onClick={() =>
                          setAsset((current) => {
                            const currentIndex = demoAssets.indexOf(current);
                            return demoAssets[(currentIndex + 1) % demoAssets.length];
                          })
                        }
                      >
                        {asset}
                        <ChevronDown className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-emerald-950/10 bg-white p-4">
                  <p className="text-sm font-semibold text-emerald-950/50">
                    {mode === "pay" ? "Destination" : "Share with"}
                  </p>
                  <div className="mt-3 flex items-center gap-3 rounded-2xl bg-[#f7f1df] px-4 py-3 text-emerald-950">
                    {mode === "pay" ? (
                      <Send className="size-4 text-emerald-700" />
                    ) : (
                      <Link2 className="size-4 text-emerald-700" />
                    )}
                    <span className="truncate text-sm font-semibold text-emerald-950/70">
                      {mode === "pay" ? "0x7cA...ArcPay" : "payment.link/arcpay/125"}
                    </span>
                    <Copy className="ml-auto size-4 text-emerald-950/40" />
                  </div>
                </div>

                <Button className="h-12 rounded-full bg-emerald-950 text-base text-white hover:bg-emerald-900">
                  {mode === "pay" ? (
                    <>
                      <Zap className="mr-2 size-4" />
                      Send payment
                    </>
                  ) : (
                    <>
                      <Link2 className="mr-2 size-4" />
                      Create request
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
