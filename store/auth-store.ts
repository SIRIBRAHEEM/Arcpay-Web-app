"use client";

import { create } from "zustand";
import type { Address } from "viem";

export type AuthMethod = "wallet" | "passkey" | "email";

export type AuthSession = {
  method: AuthMethod;
  label: string;
  email?: string;
  address?: Address;
  credentialId?: string;
  createdAt: number;
};

type AuthState = {
  hydrated: boolean;
  session?: AuthSession;
  hydrate: () => void;
  signIn: (session: AuthSession) => void;
  signOut: () => void;
};

const AUTH_SESSION_KEY = "arcpay:auth-session";

function readSession() {
  if (typeof window === "undefined") return undefined;

  try {
    const value = window.localStorage.getItem(AUTH_SESSION_KEY);
    return value ? (JSON.parse(value) as AuthSession) : undefined;
  } catch {
    return undefined;
  }
}

function writeSession(session?: AuthSession) {
  if (typeof window === "undefined") return;

  if (!session) {
    window.localStorage.removeItem(AUTH_SESSION_KEY);
    return;
  }

  window.localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
}

export const useAuthStore = create<AuthState>((set) => ({
  hydrated: false,
  hydrate: () =>
    set({
      hydrated: true,
      session: readSession()
    }),
  signIn: (session) => {
    writeSession(session);
    set({
      hydrated: true,
      session
    });
  },
  signOut: () => {
    writeSession(undefined);
    set({
      hydrated: true,
      session: undefined
    });
  }
}));
