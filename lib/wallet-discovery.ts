"use client";

import type { EIP1193Provider } from "viem";

export type WalletId =
  | "rabby"
  | "metamask"
  | "binance"
  | "keplr"
  | "okx"
  | "coinbase"
  | "browser";

export type WalletCatalogItem = {
  id: WalletId;
  name: string;
  description: string;
  installUrl: string;
  matchers: string[];
  flags?: string[];
};

export type Eip6963ProviderDetail = {
  info: {
    uuid: string;
    name: string;
    icon?: string;
    rdns?: string;
  };
  provider: EIP1193Provider;
};

export const walletCatalog: WalletCatalogItem[] = [
  {
    id: "rabby",
    name: "Rabby Wallet",
    description: "Fast EVM wallet for Arc payments.",
    installUrl: "https://rabby.io/",
    matchers: ["rabby"],
    flags: ["isRabby"]
  },
  {
    id: "metamask",
    name: "MetaMask",
    description: "Connect with the MetaMask extension.",
    installUrl: "https://metamask.io/download/",
    matchers: ["metamask", "io.metamask"],
    flags: ["isMetaMask"]
  },
  {
    id: "binance",
    name: "Binance Wallet",
    description: "Use the Binance Web3 browser wallet.",
    installUrl: "https://www.binance.com/en/web3wallet",
    matchers: ["binance"],
    flags: ["isBinance"]
  },
  {
    id: "keplr",
    name: "Keplr Wallet",
    description: "Use Keplr if it exposes an EVM provider.",
    installUrl: "https://www.keplr.app/download",
    matchers: ["keplr"],
    flags: ["isKeplr"]
  },
  {
    id: "okx",
    name: "OKX Wallet",
    description: "Connect with the OKX Web3 wallet.",
    installUrl: "https://www.okx.com/web3",
    matchers: ["okx", "okex"],
    flags: ["isOkxWallet", "isOKExWallet"]
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    description: "Connect with Coinbase Wallet.",
    installUrl: "https://www.coinbase.com/wallet/downloads",
    matchers: ["coinbase"],
    flags: ["isCoinbaseWallet"]
  },
  {
    id: "browser",
    name: "Browser Wallet",
    description: "Use the injected EVM wallet in this browser.",
    installUrl: "https://ethereum.org/en/wallets/find-wallet/",
    matchers: ["browser", "injected"],
    flags: []
  }
];

type ProviderWithFlags = EIP1193Provider & Record<string, unknown>;
type InjectedProvider = ProviderWithFlags & {
  providers?: EIP1193Provider[];
};

function includesMatcher(value: string | undefined, matchers: string[]) {
  const normalized = value?.toLowerCase() ?? "";
  return matchers.some((matcher) => normalized.includes(matcher.toLowerCase()));
}

export function matchProviderToWallet(
  wallet: WalletCatalogItem,
  detail: Eip6963ProviderDetail
) {
  const provider = detail.provider as ProviderWithFlags;

  if (
    wallet.flags?.some((flag) => Boolean(provider[flag])) ||
    includesMatcher(detail.info.name, wallet.matchers) ||
    includesMatcher(detail.info.rdns, wallet.matchers)
  ) {
    return true;
  }

  return false;
}

function getInjectedProviderName(provider: ProviderWithFlags) {
  if (provider.isRabby) return "Rabby Wallet";
  if (provider.isMetaMask) return "MetaMask";
  if (provider.isCoinbaseWallet) return "Coinbase Wallet";
  if (provider.isOkxWallet || provider.isOKExWallet) return "OKX Wallet";
  if (provider.isBinance) return "Binance Wallet";
  if (provider.isKeplr) return "Keplr Wallet";
  return "Browser Wallet";
}

export function getFallbackInjectedProviders() {
  if (typeof window === "undefined" || !window.ethereum) return undefined;

  const injected = window.ethereum as InjectedProvider;
  const providers = Array.isArray(injected.providers)
    ? injected.providers
    : [window.ethereum];

  return providers.map((provider, index) => {
    const providerWithFlags = provider as ProviderWithFlags;

    return {
      info: {
        uuid: `window.ethereum.${index}`,
        name: getInjectedProviderName(providerWithFlags),
        rdns: "injected"
      },
      provider
    } satisfies Eip6963ProviderDetail;
  });
}
