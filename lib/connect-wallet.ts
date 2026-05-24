"use client";

import type { Address, EIP1193Provider } from "viem";
import { ARC_TESTNET_PARAMS, requestSwitchChain } from "@/lib/arc";
import { createBrowserAdapter } from "@/lib/kit";

export async function connectWalletProvider(provider: EIP1193Provider) {
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

  return {
    address: accounts[0],
    provider,
    adapter,
    chainId
  };
}
