"use client";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthBootstrap } from "@/components/auth-bootstrap";
import { WalletBootstrap } from "@/components/wallet-bootstrap";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthBootstrap />
      <WalletBootstrap />
      {children}
      <Toaster />
    </ThemeProvider>
  );
}
