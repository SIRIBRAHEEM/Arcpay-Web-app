"use client";

import Link from "next/link";
import { Copy, ExternalLink, LogOut } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ARC_BLOCK_EXPLORER, ARC_CHAIN_ID, requestSwitchChain, ARC_TESTNET_PARAMS } from "@/lib/arc";
import { shortAddress } from "@/lib/utils";
import { useWalletStore } from "@/store/wallet-store";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

export function DashboardHeader() {
  const address = useWalletStore((state) => state.address);
  const provider = useWalletStore((state) => state.provider);
  const disconnect = useWalletStore((state) => state.disconnect);
  const chainId = useWalletStore((state) => state.chainId);
  const copy = useCopyToClipboard();

  async function switchToArc() {
    if (!provider) return;

    try {
      await requestSwitchChain(provider, ARC_TESTNET_PARAMS);
      toast.success("Switched to Arc Testnet");
    } catch (error) {
      toast.error("Could not switch network", {
        description: error instanceof Error ? error.message : "Open your wallet and try again."
      });
    }
  }

  return (
    <header className="sticky top-3 z-20 rounded-3xl border border-white/10 bg-background/75 p-3 backdrop-blur-2xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-2xl border border-white/10 bg-white/10">
            <span className="font-black text-primary">A</span>
          </div>
          <div>
            <p className="font-bold leading-none">ArcPay</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Easy Stablecoin Payments on ARC
            </p>
          </div>
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant={chainId === ARC_CHAIN_ID ? "default" : "destructive"}
            className="rounded-full px-3 py-1.5"
          >
            {chainId === ARC_CHAIN_ID ? "Arc Testnet" : "Wrong network"}
          </Badge>

          {chainId !== ARC_CHAIN_ID ? (
            <Button size="sm" onClick={switchToArc}>
              Switch
            </Button>
          ) : null}

          <Button
            size="sm"
            variant="secondary"
            className="gap-2"
            onClick={() => {
              if (!address) return;
              void copy(address, "Address copied");
            }}
          >
            {shortAddress(address)}
            <Copy className="size-3.5" />
          </Button>

          <Button size="sm" variant="ghost" asChild>
            <a
              href={address ? `${ARC_BLOCK_EXPLORER}/address/${address}` : ARC_BLOCK_EXPLORER}
              target="_blank"
              rel="noreferrer"
              aria-label="Open address on ArcScan"
            >
              <ExternalLink className="size-4" />
            </a>
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              disconnect();
              toast.success("Wallet disconnected");
            }}
            aria-label="Disconnect wallet"
          >
            <LogOut className="size-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
