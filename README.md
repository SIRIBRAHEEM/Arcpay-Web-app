# ArcPay

ArcPay is a production-ready, non-custodial Next.js 15 App Router payment app inspired by AnomaPay's simple payments UX, rebuilt for **Arc Testnet** using **Circle App Kit**.

**Tagline:** Easy Stablecoin Payments on ARC

## Features

- Dark, minimalist fintech UI
- Wallet connect through injected browser wallets such as MetaMask and Rabby
- Arc Testnet network helper
- Circle App Kit integration:
  - `unifiedBalance.deposit`
  - `unifiedBalance.getBalances`
  - `unifiedBalance.spend`
  - `kit.send`
  - `kit.swap` for USDC/EURC
- USDC primary payments
- EURC send flow, with optional USDC → EURC swap first
- QR-code receive/request panel
- Copyable wallet address and request URI
- Local transaction history
- Optional ERC-20 Transfer watcher through viem
- Sonner toasts and transaction confirmation modal
- Mobile-first responsive layout
- No backend

## Tech stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- shadcn/ui-style local components
- Circle App Kit
- `@circle-fin/adapter-viem-v2`
- `viem`
- `zustand`
- `lucide-react`
- `framer-motion`
- `sonner`

## Arc Testnet config

```txt
Chain ID: 5042002
RPC: https://rpc.testnet.arc.network
Explorer: https://testnet.arcscan.app
Native gas: USDC, 18 decimals
USDC ERC-20 interface: 0x3600000000000000000000000000000000000000
