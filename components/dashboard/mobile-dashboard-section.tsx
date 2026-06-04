"use client";

import { ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type MobileDashboardSectionProps = {
  title: string;
  description?: string;
  defaultOpen?: boolean;
  children: ReactNode;
};

export function MobileDashboardSection({
  title,
  description,
  defaultOpen = false,
  children
}: MobileDashboardSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="glass group w-full min-w-0 overflow-hidden rounded-[1.55rem] border border-slate-950/[0.06] bg-white/82 shadow-[0_18px_60px_rgba(6,26,63,0.08)] ring-1 ring-white/70 backdrop-blur-2xl transition-all duration-300 dark:border-white/10 dark:bg-white/[0.055] dark:ring-white/[0.05]">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex w-full min-w-0 items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors hover:bg-slate-950/[0.025] dark:hover:bg-white/[0.045] sm:px-5 sm:py-4"
      >
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-blue-600 to-orange-500 shadow-[0_0_18px_rgba(255,130,0,0.35)]" />
            <span className="block truncate text-[0.95rem] font-black tracking-tight text-[#061a3f] dark:text-white sm:text-base">
              {title}
            </span>
          </span>
          {description ? (
            <span className="mt-1.5 block truncate pl-4 text-xs font-medium leading-5 text-slate-600 dark:text-white/64 sm:text-sm">
              {description}
            </span>
          ) : null}
        </span>

        <span className="grid size-9 shrink-0 place-items-center rounded-2xl border border-blue-500/10 bg-blue-50 text-blue-700 shadow-sm transition-all duration-300 group-hover:scale-105 dark:border-white/10 dark:bg-white/[0.07] dark:text-orange-200">
          <ChevronDown
            className={cn(
              "size-4 transition-transform duration-300",
              open && "rotate-180"
            )}
          />
        </span>
      </button>

      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="min-w-0 overflow-hidden">
          <div className="border-t border-slate-950/[0.06] p-2.5 dark:border-white/10 sm:p-3">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
