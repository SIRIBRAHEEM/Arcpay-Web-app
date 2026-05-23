"use client";

import Link from "next/link";
import { Copy, ExternalLink, LogOut, Radio, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
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
    <header className="sticky top-3 z-20 rounded-[1.25rem] border border-emerald-950/10 bg-white/90 p-3 shadow-[0_24px_80px_rgba(36,82,56,0.12)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#06130f]/88">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative grid size-11 place-items-center rounded-full border border-emerald-950/10 bg-emerald-950 shadow-[0_18px_38px_rgba(13,69,52,0.18)] dark:border-lime-200/20 dark:bg-lime-200">
            <span className="font-black text-lime-100 dark:text-emerald-950">A</span>
            <span className="absolute -right-1 -top-1 size-3 rounded-full bg-lime-300 shadow-[0_0_16px_rgba(190,242,100,0.9)]" />
          </div>

          <div>
            <p className="font-black leading-none tracking-tight text-emerald-950 dark:text-lime-50">
              ArcPay
            </p>
            <p className="mt-1 text-xs text-emerald-950/55 dark:text-lime-50/55">
              Private-feeling payments on ARC
            </p>
          </div>
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          <ThemeToggle />

          <Badge className="gap-2 rounded-full border-emerald-950/10 bg-emerald-100 px-3 py-1.5 text-emerald-800 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300">
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
