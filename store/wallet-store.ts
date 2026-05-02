"use client";

import { create } from "zustand";
import type { Address, EIP1193Provider } from "viem";
import type { WalletAdapter } from "@/lib/appkit-actions";

type WalletState = {
  hydrated: boolean;
  address?: Address;
  provider?: EIP1193Provider;
  adapter?: WalletAdapter;
  chainId?: number;
  setConnected: (payload: {
    address: Address;
    provider: EIP1193Provider;
    adapter: WalletAdapter;
    chainId?: number;
  }) => void;
  setChainId: (chainId?: number) => void;
  disconnect: () => void;
};

export const useWalletStore = create<WalletState>((set) => ({
  hydrated: false,
  setConnected: ({ address, provider, adapter, chainId }) =>
    set({
      hydrated: true,
      address,
      provider,
      adapter,
      chainId
    }),
  setChainId: (chainId) =>
    set((state) => ({
      hydrated: true,
      chainId,
      address: state.address,
      provider: state.provider,
      adapter: state.adapter
    })),
  disconnect: () =>
    set({
      hydrated: true,
      address: undefined,
      provider: undefined,
      adapter: undefined
    })
}));
