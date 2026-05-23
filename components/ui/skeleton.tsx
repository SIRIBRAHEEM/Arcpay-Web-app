import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-emerald-950/10 dark:bg-white/10", className)}
      {...props}
    />
  );
}

export { Skeleton };
