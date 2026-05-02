"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchUnifiedBalance, type UnifiedBalanceResult } from "@/lib/appkit-actions";
import { useWalletStore } from "@/store/wallet-store";

export function useUnifiedBalance() {
  const adapter = useWalletStore((state) => state.adapter);
  const [balance, setBalance] = useState<UnifiedBalanceResult | null>(null);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!adapter) return;

    setLoading(true);

    try {
      const result = await fetchUnifiedBalance(adapter);
      setBalance(result);
    } finally {
      setLoading(false);
    }
  }, [adapter]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    balance,
    loading,
    refresh
  };
}
