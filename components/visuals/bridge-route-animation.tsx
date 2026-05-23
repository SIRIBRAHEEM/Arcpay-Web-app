"use client";

import { ArrowRightLeft, Coins, Network } from "lucide-react";
import { cn } from "@/lib/utils";

type BridgeRouteAnimationProps = {
  fromLabel: string;
  toLabel: string;
  className?: string;
};

export function BridgeRouteAnimation({
  fromLabel,
  toLabel,
  className
}: BridgeRouteAnimationProps) {
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
          <Network className="size-5 text-teal-700" />
          <p className="mt-3 text-sm font-bold">{fromLabel}</p>
          <p className="mt-1 text-xs text-muted-foreground">Source chain</p>
        </div>

        <div className="relative grid size-20 place-items-center">
          <div className="absolute h-px w-24 bg-gradient-to-r from-teal-600 via-primary to-lime-500" />
          <div className="relative grid size-12 place-items-center rounded-2xl border border-emerald-950/10 bg-white shadow-glow dark:border-white/10 dark:bg-white/[0.08]">
            <ArrowRightLeft className="size-5 animate-pulse text-primary" />
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-950/10 bg-white/85 p-4 dark:border-white/10 dark:bg-white/[0.055]">
          <Coins className="size-5 text-primary" />
          <p className="mt-3 text-sm font-bold">{toLabel}</p>
          <p className="mt-1 text-xs text-muted-foreground">Destination</p>
        </div>
      </div>

      <div className="relative mt-4 rounded-2xl border border-primary/20 bg-primary/10 px-4 py-3 text-xs text-primary">
        USDC bridge route preview. Final confirmation happens in your wallet.
      </div>
    </div>
  );
}
