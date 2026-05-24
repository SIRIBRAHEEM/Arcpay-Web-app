"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Wallet } from "lucide-react";
import { toast } from "sonner";
import { Button, type ButtonProps } from "@/components/ui/button";
import { connectWalletProvider } from "@/lib/connect-wallet";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
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
  const signIn = useAuthStore((state) => state.signIn);

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
      const connection = await connectWalletProvider(provider);

      setConnected(connection);
      signIn({
        method: "wallet",
        label: "Browser Wallet",
        address: connection.address,
        createdAt: Date.now()
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
