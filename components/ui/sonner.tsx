"use client";

import { Toaster as Sonner } from "sonner";
import { useTheme } from "@/components/theme-provider";

export function Toaster() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Sonner
      theme={theme}
      richColors
      closeButton
      toastOptions={{
        style: {
          background: isDark ? "#07111f" : "#ffffff",
          border: isDark
            ? "1px solid rgba(255,255,255,0.1)"
            : "1px solid rgba(5,46,34,0.1)",
          color: isDark ? "#f8fafc" : "#052e22"
        }
      }}
    />
  );
}
