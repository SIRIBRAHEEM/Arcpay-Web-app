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
        "relative overflow-hidden rounded-3xl border border-emerald-950/10 bg-white/80 p-5",
        className
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,92,67,0.07)_1px,transparent_1px),linear-gradient(180deg,rgba(14,92,67,0.07)_1px,transparent_1px)] bg-[size:44px_44px]" />

      <div className="relative mx-auto grid h-44 max-w-sm place-items-center">
        <div className="absolute size-36 rounded-full border border-dashed border-emerald-950/15 animate-[spin_12s_linear_infinite]" />
        <div className="absolute size-24 rounded-full border border-dashed border-primary/25 animate-[spinReverse_10s_linear_infinite]" />

        <div className="absolute left-2 top-8 grid size-20 place-items-center rounded-full border border-teal-700/20 bg-teal-100 text-center shadow-glow">
          <span className="text-sm font-black text-teal-900">{tokenIn}</span>
        </div>

        <div className="absolute bottom-8 right-2 grid size-20 place-items-center rounded-full border border-primary/30 bg-primary/10 text-center shadow-glow">
          <span className="text-sm font-black text-primary">{tokenOut}</span>
        </div>

        <div className="grid size-16 place-items-center rounded-3xl border border-emerald-950/10 bg-white/85">
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
