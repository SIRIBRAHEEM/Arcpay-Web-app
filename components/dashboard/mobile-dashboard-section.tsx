"use client";

import { ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

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
    <section className="group w-full min-w-0 overflow-hidden rounded-2xl border border-slate-950/10 bg-white/95 shadow-sm backdrop-blur-sm transition-all duration-200 hover:shadow-md dark:border-white/10 dark:bg-white/[0.06] dark:shadow-lg dark:hover:shadow-xl">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex w-full min-w-0 items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-slate-50/50 active:bg-slate-100/50 dark:hover:bg-white/[0.04] sm:cursor-default sm:pointer-events-none sm:hover:bg-transparent sm:active:bg-transparent"
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 shadow-sm" />
            <span className="block truncate text-base font-semibold tracking-[-0.01em] text-slate-900 dark:text-white sm:text-lg">
              {title}
            </span>
          </div>
          {description && (
            <p className="mt-1.5 pl-6 text-sm text-slate-600 dark:text-white/70">
              {description}
            </p>
          )}
        </div>

        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition-all group-hover:border-slate-300 dark:border-white/15 dark:bg-white/[0.08] dark:text-white/70 dark:group-hover:border-white/25 sm:hidden">
          <ChevronDown
            className={cn(
              "size-4 transition-transform duration-200 ease-out",
              open && "rotate-180"
            )}
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {(open || true) && ( // true for sm:block logic via class
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className={cn(
              "overflow-hidden border-t border-slate-100 dark:border-white/10",
              open ? "block" : "hidden",
              "sm:!h-auto sm:!opacity-100 sm:!overflow-visible"
            )}
          >
            <div className="p-5 pt-4 sm:p-6 sm:pt-5">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
