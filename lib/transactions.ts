"use client";

export type LocalTransaction = {
  id: string;
  type: "send" | "deposit" | "swap" | "receive";
  token: "USDC" | "EURC";
  amount: string;
  recipient?: string;
  chain?: string;
  state: "pending" | "success" | "error";
  hash?: string;
  explorerUrl?: string;
  memo?: string;
  createdAt: number;
};

const keyPrefix = "arcpay:transactions";

function keyFor(address: string) {
  return `${keyPrefix}:${address.toLowerCase()}`;
}

export function loadTransactions(address: string) {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(keyFor(address));
    if (!raw) return [];

    const parsed = JSON.parse(raw) as LocalTransaction[];
    return parsed.sort((a, b) => b.createdAt - a.createdAt);
  } catch {
    return [];
  }
}

export function saveTransaction(address: string, transaction: LocalTransaction) {
  if (typeof window === "undefined") return;

  const current = loadTransactions(address);
  const filtered = current.filter((item) => item.id !== transaction.id);
  const next = [transaction, ...filtered].slice(0, 50);

  window.localStorage.setItem(keyFor(address), JSON.stringify(next));
  window.dispatchEvent(new CustomEvent("arcpay:transactions"));
}
