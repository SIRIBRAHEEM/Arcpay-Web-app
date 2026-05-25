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
    className: "bg-[#061923] text-sky-200 ring-sky-400/30",
    icon: ArcMark
  },
  Base_Sepolia: {
    label: "Base Sepolia",
    className: "bg-white text-[#0052ff] ring-[#0052ff]/20",
    icon: BaseMark
  },
  Optimism_Sepolia: {
    label: "Optimism Sepolia",
    className: "bg-[#ff0421] text-white ring-red-300/35",
    icon: OptimismMark
  },
  Avalanche_Fuji: {
    label: "Avalanche Fuji",
    className: "bg-[#e84142] text-white ring-red-300/35",
    icon: AvalancheMark
  },
  Arbitrum_Sepolia: {
    label: "Arbitrum Sepolia",
    className: "bg-[#05163d] text-sky-100 ring-[#10e1ff]/35",
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
    className: "bg-[#f50db4] text-white ring-[#feaff0]/50",
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
      <circle cx="16" cy="16" r="15.5" fill="#061923" />
      <path
        d="M7.9 20.8 13.1 8.5c.8-2 3.6-2 4.4 0l5.2 12.3"
        stroke="#8bd6ff"
        strokeWidth="3.1"
        strokeLinecap="round"
      />
      <path
        d="M11.5 17.4h8.9"
        stroke="#37f2ff"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <path
        d="M24 7.6c2.2 2.3 3.5 5.2 3.5 8.4"
        stroke="#cfff8d"
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity=".95"
      />
    </svg>
  );
}

function BaseMark(props: ChainMarkProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <circle cx="16" cy="16" r="15.5" fill="#fff" />
      <rect x="8" y="8" width="16" height="16" rx="4.4" fill="#0052ff" />
    </svg>
  );
}

function OptimismMark(props: ChainMarkProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <circle cx="16" cy="16" r="15.5" fill="#ff0421" />
      <text
        x="16"
        y="19.4"
        textAnchor="middle"
        fill="white"
        fontFamily="Arial Black, Arial, sans-serif"
        fontSize="10.4"
        fontWeight="900"
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
      <path
        d="M15.3 7.4a.8.8 0 0 1 1.4 0l8.2 14.2a.8.8 0 0 1-.7 1.2h-5.1c-.4 0-.8-.2-1-.6l-2-3.5a.7.7 0 0 0-1.2 0l-2 3.5c-.2.4-.6.6-1 .6H7.8a.8.8 0 0 1-.7-1.2l8.2-14.2Z"
        fill="white"
      />
      <path
        d="M21.8 15.4 25 20.9a.7.7 0 0 1-.6 1h-2.7a.9.9 0 0 1-.8-.5l-1.4-2.5 1.9-3.4c.1-.2.3-.2.4-.1Z"
        fill="#e84142"
      />
    </svg>
  );
}

function ArbitrumMark(props: ChainMarkProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <circle cx="16" cy="16" r="15.5" fill="#05163d" />
      <path d="M16 4.7 26.4 10.7v10.6L16 27.3 5.6 21.3V10.7L16 4.7Z" fill="#f7fbff" />
      <path d="M16 7.6 23.9 12.2v7.6L16 24.4l-7.9-4.6v-7.6L16 7.6Z" fill="#071c3c" />
      <path d="M11.2 21.5 17.7 9.2h3.3l-6.5 12.3h-3.3Z" fill="#016be5" />
      <path d="M16.8 21.5 22 11.8l1.8 1v1.8l-3.7 6.9h-3.3Z" fill="#10e1ff" />
      <path d="M8.1 12.2 16 7.6l7.9 4.6v1.7L16 9.4l-7.9 4.5v-1.7Z" fill="#9fefff" opacity=".45" />
    </svg>
  );
}

function EthereumMark(props: ChainMarkProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <circle cx="16" cy="16" r="15.5" fill="#fff" />
      <path d="M16 4.6 8.9 16.2 16 20.2l7.1-4L16 4.6Z" fill="#8a92b2" />
      <path d="M16 4.6v15.6l7.1-4L16 4.6Z" fill="#62688f" />
      <path d="M8.9 17.7 16 27.4l7.1-9.7-7.1 4.1-7.1-4.1Z" fill="#62688f" />
      <path d="M16 27.4v-5.6l7.1-4.1-7.1 9.7Z" fill="#454a75" />
    </svg>
  );
}

function LineaMark(props: ChainMarkProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <circle cx="16" cy="16" r="15.5" fill="#7ee7f2" />
      <path d="M9.5 8.4h4.1v10.9h8.8v4.3H9.5V8.4Z" fill="#07151d" />
      <circle cx="22.5" cy="9.5" r="2.25" fill="#07151d" />
    </svg>
  );
}

function PolygonMark(props: ChainMarkProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <circle cx="16" cy="16" r="15.5" fill="#fff" />
      <path
        d="m20.7 10.9 4.8 2.8v5.5L20.7 22l-4.8-2.8v-2.1l-2.2 1.3v2.1l-4.8 2.8-4.8-2.8V15l4.8-2.8 4.8 2.8v2.1l2.2-1.3v-2.1l4.8-2.8Z"
        stroke="#8247e5"
        strokeWidth="2.4"
        strokeLinecap="round"
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
        d="M6.8 11.1c5.3-3.3 13.1-3.3 18.4 0l-3.1 3c-3.7-1.8-8.5-1.8-12.2 0l-3.1-3Z"
        fill="white"
      />
      <path
        d="M25.2 20.9c-5.3 3.3-13.1 3.3-18.4 0l3.1-3c3.7 1.8 8.5 1.8 12.2 0l3.1 3Z"
        fill="white"
      />
      <path d="M10 16h12" stroke="white" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

function UnichainMark(props: ChainMarkProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <circle cx="16" cy="16" r="15.5" fill="#f50db4" />
      <path
        d="M16 6.5 25.5 16 16 25.5 6.5 16 16 6.5Z"
        fill="white"
      />
      <path
        d="M16 10.7 21.3 16 16 21.3 10.7 16 16 10.7Z"
        fill="#f50db4"
      />
      <path d="M7.4 16h17.2M16 7.4v17.2" stroke="white" strokeWidth="2" strokeLinecap="round" />
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
    <span className="flex min-w-0 items-center gap-3">
      <ChainLogo chain={chain} className="size-7" />
      <span className="min-w-0 truncate font-medium leading-none">{config.label}</span>
    </span>
  );
}

export function SelectedChain({ chain }: { chain: AppKitChain }) {
  const config = getChainLogoConfig(chain);

  return (
    <span className="flex min-w-0 flex-1 items-center gap-2.5 overflow-hidden">
      <ChainLogo chain={chain} className="size-7 shadow-none" />
      <span className="min-w-0 truncate font-medium leading-none text-teal-950 dark:text-lime-50">
        {config.label}
      </span>
    </span>
  );
}
