"use client";

import { AppKit } from "@circle-fin/app-kit";
import { createViemAdapterFromProvider } from "@circle-fin/adapter-viem-v2";
import type { EIP1193Provider } from "viem";

let kit: AppKit | null = null;

export function getAppKit() {
  if (!kit) {
    kit = new AppKit();
  }

  return kit;
}

export async function createBrowserAdapter(provider: EIP1193Provider) {
  return createViemAdapterFromProvider({
    provider
  });
}
