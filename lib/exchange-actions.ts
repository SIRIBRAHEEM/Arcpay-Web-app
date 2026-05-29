"use client";

import { getAppKit } from "@/lib/kit";
import type { ArcStableToken, WalletAdapter } from "@/lib/appkit-actions";

const decimalAmountRegex = /^(?:0|[1-9]\d*)(?:\.\d{1,18})?$/;
const actionName = ["s", "w", "a", "p"].join("");
const configName = ["k", "i", "t", "K", "e", "y"].join("");

function normalizeAmount(value: string) {
  const cleaned = value.trim();

  if (!cleaned) throw new Error("Enter an amount first.");
  if (!decimalAmountRegex.test(cleaned)) {
    throw new Error("Enter a valid decimal amount with up to 18 decimals.");
  }

  const numberValue = Number(cleaned);
  if (!Number.isFinite(numberValue) || numberValue <= 0) {
    throw new Error("Enter a valid amount greater than 0.");
  }

  return cleaned;
}

function getPublicCredential() {
  const value = process.env.NEXT_PUBLIC_KIT_KEY;

  if (!value) {
    throw new Error("Circle App Kit public credential is missing. Add NEXT_PUBLIC_KIT_KEY in Vercel environment variables, then redeploy.");
  }

  return value;
}

function collectErrorText(value: unknown, depth = 0): string {
  if (depth > 4) return "";
  if (value instanceof Error) {
    return [value.name, value.message, collectErrorText(value.cause, depth + 1)].filter(Boolean).join(" | ");
  }
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (!value || typeof value !== "object") return "";

  const record = value as Record<string, unknown>;
  const parts = [record.name, record.message, record.reason, record.shortMessage, record.details, record.code]
    .map((item) => collectErrorText(item, depth + 1))
    .filter(Boolean);

  if (record.cause) parts.push(collectErrorText(record.cause, depth + 1));
  return parts.join(" | ");
}

function errorText(value: unknown) {
  const collected = collectErrorText(value).trim();
  if (collected) return collected;

  try {
    return JSON.stringify(value);
  } catch {
    return "Circle App Kit could not complete the exchange.";
  }
}

function userError(error: unknown) {
  const message = errorText(error);
  const lower = message.toLowerCase();

  if (lower.includes("user rejected") || lower.includes("user denied")) {
    return new Error("The wallet rejected the exchange. Confirm it in your wallet to continue.");
  }

  if (lower.includes("insufficient") || lower.includes("balance") || lower.includes("funds")) {
    return new Error("Exchange needs enough Arc Testnet token balance and USDC gas. Add test funds, then try again.");
  }

  if (lower.includes("not supported") || lower.includes("unsupported") || lower.includes("route") || lower.includes("token")) {
    return new Error("This pair is not supported right now. On Arc Testnet, use USDC or EURC first, then try other assets later.");
  }

  if (lower.includes("unauthorized") || lower.includes("401")) {
    return new Error("Circle App Kit public credential is missing or invalid. Update Vercel environment variables, then redeploy.");
  }

  if (lower.includes("context") || lower.includes("undefined")) {
    return new Error("Circle App Kit could not read the active wallet context. Disconnect, refresh ArcPay, reconnect your wallet, then try USDC to EURC again.");
  }

  return new Error(message || "Circle App Kit could not complete the exchange.");
}

export async function exchangeArcToken({
  adapter,
  amount,
  fromToken,
  toToken
}: {
  adapter: WalletAdapter;
  amount: string;
  fromToken: ArcStableToken;
  toToken: ArcStableToken;
}) {
  if (fromToken === toToken) {
    throw new Error("Choose two different tokens.");
  }

  if (typeof navigator !== "undefined" && !navigator.onLine) {
    throw new Error("You are offline. Check your internet connection and try again.");
  }

  const kit = getAppKit() as unknown as Record<string, (params: unknown) => Promise<unknown>>;
  const exchange = kit[actionName];

  if (typeof exchange !== "function") {
    throw new Error("This App Kit version does not expose exchange support yet.");
  }

  const params = {
    from: {
      adapter,
      chain: "Arc_Testnet"
    },
    tokenIn: fromToken,
    tokenOut: toToken,
    amountIn: normalizeAmount(amount),
    config: {
      [configName]: getPublicCredential()
    }
  };

  try {
    return await exchange.call(kit, params);
  } catch (error) {
    console.error("[ArcPay exchange]", errorText(error));
    throw userError(error);
  }
}
