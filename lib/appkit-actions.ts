"use client";

import { ARC_BLOCK_EXPLORER, EXPLORER_BY_APPKIT_CHAIN, type AppKitChain, type SupportedDepositChain } from "@/lib/arc";
import { getAppKit, getKitKey } from "@/lib/kit";

export type WalletAdapter = unknown;

export type ArcStableToken = "USDC" | "EURC";

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

export type SwapResult = {
  tokenIn?: ArcStableToken;
  tokenOut?: ArcStableToken;
  amountIn?: string;
  amountOut?: string;
  txHash?: string;
  hash?: string;
  explorerUrl?: string;
  steps?: Array<{
    txHash?: string;
    hash?: string;
    explorerUrl?: string;
  }>;
};

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
    from: { adapter, chain },
    amount,
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
    amount,
    token: "USDC",
    from: { adapter },
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
    from: { adapter, chain: "Arc_Testnet" },
    to: recipient,
    amount,
    token
  });
}

export async function swapStablecoins({
  adapter,
  amount,
  tokenIn,
  tokenOut,
  chain = "Arc_Testnet",
  slippageBps = 50
}: {
  adapter: WalletAdapter;
  amount: string;
  tokenIn: ArcStableToken;
  tokenOut: ArcStableToken;
  chain?: AppKitChain;
  slippageBps?: number;
}) {
  const kitKey = getKitKey();

  if (!kitKey) {
    throw new Error("NEXT_PUBLIC_KIT_KEY is required for swaps with Circle App Kit.");
  }

  if (tokenIn === tokenOut) {
    throw new Error("Choose two different tokens to swap.");
  }

  const kit = getAppKit() as unknown as {
    swap: (params: unknown) => Promise<SwapResult>;
  };

  return kit.swap({
    from: { adapter, chain },
    tokenIn,
    tokenOut,
    amountIn: amount,
    config: {
      kitKey,
      slippageBps
    }
  });
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
    from: { adapter, chain: fromChain },
    to: { adapter, chain: toChain },
    amount
  });
}

export function extractTransaction(result: unknown): ExtractedTransaction {
  const value = result as {
    txHash?: string;
    hash?: string;
    explorerUrl?: string;
    chain?: { chain?: AppKitChain };
    steps?: Array<{
      txHash?: string;
      hash?: string;
      explorerUrl?: string;
      state?: string;
      chain?: { chain?: AppKitChain };
    }>;
  };

  const directHash = value?.txHash ?? value?.hash;
  const directExplorer = value?.explorerUrl;

  if (directHash || directExplorer) {
    const chain = value?.chain?.chain;
    const explorer = chain ? EXPLORER_BY_APPKIT_CHAIN[chain] : ARC_BLOCK_EXPLORER;

    return {
      hash: directHash,
      explorerUrl: directExplorer ?? (directHash ? `${explorer}/tx/${directHash}` : undefined),
      raw: result
    };
  }

  const step = value?.steps?.find((item) => item.txHash || item.hash || item.explorerUrl);
  const hash = step?.txHash ?? step?.hash;
  const chain = step?.chain?.chain;
  const explorer = chain ? EXPLORER_BY_APPKIT_CHAIN[chain] : ARC_BLOCK_EXPLORER;

  return {
    hash,
    explorerUrl: step?.explorerUrl ?? (hash ? `${explorer}/tx/${hash}` : undefined),
    raw: result
  };
}
