"use client";

import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
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
      <DialogContent className="rounded-3xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <p className="text-sm text-muted-foreground">Transaction hash</p>
          <p className="mt-2 break-all font-mono text-sm">
            {tx?.hash ?? "Hash unavailable. Check your wallet for status."}
          </p>
        </div>

        <DialogFooter>
          {tx?.explorerUrl ? (
            <Button asChild className="w-full">
              <a href={tx.explorerUrl} target="_blank" rel="noreferrer">
                Open in explorer
                <ExternalLink className="ml-2 size-4" />
              </a>
            </Button>
          ) : (
            <Button className="w-full" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
