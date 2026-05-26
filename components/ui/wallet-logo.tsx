"use client";

import { useState, type SVGProps } from "react";
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

type OfficialWalletAsset = {
  src: string;
  alt: string;
  shape: "circle" | "squircle";
  fit?: "contain" | "cover";
  background?: string;
};

const officialWalletAssets: Partial<Record<WalletId, OfficialWalletAsset>> = {
  metamask: {
    src: "https://lh3.googleusercontent.com/EQpmNpyWc98Rhu0bDzuPPS8ivQN2xZoc-saVhYHm5394wqS6eCRI5KyQFtxQf1z-OgS5HYVxvnUX8iv3uWy5jM2maw%3Ds60",
    alt: "MetaMask logo",
    shape: "circle",
    fit: "contain",
    background: "bg-white"
  },
  rabby: {
    src: "https://lh3.googleusercontent.com/bPbwQr58ZU2zD7RWbidgw_r8k07S3uALerlklo6jiK3j8ovgS84iScj1i7IcyWAzA8Xq_ygyXfb0tNVLjx-O3_XsK7w%3Ds60",
    alt: "Rabby Wallet logo",
    shape: "circle",
    fit: "contain",
    background: "bg-white"
  },
  keplr: {
    src: "https://cdn.prod.website-files.com/667dc891bc7b863b5397495b/68a4ca95f93a9ab64dc67ab4_keplr-symbol.svg",
    alt: "Keplr Wallet logo",
    shape: "squircle",
    fit: "contain",
    background: "bg-[#14AFEB]"
  },
  okx: {
    src: "https://lh3.googleusercontent.com/2bBevW79q6gRZTFdm42CzUetuEKndq4fn41HQGknMpKMF_d-Ae2sJJzgfFUAVb1bJKCBb4ptZ9EAPp-QhWYIvc35yw%3Ds60",
    alt: "OKX Wallet logo",
    shape: "squircle",
    fit: "cover",
    background: "bg-[#b7ff2a]"
  },
  coinbase: {
    src: "https://images.ctfassets.net/o10es7wu5gm1/TWlW6aoAXPX7yUg5ShsZ0/c02522911b90b766eb8eef709e42b8eb/WalletLogo.png",
    alt: "Coinbase Wallet logo",
    shape: "circle",
    fit: "cover",
    background: "bg-[#0052ff]"
  }
};

function BinanceMark(props: WalletMarkProps) {
  return (
    <svg viewBox="0 0 300 300" fill="none" aria-hidden="true" {...props}>
      <circle cx="150" cy="150" r="150" fill="#F3BA2F" />
      <path
        d="M188 133.5 150 95.5 111 133.5 88.5 111 150 50.5 210.5 111 188 133.5Z"
        fill="#131415"
      />
      <path
        d="M73 171.5 50.5 150 72 127.5 94.5 149 73 171.5Z"
        fill="#131415"
      />
      <path
        d="M150 172.5 127.5 150 149 127.5 172.5 150 150 172.5Z"
        fill="#131415"
      />
      <path
        d="M227 171.5 204.5 150 226 127.5 248.5 149 227 171.5Z"
        fill="#131415"
      />
      <path
        d="M150 248.5 88.5 188 111 165.5 149 203.5 188 166.5 210.5 188 150 248.5Z"
        fill="#131415"
      />
    </svg>
  );
}

function CoinbaseMark(props: WalletMarkProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <circle cx="16" cy="16" r="16" fill="#0052FF" />
      <circle cx="16" cy="16" r="8.5" fill="#fff" />
      <rect x="15.2" y="13.3" width="7.2" height="5.4" rx="2.7" fill="#0052FF" />
    </svg>
  );
}

function MetaMaskMark(props: WalletMarkProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <rect width="32" height="32" rx="16" fill="#FFF3E4" />
      <path d="m5.2 6.4 8.6 6.4-1.6-7.6-7 1.2ZM26.8 6.4l-8.7 6.5 1.7-7.7 7 1.2Z" fill="#E17726" />
      <path d="m8.3 21.3-2.3 7 7.7-2.1-2.1-4.7-3.3-.2ZM23.7 21.3l-3.3.2-2.1 4.7 7.7 2.1-2.3-7Z" fill="#E27625" />
      <path d="m13.3 13.9-1.5 2.3 7.8.1-1.5-2.4h-4.8ZM13.7 26.2l2.3-1.1 2.3 1.1-1.1-3.4h-2.4l-1.1 3.4Z" fill="#D5BFB2" />
      <path d="m11.6 21.5 2.2 4.7 1-3.4-3.2-1.3ZM20.4 21.5l-3.2 1.3 1.1 3.4 2.1-4.7Z" fill="#233447" />
      <path d="m11.5 16.2 2.6.8-.9-3.1-1.7 2.3ZM20.5 16.2l-1.7-2.3-.9 3.1 2.6-.8Z" fill="#CC6228" />
      <path d="m8.3 21.3 3.4.2-.1-3.2-3.3 3ZM20.3 21.5l3.4-.2-3.3-3-.1 3.2Z" fill="#E27525" />
      <path d="m14.1 17-2.5-.8 1.8 2.8.7-2ZM17.9 17l.7 2 1.8-2.8-2.5.8Z" fill="#F5841F" />
      <path d="m13.7 20.6 1.1 2.2h2.4l1.1-2.2-1.9.9h-.8l-1.9-.9Z" fill="#C0AD9E" />
      <path d="m13.4 19 2.2 1.5h.8l2.2-1.5-.7-2-1.5 1.1h-.8L14.1 17l-.7 2Z" fill="#161616" />
    </svg>
  );
}

function OkxMark(props: WalletMarkProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <rect width="32" height="32" rx="7" fill="#B7FF2A" />
      <path d="M6.2 6.2h7.5v7.5H6.2V6.2Zm12.1 0h7.5v7.5h-7.5V6.2Zm-6.1 12.1h7.6v7.5h-7.6v-7.5Zm-6-6.1h7.5v7.6H6.2v-7.6Zm18.2 0h1.4v7.6h-7.5v-7.6h6.1Z" fill="#050505" />
    </svg>
  );
}

function RabbyMark(props: WalletMarkProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <rect width="32" height="32" rx="16" fill="#fff" />
      <path d="M23.8 10.2c.7 1.5.7 3.4-.3 5.4 2.5 4.1.5 8.8-4.8 10.5-5.1 1.7-10-.5-11.2-4.6-1.1-3.7 1-7.3 5-8.8.9-3.3 2.9-5.2 5.4-5.2 2 0 4.8 1.1 5.9 2.7Z" fill="#3F4BFF" />
      <path d="M10 12.4c-1.3-.7-2.7-.8-3.5-.1-.9.9-.4 2.6 1 3.8M20.9 9.6c.9-1.5 2.3-2.5 3.4-2.1 1.3.5 1.4 2.6.3 4.6" stroke="#3F4BFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function KeplrMark(props: WalletMarkProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <rect width="32" height="32" rx="7" fill="#14AFEB" />
      <path
        d="M4.3 21.3C4 15 7.3 9.1 12.6 6.4c5.5-2.9 12.1-1.8 15 2.3-1.9-1.2-5.3-1.5-8.8-.7-4.1.9-8 3.2-10.8 6.4-2.2 2.4-3.4 4.9-3.7 6.9Z"
        fill="#fff"
      />
      <path d="M16 11.4l1 3.6 3.6 1-3.6 1-1 3.6-1-3.6-3.6-1 3.6-1 1-3.6Z" fill="#fff" />
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
  if (wallet === "metamask") return <MetaMaskMark className={iconClass} />;
  if (wallet === "okx") return <OkxMark className={iconClass} />;
  if (wallet === "rabby") return <RabbyMark className={iconClass} />;
  if (wallet === "keplr") return <KeplrMark className={iconClass} />;
  if (wallet === "browser") return <BrowserMark className={iconClass} />;

  return <WalletCards className={iconClass} />;
}

function walletShapeClass(shape: OfficialWalletAsset["shape"], compact: boolean) {
  if (shape === "squircle") {
    return compact ? "rounded-lg" : "rounded-xl";
  }

  return "rounded-full";
}

function OfficialAssetLogo({
  asset,
  wallet,
  compact,
  iconClass
}: {
  asset: OfficialWalletAsset;
  wallet: WalletId;
  compact: boolean;
  iconClass: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return walletFallback(wallet, iconClass);
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset.src}
      alt={asset.alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={cn(
        "size-full",
        asset.fit === "cover" ? "object-cover" : "object-contain",
        asset.shape === "squircle" && (compact ? "rounded-lg" : "rounded-xl")
      )}
    />
  );
}

export function WalletLogo({
  wallet,
  compact = false,
  providerIcon,
  className
}: WalletLogoProps) {
  const sizeClass = compact ? "size-7" : "size-10";
  const iconClass = compact ? "size-7" : "size-10";
  const asset = officialWalletAssets[wallet];
  const shape = asset?.shape ?? "circle";

  if (providerIcon) {
    return (
      <span
        className={cn(
          "grid shrink-0 place-items-center overflow-hidden bg-white shadow-sm ring-1 ring-black/10 dark:ring-white/15",
          sizeClass,
          "rounded-full",
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
        "grid shrink-0 place-items-center overflow-hidden shadow-sm ring-1 ring-black/10 dark:ring-white/15",
        asset?.background ?? "bg-white",
        sizeClass,
        walletShapeClass(shape, compact),
        className
      )}
    >
      {asset ? (
        <OfficialAssetLogo
          asset={asset}
          wallet={wallet}
          compact={compact}
          iconClass={iconClass}
        />
      ) : (
        walletFallback(wallet, iconClass)
      )}
    </span>
  );
}
