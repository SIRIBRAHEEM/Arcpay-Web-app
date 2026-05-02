"use client";

import { Toaster } from "@/components/ui/sonner";
import { WalletBootstrap } from "@/components/wallet-bootstrap";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WalletBootstrap />
      {children}
      <Toaster />
    </>
  );
}
