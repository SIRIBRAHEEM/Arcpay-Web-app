"use client";

import { ARC_BLOCK_EXPLORER, type SupportedDepositChain } from "@/lib/arc";
import { getAppKit, getKitKey } from "@/lib/kit";

export type WalletAdapter = unknown;

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
  token: "USDC" | "EURC";
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

export async function swapUsdcToEurc({
  adapter,
  amount
}: {
  adapter: WalletAdapter;
  amount: string;
}) {
  const kitKey = getKitKey();

  if (!kitKey) {
    throw new Error("NEXT_PUBLIC_KIT_KEY is required to swap USDC/EURC with Circle App Kit.");
  }

  const kit = getAppKit() as unknown as {
    swap: (params: unknown) => Promise<unknown>;
  };

  return kit.swap({
    from: { adapter, chain: "Arc_Testnet" },
    tokenIn: "USDC",
    tokenOut: "EURC",
    amountIn: amount,
    config: {
      kitKey,
      slippageBps: 50
    }
  });
}

export function extractTransaction(result: unknown): ExtractedTransaction {
  const value = result as {
    txHash?: string;
    hash?: string;
    explorerUrl?: string;
    steps?: Array<{
      txHash?: string;
      hash?: string;
      explorerUrl?: string;
      state?: string;
    }>;
  };

  const directHash = value?.txHash ?? value?.hash;
  const directExplorer = value?.explorerUrl;

  if (directHash || directExplorer) {
    return {
      hash: directHash,
      explorerUrl: directExplorer ?? (directHash ? `${ARC_BLOCK_EXPLORER}/tx/${directHash}` : undefined),
      raw: result
    };
  }

  const successfulStep = value?.steps?.find((step) => step.txHash || step.hash || step.explorerUrl);
  const hash = successfulStep?.txHash ?? successfulStep?.hash;
  const explorerUrl = successfulStep?.explorerUrl ?? (hash ? `${ARC_BLOCK_EXPLORER}/tx/${hash}` : undefined);

  return {
    hash,
    explorerUrl,
    raw: result
  };
}
