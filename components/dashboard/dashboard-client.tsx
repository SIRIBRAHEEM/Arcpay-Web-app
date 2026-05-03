"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BalanceCard } from "@/components/dashboard/balance-card";
import { BridgeSwapPanel } from "@/components/dashboard/bridge-swap-panel";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { EventWatcher } from "@/components/dashboard/event-watcher";
import { KitKeyCard } from "@/components/dashboard/kit-key-card";
import { ReceivePanel } from "@/components/dashboard/receive-panel";
import { SilverStatusCard } from "@/components/dashboard/silver-status-card";
import { TxHistory } from "@/components/dashboard/tx-history";
import { ArcNetworkAnimation } from "@/components/visuals/arc-network-animation";
import { Card, CardContent } from "@/components/ui/card";
import { ConnectButton } from "@/components/connect-button";
import { useWalletStore } from "@/store/wallet-store";

export function DashboardClient() {
  const router = useRouter();
  const address = useWalletStore((state) => state.address);
  const hydrated = useWalletStore((state) => state.hydrated);

  useEffect(() => {
    if (hydrated && !address) {
      router.replace("/");
    }
  }, [address, hydrated, router]);

  if (!hydrated) {
    return (
      <main className="grid min-h-screen place-items-center px-4">
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
      <main className="grid min-h-screen place-items-center px-4">
        <Card className="glass w-full max-w-md rounded-3xl">
          <CardContent className="p-6 text-center">
            <p className="text-lg font-bold">Connect to continue</p>
            <p className="mt-2 text-sm text-muted-foreground">
              ArcPay is non-custodial and needs a browser wallet.
            </p>
            <ConnectButton redirectTo="/dashboard" className="mt-6 w-full" />
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 pb-20 pt-4 sm:px-6 lg:px-8">
      <EventWatcher />

      <div className="mx-auto max-w-7xl">
        <DashboardHeader />

        <section className="mt-6 grid gap-5 lg:grid-cols-[1.12fr_0.88fr]">
          <div className="grid gap-5">
            <ArcNetworkAnimation className="min-h-64" />
            <BridgeSwapPanel />
          </div>

          <div className="grid gap-5">
            <BalanceCard />
            <KitKeyCard />
            <SilverStatusCard />
            <ReceivePanel />
            <TxHistory />
          </div>
        </section>
      </div>
    </main>
  );
}
