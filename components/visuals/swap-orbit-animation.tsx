"use client";

import { Repeat2 } from "lucide-react";
import { cn } from "@/lib/utils";

type SwapOrbitAnimationProps = {
  tokenIn: string;
  tokenOut: string;
  className?: string;
};

export function SwapOrbitAnimation({
  tokenIn,
  tokenOut,
  className
}: SwapOrbitAnimationProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] p-5",
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(32,213,159,0.18),transparent_32%)]" />

      <div className="relative mx-auto grid h-44 max-w-sm place-items-center">
        <div className="absolute size-36 rounded-full border border-dashed border-white/15 animate-[spin_12s_linear_infinite]" />
        <div className="absolute size-24 rounded-full border border-dashed border-primary/25 animate-[spinReverse_10s_linear_infinite]" />

        <div className="absolute left-2 top-8 grid size-20 place-items-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-center shadow-glow">
          <span className="text-sm font-black text-cyan-200">{tokenIn}</span>
        </div>

        <div className="absolute bottom-8 right-2 grid size-20 place-items-center rounded-full border border-primary/30 bg-primary/10 text-center shadow-glow">
          <span className="text-sm font-black text-primary">{tokenOut}</span>
        </div>

        <div className="grid size-16 place-items-center rounded-3xl border border-white/10 bg-background/80">
          <Repeat2 className="size-7 animate-pulse text-primary" />
        </div>
      </div>

      <style jsx>{`
        @keyframes spinReverse {
          to {
            transform: rotate(-360deg);
          }
        }
      `}</style>
    </div>
  );
}
