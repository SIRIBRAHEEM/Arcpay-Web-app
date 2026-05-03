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
        "relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] p-5",
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.16),transparent_30%),radial-gradient(circle_at_85%_70%,rgba(32,213,159,0.16),transparent_32%)]" />

      <div className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <div className="rounded-2xl border border-white/10 bg-background/75 p-4">
          <Network className="size-5 text-purple-300" />
          <p className="mt-3 text-sm font-bold">{fromLabel}</p>
          <p className="mt-1 text-xs text-muted-foreground">Source chain</p>
        </div>

        <div className="relative grid size-20 place-items-center">
          <div className="absolute h-px w-24 bg-gradient-to-r from-purple-300 via-primary to-cyan-300" />
          <div className="relative grid size-12 place-items-center rounded-2xl border border-white/10 bg-background shadow-glow">
            <ArrowRightLeft className="size-5 animate-pulse text-primary" />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-background/75 p-4">
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
