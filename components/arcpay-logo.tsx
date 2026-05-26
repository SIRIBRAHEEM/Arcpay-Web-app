import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type ArcPayLogoMarkProps = ComponentPropsWithoutRef<"span"> & {
  active?: boolean;
};

type ArcPayLogoFullProps = ComponentPropsWithoutRef<"span"> & {
  markClassName?: string;
  textClassName?: string;
};

export function ArcPayLogoMark({
  active = false,
  className,
  ...props
}: ArcPayLogoMarkProps) {
  return (
    <span
      className={cn(
        "relative inline-grid size-11 shrink-0 place-items-center overflow-visible rounded-[1rem] bg-white text-[#0b4fd8] shadow-[0_18px_42px_rgba(11,79,216,0.2)] ring-1 ring-[#0b4fd8]/15 dark:bg-[#07182f] dark:ring-white/10",
        className
      )}
      {...props}
    >
      <span className="absolute inset-[1px] rounded-[0.9rem] border border-white/70 dark:border-white/10" />
      <span className="absolute inset-x-2 top-1.5 h-3 rounded-full bg-white/50 blur-[6px] dark:bg-white/15" />

      <ArcPaySymbol className="relative z-10 size-[82%] drop-shadow-[0_8px_18px_rgba(6,35,95,0.22)]" />

      {active ? (
        <span className="absolute -right-1 -top-1 size-3 rounded-full bg-[#ff8200] shadow-[0_0_18px_rgba(255,130,0,0.85)] ring-2 ring-white dark:ring-[#07182f]" />
      ) : null}
    </span>
  );
}

export function ArcPayLogoFull({
  className,
  markClassName,
  textClassName,
  ...props
}: ArcPayLogoFullProps) {
  return (
    <span
      className={cn("inline-flex items-center gap-3", className)}
      aria-label="ArcPay logo"
      {...props}
    >
      <span className={cn("relative grid size-12 shrink-0 place-items-center", markClassName)}>
        <ArcPaySymbol className="size-full drop-shadow-[0_8px_22px_rgba(11,99,229,0.22)]" />
      </span>
      <span
        className={cn(
          "text-[1.9rem] font-black leading-none tracking-tight",
          textClassName
        )}
      >
        <span className="text-[#0b4fd8] dark:text-[#8fbdff]">Arc</span>
        <span className="text-[#ff8200] dark:text-[#ffb45f]">Pay</span>
      </span>
    </span>
  );
}

function ArcPaySymbol({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 96 96"
      className={className}
      fill="none"
    >
      <path
        d="M15 73C18 51 28 25 46 17c10-4 22-1 33 11"
        stroke="#ff8200"
        strokeWidth="13"
        strokeLinecap="round"
      />
      <path
        d="M18 74C32 56 50 45 74 40"
        stroke="#0b63e5"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M31 73C43 58 58 50 78 47"
        stroke="#ffffff"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M65 46C72 51 77 61 79 73"
        stroke="#0b63e5"
        strokeWidth="13"
        strokeLinecap="round"
      />
      <rect x="70" y="24" width="6.5" height="6.5" rx="1.2" fill="#063b9f" />
      <rect x="81" y="24" width="6.5" height="6.5" rx="1.2" fill="#0b63e5" />
      <rect x="81" y="36" width="6.5" height="6.5" rx="1.2" fill="#0b63e5" />
    </svg>
  );
}
