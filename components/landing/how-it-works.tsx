"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  HandCoins,
  Landmark,
  Link2,
  Send,
  ShieldCheck,
  WalletCards
} from "lucide-react";

const steps = [
  {
    icon: WalletCards,
    title: "Connect",
    description:
      "Use your existing browser wallet and switch to Arc Testnet when ArcPay asks."
  },
  {
    icon: HandCoins,
    title: "Fund",
    description:
      "Deposit or bridge test USDC into a balance that is ready for payments."
  },
  {
    icon: Send,
    title: "Pay",
    description:
      "Send USDC, create requests, and keep the payment activity easy to understand."
  }
];

const useCases = [
  {
    icon: HandCoins,
    title: "Use stablecoins like cash",
    description:
      "Send money to friends or split bills with a payment flow that feels direct."
  },
  {
    icon: Landmark,
    title: "Send remittances",
    description:
      "Move funds across borders quickly while staying in assets people recognize."
  },
  {
    icon: BriefcaseBusiness,
    title: "Process payroll",
    description:
      "Pay contractors, employees, or suppliers without exposing the entire wallet flow."
  },
  {
    icon: ShieldCheck,
    title: "Make business payments",
    description:
      "Keep counterparties, balances, and payment context cleaner than a raw explorer trail."
  }
];

const benefits = [
  "Pay with preferred assets",
  "Fees made simpler",
  "No new wallet required",
  "Share requests as links",
  "Global stablecoin reach"
];

export function HowItWorks() {
  return (
    <>
      <section id="how-it-works" className="bg-white px-4 py-16 dark:bg-[#080d10] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-teal-800 dark:text-lime-200">
                How it works
              </p>
              <h2 className="mt-3 max-w-xl text-4xl font-black tracking-tight text-teal-950 dark:text-lime-50 sm:text-5xl">
                A payment app, not a blockchain worksheet.
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-8 text-teal-950/70 dark:text-lime-50/68">
                ArcPay keeps the core actions close together: connect, fund,
                pay, request, and review. The chain work is still there, but it
                does not dominate the screen.
              </p>
            </div>

            <div className="grid gap-4">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.45 }}
                  className="grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-[1.25rem] border border-slate-950/10 bg-[#eff5f2] p-4 dark:border-white/10 dark:bg-white/[0.06]"
                >
                  <div className="grid size-11 place-items-center rounded-full bg-teal-950 text-lime-100 dark:bg-lime-200 dark:text-teal-950">
                    <step.icon className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.18em] text-teal-950/45 dark:text-lime-50/45">
                      0{index + 1}
                    </p>
                    <h3 className="mt-1 text-lg font-black text-teal-950 dark:text-lime-50">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-teal-950/65 dark:text-lime-50/65">
                      {step.description}
                    </p>
                  </div>
                  <ArrowRight className="hidden size-5 text-teal-950/35 dark:text-lime-50/35 sm:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="use-cases" className="bg-[#eff5f2] px-4 py-16 dark:bg-[#0a1112] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-teal-800 dark:text-lime-200">
                The missing link for
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-tight text-teal-950 dark:text-lime-50 sm:text-5xl">
                Useful crypto payments.
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {useCases.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.45 }}
                  className="min-h-48 rounded-[1.5rem] border border-slate-950/10 bg-white p-5 dark:border-white/10 dark:bg-white/[0.06] sm:p-6"
                >
                  <div className="grid size-12 place-items-center rounded-[1rem] bg-lime-200 text-teal-950">
                    <item.icon className="size-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-black text-teal-950 dark:text-lime-50">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-teal-950/65 dark:text-lime-50/65">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-teal-950 px-4 py-16 text-white dark:bg-[#05090c] sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-lime-200">
              The best way to pay
            </p>
            <h2 className="mt-3 max-w-xl text-4xl font-black tracking-tight sm:text-5xl">
              Money movement that feels closer to chat than infrastructure.
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.07] px-4 py-3"
              >
                <Link2 className="size-4 text-lime-200" />
                <span className="text-sm font-semibold text-white/80">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
