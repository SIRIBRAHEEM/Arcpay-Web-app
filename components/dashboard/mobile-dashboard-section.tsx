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
    <section className="w-full min-w-0 overflow-hidden rounded-[1.35rem] border border-slate-950/[0.08] bg-white/90 shadow-[0_12px_35px_rgba(6,26,63,0.06)] dark:border-white/10 dark:bg-white/[0.055]">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex w-full min-w-0 items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors hover:bg-slate-950/[0.025] dark:hover:bg-white/[0.04] sm:px-5 sm:py-4"
      >
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 shrink-0 rounded-full bg-orange-500" />
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

        <span className="grid size-9 shrink-0 place-items-center rounded-2xl border border-blue-500/10 bg-blue-50 text-blue-700 dark:border-white/10 dark:bg-white/[0.07] dark:text-orange-200">
          <ChevronDown
            className={cn(
              "size-4 transition-transform duration-200",
              open && "rotate-180"
            )}
          />
        </span>
      </button>

      {open ? (
        <div className="min-w-0 border-t border-slate-950/[0.06] p-2.5 dark:border-white/10 sm:p-3">
          {children}
        </div>
      ) : null}
    </section>
  );
}
