"use client";

import { toast } from "sonner";

export function useCopyToClipboard() {
  return async function copy(value: string, message = "Copied") {
    try {
      await navigator.clipboard.writeText(value);
      toast.success(message);
    } catch {
      toast.error("Could not copy to clipboard");
    }
  };
}
