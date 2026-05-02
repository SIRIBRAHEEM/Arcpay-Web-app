"use client";

import { motion } from "framer-motion";
import { Banknote, Boxes, Globe2, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Banknote,
    title: "Stablecoin-first",
    description: "USDC is the primary payment asset, with EURC support through same-chain swap flows on Arc Testnet."
  },
  {
    icon: Boxes,
    title: "Unified Balance",
    description: "Deposit USDC from supported chains and spend from one Arc-ready balance without building bridge plumbing yourself."
  },
  {
    icon: ShieldCheck,
    title: "Non-custodial",
    description: "ArcPay never holds funds. Every operation is signed by the user’s connected wallet."
  },
  {
    icon: Globe2,
    title: "Payments UX",
    description: "Short addresses, QR requests, copy buttons, confirmations, and local transaction history."
  }
];

export function FeatureGrid() {
  return (
    <section id="what-is-arcpay" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            What is ArcPay?
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            A minimalist payment app for stablecoins on ARC.
          </h2>
          <p className="mt-4 text-muted-foreground">
            It is a complete client-side reference app for peer-to-peer
            stablecoin payments using Circle App Kit and Arc Testnet.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
            >
              <Card className="glass h-full rounded-3xl">
                <CardContent className="p-6">
                  <div className="grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <feature.icon className="size-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
