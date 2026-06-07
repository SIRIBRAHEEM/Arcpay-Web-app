"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { EventWatcher } from "@/components/dashboard/event-watcher";
import { MobileDashboardSection } from "@/components/dashboard/mobile-dashboard-section";
import { PremiumDashboardHero } from "@/components/dashboard/premium-dashboard-hero";
import { Card, CardContent } from "@/components/ui/card";
import { ConnectButton } from "@/components/connect-button";
import { useAuthStore } from "@/store/auth-store";
import { useWalletStore } from "@/store/wallet-store";

// Lazy load heavy dashboard panels for lightning-fast initial load
// Each panel is code-split into its own chunk
const SendPanel = dynamic(
  () => import("@/components/dashboard/send-panel"),
  {
    loading: () => <div className="h-[320px] animate-pulse rounded-[1.25rem] bg-muted/40" />,
    ssr: false
  }
);

const BalanceCard = dynamic(
  () => import("@/components/dashboard/balance-card"),
  {
    loading: () => <div className="h-[220px] animate-pulse rounded-[1.25rem] bg-muted/40" />,
    ssr: false
  }
);

const ReceivePanel = dynamic(
  () => import("@/components/dashboard/receive-panel"),
  {
    loading: () => <div className="h-[280px] animate-pulse rounded-[1.25rem] bg-muted/40" />,
    ssr: false
  }
);

const BridgePanel = dynamic(
  () => import("@/components/dashboard/bridge-panel"),
  {
    loading: () => <div className="h-[260px] animate-pulse rounded-[1.25rem] bg-muted/40" />,
    ssr: false
  }
);

const TxHistory = dynamic(
  () => import("@/components/dashboard/tx-history"),
  {
    loading: () => <div className="h-[380px] animate-pulse rounded-[1.25rem] bg-muted/40" />,
    ssr: false
  }
);

const ProtocolStatusCard = dynamic(
  () => import("@/components/dashboard/protocol-status-card"),
  {
    loading: () => <div className="h-[180px] animate-pulse rounded-[1.25rem] bg-muted/40" />,
    ssr: false
  }
);

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
    <main className="premium-dashboard-bg min-h-screen overflow-x-clip px-2.5 pb-10 pt-2 text-foreground sm:px-6 sm:pb-14 sm:pt-3 lg:px-8">
      <EventWatcher />

      <div className="mx-auto w-full max-w-7xl min-w-0">
        <DashboardHeader />

        <div className="mt-3 sm:mt-4">
          <PremiumDashboardHero />
        </div>

        <section className="dashboard-masonry mt-3 w-full min-w-0 sm:mt-4">
          <div className="dashboard-masonry-item">
            <MobileDashboardSection
              title="Pay"
              description="Send USDC or EURC to another Arc wallet"
              defaultOpen
            >
              <SendPanel />
            </MobileDashboardSection>
          </div>

          <div className="dashboard-masonry-item">
            <MobileDashboardSection
              title="Unified Balance"
              description="View deposits and balance sources"
              defaultOpen
            >
              <BalanceCard />
            </MobileDashboardSection>
          </div>

          <div className="dashboard-masonry-item">
            <MobileDashboardSection
              title="Request Money"
              description="Create QR invoice links"
            >
              <ReceivePanel />
            </MobileDashboardSection>
          </div>

          <div className="dashboard-masonry-item">
            <MobileDashboardSection
              title="Bridge USDC"
              description="Move USDC across supported chains"
            >
              <BridgePanel />
            </MobileDashboardSection>
          </div>

          <div className="dashboard-masonry-item">
            <MobileDashboardSection
              title="Activity"
              description="View local payment history"
            >
              <TxHistory />
            </MobileDashboardSection>
          </div>

          <div className="dashboard-masonry-item">
            <MobileDashboardSection
              title="Protocol Status"
              description="Network, gas, and custody details"
            >
              <ProtocolStatusCard />
            </MobileDashboardSection>
          </div>
        </section>
      </div>
    </main>
  );
}
