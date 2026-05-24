"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BalanceCard } from "@/components/dashboard/balance-card";
import { BridgePanel } from "@/components/dashboard/bridge-panel";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { EventWatcher } from "@/components/dashboard/event-watcher";
import { PremiumDashboardHero } from "@/components/dashboard/premium-dashboard-hero";
import { ProtocolStatusCard } from "@/components/dashboard/protocol-status-card";
import { ReceivePanel } from "@/components/dashboard/receive-panel";
import { SendPanel } from "@/components/dashboard/send-panel";
import { TxHistory } from "@/components/dashboard/tx-history";
import { Card, CardContent } from "@/components/ui/card";
import { ConnectButton } from "@/components/connect-button";
import { useAuthStore } from "@/store/auth-store";
import { useWalletStore } from "@/store/wallet-store";

export function DashboardClient() {
  const router = useRouter();
  const address = useWalletStore((state) => state.address);
  const hydrated = useWalletStore((state) => state.hydrated);
  const authHydrated = useAuthStore((state) => state.hydrated);
  const session = useAuthStore((state) => state.session);

  useEffect(() => {
    if (hydrated && authHydrated && !address && !session) {
      router.replace("/login");
    }
  }, [address, authHydrated, hydrated, router, session]);

  if (!hydrated || !authHydrated) {
    return (
      <main className="premium-dashboard-bg grid min-h-screen place-items-center px-4">
        <Card className="glass w-full max-w-md rounded-3xl">
          <CardContent className="p-6 text-center">
            <p className="text-lg font-bold">Loading ArcPay...</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Checking your wallet connection.
            </p>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (!address) {
    return (
      <main className="premium-dashboard-bg grid min-h-screen place-items-center px-4">
        <Card className="glass w-full max-w-md rounded-3xl">
          <CardContent className="p-6 text-center">
            <p className="text-lg font-bold">
              {session ? "Connect wallet to continue" : "Login to continue"}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              ArcPay is non-custodial, so payments still need an EVM wallet.
            </p>
            <ConnectButton redirectTo="/dashboard" className="mt-6 w-full" />
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="premium-dashboard-bg min-h-screen px-4 pb-14 pt-3 text-foreground sm:px-6 lg:px-8">
      <EventWatcher />

      <div className="mx-auto max-w-7xl">
        <DashboardHeader />

        <div className="mt-4">
          <PremiumDashboardHero />
        </div>

        <section className="mt-4 grid gap-4 xl:grid-cols-[1.12fr_0.88fr]">
          <div className="grid gap-4">
            <SendPanel />
            <BridgePanel />
            <TxHistory />
          </div>

          <div className="grid content-start gap-4">
            <BalanceCard />
            <ReceivePanel />
            <ProtocolStatusCard />
          </div>
        </section>
      </div>
    </main>
  );
}
