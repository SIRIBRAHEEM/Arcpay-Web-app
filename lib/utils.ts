import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Address } from "viem";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortAddress(address?: string | null, chars = 4) {
  if (!address) return "Not connected";
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

export function formatUsdLike(value: string | number) {
  const numeric = typeof value === "number" ? value : Number(value);

  if (!Number.isFinite(numeric)) return "$0.00";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2
  }).format(numeric);
}

export function isSameAddress(a?: string, b?: string) {
  return Boolean(a && b && a.toLowerCase() === b.toLowerCase());
}

export function asAddress(value: string): Address {
  return value as Address;
}
