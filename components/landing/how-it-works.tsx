"use client";

import { motion } from "framer-motion";
import { ArrowDownToLine, Send, WalletCards } from "lucide-react";

const steps = [
  {
    icon: ArrowDownToLine,
    title: "Deposit",
    description:
      "Move test USDC from Base Sepolia or Arc Testnet into a Circle Gateway-backed Unified Balance."
  },
  {
    icon: WalletCards,
    title: "Unified balance",
    description:
      "ArcPay reads your combined confirmed and pending USDC balance through App Kit."
  },
  {
    icon: Send,
    title: "Instant send",
    description:
      "Spend USDC from the Unified Balance to any Arc Testnet address, or swap to EURC before sending."
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-card sm:p-10">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              How it works
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Deposit → unified balance → instant send.
            </h2>
            <p className="mt-4 text-muted-foreground">
              ArcPay uses ARC as the payment surface and Circle App Kit for the
              heavy lifting: deposit, unified balance reads, same-chain send,
              and USDC/EURC swap support.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="relative rounded-3xl border border-white/10 bg-background/60 p-5"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <step.icon className="size-5" />
                  </div>
                  <span className="text-sm font-black text-white/20">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
