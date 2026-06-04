import type { ReactElement, SVGProps } from "react";
import { cn } from "@/lib/utils";
import type { AppKitChain } from "@/lib/arc";

type ChainLogoProps = { chain: AppKitChain; className?: string };
type ChainMarkProps = SVGProps<SVGSVGElement>;
type ChainLogoConfig = { label: string; className: string; icon: (props: ChainMarkProps) => ReactElement };

const fallbackChainLogoConfig: ChainLogoConfig = { label: "Unknown chain", className: "bg-slate-100 text-slate-700 ring-slate-300", icon: QuestionMark };

const chainLogoConfig: Record<AppKitChain, ChainLogoConfig> = {
  Arc_Testnet: { label: "Arc Testnet", className: "bg-[#09294a] ring-sky-300/30", icon: ArcMark },
  Base_Sepolia: { label: "Base Sepolia", className: "bg-white ring-[#0000ff]/30", icon: BaseMark },
  Optimism_Sepolia: { label: "Optimism Sepolia", className: "bg-[#ff0420] ring-red-300/35", icon: OptimismMark },
  Avalanche_Fuji: { label: "Avalanche Fuji", className: "bg-[#e84142] ring-red-300/35", icon: AvalancheMark },
  Arbitrum_Sepolia: { label: "Arbitrum Sepolia", className: "bg-[#061a3f] ring-sky-200/35", icon: ArbitrumMark },
  Ethereum_Sepolia: { label: "Ethereum Sepolia", className: "bg-white text-slate-800 ring-slate-300", icon: EthereumMark },
  Linea_Sepolia: { label: "Linea Sepolia", className: "bg-[#7ee7f2] text-[#07151d] ring-cyan-200/60", icon: LineaMark },
  Polygon_Amoy_Testnet: { label: "Polygon Amoy", className: "bg-[#6c5cff] ring-purple-300/50", icon: PolygonMark },
  Sonic_Testnet: { label: "Sonic Testnet", className: "bg-[#13283d] ring-slate-200/20", icon: SonicMark },
  Unichain_Sepolia: { label: "Unichain Sepolia", className: "bg-[#f51cc7] ring-pink-300/45", icon: UnichainMark }
};

function QuestionMark(props: ChainMarkProps) { return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}><circle cx="16" cy="16" r="15" fill="currentColor" opacity="0.12"/><path d="M14 13a3 3 0 0 1 5 2c0 2-3 3-3 5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/><circle cx="16" cy="24" r="1.5" fill="currentColor"/></svg>; }
function BaseMark(props: ChainMarkProps) { return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}><circle cx="16" cy="16" r="15.5" fill="white"/><rect x="8" y="8" width="16" height="16" rx="1.2" fill="#0000FF"/></svg>; }
function EthereumMark(props: ChainMarkProps) { return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}><circle cx="16" cy="16" r="15.5" fill="#fff"/><path d="M16 4 9 16l7 4 7-4-7-12Z" fill="#8a92b2"/><path d="M16 4v16l7-4-7-12Z" fill="#62688f"/><path d="M9 18l7 10 7-10-7 4-7-4Z" fill="#62688f"/></svg>; }
function LineaMark(props: ChainMarkProps) { return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}><circle cx="16" cy="16" r="15.5" fill="#7ee7f2"/><path d="M10 8h4v11h9v5H10V8Z" fill="#07151d"/><circle cx="23" cy="10" r="2.2" fill="#07151d"/></svg>; }

function OptimismMark(props: ChainMarkProps) { return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}><circle cx="16" cy="16" r="15.5" fill="#FF0420"/><text x="16" y="20" textAnchor="middle" fill="white" fontFamily="Arial Black, Arial, sans-serif" fontSize="11" fontWeight="900">OP</text></svg>; }
function UnichainMark(props: ChainMarkProps) { return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}><circle cx="16" cy="16" r="15.5" fill="#F51CC7"/><path d="M16 4c0 7 5 12 12 12-7 0-12 5-12 12 0-7-5-12-12-12 7 0 12-5 12-12Z" fill="white"/><path d="M5 16h22M16 5v22" stroke="white" strokeWidth="1.4" strokeLinecap="round"/></svg>; }
function PolygonMark(props: ChainMarkProps) { return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}><circle cx="16" cy="16" r="15.5" fill="#6C5CFF"/><path d="M20 10.5 25 13.5v5L20 21.5l-5-3v-2l-3 1.8v2L7 23l-5-3v-5l5-3 5 3v2l3-1.8v-2l5-2.7Z" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function AvalancheMark(props: ChainMarkProps) { return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}><circle cx="16" cy="16" r="15.5" fill="#E84142"/><path d="M13 22 17 14c.5-1 1.8-1 2.4 0l4 7c.4.8-.1 1.8-1 1.8h-8.5c-.8 0-1.3-.5-.9-.8Z" fill="white"/><path d="M8 22 14 10c.6-1.2 2.3-1.2 2.9 0l1 2-5.2 10H8Z" fill="white"/></svg>; }
function ArbitrumMark(props: ChainMarkProps) { return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}><circle cx="16" cy="16" r="15.5" fill="#061A3F"/><path d="M16 5 26 11v10L16 27 6 21V11L16 5Z" stroke="#9FC5E8" strokeWidth="1.8"/><path d="M10 23 16 9h3l-6 14h-3Z" fill="white"/><path d="M15 23 21 9h3l-6 14h-3Z" fill="white"/><path d="M20 23 23 16l3 2v3l-3 2h-3Z" fill="#28A8EA"/></svg>; }
function SonicMark(props: ChainMarkProps) { return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}><circle cx="16" cy="16" r="15.5" fill="#13283D"/><circle cx="16" cy="16" r="9" fill="white"/><path d="M6 15h20v2H6v-2Z" fill="#13283D"/><path d="M8 12c6-3 10 4 17 2-5 3-9 6-17 2v-4Z" fill="#13283D"/><path d="M8 20c6 3 10-4 17-2-5-3-9-6-17-2v4Z" fill="#13283D"/></svg>; }
function ArcMark(props: ChainMarkProps) { return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}><circle cx="16" cy="16" r="15.5" fill="#09294A"/><path d="M7 25c.5-5 1.5-9.5 3.4-13.5C12 8.5 14 7 16 7s4 1.5 5.6 4.5C23.5 15.5 24.5 20 25 25h-3.5c-.5-4.5-1.4-8-2.8-11-1-2-2-3-2.7-3s-1.7 1-2.7 3c-1.4 3-2.3 6.5-2.8 11H7Z" fill="#d9e7f2"/><path d="M14 19c5 0 9 1 12 3.2v3c-3-2-7-3.1-12-3.1V19Z" fill="white"/></svg>; }

function getChainLogoConfig(chain: AppKitChain) { return chainLogoConfig[chain] ?? fallbackChainLogoConfig; }
export function ChainLogo({ chain, className }: ChainLogoProps) { const config = getChainLogoConfig(chain); const Icon = config.icon; return <span className={cn("grid size-7 shrink-0 place-items-center overflow-hidden rounded-full shadow-sm ring-1", config.className, className)} aria-label={`${config.label} logo`}><Icon className="size-full" /></span>; }
export function ChainOption({ chain }: { chain: AppKitChain }) { const config = getChainLogoConfig(chain); return <span className="flex min-w-0 items-center gap-3"><ChainLogo chain={chain} className="size-7"/><span className="min-w-0 truncate font-medium leading-none">{config.label}</span></span>; }
export function SelectedChain({ chain }: { chain: AppKitChain }) { const config = getChainLogoConfig(chain); return <span className="flex min-w-0 flex-1 items-center gap-2.5 overflow-hidden"><ChainLogo chain={chain} className="size-7 shadow-none"/><span className="min-w-0 truncate font-medium leading-none text-teal-950 dark:text-lime-50">{config.label}</span></span>; }
