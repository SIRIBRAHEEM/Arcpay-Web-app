"use client";

import { getAppKit } from "@/lib/kit";
import type { ArcStableToken, WalletAdapter } from "@/lib/appkit-actions";

const decimalAmountRegex = /^(?:0|[1-9]\d*)(?:\.\d{1,18})?$/;

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
  // Support the documented name + common fallbacks from older examples/docs.
  // Prefer NEXT_PUBLIC_* so it is inlined for the client bundle on Vercel.
  const candidates = [
    process.env.NEXT_PUBLIC_KIT_KEY,
    process.env.KIT_KEY,
    process.env.CIRCLE_KIT_KEY,
    process.env.NEXT_PUBLIC_CIRCLE_KIT_KEY,
  ];

  const value = candidates.find((v) => v && v.length > 5);

  if (!value) {
    throw new Error(
      "Missing Circle App Kit key. Add NEXT_PUBLIC_KIT_KEY (preferred) in Vercel Environment Variables for Production."
    );
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
    return "Swap service error.";
  }
}

function userError(error: unknown) {
  const message = errorText(error);
  const lower = message.toLowerCase();

  if (lower.includes("user rejected") || lower.includes("user denied")) {
    return new Error("Transaction rejected in wallet. Please confirm to continue.");
  }

  if (lower.includes("insufficient") || lower.includes("balance") || lower.includes("funds")) {
    return new Error("Insufficient balance or gas (USDC). Get test USDC from faucet.circle.com on Arc Testnet.");
  }

  if (lower.includes("not supported") || lower.includes("unsupported") || lower.includes("route") || lower.includes("token")) {
    return new Error("This token pair is not supported yet. Use USDC ↔ EURC on Arc Testnet.");
  }

  if (lower.includes("unauthorized") || lower.includes("401") || lower.includes("kit key")) {
    return new Error("Invalid or missing App Kit key. Check NEXT_PUBLIC_KIT_KEY in Vercel (or KIT_KEY / CIRCLE_KIT_KEY as fallback).");
  }

  if (lower.includes("context") || lower.includes("undefined")) {
    return new Error("Wallet context issue. Reconnect your wallet and try again.");
  }

  if (
    lower.includes("service_unknown_error") ||
    lower.includes("createswap") ||
    lower.includes("maximum retry") ||
    lower.includes("failed to fetch") ||
    lower.includes("stablecoin service") ||
    lower.includes("could not create this swap")
  ) {
    return new Error("Swap service temporarily unavailable. Try again in a few minutes, use Chrome/MetaMask, or check faucet for test funds.");
  }

  return new Error(message || "Swap failed. Please try again with a small amount of USDC.");
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
    throw new Error("You are offline. Check your internet connection.");
  }

  const kit = getAppKit() as unknown as {
    estimateSwap?: (params: unknown) => Promise<unknown>;
    swap: (params: unknown) => Promise<unknown>;
  };

  if (typeof kit.swap !== "function") {
    throw new Error("Swap not available in current App Kit version.");
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
      kitKey: getPublicCredential()
      // Only kitKey per official docs. Extra fields were causing createSwap failures.
    }
  };

  try {
    if (typeof kit.estimateSwap === "function") {
      try {
        await kit.estimateSwap(params);
      } catch {
        // Non-blocking
      }
    }

    const result = await kit.swap(params);
    return result;
  } catch (error) {
    console.error("[ArcPay exchange]", errorText(error));
    throw userError(error);
  }
}
