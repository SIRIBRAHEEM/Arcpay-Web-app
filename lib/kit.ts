"use client";

import { AppKit } from "@circle-fin/app-kit";
import { createViemAdapterFromProvider } from "@circle-fin/adapter-viem-v2";
import type { EIP1193Provider } from "viem";

const LOCAL_KIT_KEY_STORAGE_KEY = "arcpay:circle-kit-key";

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

export function getBuildTimeKitKey() {
  return process.env.NEXT_PUBLIC_KIT_KEY?.trim() ?? "";
}

export function getStoredKitKey() {
  if (typeof window === "undefined") return "";

  return window.localStorage.getItem(LOCAL_KIT_KEY_STORAGE_KEY)?.trim() ?? "";
}

export function getKitKey() {
  return getBuildTimeKitKey() || getStoredKitKey();
}

export function saveStoredKitKey(value: string) {
  if (typeof window === "undefined") return;

  const cleaned = value.trim();

  if (!cleaned) {
    window.localStorage.removeItem(LOCAL_KIT_KEY_STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(LOCAL_KIT_KEY_STORAGE_KEY, cleaned);
  window.dispatchEvent(new CustomEvent("arcpay:kit-key-updated"));
}

export function clearStoredKitKey() {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem(LOCAL_KIT_KEY_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent("arcpay:kit-key-updated"));
}
