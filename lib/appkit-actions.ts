"use client";

import {
  ARC_BLOCK_EXPLORER,
  EXPLORER_BY_APPKIT_CHAIN,
  type AppKitChain,
  type SupportedDepositChain
} from "@/lib/arc";
import { getAppKit } from "@/lib/kit";

export type WalletAdapter = unknown;

export type ArcStableToken = "USDC" | "EURC" | "cirBTC";

export type UnifiedBalanceResult = {
  token: "USDC";
  totalConfirmedBalance: string;
  totalPendingBalance?: string;
  breakdown: Array<Record<string, string | number | undefined>>;
};

export type ExtractedTransaction = {
  hash?: string;
  explorerUrl?: string;
  raw: unknown;
};

const decimalAmountRegex = /^(?:0|[1-9]\d*)(?:\.\d{1,18})?$/;

function normalizeAmount(value: string) {
  const cleaned = value.trim();

  if (!cleaned) {
    throw new Error("Enter an amount first.");
  }

  if (!decimalAmountRegex.test(cleaned)) {
    throw new Error("Enter a valid decimal amount with up to 18 decimals.");
  }

  const numberValue = Number(cleaned);

  if (!Number.isFinite(numberValue) || numberValue <= 0) {
    throw new Error("Enter a valid amount greater than 0.");
  }

  return cleaned;
}

function isErrorRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function sanitizeErrorText(value: string) {
  return value.replace(/KIT_KEY:[A-Za-z0-9:_-]+/g, "KIT_KEY:***").trim();
}

function addErrorPart(parts: Set<string>, value: unknown) {
  if (typeof value !== "string" && typeof value !== "number") return;

  const text = sanitizeErrorText(String(value));

  if (text) {
    parts.add(text);
  }
}

function collectErrorParts(
  value: unknown,
  parts: Set<string>,
  seen = new WeakSet<object>(),
  depth = 0
) {
  if (depth > 3) return;

  if (typeof value === "string" || typeof value === "number") {
    addErrorPart(parts, value);
    return;
  }

  if (!isErrorRecord(value)) return;

  if (seen.has(value)) return;
  seen.add(value);

  addErrorPart(parts, value.name);
  addErrorPart(parts, value.message);
  addErrorPart(parts, value.reason);
  addErrorPart(parts, value.details);
  addErrorPart(parts, value.shortMessage);
  addErrorPart(parts, value.code);
  addErrorPart(parts, value.status);

  const cause = value.cause;
  if (cause) {
    collectErrorParts(cause, parts, seen, depth + 1);
  }

  const trace = isErrorRecord(cause) ? cause.trace : value.trace;
  if (isErrorRecord(trace)) {
    const validationErrors = trace.validationErrors;

    if (Array.isArray(validationErrors)) {
      validationErrors.forEach((item) => collectErrorParts(item, parts, seen, depth + 1));
    }
  }
}

function getErrorMessage(error: unknown) {
  const parts = new Set<string>();
  collectErrorParts(error, parts);

  return [...parts].join(" | ");
}

function getErrorDetail(error: unknown) {
  const message = getErrorMessage(error);

  if (!message) return "";

  return message.length > 240 ? `${message.slice(0, 237)}...` : message;
}

function logAppKitError(scope: string, error: unknown) {
  if (typeof console === "undefined") return;

  const detail = getErrorDetail(error);
  console.error(`[ArcPay ${scope}]`, detail || error);
}

function formatBridgeError(error: unknown) {
  const message = getErrorMessage(error);
  const lowerMessage = message.toLowerCase();
  const detail = getErrorDetail(error);
  const detailSuffix = detail ? ` Circle returned: ${detail}` : "";

  if (
    lowerMessage.includes("user rejected") ||
    lowerMessage.includes("user denied") ||
    lowerMessage.includes("rejected the request")
  ) {
    return new Error("The wallet rejected the bridge. Confirm the bridge steps in your wallet to continue.");
  }

  if (
    lowerMessage.includes("insufficient") ||
    lowerMessage.includes("balance") ||
    lowerMessage.includes("funds")
  ) {
    return new Error(
      `Bridge needs enough source-chain USDC plus native gas on the source chain. Add test funds, then try again.${detailSuffix}`
    );
  }

  if (
    lowerMessage.includes("route") ||
    lowerMessage.includes("not supported") ||
    lowerMessage.includes("unsupported") ||
    lowerMessage.includes("chain")
  ) {
    return new Error(
      `This bridge route is not supported by App Kit right now. Choose another supported source and destination chain.${detailSuffix}`
    );
  }

  if (
    lowerMessage.includes("failed to fetch") ||
    lowerMessage.includes("network") ||
    lowerMessage.includes("maximum retry") ||
    lowerMessage.includes("estimate")
  ) {
    return new Error(
      `Circle could not estimate the bridge route. Check your connection, source-chain gas, and test USDC balance, then try again.${detailSuffix}`
    );
  }

  return new Error(detail || "Circle App Kit could not complete the bridge.");
}

export async function fetchUnifiedBalance(adapter: WalletAdapter) {
  const kit = getAppKit() as unknown as {
    unifiedBalance: {
      getBalances: (params: unknown) => Promise<UnifiedBalanceResult>;
    };
  };

  return kit.unifiedBalance.getBalances({
    sources: { adapter },
    networkType: "testnet",
    includePending: true,
    token: "USDC"
  });
}

export async function depositUnifiedBalance({
  adapter,
  amount,
  chain
}: {
  adapter: WalletAdapter;
  amount: string;
  chain: SupportedDepositChain;
}) {
  const kit = getAppKit() as unknown as {
    unifiedBalance: {
      deposit: (params: unknown) => Promise<unknown>;
    };
  };

  return kit.unifiedBalance.deposit({
    from: {
      adapter,
      chain
    },
    amount: normalizeAmount(amount),
    token: "USDC"
  });
}

export async function spendUnifiedUsdc({
  adapter,
  amount,
  recipient
}: {
  adapter: WalletAdapter;
  amount: string;
  recipient: string;
}) {
  const kit = getAppKit() as unknown as {
    unifiedBalance: {
      spend: (params: unknown) => Promise<unknown>;
    };
  };

  return kit.unifiedBalance.spend({
    amount: normalizeAmount(amount),
    token: "USDC",
    from: {
      adapter
    },
    to: {
      adapter,
      chain: "Arc_Testnet",
      recipientAddress: recipient
    }
  });
}

export async function sendArcToken({
  adapter,
  amount,
  recipient,
  token
}: {
  adapter: WalletAdapter;
  amount: string;
  recipient: string;
  token: ArcStableToken;
}) {
  const kit = getAppKit() as unknown as {
    send: (params: unknown) => Promise<unknown>;
  };

  return kit.send({
    from: {
      adapter,
      chain: "Arc_Testnet"
    },
    to: recipient,
    amount: normalizeAmount(amount),
    token
  });
}

export async function bridgeUsdc({
  adapter,
  amount,
  fromChain,
  toChain
}: {
  adapter: WalletAdapter;
  amount: string;
  fromChain: AppKitChain;
  toChain: AppKitChain;
}) {
  if (fromChain === toChain) {
    throw new Error("Choose two different chains to bridge.");
  }

  if (typeof navigator !== "undefined" && !navigator.onLine) {
    throw new Error("You are offline. Check your internet connection and try again.");
  }

  const kit = getAppKit() as unknown as {
    estimateBridge: (params: unknown) => Promise<unknown>;
    bridge: (params: unknown) => Promise<unknown>;
  };

  const params = {
    from: {
      adapter,
      chain: fromChain
    },
    to: {
      adapter,
      chain: toChain
    },
    amount: normalizeAmount(amount),
    token: "USDC",
    config: {
      batchTransactions: false
    }
  };

  try {
    await kit.estimateBridge(params);
    return await kit.bridge(params);
  } catch (error) {
    logAppKitError("bridge", error);
    throw formatBridgeError(error);
  }
}

export function extractTransaction(result: unknown): ExtractedTransaction {
  const value = result as {
    txHash?: string;
    hash?: string;
    transactionHash?: string;
    explorerUrl?: string;
    chain?: {
      chain?: AppKitChain;
    };
    steps?: Array<{
      txHash?: string;
      hash?: string;
      transactionHash?: string;
      explorerUrl?: string;
      chain?: {
        chain?: AppKitChain;
      };
    }>;
  };

  const directHash = value.txHash ?? value.hash ?? value.transactionHash;
  const directExplorerUrl = value.explorerUrl;

  if (directHash || directExplorerUrl) {
    const chain = value.chain?.chain;
    const explorer = chain ? EXPLORER_BY_APPKIT_CHAIN[chain] : ARC_BLOCK_EXPLORER;

    return {
      hash: directHash,
      explorerUrl:
        directExplorerUrl ?? (directHash ? `${explorer}/tx/${directHash}` : undefined),
      raw: result
    };
  }

  const step = value.steps?.find(
    (item) => item.txHash || item.hash || item.transactionHash || item.explorerUrl
  );

  const hash = step?.txHash ?? step?.hash ?? step?.transactionHash;
  const stepExplorerUrl = step?.explorerUrl;
  const chain = step?.chain?.chain;
  const explorer = chain ? EXPLORER_BY_APPKIT_CHAIN[chain] : ARC_BLOCK_EXPLORER;

  return {
    hash,
    explorerUrl: stepExplorerUrl ?? (hash ? `${explorer}/tx/${hash}` : undefined),
    raw: result
  };
}
