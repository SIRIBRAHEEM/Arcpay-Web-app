"use client";

import Link from "next/link";
import { Copy, ExternalLink, LogOut, Radio, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ARC_BLOCK_EXPLORER,
  ARC_CHAIN_ID,
  ARC_TESTNET_PARAMS,
  requestSwitchChain
} from "@/lib/arc";
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
        description:
          error instanceof Error ? error.message : "Open your wallet and try again."
      });
    }
  }

  return (
    <header className="sticky top-3 z-20 rounded-[2rem] border border-white/10 bg-[#050816]/85 p-3 shadow-[0_24px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative grid size-12 place-items-center rounded-2xl border border-blue-300/20 bg-gradient-to-br from-white/10 to-blue-400/10 shadow-[0_0_40px_rgba(96,165,250,0.18)]">
            <span className="font-black text-blue-100">A</span>
            <span className="absolute -right-1 -top-1 size-3 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.9)]" />
          </div>

          <div>
            <p className="font-black leading-none tracking-tight text-slate-100">
              ArcPay DEX
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Swap, bridge, and move stablecoins on Arc
            </p>
          </div>
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          <Badge className="gap-2 rounded-full border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-emerald-300">
            <Radio className="size-3.5" />
            Live Testnet
          </Badge>

          <Badge
            variant={chainId === ARC_CHAIN_ID ? "default" : "destructive"}
            className="rounded-full px-3 py-1.5"
          >
            {chainId === ARC_CHAIN_ID ? "Arc Testnet" : "Wrong network"}
          </Badge>

          <Badge variant="secondary" className="gap-2 rounded-full px-3 py-1.5">
            <ShieldCheck className="size-3.5" />
            Non-custodial
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
