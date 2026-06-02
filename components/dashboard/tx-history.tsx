"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowDownToLine,
  ArrowLeftRight,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Link2,
  RefreshCcw,
  Send
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { loadTransactions, type ActivityTransaction } from "@/lib/transactions";
import { cn, shortAddress } from "@/lib/utils";
import { useWalletStore } from "@/store/wallet-store";

const iconByType = {
  send: Send,
  deposit: ArrowDownToLine,
  bridge: ArrowLeftRight,
  receive: ArrowDownToLine,
  request: Link2
};

const INITIAL_VISIBLE_TRANSACTIONS = 4;
const VIEW_MORE_STEP = 5;

export function TxHistory() {
  const address = useWalletStore((state) => state.address);
  const [transactions, setTransactions] = useState<ActivityTransaction[]>([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_TRANSACTIONS);
  const [loading, setLoading] = useState(false);
  const [activityError, setActivityError] = useState("");

  const refreshActivity = useCallback(async (currentAddress = address) => {
    if (!currentAddress) {
      setTransactions([]);
      setActivityError("");
      setLoading(false);
      return;
    }

    setLoading(true);

    const result = await loadTransactions(currentAddress);
    setTransactions(result.transactions);
    setActivityError(result.error ?? "");
    setLoading(false);
  }, [address]);

  useEffect(() => {
    if (!address) {
      setTransactions([]);
      setActivityError("");
      return;
    }

    const currentAddress = address;

    function refresh() {
      void refreshActivity(currentAddress);
    }

    refresh();

    window.addEventListener("arcpay:transactions", refresh);

    return () => {
      window.removeEventListener("arcpay:transactions", refresh);
    };
  }, [address, refreshActivity]);

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_TRANSACTIONS);
  }, [address, transactions.length]);

  const visibleTransactions = useMemo(() => {
    return transactions.slice(0, visibleCount);
  }, [transactions, visibleCount]);

  const hiddenCount = Math.max(transactions.length - visibleCount, 0);
  const canViewMore = hiddenCount > 0;
  const canCollapse = transactions.length > INITIAL_VISIBLE_TRANSACTIONS && visibleCount > INITIAL_VISIBLE_TRANSACTIONS;

  function viewMore() {
    setVisibleCount((current) =>
      Math.min(current + VIEW_MORE_STEP, transactions.length)
    );
  }

  function collapse() {
    setVisibleCount(INITIAL_VISIBLE_TRANSACTIONS);
  }

  return (
    <Card className="glass w-full min-w-0 rounded-[1.25rem] shadow-card sm:rounded-[1.5rem]">
      <CardHeader className="flex flex-col gap-3 space-y-0 p-3.5 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="min-w-0">
          <CardTitle>Activity</CardTitle>
          {transactions.length ? (
            <p className="mt-1 text-xs text-muted-foreground">
              Showing {visibleTransactions.length} of {transactions.length} transactions
            </p>
          ) : null}
        </div>

        <div className="flex min-w-0 items-center gap-2 self-start sm:self-auto">
          <Badge variant="secondary" className="rounded-full">
            Local history
          </Badge>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => void refreshActivity()}
            disabled={loading}
            aria-label="Refresh local activity"
          >
            <RefreshCcw className={cn("size-4", loading && "animate-spin")} />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-3.5 pt-0 sm:p-5 sm:pt-0">
        {activityError ? (
          <div className="mb-4 w-full min-w-0 rounded-2xl border border-amber-500/20 bg-amber-100 p-3.5 text-sm leading-6 text-amber-900 dark:bg-amber-400/10 dark:text-amber-100 sm:p-4">
            {activityError}
          </div>
        ) : null}

        {transactions.length ? (
          <>
            <div className="grid w-full min-w-0 gap-2.5 sm:gap-3">
              {visibleTransactions.map((tx) => {
                const Icon = iconByType[tx.type];

                return (
                  <div
                    key={tx.id}
                    className="flex min-w-0 flex-col gap-3 rounded-2xl border border-slate-950/10 bg-white/75 p-3.5 dark:border-white/10 dark:bg-white/[0.06] sm:flex-row sm:items-center sm:justify-between sm:p-4"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div
                        className={cn(
                          "grid size-10 shrink-0 place-items-center rounded-2xl",
                          tx.type === "send"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-200"
                            : tx.type === "bridge"
                              ? "bg-violet-100 text-violet-700 dark:bg-violet-400/10 dark:text-violet-200"
                              : tx.type === "request"
                                ? "bg-sky-100 text-sky-800 dark:bg-sky-400/10 dark:text-sky-200"
                                : "bg-primary/10 text-primary"
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
                          {tx.memo ? ` - ${tx.memo}` : ""}
                        </p>
                      </div>
                    </div>

                    <div className="flex w-full min-w-0 shrink-0 items-center justify-between gap-2 sm:w-auto sm:justify-end">
                      <Badge variant="outline" className="rounded-full">
                        {tx.state}
                      </Badge>

                      {tx.explorerUrl ? (
                        <a
                          href={tx.explorerUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Open transaction on explorer"
                          className="rounded-full p-2 text-muted-foreground hover:bg-slate-950/5 hover:text-foreground dark:hover:bg-white/10"
                        >
                          <ExternalLink className="size-4" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>

            {canViewMore || canCollapse ? (
              <div className="mt-5 flex w-full min-w-0 flex-col gap-2 sm:flex-row">
                {canViewMore ? (
                  <Button
                    type="button"
                    variant="secondary"
                    className="h-11 flex-1 rounded-2xl"
                    onClick={viewMore}
                  >
                    View more
                    <ChevronDown className="ml-2 size-4" />
                    <span className="ml-1 text-xs text-muted-foreground">
                      {hiddenCount} left
                    </span>
                  </Button>
                ) : null}

                {canCollapse ? (
                  <Button
                    type="button"
                    variant="outline"
                    className="h-11 flex-1 rounded-2xl"
                    onClick={collapse}
                  >
                    Show less
                    <ChevronUp className="ml-2 size-4" />
                  </Button>
                ) : null}
              </div>
            ) : null}
          </>
        ) : (
          <div className="w-full min-w-0 rounded-2xl border border-dashed border-slate-950/15 bg-white/55 p-5 text-center dark:border-white/10 dark:bg-white/[0.04] sm:p-6">
            <p className="font-semibold">No local activity yet</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Sends, deposits, bridge transfers, requests, and detected transfers will stay in this browser.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
