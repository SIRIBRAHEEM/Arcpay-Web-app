# ArcPay

ArcPay is a non-custodial Next.js 15 App Router payment app for stablecoin
payments on Arc Testnet using Circle App Kit.

## Features

- Payment-first landing page inspired by simple consumer payment apps.
- Wallet connect through injected browser wallets such as MetaMask and Rabby.
- Arc Testnet network helper.
- Circle App Kit integration:
  - `unifiedBalance.deposit`
  - `unifiedBalance.getBalances`
  - `unifiedBalance.spend`
  - `kit.send`
  - `kit.swap` for USDC, EURC, and cirBTC on Arc Testnet
- USDC primary payments.
- QR-code receive/request panel.
- Copyable wallet address and request URI.
- Local transaction history.
- Optional ERC-20 transfer watcher through viem.
- Sonner toasts and transaction confirmation modal.
- Mobile-first responsive layout.

## Environment

Swap requires a Circle App Kit key from Circle Console. Do not commit real keys.

```txt
CIRCLE_KIT_KEY=KIT_KEY:your-id:your-secret
# Optional fallback for static/client-only builds:
# NEXT_PUBLIC_KIT_KEY=KIT_KEY:your-id:your-secret
```

The dashboard also includes a local browser key card for test builds. A key saved
there stays in that browser's local storage and can override a broken deploy key.

## Tech Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- Local shadcn/ui-style components
- Circle App Kit
- `@circle-fin/adapter-viem-v2`
- `viem`
- `zustand`
- `lucide-react`
- `framer-motion`
- `sonner`

## Arc Testnet Config

```txt
Chain ID: 5042002
RPC: https://rpc.testnet.arc.network
Explorer: https://testnet.arcscan.app
Native gas: USDC, 18 decimals
USDC ERC-20 interface: 0x3600000000000000000000000000000000000000
```
