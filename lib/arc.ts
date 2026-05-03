import { defineChain, type EIP1193Provider } from "viem";

export const ARC_CHAIN_ID = 5042002;
export const ARC_RPC_URL = "https://rpc.testnet.arc.network";
export const ARC_BLOCK_EXPLORER = "https://testnet.arcscan.app";
export const ARC_USDC_ADDRESS = "0x3600000000000000000000000000000000000000" as const;

export type AppKitChain = "Arc_Testnet" | "Base_Sepolia" | "Ethereum_Sepolia";
export type SupportedDepositChain = "Base_Sepolia" | "Arc_Testnet";

export const ARC_TESTNET = defineChain({
  id: ARC_CHAIN_ID,
  name: "Arc Testnet",
  nativeCurrency: {
    name: "USDC",
    symbol: "USDC",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: [ARC_RPC_URL]
    },
    public: {
      http: [ARC_RPC_URL]
    }
  },
  blockExplorers: {
    default: {
      name: "ArcScan",
      url: ARC_BLOCK_EXPLORER
    }
  },
  testnet: true
});

export type WalletAddEthereumChainParameter = {
  chainId: `0x${string}`;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
};

export const ARC_TESTNET_PARAMS: WalletAddEthereumChainParameter = {
  chainId: `0x${ARC_CHAIN_ID.toString(16)}`,
  chainName: "Arc Testnet",
  nativeCurrency: {
    name: "USDC",
    symbol: "USDC",
    decimals: 18
  },
  rpcUrls: [ARC_RPC_URL],
  blockExplorerUrls: [ARC_BLOCK_EXPLORER]
};

export const BASE_SEPOLIA_PARAMS: WalletAddEthereumChainParameter = {
  chainId: "0x14a34",
  chainName: "Base Sepolia",
  nativeCurrency: {
    name: "Sepolia Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: ["https://sepolia.base.org"],
  blockExplorerUrls: ["https://sepolia.basescan.org"]
};

export const ETHEREUM_SEPOLIA_PARAMS: WalletAddEthereumChainParameter = {
  chainId: "0xaa36a7",
  chainName: "Ethereum Sepolia",
  nativeCurrency: {
    name: "Sepolia Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: ["https://ethereum-sepolia-rpc.publicnode.com"],
  blockExplorerUrls: ["https://sepolia.etherscan.io"]
};

export const CHAIN_PARAMS_BY_APPKIT_CHAIN: Record<AppKitChain, WalletAddEthereumChainParameter> = {
  Arc_Testnet: ARC_TESTNET_PARAMS,
  Base_Sepolia: BASE_SEPOLIA_PARAMS,
  Ethereum_Sepolia: ETHEREUM_SEPOLIA_PARAMS
};

export const EXPLORER_BY_APPKIT_CHAIN: Record<AppKitChain, string> = {
  Arc_Testnet: ARC_BLOCK_EXPLORER,
  Base_Sepolia: "https://sepolia.basescan.org",
  Ethereum_Sepolia: "https://sepolia.etherscan.io"
};

export async function requestSwitchChain(
  provider: EIP1193Provider,
  chain: WalletAddEthereumChainParameter
) {
  try {
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chain.chainId }]
    });
  } catch (error) {
    const code = getProviderErrorCode(error);

    if (code === 4902) {
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [chain]
      });
      return;
    }

    throw error;
  }
}

function getProviderErrorCode(error: unknown) {
  if (typeof error === "object" && error && "code" in error) {
    const code = (error as { code?: unknown }).code;
    return typeof code === "number" ? code : undefined;
  }

  return undefined;
}
