"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Wallet } from "lucide-react";
import type { Address } from "viem";
import { toast } from "sonner";
import { Button, type ButtonProps } from "@/components/ui/button";
import { ARC_TESTNET_PARAMS, requestSwitchChain } from "@/lib/arc";
import { createBrowserAdapter } from "@/lib/kit";
import { cn } from "@/lib/utils";
import { useWalletStore } from "@/store/wallet-store";

type ConnectButtonProps = ButtonProps & {
  redirectTo?: string;
  label?: string;
};

export function ConnectButton({
  redirectTo,
  label = "Connect Wallet",
  className,
  ...props
}: ConnectButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const address = useWalletStore((state) => state.address);
  const setConnected = useWalletStore((state) => state.setConnected);

  async function connect() {
    const provider = window.ethereum;

    if (!provider) {
      toast.error("No browser wallet found", {
        description: "Install MetaMask, Rabby, or another EIP-1193 wallet."
      });
      return;
    }

    setLoading(true);

    try {
      const accounts = (await provider.request({
        method: "eth_requestAccounts"
      })) as Address[];

      if (!accounts?.[0]) {
        throw new Error("No account returned by wallet.");
      }

      await requestSwitchChain(provider, ARC_TESTNET_PARAMS);

      const chainId = Number.parseInt(
        (await provider.request({ method: "eth_chainId" })) as string,
        16
      );

      const adapter = await createBrowserAdapter(provider);

      setConnected({
        address: accounts[0],
        provider,
        adapter,
        chainId
      });

      toast.success("Wallet connected", {
        description: "You are ready to pay on Arc Testnet."
      });

      if (redirectTo) router.push(redirectTo);
    } catch (error) {
      toast.error("Could not connect wallet", {
        description: error instanceof Error ? error.message : "Please try again."
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      type="button"
      onClick={address && redirectTo ? () => router.push(redirectTo) : connect}
      disabled={loading}
      className={cn("gap-2", className)}
      {...props}
    >
      <Wallet className="size-4" />
      {loading ? "Connecting..." : address ? "Open Dashboard" : label}
    </Button>
  );
}
