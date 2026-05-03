"use client";

import { Wallet, CheckCircle2, Send } from "lucide-react";
import { cn } from "@/lib/utils";

type PaymentFlowAnimationProps = {
  className?: string;
};

export function PaymentFlowAnimation({ className }: PaymentFlowAnimationProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-5",
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(32,213,159,0.18),transparent_32%),radial-gradient(circle_at_90%_80%,rgba(34,211,238,0.16),transparent_34%)]" />

      <div className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <div className="rounded-2xl border border-white/10 bg-background/70 p-4">
          <div className="grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Wallet className="size-5" />
          </div>
          <p className="mt-4 text-sm font-bold">Your wallet</p>
          <p className="mt-1 text-xs text-muted-foreground">Signs payment</p>
        </div>

        <div className="relative flex h-24 w-24 items-center justify-center">
          <div className="absolute h-px w-24 bg-gradient-to-r from-primary to-cyan-300" />
          <div className="z-10 grid size-12 place-items-center rounded-2xl border border-white/10 bg-background text-primary shadow-glow">
            <Send className="size-5 animate-pulse" />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-background/70 p-4">
          <div className="grid size-11 place-items-center rounded-2xl bg-cyan-400/10 text-cyan-300">
            <CheckCircle2 className="size-5" />
          </div>
          <p className="mt-4 text-sm font-bold">Recipient</p>
          <p className="mt-1 text-xs text-muted-foreground">Receives USDC</p>
        </div>
      </div>
    </div>
  );
}
