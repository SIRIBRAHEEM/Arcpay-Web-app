"use client";

import { useEffect, useMemo, useState } from "react";
import { Copy, Link2, Share2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ARC_CHAIN_ID } from "@/lib/arc";
import { saveTransaction } from "@/lib/transactions";
import { shortAddress } from "@/lib/utils";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useWalletStore } from "@/store/wallet-store";

export function ReceivePanel() {
  const address = useWalletStore((state) => state.address);
  const copy = useCopyToClipboard();
  const [requestAmount, setRequestAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [origin, setOrigin] = useState("https://arcpay-web-app.vercel.app");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const requestUri = useMemo(() => {
    if (!address) return "";
    const trimmed = requestAmount.trim();

    if (!trimmed) return `ethereum:${address}@${ARC_CHAIN_ID}`;

    return `ethereum:${address}@${ARC_CHAIN_ID}?value=${encodeURIComponent(trimmed)}`;
  }, [address, requestAmount]);

  const shareLink = useMemo(() => {
    if (!address) return "";

    const params = new URLSearchParams({
      to: address,
      token: "USDC",
      chain: "Arc_Testnet"
    });

    const trimmedAmount = requestAmount.trim();
    const trimmedMemo = memo.trim();

    if (trimmedAmount) params.set("amount", trimmedAmount);
    if (trimmedMemo) params.set("memo", trimmedMemo);

    return `${origin}/request?${params.toString()}`;
  }, [address, memo, origin, requestAmount]);

  function recordRequest() {
    if (!address) return;

    void saveTransaction(address, {
      id: crypto.randomUUID(),
      type: "request",
      token: "USDC",
      amount: requestAmount.trim() || "0",
      chain: "Arc_Testnet",
      state: "pending",
      memo: memo.trim() || "Shareable payment request",
      createdAt: Date.now()
    });
  }

  async function copyShareLink() {
    await copy(shareLink, "Request link copied");
    recordRequest();
  }

  async function shareRequest() {
    if (!navigator.share) {
      await copyShareLink();
      return;
    }

    try {
      await navigator.share({
        title: "ArcPay payment request",
        text: requestAmount.trim()
          ? `Requesting ${requestAmount.trim()} USDC on ArcPay`
          : "ArcPay payment request",
        url: shareLink
      });
      recordRequest();
    } catch {
      toast.error("Share canceled");
    }
  }

  if (!address) return null;

  return (
    <Card className="glass rounded-[1.5rem] shadow-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 sm:p-5">
        <CardTitle>Request Money</CardTitle>
        <Link2 className="size-5 text-primary" />
      </CardHeader>

      <CardContent className="p-4 pt-0 sm:p-5 sm:pt-0">
        <div className="grid gap-4 md:grid-cols-[164px_1fr] md:items-center">
          <div className="mx-auto grid w-full max-w-44 place-items-center rounded-2xl border border-slate-950/10 bg-white p-3 dark:border-white/10 md:mx-0">
            <QRCodeSVG value={shareLink || requestUri} size={132} bgColor="#ffffff" fgColor="#050914" />
          </div>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="receive-address">Your Arc address</Label>
              <div className="flex min-w-0 gap-2">
                <Input id="receive-address" readOnly value={shortAddress(address, 8)} />
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => void copy(address, "Address copied")}
                  aria-label="Copy address"
                >
                  <Copy className="size-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="request-amount">Amount</Label>
              <Input
                id="request-amount"
                inputMode="decimal"
                placeholder="50.00"
                value={requestAmount}
                onChange={(event) => setRequestAmount(event.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="request-memo">Memo</Label>
              <Input
                id="request-memo"
                placeholder="Invoice, service, or note"
                value={memo}
                onChange={(event) => setMemo(event.target.value)}
              />
            </div>

            <Button
              type="button"
              variant="secondary"
              className="gap-2 rounded-2xl"
              onClick={() => void copyShareLink()}
            >
              <Copy className="size-4" />
              Copy link
            </Button>

            <Button
              type="button"
              className="gap-2 rounded-2xl"
              onClick={() => void shareRequest()}
            >
              <Share2 className="size-4" />
              Share request
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
