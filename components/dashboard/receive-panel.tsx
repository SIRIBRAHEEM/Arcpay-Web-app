"use client";

import { useEffect, useMemo, useState } from "react";
import { Copy, Link2, Share2, ShieldCheck, Sparkles, WalletCards } from "lucide-react";
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

  const displayAmount = requestAmount.trim() || "0.00";

  return (
    <Card className="stable-money-qr-card rounded-[1.5rem] shadow-card">
      <CardHeader className="relative z-10 flex flex-row items-start justify-between space-y-0 p-4 sm:p-5">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full stable-money-chip px-3 py-1 text-xs font-black uppercase tracking-[0.16em]">
            <Sparkles className="size-3.5" />
            Stable money request
          </div>
          <CardTitle className="mt-3 brand-gradient-text text-2xl font-black tracking-tight">
            Request Money
          </CardTitle>
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-600 dark:text-white/68">
            Generate a polished USDC request link and QR code your sender can open instantly.
          </p>
        </div>
        <Link2 className="size-5 text-primary" />
      </CardHeader>

      <CardContent className="relative z-10 p-4 pt-0 sm:p-5 sm:pt-0">
        <div className="grid gap-6 lg:grid-cols-[230px_1fr] lg:items-start">
          <div className="mx-auto w-full max-w-[230px] lg:mx-0">
            <div className="stable-money-qr-box rounded-[1.65rem] p-3.5 sm:p-4">
              <div className="qr-white-surface rounded-[1.25rem] p-3.5 shadow-[inset_0_0_0_1px_rgba(6,26,63,0.08)]">
                <QRCodeSVG
                  value={shareLink || requestUri}
                  size={172}
                  bgColor="#ffffff"
                  fgColor="#061A3F"
                  level="Q"
                  includeMargin
                  className="mx-auto block max-w-full"
                />
              </div>
              <div className="mt-3 flex items-center justify-between rounded-[1rem] bg-[#f4f8ff] px-4 py-3 text-xs font-black text-[#061a3f] shadow-[inset_0_0_0_1px_rgba(11,99,229,0.06)]">
                <span>USDC</span>
                <span>{displayAmount}</span>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs font-semibold text-slate-500 dark:text-white/55">
              <ShieldCheck className="size-3.5 text-primary" />
              Wallet-signed request
            </div>
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

            <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
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
            </div>

            <div className="rounded-[1.25rem] border border-blue-500/15 bg-white/70 p-4 dark:border-white/10 dark:bg-white/[0.055]">
              <div className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-blue-100 text-blue-700 dark:bg-blue-400/10 dark:text-blue-200">
                  <WalletCards className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-black text-slate-950 dark:text-white">Clean payment handoff</p>
                  <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-white/62">
                    The QR uses your Arc address, USDC token context, and optional amount so the request feels like a real payment invoice.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Button
                type="button"
                variant="secondary"
                className="h-11 gap-2 rounded-2xl"
                onClick={() => void copyShareLink()}
              >
                <Copy className="size-4" />
                Copy link
              </Button>

              <Button
                type="button"
                className="h-11 gap-2 rounded-2xl bg-gradient-to-r from-blue-700 to-orange-500 shadow-[0_18px_45px_rgba(11,99,229,0.22)] hover:from-blue-800 hover:to-orange-600"
                onClick={() => void shareRequest()}
              >
                <Share2 className="size-4" />
                Share request
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
