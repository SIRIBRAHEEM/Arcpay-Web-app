"use client";

import { useEffect, useState } from "react";
import { KeyRound, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  clearStoredKitKey,
  getKitKeySource,
  getResolvedKitKey,
  saveStoredKitKey
} from "@/lib/kit";

export function KitKeyCard() {
  const [kitKey, setKitKey] = useState("");
  const [input, setInput] = useState("");
  const [source, setSource] = useState<"browser" | "build" | "runtime" | "none">("none");

  useEffect(() => {
    let active = true;

    async function refresh() {
      const resolved = await getResolvedKitKey();

      if (!active) return;

      setKitKey(resolved);
      setSource(getKitKeySource());
    }

    void refresh();

    function handleRefresh() {
      void refresh();
    }

    window.addEventListener("arcpay:kit-key-updated", handleRefresh);
    window.addEventListener("storage", handleRefresh);

    return () => {
      active = false;
      window.removeEventListener("arcpay:kit-key-updated", handleRefresh);
      window.removeEventListener("storage", handleRefresh);
    };
  }, []);

  function saveKey(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleaned = input.trim();

    if (!cleaned) {
      toast.error("Paste your Circle App Kit key first.");
      return;
    }

    saveStoredKitKey(cleaned);
    setInput("");

    toast.success("Circle Kit Key saved", {
      description: "Swap is now enabled in this browser."
    });
  }

  function clearKey() {
    clearStoredKitKey();
    toast.success("Local Kit Key removed");
  }

  if (kitKey) {
    return (
      <Card className="glass rounded-[1.5rem] border-primary/20">
        <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-2xl bg-primary/10 text-primary">
              <KeyRound className="size-5" />
            </div>

            <div>
              <p className="font-semibold">Circle App Kit key loaded</p>
              <p className="text-xs text-muted-foreground">
                Source: {source === "browser" ? "This browser" : "Vercel / .env"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge className="rounded-full bg-primary/15 text-primary">
              Swap enabled
            </Badge>

            {source === "browser" ? (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={clearKey}
                aria-label="Remove local Kit Key"
              >
                <Trash2 className="size-4" />
              </Button>
            ) : null}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass rounded-[1.5rem] border-amber-500/20 bg-amber-50 dark:bg-amber-400/10">
      <CardHeader className="p-5 pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <KeyRound className="size-5 text-amber-700 dark:text-amber-200" />
          Enable Swap
        </CardTitle>
      </CardHeader>

      <CardContent className="p-5 pt-2">
        <p className="text-sm leading-6 text-muted-foreground">
          Swap needs a Circle App Kit key. Paste your key below once. It will be
          saved only in this browser.
        </p>

        <form onSubmit={saveKey} className="mt-4 grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="circle-kit-key">Circle App Kit Key</Label>
            <Input
              id="circle-kit-key"
              type="password"
              placeholder="Paste your Circle App Kit key"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
          </div>

          <Button type="submit" className="rounded-2xl">
            Save key and enable swap
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
