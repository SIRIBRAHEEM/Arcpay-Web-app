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
  storage: "local";
  error?: string;
};

const TRANSACTION_EVENT = "arcpay:transactions";
const MAX_LOCAL_TRANSACTIONS = 100;

function activityKey(address: string) {
  return `arcpay:activity:${address.toLowerCase()}`;
}

function parseTransactions(value: string | null) {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value) as ActivityTransaction[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function readLocalTransactions(address: string) {
  return parseTransactions(localStorage.getItem(activityKey(address)))
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, MAX_LOCAL_TRANSACTIONS);
}

export async function loadTransactions(address: string): Promise<TransactionLoadResult> {
  if (typeof window === "undefined") {
    return {
      transactions: [],
      storage: "local"
    };
  }

  try {
    return {
      transactions: readLocalTransactions(address),
      storage: "local"
    };
  } catch (error) {
    return {
      transactions: [],
      storage: "local",
      error: error instanceof Error ? error.message : "Could not load local activity."
    };
  }
}

export async function saveTransaction(address: string, transaction: ActivityTransaction) {
  if (typeof window === "undefined") return false;

  try {
    const current = readLocalTransactions(address);
    const filtered = current.filter((item) => item.id !== transaction.id);
    const next = [transaction, ...filtered]
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, MAX_LOCAL_TRANSACTIONS);

    localStorage.setItem(activityKey(address), JSON.stringify(next));

    window.dispatchEvent(new CustomEvent(TRANSACTION_EVENT));
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not save local activity.";

    console.error("[ArcPay activity]", message);
    return false;
  }
}
