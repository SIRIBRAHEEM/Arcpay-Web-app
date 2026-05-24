"use client";

export type ActivityTransaction = {
  id: string;
  type: "send" | "deposit" | "bridge" | "receive" | "request";
  token: "USDC" | "EURC" | "cirBTC";
  amount: string;
  recipient?: string;
  chain?: string;
  state: "pending" | "success" | "error";
  hash?: string;
  explorerUrl?: string;
  memo?: string;
  createdAt: number;
};

export type TransactionLoadResult = {
  transactions: ActivityTransaction[];
  cloud: boolean;
  error?: string;
};

const TRANSACTION_EVENT = "arcpay:transactions";
const TRANSACTION_ERROR_EVENT = "arcpay:transactions-error";

export async function loadTransactions(address: string): Promise<TransactionLoadResult> {
  if (typeof window === "undefined") {
    return {
      transactions: [],
      cloud: false
    };
  }

  try {
    const response = await fetch(`/api/transactions?address=${encodeURIComponent(address)}`, {
      cache: "no-store"
    });

    const data = (await response.json()) as TransactionLoadResult;

    if (!response.ok) {
      return {
        transactions: [],
        cloud: false,
        error: data.error ?? "Cloud activity is not configured yet."
      };
    }

    return {
      transactions: Array.isArray(data.transactions)
        ? data.transactions.sort((a, b) => b.createdAt - a.createdAt)
        : [],
      cloud: Boolean(data.cloud)
    };
  } catch (error) {
    return {
      transactions: [],
      cloud: false,
      error: error instanceof Error ? error.message : "Could not load cloud activity."
    };
  }
}

export async function saveTransaction(address: string, transaction: ActivityTransaction) {
  if (typeof window === "undefined") return false;

  try {
    const response = await fetch("/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        address,
        transaction
      })
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      throw new Error(data?.error ?? "Could not save cloud activity.");
    }

    window.dispatchEvent(new CustomEvent(TRANSACTION_EVENT));
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not save cloud activity.";

    window.dispatchEvent(
      new CustomEvent(TRANSACTION_ERROR_EVENT, {
        detail: message
      })
    );

    console.error("[ArcPay activity]", message);
    return false;
  }
}
