"use client";

import { useEffect, useState } from "react";
import { ArrowDownToLine, ExternalLink, Repeat2, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { loadTransactions, type LocalTransaction } from "@/lib/transactions";
import { cn, shortAddress } from "@/lib/utils";
import { useWalletStore } from "@/store/wallet-store";

const iconByType = {
  send: Send,
  deposit: ArrowDownToLine,
  swap: Repeat2,
  receive: ArrowDownToLine
};

export function TxHistory() {
  const address = useWalletStore((state) => state.address);
  const [transactions, setTransactions] = useState<LocalTransaction[]>([]);

  useEffect(() => {
    if (!address) return;

    function refresh() {
      setTransactions(loadTransactions(address));
    }

    refresh();

    window.addEventListener("arcpay:transactions", refresh);
    window.addEventListener("storage", refresh);

    return () => {
      window.removeEventListener("arcpay:transactions", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [address]);

  return (
    <Card className="glass rounded-[2rem] shadow-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6">
        <CardTitle>Activity</CardTitle>
        <Badge variant="secondary" className="rounded-full">
          Local
        </Badge>
      </CardHeader>

      <CardContent className="p-6 pt-0">
        {transactions.length ? (
          <div className="grid gap-3">
            {transactions.map((tx) => {
              const Icon = iconByType[tx.type];

              return (
                <div
                  key={tx.id}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className={cn(
                        "grid size-10 shrink-0 place-items-center rounded-2xl",
                        tx.type === "send" ? "bg-cyan-400/10 text-cyan-300" : "bg-primary/10 text-primary"
                      )}
                    >
                      <Icon className="size-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold capitalize">
                        {tx.type} {tx.amount} {tx.token}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {tx.recipient ? `To ${shortAddress(tx.recipient)}` : tx.chain}
                        {tx.memo ? ` · ${tx.memo}` : ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <Badge variant="outline" className="rounded-full">
                      {tx.state}
                    </Badge>
                    {tx.explorerUrl ? (
                      <a
                        href={tx.explorerUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Open transaction on explorer"
                        className="rounded-full p-2 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                      >
                        <ExternalLink className="size-4" />
                      </a>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center">
            <p className="font-semibold">No local activity yet</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Sends, deposits, swaps, and detected transfers will appear here.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
