"use client";

import { useEffect } from "react";
import type { Address } from "viem";
import { createBrowserAdapter } from "@/lib/kit";
import { useWalletStore } from "@/store/wallet-store";

function parseChainId(value: unknown): number | undefined {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    return value.startsWith("0x") ? Number.parseInt(value, 16) : Number(value);
  }
  return undefined;
}

export function WalletBootstrap() {
  const setConnected = useWalletStore((state) => state.setConnected);
  const disconnect = useWalletStore((state) => state.disconnect);
  const setChainId = useWalletStore((state) => state.setChainId);

  useEffect(() => {
    const provider = window.ethereum;
    if (!provider) return;

    let mounted = true;

    async function bootstrap() {
      try {
        const accounts = (await provider.request({
          method: "eth_accounts"
        })) as Address[];

        const chainId = parseChainId(
          await provider.request({ method: "eth_chainId" })
        );

        if (!mounted) return;

        if (accounts?.[0]) {
          const adapter = await createBrowserAdapter(provider);
          setConnected({
            address: accounts[0],
            provider,
            adapter,
            chainId
          });
        } else {
          setChainId(chainId);
        }
      } catch {
        // Silent bootstrap failure keeps the app usable until the user clicks connect.
      }
    }

    const onAccountsChanged = async (accounts: Address[]) => {
      if (!accounts?.[0]) {
        disconnect();
        return;
      }

      try {
        const adapter = await createBrowserAdapter(provider);
        setConnected({
          address: accounts[0],
          provider,
          adapter
        });
      } catch {
        disconnect();
      }
    };

    const onChainChanged = (chainId: string) => {
      setChainId(parseChainId(chainId));
    };

    void bootstrap();

    provider.on?.("accountsChanged", onAccountsChanged);
    provider.on?.("chainChanged", onChainChanged);

    return () => {
      mounted = false;
      provider.removeListener?.("accountsChanged", onAccountsChanged);
      provider.removeListener?.("chainChanged", onChainChanged);
    };
  }, [disconnect, setChainId, setConnected]);

  return null;
}
