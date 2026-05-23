import { cn } from "@/lib/utils";
import type { AppKitChain } from "@/lib/arc";

type ChainLogoProps = {
  chain: AppKitChain;
  className?: string;
};

const chainLogoConfig: Record<
  AppKitChain,
  {
    label: string;
    short: string;
    className: string;
  }
> = {
  Arc_Testnet: {
    label: "Arc Testnet",
    short: "A",
    className: "from-emerald-400 to-cyan-300 text-black"
  },
  Base_Sepolia: {
    label: "Base Sepolia",
    short: "B",
    className: "from-blue-500 to-blue-300 text-white"
  },
  Optimism_Sepolia: {
    label: "Optimism Sepolia",
    short: "OP",
    className: "from-red-500 to-red-300 text-white"
  },
  Avalanche_Fuji: {
    label: "Avalanche Fuji",
    short: "AV",
    className: "from-rose-500 to-red-400 text-white"
  },
  Arbitrum_Sepolia: {
    label: "Arbitrum Sepolia",
    short: "AR",
    className: "from-sky-500 to-indigo-400 text-white"
  },
  Ethereum_Sepolia: {
    label: "Ethereum Sepolia",
    short: "ETH",
    className: "from-slate-300 to-slate-500 text-black"
  },
  Linea_Sepolia: {
    label: "Linea Sepolia",
    short: "L",
    className: "from-zinc-100 to-zinc-400 text-black"
  },
  Polygon_Amoy_Testnet: {
    label: "Polygon Amoy",
    short: "P",
    className: "from-purple-500 to-fuchsia-400 text-white"
  },
  Sonic_Testnet: {
    label: "Sonic Testnet",
    short: "S",
    className: "from-cyan-400 to-blue-500 text-black"
  },
  Unichain_Sepolia: {
    label: "Unichain Sepolia",
    short: "U",
    className: "from-pink-500 to-purple-400 text-white"
  }
};

export function ChainLogo({ chain, className }: ChainLogoProps) {
  const config = chainLogoConfig[chain];

  return (
    <span
      className={cn(
        "grid size-7 shrink-0 place-items-center rounded-full bg-gradient-to-br text-[10px] font-black shadow-sm ring-1 ring-white/20",
        config.className,
        className
      )}
      aria-label={`${config.label} logo`}
    >
      {config.short}
    </span>
  );
}

export function ChainOption({ chain }: { chain: AppKitChain }) {
  const config = chainLogoConfig[chain];

  return (
    <span className="flex items-center gap-3">
      <ChainLogo chain={chain} />
      <span>{config.label}</span>
    </span>
  );
}

export function SelectedChain({ chain }: { chain: AppKitChain }) {
  const config = chainLogoConfig[chain];

  return (
    <span className="flex items-center gap-3">
      <ChainLogo chain={chain} />
      <span className="truncate">{config.label}</span>
    </span>
  );
}
