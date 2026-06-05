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
        "relative inline-grid size-11 shrink-0 place-items-center overflow-visible rounded-[1rem] bg-[#061a3f] shadow-[0_18px_42px_rgba(11,99,229,0.24)] ring-1 ring-white/12 dark:bg-[#061a3f] dark:ring-white/12",
        className
      )}
      {...props}
    >
      <span className="absolute inset-0 rounded-[1rem] bg-[radial-gradient(circle_at_28%_18%,rgba(255,255,255,0.22),transparent_34%),linear-gradient(145deg,rgba(11,99,229,0.22),rgba(6,26,63,0.95))]" />
      <span className="absolute inset-[1px] rounded-[0.92rem] border border-white/12" />

      <ArcPaySymbol className="relative z-10 size-[86%] drop-shadow-[0_10px_22px_rgba(0,0,0,0.3)]" />

      {active ? (
        <span className="absolute -right-1 -top-1 size-3 rounded-full bg-[#ff8200] shadow-[0_0_18px_rgba(255,130,0,0.85)] ring-2 ring-white dark:ring-[#061a3f]" />
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
        <ArcPaySymbol className="size-full drop-shadow-[0_10px_24px_rgba(11,99,229,0.28)]" />
      </span>
      <span
        className={cn(
          "text-[1.9rem] font-black leading-none tracking-tight",
          textClassName
        )}
      >
        <span className="text-white [text-shadow:0_3px_18px_rgba(11,99,229,0.22)] dark:text-white">Arc</span>
        <span className="bg-gradient-to-b from-[#42a5ff] via-[#0b63e5] to-[#0643b8] bg-clip-text text-transparent [text-shadow:0_3px_18px_rgba(11,99,229,0.18)]">Pay</span>
      </span>
    </span>
  );
}

function ArcPaySymbol({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 112 96"
      className={className}
      fill="none"
    >
      <defs>
        <linearGradient id="arcpay-orange-ribbon" x1="21" y1="78" x2="56" y2="7" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ff7a00" />
          <stop offset="0.46" stopColor="#ff9d19" />
          <stop offset="1" stopColor="#ffd35c" />
        </linearGradient>
        <linearGradient id="arcpay-blue-ribbon" x1="54" y1="72" x2="93" y2="19" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1f7cff" />
          <stop offset="0.48" stopColor="#0b63e5" />
          <stop offset="1" stopColor="#55b8ff" />
        </linearGradient>
        <linearGradient id="arcpay-inner-blue" x1="35" y1="70" x2="80" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0643b8" />
          <stop offset="0.55" stopColor="#0b63e5" />
          <stop offset="1" stopColor="#68c2ff" />
        </linearGradient>
        <filter id="arcpay-symbol-shadow" x="0" y="0" width="112" height="96" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#061a3f" floodOpacity="0.22" />
        </filter>
      </defs>

      <g filter="url(#arcpay-symbol-shadow)">
        <path
          d="M18 79C23 55 35 25 55 13c8.8-5.3 19.4-4.6 29.5 2.1 8.9 5.9 15.3 15.8 19.5 29.9-8.5-13.7-19.3-20.9-31.4-20.2-18.4 1-31.7 20.5-43.1 54.2H18Z"
          fill="url(#arcpay-orange-ribbon)"
        />
        <path
          d="M73.5 24.8C85.5 25.8 97 36.7 104 55.5c-2.3 7.1-7.2 14.1-13.2 19.4-8.7-21-19.2-31.4-32-28.5-9.9 2.2-17.6 12-25.2 28.5H21.8C34.1 42.7 50.5 23 73.5 24.8Z"
          fill="url(#arcpay-blue-ribbon)"
        />
        <path
          d="M29.2 74.9C43.7 53.7 61.9 43.2 84.8 45.4c-9.7 4.7-18 11.7-24.9 21-8.5-2.6-18.6.2-30.7 8.5Z"
          fill="url(#arcpay-inner-blue)"
          opacity="0.98"
        />
        <path
          d="M34 70.5C48.4 57.1 63.7 50.1 80.2 49.6"
          stroke="#061a3f"
          strokeWidth="5.5"
          strokeLinecap="round"
          opacity="0.9"
        />
      </g>

      <g opacity="0.98">
        <rect x="12" y="62" width="6.2" height="6.2" rx="1" fill="#ff8200" />
        <rect x="20" y="54" width="6.2" height="6.2" rx="1" fill="#ff9d19" />
        <rect x="20" y="70" width="6.2" height="6.2" rx="1" fill="#ff8200" />
        <rect x="28" y="62" width="6.2" height="6.2" rx="1" fill="#ffb03a" />
      </g>
    </svg>
  );
}
