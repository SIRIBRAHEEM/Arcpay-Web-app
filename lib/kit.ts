"use client";

import { AppKit } from "@circle-fin/app-kit";
import { createViemAdapterFromProvider } from "@circle-fin/adapter-viem-v2";
import type { EIP1193Provider } from "viem";

const LOCAL_KIT_KEY_STORAGE_KEY = "arcpay:circle-kit-key";

let kit: AppKit | null = null;
let cachedRuntimeKitKey = "";

function normalizeKitKey(value: string) {
  const cleaned = value.trim();

  if (!cleaned) return "";

  if (cleaned.startsWith("KIT_KEY:")) {
    return cleaned;
  }

  return `KIT_KEY:${cleaned}`;
}

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
  return normalizeKitKey(process.env.NEXT_PUBLIC_KIT_KEY ?? "");
}

export function getStoredKitKey() {
  if (typeof window === "undefined") return "";

  return normalizeKitKey(
    window.localStorage.getItem(LOCAL_KIT_KEY_STORAGE_KEY) ?? ""
  );
}

export function getKitKey() {
  return getBuildTimeKitKey() || getStoredKitKey() || normalizeKitKey(cachedRuntimeKitKey);
}

export async function getRuntimeKitKey() {
  if (cachedRuntimeKitKey) return normalizeKitKey(cachedRuntimeKitKey);

  if (typeof window === "undefined") return "";

  try {
    const response = await fetch("/api/kit-key", {
      method: "GET",
      cache: "no-store"
    });

    if (!response.ok) return "";

    const data = (await response.json()) as {
      hasKey?: boolean;
      kitKey?: string;
    };

    cachedRuntimeKitKey = normalizeKitKey(data.kitKey ?? "");
    return cachedRuntimeKitKey;
  } catch {
    return "";
  }
}

export async function getResolvedKitKey() {
  return getKitKey() || (await getRuntimeKitKey());
}

export function hasCloudKitKey() {
  return Boolean(getBuildTimeKitKey() || cachedRuntimeKitKey);
}

export function saveStoredKitKey(value: string) {
  if (typeof window === "undefined") return;

  const cleaned = normalizeKitKey(value);

  if (!cleaned) {
    window.localStorage.removeItem(LOCAL_KIT_KEY_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent("arcpay:kit-key-updated"));
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
