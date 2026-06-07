"use client";

import { ReactNode } from "react";

type MobileDashboardSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function MobileDashboardSection({
  title,
  description,
  children
}: MobileDashboardSectionProps) {
  return (
    <section className="w-full min-w-0 overflow-hidden rounded-[1.35rem] border border-slate-950/[0.08] bg-white/90 shadow-[0_12px_35px_rgba(6,26,63,0.06)] dark:border-white/10 dark:bg-white/[0.055]">
      <div className="px-4 py-3.5 sm:px-5 sm:py-4">
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
      </div>

      <div className="min-w-0 border-t border-slate-950/[0.06] p-2.5 dark:border-white/10 sm:p-3">
        {children}
      </div>
    </section>
  );
}
