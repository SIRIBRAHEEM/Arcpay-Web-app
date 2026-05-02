"use client";

import { useMemo, useState } from "react";
import { Copy, QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ARC_CHAIN_ID } from "@/lib/arc";
import { shortAddress } from "@/lib/utils";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useWalletStore } from "@/store/wallet-store";

export function ReceivePanel() {
  const address = useWalletStore((state) => state.address);
  const copy = useCopyToClipboard();
  const [requestAmount, setRequestAmount] = useState("");

  const requestUri = useMemo(() => {
    if (!address) return "";
    const trimmed = requestAmount.trim();

    if (!trimmed) return `ethereum:${address}@${ARC_CHAIN_ID}`;

    return `ethereum:${address}@${ARC_CHAIN_ID}?value=${encodeURIComponent(trimmed)}`;
  }, [address, requestAmount]);

  if (!address) return null;

  return (
    <Card className="glass rounded-[2rem] shadow-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6">
        <CardTitle>Receive</CardTitle>
        <QrCode className="size-5 text-primary" />
      </CardHeader>

      <CardContent className="p-6 pt-0">
        <div className="grid gap-5 sm:grid-cols-[180px_1fr] sm:items-center">
          <div className="grid place-items-center rounded-3xl border border-white/10 bg-white p-4">
            <QRCodeSVG value={requestUri} size={148} bgColor="#ffffff" fgColor="#050914" />
          </div>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="receive-address">Your Arc address</Label>
              <div className="flex gap-2">
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
              <Label htmlFor="request-amount">Request amount optional</Label>
              <Input
                id="request-amount"
                inputMode="decimal"
                placeholder="50.00"
                value={requestAmount}
                onChange={(event) => setRequestAmount(event.target.value)}
              />
            </div>

            <Button
              type="button"
              variant="secondary"
              className="gap-2 rounded-2xl"
              onClick={() => void copy(requestUri, "Payment request copied")}
            >
              <Copy className="size-4" />
              Copy request
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
