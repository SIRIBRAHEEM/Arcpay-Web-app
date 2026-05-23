"use client";

import { motion } from "framer-motion";
import { Banknote, Globe2, Link2, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Banknote,
    title: "Stablecoin-first",
    description:
      "Pay with familiar assets like USDC and EURC instead of asking people to learn a new token first."
  },
  {
    icon: Globe2,
    title: "Works across chains",
    description:
      "Bridge funds into Arc Testnet and keep the payment experience focused on who you are paying, not network plumbing."
  },
  {
    icon: Link2,
    title: "Payment links",
    description:
      "Create simple requests that can be shared through chat, email, or your everyday contact flow."
  },
  {
    icon: ShieldCheck,
    title: "Wallet signed",
    description:
      "ArcPay never takes custody of funds. Payments are approved by the connected wallet."
  }
];

export function FeatureGrid() {
  return (
    <section id="what-is-arcpay" className="bg-[#f8f2df] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.76fr_1.24fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-800">
              What is ArcPay?
            </p>
            <h2 className="mt-3 max-w-xl text-4xl font-black tracking-tight text-emerald-950 sm:text-5xl">
              Your home for simple onchain payments.
            </h2>
          </div>

          <p className="max-w-2xl text-lg leading-8 text-emerald-950/70 lg:justify-self-end">
            ArcPay turns the Arc Testnet and Circle App Kit into an everyday
            payment app: connect a wallet, check your balance, send funds,
            request money, and keep a local activity trail.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-[2rem] border border-emerald-950/10 bg-emerald-950/10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="bg-[#fffaf0] p-6 sm:p-7"
            >
              <div className="grid size-12 place-items-center rounded-full bg-emerald-950 text-lime-100">
                <feature.icon className="size-5" />
              </div>
              <h3 className="mt-8 text-xl font-black text-emerald-950">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-emerald-950/65">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
