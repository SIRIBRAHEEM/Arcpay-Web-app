"use client";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthBootstrap } from "@/components/auth-bootstrap";
import { WalletBootstrap } from "@/components/wallet-bootstrap";
import { PrivyAuthProvider } from "@/components/privy-auth-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <PrivyAuthProvider>
        <AuthBootstrap />
        <WalletBootstrap />
        {children}
        <Toaster />
      </PrivyAuthProvider>
    </ThemeProvider>
  );
}
