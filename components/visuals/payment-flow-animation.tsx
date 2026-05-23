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
        "relative overflow-hidden rounded-[1.25rem] border border-emerald-950/10 bg-white/80 p-4 dark:border-white/10 dark:bg-white/[0.055]",
        className
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,92,67,0.07)_1px,transparent_1px),linear-gradient(180deg,rgba(14,92,67,0.07)_1px,transparent_1px)] bg-[size:44px_44px] dark:bg-[linear-gradient(90deg,rgba(190,242,100,0.055)_1px,transparent_1px),linear-gradient(180deg,rgba(190,242,100,0.045)_1px,transparent_1px)]" />

      <div className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <div className="rounded-2xl border border-emerald-950/10 bg-white/85 p-4 dark:border-white/10 dark:bg-white/[0.055]">
          <div className="grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Wallet className="size-5" />
          </div>
          <p className="mt-4 text-sm font-bold">Your wallet</p>
          <p className="mt-1 text-xs text-muted-foreground">Signs payment</p>
        </div>

        <div className="relative flex h-24 w-24 items-center justify-center">
          <div className="absolute h-px w-24 bg-gradient-to-r from-primary to-lime-500" />
          <div className="z-10 grid size-12 place-items-center rounded-2xl border border-emerald-950/10 bg-white text-primary shadow-glow dark:border-white/10 dark:bg-white/[0.08]">
            <Send className="size-5 animate-pulse" />
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-950/10 bg-white/85 p-4 dark:border-white/10 dark:bg-white/[0.055]">
          <div className="grid size-11 place-items-center rounded-2xl bg-teal-100 text-teal-800">
            <CheckCircle2 className="size-5" />
          </div>
          <p className="mt-4 text-sm font-bold">Recipient</p>
          <p className="mt-1 text-xs text-muted-foreground">Receives USDC</p>
        </div>
      </div>
    </div>
  );
}
