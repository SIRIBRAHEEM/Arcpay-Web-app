"use client";

import {
  ARC_BLOCK_EXPLORER,
  EXPLORER_BY_APPKIT_CHAIN,
  type AppKitChain,
  type SupportedDepositChain
} from "@/lib/arc";
import { getAppKit, getResolvedKitKey } from "@/lib/kit";

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

export type SwapEstimateResult = {
  estimatedOutput?: string;
  amountOut?: string;
  tokenOut?: ArcStableToken;
  raw?: unknown;
};

export type SwapResult = {
  tokenIn?: ArcStableToken;
  tokenOut?: ArcStableToken;
  amountIn?: string;
  amountOut?: string;
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

function normalizeAmount(value: string) {
  const cleaned = value.trim();

  if (!cleaned) {
    throw new Error("Enter an amount first.");
  }

  const numberValue = Number(cleaned);

  if (!Number.isFinite(numberValue) || numberValue <= 0) {
    throw new Error("Enter a valid amount greater than 0.");
  }

  return numberValue.toFixed(2);
}

function normalizeKitKey(value: string) {
  const cleaned = value.trim();

  if (!cleaned) return "";

  if (cleaned.startsWith("KIT_KEY:")) {
    return cleaned;
  }

  return `KIT_KEY:${cleaned}`;
}

function formatSwapError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  const lowerMessage = message.toLowerCase();

  if (
    lowerMessage.includes("failed to fetch") ||
    lowerMessage.includes("maximum retry") ||
    lowerMessage.includes("quoteswap") ||
    lowerMessage.includes("quote")
  ) {
    return new Error(
      "Circle testnet quote service could not return a swap route right now. Your Kit Key can be valid and this can still happen. Try again later, try Chrome, or use Bridge/Receive."
    );
  }

  if (
    lowerMessage.includes("route") ||
    lowerMessage.includes("not supported") ||
    lowerMessage.includes("unsupported")
  ) {
    return new Error(
      "This swap route is not supported right now. On testnet, use USDC ↔ EURC on Arc Testnet."
    );
  }

  return error;
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

export async function estimateSwapStablecoins({
  adapter,
  amount,
  tokenIn,
  tokenOut
}: {
  adapter: WalletAdapter;
  amount: string;
  tokenIn: ArcStableToken;
  tokenOut: ArcStableToken;
}) {
  const kitKey = normalizeKitKey(await getResolvedKitKey());

  if (!kitKey) {
    throw new Error(
      "Swap is not configured. Add CIRCLE_KIT_KEY and NEXT_PUBLIC_KIT_KEY in Vercel, then redeploy without cache."
    );
  }

  if (tokenIn === tokenOut) {
    throw new Error("Choose two different tokens to swap.");
  }

  const safeAmount = normalizeAmount(amount);

  const kit = getAppKit() as unknown as {
    estimateSwap: (params: unknown) => Promise<SwapEstimateResult>;
  };

  try {
    return await kit.estimateSwap({
      from: {
        adapter,
        chain: "Arc_Testnet"
      },
      tokenIn,
      tokenOut,
      amountIn: safeAmount,
      config: {
        kitKey
      }
    });
  } catch (error) {
    throw formatSwapError(error);
  }
}

export async function swapStablecoins({
  adapter,
  amount,
  tokenIn,
  tokenOut,
  chain = "Arc_Testnet",
  slippageBps = 300
}: {
  adapter: WalletAdapter;
  amount: string;
  tokenIn: ArcStableToken;
  tokenOut: ArcStableToken;
  chain?: AppKitChain;
  slippageBps?: number;
}) {
  const kitKey = normalizeKitKey(await getResolvedKitKey());

  if (!kitKey) {
    throw new Error(
      "Swap is not configured. Add CIRCLE_KIT_KEY and NEXT_PUBLIC_KIT_KEY in Vercel, then redeploy without cache."
    );
  }

  if (tokenIn === tokenOut) {
    throw new Error("Choose two different tokens to swap.");
  }

  if (chain !== "Arc_Testnet") {
    throw new Error("Swap is currently available only on Arc Testnet.");
  }

  if (typeof navigator !== "undefined" && !navigator.onLine) {
    throw new Error("You are offline. Check your internet connection and try again.");
  }

  const safeAmount = normalizeAmount(amount);

  const kit = getAppKit() as unknown as {
    estimateSwap: (params: unknown) => Promise<SwapEstimateResult>;
    swap: (params: unknown) => Promise<SwapResult>;
  };

  const params = {
    from: {
      adapter,
      chain: "Arc_Testnet"
    },
    tokenIn,
    tokenOut,
    amountIn: safeAmount,
    config: {
      kitKey,
      slippageBps
    }
  };

  try {
    await kit.estimateSwap(params);
    return await kit.swap(params);
  } catch (error) {
    throw formatSwapError(error);
  }
}

export async function swapUsdcToEurc({
  adapter,
  amount
}: {
  adapter: WalletAdapter;
  amount: string;
}) {
  return swapStablecoins({
    adapter,
    amount,
    tokenIn: "USDC",
    tokenOut: "EURC",
    chain: "Arc_Testnet"
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

  const kit = getAppKit() as unknown as {
    bridge: (params: unknown) => Promise<unknown>;
  };

  return kit.bridge({
    from: {
      adapter,
      chain: fromChain
    },
    to: {
      adapter,
      chain: toChain
    },
    amount: normalizeAmount(amount),
    token: "USDC"
  });
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
