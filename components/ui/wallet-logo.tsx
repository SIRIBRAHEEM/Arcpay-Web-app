import type { SVGProps } from "react";
import { Globe2, WalletCards } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WalletId } from "@/lib/wallet-discovery";

type WalletLogoProps = {
  wallet: WalletId;
  compact?: boolean;
  providerIcon?: string;
  className?: string;
};

type WalletMarkProps = SVGProps<SVGSVGElement>;

function BinanceMark(props: WalletMarkProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <path d="M16 3.9 20.1 8 16 12.1 11.9 8 16 3.9Z" fill="#f0b90b" />
      <path d="M8 11.9 12.1 16 8 20.1 3.9 16 8 11.9Z" fill="#f0b90b" />
      <path d="M24 11.9 28.1 16 24 20.1 19.9 16 24 11.9Z" fill="#f0b90b" />
      <path d="M16 19.9 20.1 24 16 28.1 11.9 24 16 19.9Z" fill="#f0b90b" />
      <path d="M16 11.2 20.8 16 16 20.8 11.2 16 16 11.2Z" fill="#f0b90b" />
    </svg>
  );
}

function CoinbaseMark(props: WalletMarkProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <circle cx="16" cy="16" r="16" fill="#0052ff" />
      <circle cx="16" cy="16" r="8.5" fill="#fff" />
      <rect x="15.2" y="13.3" width="7.2" height="5.4" rx="2.7" fill="#0052ff" />
    </svg>
  );
}

function OkxMark(props: WalletMarkProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <rect width="32" height="32" rx="16" fill="#fff" />
      <path d="M5 5h8.2v8.2H5V5Zm13.8 0H27v8.2h-8.2V5ZM12.1 12.1h7.8v7.8h-7.8v-7.8ZM5 18.8h8.2V27H5v-8.2Zm13.8 0H27V27h-8.2v-8.2Z" fill="#050505" />
    </svg>
  );
}

function MetaMaskMark(props: WalletMarkProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <rect width="32" height="32" rx="16" fill="#fff3e4" />
      <path d="m5.2 6.4 8.6 6.4-1.6-7.6-7 1.2ZM26.8 6.4l-8.7 6.5 1.7-7.7 7 1.2Z" fill="#e17726" />
      <path d="m8.3 21.3-2.3 7 7.7-2.1-2.1-4.7-3.3-.2ZM23.7 21.3l-3.3.2-2.1 4.7 7.7 2.1-2.3-7Z" fill="#e27625" />
      <path d="m13.3 13.9-1.5 2.3 7.8.1-1.5-2.4h-4.8ZM13.7 26.2l2.3-1.1 2.3 1.1-1.1-3.4h-2.4l-1.1 3.4Z" fill="#d5bfb2" />
      <path d="m11.6 21.5 2.2 4.7 1-3.4-3.2-1.3ZM20.4 21.5l-3.2 1.3 1.1 3.4 2.1-4.7Z" fill="#233447" />
      <path d="m11.5 16.2 2.6.8-.9-3.1-1.7 2.3ZM20.5 16.2l-1.7-2.3-.9 3.1 2.6-.8Z" fill="#cc6228" />
      <path d="m8.3 21.3 3.4.2-.1-3.2-3.3 3ZM20.3 21.5l3.4-.2-3.3-3-.1 3.2Z" fill="#e27525" />
      <path d="m14.1 17-2.5-.8 1.8 2.8.7-2ZM17.9 17l.7 2 1.8-2.8-2.5.8Z" fill="#f5841f" />
      <path d="m13.7 20.6 1.1 2.2h2.4l1.1-2.2-1.9.9h-.8l-1.9-.9Z" fill="#c0ad9e" />
      <path d="m13.4 19 2.2 1.5h.8l2.2-1.5-.7-2-1.5 1.1h-.8L14.1 17l-.7 2Z" fill="#161616" />
    </svg>
  );
}

function RabbyMark(props: WalletMarkProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <rect width="32" height="32" rx="16" fill="#6f7cff" />
      <path d="M9.6 18.5c0-4.3 3-7.3 7.2-7.3h2.1c2.8 0 4.9 2.1 4.9 4.9v.8c0 4.4-3 7.3-7.4 7.3h-1.5c-3.1 0-5.3-2.2-5.3-5.7Z" fill="#fff" />
      <path d="M11.1 11.4c-.8-1.5-.7-3.2.2-4 .9-.7 2.5.2 3.8 2.2M20.3 10c1.4-1.7 3.1-2.5 4-1.7.8.8.6 2.7-.5 4.3" stroke="#fff" strokeWidth="2.1" strokeLinecap="round" />
      <circle cx="15" cy="17" r="1.25" fill="#263250" />
      <circle cx="21.2" cy="17" r="1.25" fill="#263250" />
      <path d="M16.8 20.2c.9.7 2.3.7 3.2 0" stroke="#263250" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function KeplrMark(props: WalletMarkProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <rect width="32" height="32" rx="16" fill="#0aa7ff" />
      <path d="M10 8.4h4.4v6.5l5.3-6.5h5.1l-6.1 7.2 6.7 8H20l-5.6-7v7H10V8.4Z" fill="#fff" />
      <circle cx="23.2" cy="9.4" r="2" fill="#07111f" opacity=".2" />
    </svg>
  );
}

function BrowserMark(props: WalletMarkProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <rect width="32" height="32" rx="16" fill="#172033" />
      <Globe2 x="8" y="8" width="16" height="16" color="#b9f27f" strokeWidth="2.2" />
    </svg>
  );
}

function walletFallback(wallet: WalletId, iconClass: string) {
  if (wallet === "binance") return <BinanceMark className={iconClass} />;
  if (wallet === "coinbase") return <CoinbaseMark className={iconClass} />;
  if (wallet === "okx") return <OkxMark className={iconClass} />;
  if (wallet === "metamask") return <MetaMaskMark className={iconClass} />;
  if (wallet === "rabby") return <RabbyMark className={iconClass} />;
  if (wallet === "keplr") return <KeplrMark className={iconClass} />;
  if (wallet === "browser") return <BrowserMark className={iconClass} />;

  return <WalletCards className={iconClass} />;
}

export function WalletLogo({
  wallet,
  compact = false,
  providerIcon,
  className
}: WalletLogoProps) {
  const sizeClass = compact ? "size-7" : "size-10";
  const iconClass = compact ? "size-7" : "size-10";

  if (providerIcon) {
    return (
      <span
        className={cn(
          "grid shrink-0 place-items-center overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-black/10 dark:ring-white/15",
          sizeClass,
          className
        )}
      >
        {/* Wallets that support EIP-6963 provide their own icon as part of discovery. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={providerIcon} alt="" className="size-full object-cover" />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-black/10 dark:ring-white/15",
        sizeClass,
        className
      )}
    >
      {walletFallback(wallet, iconClass)}
    </span>
  );
}
