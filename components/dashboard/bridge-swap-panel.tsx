"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeftRight,
  ExternalLink,
  Repeat2,
  Sparkles,
  Waypoints
} from "lucide-react";
import { toast } from "sonner";
import { TransactionDialog } from "@/components/dashboard/transaction-dialog";
import { BridgeRouteAnimation } from "@/components/visuals/bridge-route-animation";
import { LottieSuccess } from "@/components/visuals/lottie-success";
import { SwapOrbitAnimation } from "@/components/visuals/swap-orbit-animation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChainLogo, ChainOption, SelectedChain } from "@/components/ui/chain-logo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  bridgeUsdc,
  estimateSwapStablecoins,
  extractTransaction,
  swapStablecoins,
  type ArcStableToken
} from "@/lib/appkit-actions";
import {
  APPKIT_CHAIN_LABELS,
  BRIDGE_CHAINS,
  CHAIN_PARAMS_BY_APPKIT_CHAIN,
  requestSwitchChain,
  type AppKitChain
} from "@/lib/arc";
import { saveTransaction } from "@/lib/transactions";
import { validateAmount } from "@/lib/validators";
import { useWalletStore } from "@/store/wallet-store";
