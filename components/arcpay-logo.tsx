import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type ArcPayLogoMarkProps = ComponentPropsWithoutRef<"span"> & {
  active?: boolean;
};

export function ArcPayLogoMark({
  active = false,
  className,
  ...props
}: ArcPayLogoMarkProps) {
  return (
    <span
      className={cn(
        "relative inline-grid size-11 shrink-0 place-items-center overflow-visible rounded-[1rem] bg-[radial-gradient(circle_at_28%_20%,rgba(190,242,100,0.72),transparent_29%),linear-gradient(145deg,#052e25_0%,#06372f_45%,#08111c_100%)] text-lime-100 shadow-[0_18px_42px_rgba(4,52,39,0.22)] ring-1 ring-emerald-950/10 dark:bg-[radial-gradient(circle_at_28%_20%,rgba(190,242,100,0.58),transparent_29%),linear-gradient(145deg,#0f2a24_0%,#0d3b31_45%,#071019_100%)] dark:ring-lime-200/20",
        className
      )}
      {...props}
    >
      <span className="absolute inset-[1px] rounded-[0.9rem] border border-white/20" />
      <span className="absolute inset-x-2 top-1.5 h-3 rounded-full bg-white/20 blur-[6px]" />

      <svg
        aria-hidden="true"
        viewBox="0 0 64 64"
        className="relative z-10 size-[76%] drop-shadow-[0_6px_14px_rgba(0,0,0,0.28)]"
        fill="none"
      >
        <path
          d="M17.5 44.5 28.7 20.7c1.35-2.86 5.32-2.93 6.78-.12l12.35 23.92"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24.8 35.5h18.4"
          stroke="#5EEAD4"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M44.9 15.9c4.82 2.7 8.08 7.86 8.08 13.78 0 2.18-.44 4.26-1.24 6.14"
          stroke="#A3E635"
          strokeWidth="3.4"
          strokeLinecap="round"
        />
        <path
          d="M18.9 50.5c3.37 2.64 7.62 4.21 12.24 4.21 4.2 0 8.09-1.3 11.3-3.51"
          stroke="#2DD4BF"
          strokeWidth="3.4"
          strokeLinecap="round"
        />
        <circle cx="48.8" cy="15.6" r="3.8" fill="#BEF264" />
      </svg>

      {active ? (
        <span className="absolute -right-1 -top-1 size-3 rounded-full bg-lime-300 shadow-[0_0_18px_rgba(190,242,100,0.95)] ring-2 ring-white dark:ring-[#04110e]" />
      ) : null}
    </span>
  );
}
