import { defineChain, type EIP1193Provider } from "viem";

export const ARC_CHAIN_ID = 5042002;
export const ARC_RPC_URL = "https://rpc.testnet.arc.network";
export const ARC_BLOCK_EXPLORER = "https://testnet.arcscan.app";
export const ARC_USDC_ADDRESS = "0x3600000000000000000000000000000000000000" as const;

export type AppKitChain =
  | "Arc_Testnet"
  | "Base_Sepolia"
  | "Optimism_Sepolia"
  | "Avalanche_Fuji"
  | "Arbitrum_Sepolia"
  | "Ethereum_Sepolia"
  | "Linea_Sepolia"
  | "Polygon_Amoy_Testnet"
  | "Sonic_Testnet"
  | "Unichain_Sepolia";

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

export const OPTIMISM_SEPOLIA_PARAMS: WalletAddEthereumChainParameter = {
  chainId: "0xaa37dc",
  chainName: "Optimism Sepolia",
  nativeCurrency: {
    name: "Sepolia Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: ["https://sepolia.optimism.io"],
  blockExplorerUrls: ["https://sepolia-optimism.etherscan.io"]
};

export const AVALANCHE_FUJI_PARAMS: WalletAddEthereumChainParameter = {
  chainId: "0xa869",
  chainName: "Avalanche Fuji",
  nativeCurrency: {
    name: "Avalanche Fuji AVAX",
    symbol: "AVAX",
    decimals: 18
  },
  rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
  blockExplorerUrls: ["https://testnet.snowtrace.io"]
};

export const ARBITRUM_SEPOLIA_PARAMS: WalletAddEthereumChainParameter = {
  chainId: "0x66eee",
  chainName: "Arbitrum Sepolia",
  nativeCurrency: {
    name: "Sepolia Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: ["https://sepolia-rollup.arbitrum.io/rpc"],
  blockExplorerUrls: ["https://sepolia.arbiscan.io"]
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

export const LINEA_SEPOLIA_PARAMS: WalletAddEthereumChainParameter = {
  chainId: "0xe705",
  chainName: "Linea Sepolia",
  nativeCurrency: {
    name: "Sepolia Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: ["https://rpc.sepolia.linea.build"],
  blockExplorerUrls: ["https://sepolia.lineascan.build"]
};

export const POLYGON_AMOY_PARAMS: WalletAddEthereumChainParameter = {
  chainId: "0x13882",
  chainName: "Polygon Amoy",
  nativeCurrency: {
    name: "POL",
    symbol: "POL",
    decimals: 18
  },
  rpcUrls: ["https://rpc-amoy.polygon.technology"],
  blockExplorerUrls: ["https://amoy.polygonscan.com"]
};

export const SONIC_TESTNET_PARAMS: WalletAddEthereumChainParameter = {
  chainId: "0xdede",
  chainName: "Sonic Testnet",
  nativeCurrency: {
    name: "Sonic",
    symbol: "S",
    decimals: 18
  },
  rpcUrls: ["https://rpc.blaze.soniclabs.com"],
  blockExplorerUrls: ["https://testnet.sonicscan.org"]
};

export const UNICHAIN_SEPOLIA_PARAMS: WalletAddEthereumChainParameter = {
  chainId: "0x515",
  chainName: "Unichain Sepolia",
  nativeCurrency: {
    name: "Sepolia Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: ["https://sepolia.unichain.org"],
  blockExplorerUrls: ["https://sepolia.uniscan.xyz"]
};

export const CHAIN_PARAMS_BY_APPKIT_CHAIN: Record<
  AppKitChain,
  WalletAddEthereumChainParameter
> = {
  Arc_Testnet: ARC_TESTNET_PARAMS,
  Base_Sepolia: BASE_SEPOLIA_PARAMS,
  Optimism_Sepolia: OPTIMISM_SEPOLIA_PARAMS,
  Avalanche_Fuji: AVALANCHE_FUJI_PARAMS,
  Arbitrum_Sepolia: ARBITRUM_SEPOLIA_PARAMS,
  Ethereum_Sepolia: ETHEREUM_SEPOLIA_PARAMS,
  Linea_Sepolia: LINEA_SEPOLIA_PARAMS,
  Polygon_Amoy_Testnet: POLYGON_AMOY_PARAMS,
  Sonic_Testnet: SONIC_TESTNET_PARAMS,
  Unichain_Sepolia: UNICHAIN_SEPOLIA_PARAMS
};

export const EXPLORER_BY_APPKIT_CHAIN: Record<AppKitChain, string> = {
  Arc_Testnet: ARC_BLOCK_EXPLORER,
  Base_Sepolia: "https://sepolia.basescan.org",
  Optimism_Sepolia: "https://sepolia-optimism.etherscan.io",
  Avalanche_Fuji: "https://testnet.snowtrace.io",
  Arbitrum_Sepolia: "https://sepolia.arbiscan.io",
  Ethereum_Sepolia: "https://sepolia.etherscan.io",
  Linea_Sepolia: "https://sepolia.lineascan.build",
  Polygon_Amoy_Testnet: "https://amoy.polygonscan.com",
  Sonic_Testnet: "https://testnet.sonicscan.org",
  Unichain_Sepolia: "https://sepolia.uniscan.xyz"
};

export const APPKIT_CHAIN_LABELS: Record<AppKitChain, string> = {
  Arc_Testnet: "Arc Testnet",
  Base_Sepolia: "Base Sepolia",
  Optimism_Sepolia: "Optimism Sepolia",
  Avalanche_Fuji: "Avalanche Fuji",
  Arbitrum_Sepolia: "Arbitrum Sepolia",
  Ethereum_Sepolia: "Ethereum Sepolia",
  Linea_Sepolia: "Linea Sepolia",
  Polygon_Amoy_Testnet: "Polygon Amoy",
  Sonic_Testnet: "Sonic Testnet",
  Unichain_Sepolia: "Unichain Sepolia"
};

export const BRIDGE_CHAINS: AppKitChain[] = [
  "Arc_Testnet",
  "Base_Sepolia",
  "Optimism_Sepolia",
  "Avalanche_Fuji",
  "Arbitrum_Sepolia",
  "Ethereum_Sepolia",
  "Linea_Sepolia",
  "Polygon_Amoy_Testnet",
  "Sonic_Testnet",
  "Unichain_Sepolia"
];

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

export async function getNativeGasBalance(
  provider: EIP1193Provider,
  address: `0x${string}`
) {
  const balance = (await provider.request({
    method: "eth_getBalance",
    params: [address, "latest"]
  })) as `0x${string}`;

  return BigInt(balance);
}

function getProviderErrorCode(error: unknown) {
  if (typeof error === "object" && error && "code" in error) {
    const code = (error as { code?: unknown }).code;
    return typeof code === "number" ? code : undefined;
  }

  return undefined;
}
