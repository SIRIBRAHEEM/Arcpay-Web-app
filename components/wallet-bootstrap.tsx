"use client";

import { useEffect } from "react";
import type { Address } from "viem";
import { createBrowserAdapter } from "@/lib/kit";
import { useWalletStore } from "@/store/wallet-store";

function parseChainId(value: unknown): number | undefined {
  if (typeof value === "number") return value;

  if (typeof value === "string") {
    return value.startsWith("0x")
      ? Number.parseInt(value, 16)
      : Number(value);
  }

  return undefined;
}

export function WalletBootstrap() {
  const setConnected = useWalletStore((state) => state.setConnected);
  const disconnect = useWalletStore((state) => state.disconnect);
  const setChainId = useWalletStore((state) => state.setChainId);

  useEffect(() => {
    const currentProvider = window.ethereum;

    if (!currentProvider) {
      setChainId(undefined);
      return;
    }

    let mounted = true;

    async function bootstrap(provider: NonNullable<typeof window.ethereum>) {
      try {
        const accounts = (await provider.request({
          method: "eth_accounts"
        })) as Address[];

        const chainId = parseChainId(
          await provider.request({
            method: "eth_chainId"
          })
        );

        if (!mounted) return;

        if (accounts[0]) {
          const adapter = await createBrowserAdapter(provider);

          if (!mounted) return;

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
        if (mounted) {
          setChainId(undefined);
        }
      }
    }

    const onAccountsChanged = async (accounts: Address[]) => {
      const nextAddress = accounts[0];

      if (!nextAddress) {
        disconnect();
        return;
      }

      try {
        const adapter = await createBrowserAdapter(currentProvider);

        setConnected({
          address: nextAddress,
          provider: currentProvider,
          adapter
        });
      } catch {
        disconnect();
      }
    };

    const onChainChanged = (chainId: string) => {
      setChainId(parseChainId(chainId));
    };

    void bootstrap(currentProvider);

    currentProvider.on?.("accountsChanged", onAccountsChanged);
    currentProvider.on?.("chainChanged", onChainChanged);

    return () => {
      mounted = false;
      currentProvider.removeListener?.("accountsChanged", onAccountsChanged);
      currentProvider.removeListener?.("chainChanged", onChainChanged);
    };
  }, [disconnect, setChainId, setConnected]);

  return null;
}
