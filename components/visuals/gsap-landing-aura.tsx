"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

type GsapLandingAuraProps = {
  className?: string;
};

export function GsapLandingAura({ className }: GsapLandingAuraProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.to(".gsap-orb-one", {
        x: 80,
        y: 40,
        scale: 1.15,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(".gsap-orb-two", {
        x: -70,
        y: 55,
        scale: 1.2,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(".gsap-line", {
        strokeDashoffset: -500,
        duration: 16,
        repeat: -1,
        ease: "none"
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      <div className="gsap-orb-one absolute left-10 top-16 size-80 rounded-full bg-primary/20 blur-3xl" />
      <div className="gsap-orb-two absolute right-10 top-4 size-96 rounded-full bg-cyan-400/15 blur-3xl" />

      <svg viewBox="0 0 1200 700" className="absolute inset-0 h-full w-full opacity-60">
        <path
          className="gsap-line"
          d="M-80 420 C230 140 430 140 680 330 S980 560 1280 180"
          fill="none"
          stroke="rgba(32,213,159,0.35)"
          strokeWidth="2"
          strokeDasharray="14 20"
        />
        <path
          className="gsap-line"
          d="M-120 260 C180 540 450 520 700 260 S1020 40 1320 390"
          fill="none"
          stroke="rgba(34,211,238,0.28)"
          strokeWidth="2"
          strokeDasharray="10 18"
        />
      </svg>
    </div>
  );
}
