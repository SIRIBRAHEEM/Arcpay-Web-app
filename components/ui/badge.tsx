import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-slate-950/10 bg-teal-950 text-lime-50 dark:border-lime-200/20 dark:bg-lime-200/12 dark:text-lime-100",
        secondary:
          "border-slate-950/10 bg-white/75 text-teal-950/75 dark:border-white/10 dark:bg-white/[0.08] dark:text-lime-50/80",
        destructive:
          "border-red-500/20 bg-red-500/10 text-red-700 dark:text-red-300",
        outline:
          "border-slate-950/10 bg-transparent text-teal-950/75 dark:border-white/10 dark:text-lime-50/80"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
