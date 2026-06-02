"use client";

import { ReactNode, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type MobileDashboardSectionProps = {
  title: string;
  description?: string;
  defaultOpen?: boolean;
  children: ReactNode;
};

function useDesktopDashboard() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1280px)");

    function updateViewport() {
      setIsDesktop(mediaQuery.matches);
    }

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);

    return () => {
      mediaQuery.removeEventListener("change", updateViewport);
    };
  }, []);

  return isDesktop;
}

export function MobileDashboardSection({
  title,
  description,
  defaultOpen = false,
  children
}: MobileDashboardSectionProps) {
  const isDesktop = useDesktopDashboard();
  const [open, setOpen] = useState(defaultOpen);

  if (isDesktop) {
    return <>{children}</>;
  }

  return (
    <section className="w-full min-w-0">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className={cn(
          "glass flex w-full min-w-0 items-center justify-between gap-3 rounded-[1.25rem] px-3.5 py-3 text-left transition-all duration-200",
          open && "rounded-b-2xl"
        )}
      >
        <span className="min-w-0">
          <span className="block truncate text-sm font-black text-teal-950 dark:text-lime-50">
            {title}
          </span>
          {description ? (
            <span className="mt-1 block truncate text-xs text-muted-foreground">
              {description}
            </span>
          ) : null}
        </span>

        <span className="grid size-9 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
          <ChevronDown
            className={cn(
              "size-4 transition-transform duration-200",
              open && "rotate-180"
            )}
          />
        </span>
      </button>

      {open ? <div className="mt-2 w-full min-w-0">{children}</div> : null}
    </section>
  );
}
