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
  - `kit.bridge` for USDC routes
- USDC primary payments.
- QR-code request panel with shareable payment links.
- Copyable wallet address and request link.
- Cloud transaction history through Vercel KV or Upstash Redis.
- Optional ERC-20 transfer watcher through viem.
- Sonner toasts and transaction confirmation modal.
- Mobile-first responsive layout.

## Environment

Cloud activity needs Vercel KV or Upstash Redis. Do not commit real keys.

```txt
KIT_KEY=KIT_KEY:your-id:your-secret
# CIRCLE_KIT_KEY is also supported for existing deployments.
# CIRCLE_KIT_KEY=KIT_KEY:your-id:your-secret
# Optional fallback for static/client-only builds:
# NEXT_PUBLIC_KIT_KEY=KIT_KEY:your-id:your-secret

# Cloud activity storage:
KV_REST_API_URL=https://your-upstash-url
KV_REST_API_TOKEN=your-token
# UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are also supported.
```

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
