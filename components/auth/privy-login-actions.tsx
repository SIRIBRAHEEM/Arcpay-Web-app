"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogIn, WalletCards } from "lucide-react";
import { useLogin, usePrivy } from "@privy-io/react-auth";
import type { Address } from "viem";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";

type PrivyLoginActionsProps = {
  mode: "signup" | "login";
  kind: "social" | "evm";
  className?: string;
};

type UnknownRecord = Record<string, unknown>;

const socialLoginMethods = ["email", "google", "apple", "twitter", "discord", "github"] as const;
const evmLoginMethods = ["wallet"] as const;

function asRecord(value: unknown): UnknownRecord | undefined {
  if (value && typeof value === "object") {
    return value as UnknownRecord;
  }

  return undefined;
}

function getString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function getNestedString(value: unknown, keys: string[]) {
  const record = asRecord(value);
  if (!record) return undefined;

  for (const key of keys) {
    const found = getString(record[key]);
    if (found) return found;
  }

  return undefined;
}

function getPrivyEmail(user: unknown, account: unknown) {
  const userRecord = asRecord(user);
  const accountRecord = asRecord(account);

  return (
    getNestedString(userRecord?.email, ["address", "email"]) ||
    getNestedString(accountRecord, ["address", "email"]) ||
    getNestedString(accountRecord?.email, ["address", "email"])
  );
}

function getPrivyAddress(user: unknown, account: unknown) {
  const userRecord = asRecord(user);
  const accountRecord = asRecord(account);
  const walletRecord = asRecord(userRecord?.wallet);

  return (
    getNestedString(walletRecord, ["address"]) ||
    getNestedString(accountRecord, ["address"])
  );
}

function getPrivyLabel(user: unknown, account: unknown, fallback: string) {
  const userRecord = asRecord(user);
  const accountRecord = asRecord(account);

  return (
    getNestedString(userRecord, ["name", "username"]) ||
    getPrivyEmail(user, account) ||
    getPrivyAddress(user, account) ||
    fallback
  );
}

export function PrivyLoginActions({ mode, kind, className }: PrivyLoginActionsProps) {
  const router = useRouter();
  const signIn = useAuthStore((state) => state.signIn);
  const { authenticated, ready, user } = usePrivy();
  const isSignup = mode === "signup";
  const isSocial = kind === "social";
  const methods = useMemo(
    () => (isSocial ? socialLoginMethods : evmLoginMethods),
    [isSocial]
  );

  const { login } = useLogin({
    onComplete: ({ user: completedUser, loginAccount }) => {
      const fallbackLabel = isSocial ? "Privy social wallet" : "EVM wallet";
      const label = getPrivyLabel(completedUser, loginAccount, fallbackLabel);
      const email = getPrivyEmail(completedUser, loginAccount);
      const address = getPrivyAddress(completedUser, loginAccount);
      const privyUserId = getNestedString(completedUser, ["id"]);

      signIn({
        method: isSocial ? "social" : "wallet",
        label,
        email,
        address: address as Address | undefined,
        privyUserId,
        createdAt: Date.now()
      });

      toast.success(isSignup ? "Signup complete" : "Login complete", {
        description: isSocial
          ? "Your Privy session is ready. Connect an EVM wallet when you want to pay."
          : "Your EVM identity is ready for ArcPay."
      });
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error("Privy login failed", {
        description: error ? String(error) : "Try again in a moment."
      });
    }
  });

  function handleLogin() {
    if (authenticated) {
      const label = getPrivyLabel(user, undefined, isSocial ? "Privy session" : "EVM wallet");
      const email = getPrivyEmail(user, undefined);
      const address = getPrivyAddress(user, undefined);
      const privyUserId = getNestedString(user, ["id"]);

      signIn({
        method: isSocial ? "social" : "wallet",
        label,
        email,
        address: address as Address | undefined,
        privyUserId,
        createdAt: Date.now()
      });
      router.push("/dashboard");
      return;
    }

    login({
      loginMethods: [...methods],
      walletChainType: "ethereum-only"
    });
  }

  return (
    <Button
      type="button"
      onClick={handleLogin}
      disabled={!ready}
      className={cn("h-12 w-full rounded-full gap-2", className)}
    >
      {!ready ? (
        <Loader2 className="size-4 animate-spin" />
      ) : isSocial ? (
        <LogIn className="size-4" />
      ) : (
        <WalletCards className="size-4" />
      )}
      {isSocial
        ? isSignup
          ? "Continue with Privy"
          : "Login with Privy"
        : isSignup
          ? "Signup with EVM wallet"
          : "Login with EVM wallet"}
    </Button>
  );
}
