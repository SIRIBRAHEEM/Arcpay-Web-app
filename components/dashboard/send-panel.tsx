"use client";

import { Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function SendPanel() {
  return (
    <Card className="glass rounded-[2rem] shadow-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6">
        <CardTitle>Send</CardTitle>

        <Badge variant="secondary" className="rounded-full">
          Non-custodial
        </Badge>
      </CardHeader>

      <CardContent className="p-6 pt-0">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-2xl bg-cyan-400/10 text-cyan-300">
              <Send className="size-5" />
            </div>

            <div>
              <p className="font-semibold">Send payments</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Use Bridge & Swap for now. Direct send can be re-enabled after the dashboard build is stable.
              </p>
            </div>
          </div>

          <Button disabled className="mt-5 h-12 w-full rounded-2xl">
            Send temporarily disabled
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
