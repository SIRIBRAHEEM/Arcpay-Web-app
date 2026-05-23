"use client";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { WalletBootstrap } from "@/components/wallet-bootstrap";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <WalletBootstrap />
      {children}
      <Toaster />
    </ThemeProvider>
  );
}
