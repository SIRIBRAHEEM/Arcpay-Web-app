"use client";

import { ExternalLink, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { LottieSuccess } from "@/components/visuals/lottie-success";
import type { ExtractedTransaction } from "@/lib/appkit-actions";

type TransactionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  tx: ExtractedTransaction | null;
};

export function TransactionDialog({
  open,
  onOpenChange,
  title,
  description,
  tx
}: TransactionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden rounded-[1.5rem] border-slate-950/10 bg-white p-0 shadow-card dark:border-white/10 dark:bg-[#071114] sm:max-w-md">
        <div className="relative p-6">
          <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10" />

          <div className="relative">
            <LottieSuccess className="size-32" />

            <DialogHeader className="text-center">
              <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <ShieldCheck className="size-3.5" />
                Wallet signed
              </div>

              <DialogTitle className="text-center text-2xl font-black">
                {title}
              </DialogTitle>

              <DialogDescription className="text-center">
                {description}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 rounded-2xl border border-slate-950/10 bg-white/80 p-4 dark:border-white/10 dark:bg-white/[0.06]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Transaction hash
              </p>

              <p className="mt-3 break-all font-mono text-xs leading-5 text-foreground">
                {tx?.hash ?? "Hash unavailable. Check your wallet activity for status."}
              </p>
            </div>

            <DialogFooter className="mt-6">
              {tx?.explorerUrl ? (
                <Button asChild className="h-12 w-full rounded-2xl">
                  <a href={tx.explorerUrl} target="_blank" rel="noreferrer">
                    Open in explorer
                    <ExternalLink className="ml-2 size-4" />
                  </a>
                </Button>
              ) : (
                <Button
                  className="h-12 w-full rounded-2xl"
                  onClick={() => onOpenChange(false)}
                >
                  Close
                </Button>
              )}
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
