"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import type { PrivyClientConfig } from "@privy-io/react-auth";

const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
const privyClientId = process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID;

const privyConfig: PrivyClientConfig = {
  loginMethods: ["email", "google", "apple", "twitter", "discord", "github", "wallet"],
  appearance: {
    accentColor: "#0f766e",
    logo: "/favicon.svg",
    showWalletLoginFirst: false,
    theme: "light",
    walletList: [
      "detected_ethereum_wallets",
      "metamask",
      "rainbow",
      "coinbase_wallet",
      "wallet_connect_qr"
    ]
  },
  embeddedWallets: {
    ethereum: {
      createOnLogin: "users-without-wallets"
    }
  }
};

export function PrivyAuthProvider({ children }: { children: React.ReactNode }) {
  if (!privyAppId) {
    return <>{children}</>;
  }

  return (
    <PrivyProvider
      appId={privyAppId}
      clientId={privyClientId || undefined}
      config={privyConfig}
    >
      {children}
    </PrivyProvider>
  );
}
