import type { ReactElement, SVGProps } from "react";
import { cn } from "@/lib/utils";
import type { AppKitChain } from "@/lib/arc";

type ChainLogoProps = {
  chain: AppKitChain;
  className?: string;
};

type ChainMarkProps = SVGProps<SVGSVGElement>;

type ChainLogoConfig = {
  label: string;
  className: string;
  icon: (props: ChainMarkProps) => ReactElement;
};

const fallbackChainLogoConfig: ChainLogoConfig = {
  label: "Unknown chain",
  className: "bg-slate-100 text-slate-700 ring-slate-300",
  icon: QuestionMark
};

const chainLogoConfig: Record<AppKitChain, ChainLogoConfig> = {
  Arc_Testnet: {
    label: "Arc Testnet",
    className: "bg-[#071b27] text-sky-200 ring-sky-400/30",
    icon: ArcMark
  },
  Base_Sepolia: {
    label: "Base Sepolia",
    className: "bg-white text-[#0052ff] ring-[#0052ff]/20",
    icon: BaseMark
  },
  Optimism_Sepolia: {
    label: "Optimism Sepolia",
    className: "bg-[#ff0420] text-white ring-red-300/35",
    icon: OptimismMark
  },
  Avalanche_Fuji: {
    label: "Avalanche Fuji",
    className: "bg-[#e84142] text-white ring-red-300/35",
    icon: AvalancheMark
  },
  Arbitrum_Sepolia: {
    label: "Arbitrum Sepolia",
    className: "bg-[#101d2f] text-sky-100 ring-sky-300/30",
    icon: ArbitrumMark
  },
  Ethereum_Sepolia: {
    label: "Ethereum Sepolia",
    className: "bg-white text-slate-800 ring-slate-300",
    icon: EthereumMark
  },
  Linea_Sepolia: {
    label: "Linea Sepolia",
    className: "bg-[#7ee7f2] text-[#07151d] ring-cyan-200/60",
    icon: LineaMark
  },
  Polygon_Amoy_Testnet: {
    label: "Polygon Amoy",
    className: "bg-white text-[#8247e5] ring-purple-300/50",
    icon: PolygonMark
  },
  Sonic_Testnet: {
    label: "Sonic Testnet",
    className: "bg-[#101014] text-white ring-white/20",
    icon: SonicMark
  },
  Unichain_Sepolia: {
    label: "Unichain Sepolia",
    className: "bg-[#ff18d8] text-white ring-pink-200/45",
    icon: UnichainMark
  }
};

function QuestionMark(props: ChainMarkProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <circle cx="16" cy="16" r="15" fill="currentColor" opacity="0.12" />
      <path
        d="M13.6 13.1a3.1 3.1 0 0 1 5.9 1.4c0 2.7-3 2.8-3 5"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <circle cx="16.5" cy="24" r="1.5" fill="currentColor" />
    </svg>
  );
}

function ArcMark(props: ChainMarkProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <circle cx="16" cy="16" r="15.5" fill="#071b27" />
      <path
        d="M8.2 20.6 13.1 8.2c.9-2.2 4-2.2 4.8 0l5 12.4"
        stroke="#8bc5ff"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M11.6 17.2h8.9"
        stroke="#37d7ff"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BaseMark(props: ChainMarkProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <circle cx="16" cy="16" r="15.5" fill="#fff" />
      <rect x="8.4" y="8.4" width="15.2" height="15.2" rx="4.2" fill="#0052ff" />
    </svg>
  );
}

function OptimismMark(props: ChainMarkProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <circle cx="16" cy="16" r="15.5" fill="#ff0420" />
      <text
        x="16"
        y="19.2"
        textAnchor="middle"
        fill="white"
        fontSize="10"
        fontWeight="900"
        letterSpacing="-0.8"
      >
        OP
      </text>
    </svg>
  );
}

function AvalancheMark(props: ChainMarkProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <circle cx="16" cy="16" r="15.5" fill="#e84142" />
      <path d="M15.7 7.8 7.9 21.2h5.1l2.7-4.7 2.7 4.7h5.7L16.3 7.8a.35.35 0 0 0-.6 0Z" fill="white" />
      <path d="M22.5 21.2h2.2l-2.6-4.6-1.1 1.9 1.5 2.7Z" fill="white" />
    </svg>
  );
}

function ArbitrumMark(props: ChainMarkProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <circle cx="16" cy="16" r="15.5" fill="#101d2f" />
      <path d="M16 5.8 25 11v10l-9 5.2L7 21V11l9-5.2Z" fill="#f7fbff" />
      <path d="M16 8.5 22.8 12.4v7.2L16 23.5 9.2 19.6v-7.2L16 8.5Z" fill="#14253b" />
      <path d="m12.2 21 5.5-11.4h2.9L15 21h-2.8Z" fill="#28a0f0" />
      <path d="m17.3 21 3.2-6.6 1.4 2.6-2 4h-2.6Z" fill="#8fd2ff" />
    </svg>
  );
}

function EthereumMark(props: ChainMarkProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <circle cx="16" cy="16" r="15.5" fill="#fff" />
      <path d="M16 4.8 9.2 16.2 16 19.9l6.8-3.7L16 4.8Z" fill="#8a92b2" />
      <path d="M16 4.8v15.1l6.8-3.7L16 4.8Z" fill="#62688f" />
      <path d="M9.2 17.6 16 27.2l6.8-9.6-6.8 3.9-6.8-3.9Z" fill="#62688f" />
      <path d="M16 27.2v-5.7l6.8-3.9-6.8 9.6Z" fill="#454a75" />
    </svg>
  );
}

function LineaMark(props: ChainMarkProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <circle cx="16" cy="16" r="15.5" fill="#7ee7f2" />
      <path d="M10 8.5h4v11h8v4H10v-15Z" fill="#07151d" />
      <circle cx="22.5" cy="9.5" r="2.2" fill="#07151d" />
    </svg>
  );
}

function PolygonMark(props: ChainMarkProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <circle cx="16" cy="16" r="15.5" fill="#fff" />
      <path
        d="M20.6 11.2 25 13.7v5.1l-4.4 2.6-4.4-2.6v-1.7l-2.4 1.4v1.7l-4.4 2.6L5 20.2v-5.1l4.4-2.6 4.4 2.6v1.7l2.4-1.4v-1.7l4.4-2.5Z"
        stroke="#8247e5"
        strokeWidth="2.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SonicMark(props: ChainMarkProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <circle cx="16" cy="16" r="15.5" fill="#101014" />
      <path
        d="M7.5 11.2c6.5-3.6 12.6-3 17.1 1.5-6.8.4-12.7 2.5-17.1 6.9 6.6 3.7 12.9 3.2 17.6-1.7-6.1-.1-11.6-2.1-17.6-6.7Z"
        fill="white"
      />
    </svg>
  );
}

function UnichainMark(props: ChainMarkProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <circle cx="16" cy="16" r="15.5" fill="#ff18d8" />
      <path d="M16 4.8c.9 5.8 5.4 10.3 11.2 11.2-5.8.9-10.3 5.4-11.2 11.2-.9-5.8-5.4-10.3-11.2-11.2 5.8-.9 10.3-5.4 11.2-11.2Z" fill="white" opacity=".9" />
      <path d="M16 8.8c.6 3.7 3.5 6.6 7.2 7.2-3.7.6-6.6 3.5-7.2 7.2-.6-3.7-3.5-6.6-7.2-7.2 3.7-.6 6.6-3.5 7.2-7.2Z" fill="#ff18d8" />
    </svg>
  );
}

function getChainLogoConfig(chain: AppKitChain) {
  return chainLogoConfig[chain] ?? fallbackChainLogoConfig;
}

export function ChainLogo({ chain, className }: ChainLogoProps) {
  const config = getChainLogoConfig(chain);
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "grid size-7 shrink-0 place-items-center overflow-hidden rounded-full shadow-sm ring-1",
        config.className,
        className
      )}
      aria-label={`${config.label} logo`}
    >
      <Icon className="size-full" />
    </span>
  );
}

export function ChainOption({ chain }: { chain: AppKitChain }) {
  const config = getChainLogoConfig(chain);

  return (
    <span className="flex items-center gap-3">
      <ChainLogo chain={chain} />
      <span>{config.label}</span>
    </span>
  );
}

export function SelectedChain({ chain }: { chain: AppKitChain }) {
  const config = getChainLogoConfig(chain);

  return (
    <span className="flex items-center gap-3">
      <ChainLogo chain={chain} />
      <span className="truncate">{config.label}</span>
    </span>
  );
}
