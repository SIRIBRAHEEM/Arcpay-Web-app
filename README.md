# ArcPay

ArcPay is a non-custodial stablecoin payment app for Arc Testnet, built with
Next.js 15, Circle App Kit, and a clean premium dashboard interface.

The app is focused on the flows that matter most for testnet payments: connect a
wallet, view Unified Balance, deposit USDC, bridge USDC across supported chains,
create shareable payment requests, and keep wallet activity available from the
same browser.

## What ArcPay Comes With

- Premium responsive landing page with light and dark mode.
- Redesigned dashboard with tighter spacing, clearer cards, and improved dark
  mode contrast.
- Custom ArcPay SVG brand logo used in the header, favicon, and public mark.
- Wallet connect through injected browser wallets such as MetaMask and Rabby.
- Arc Testnet network helper with switch-network support.
- Unified Balance card for Circle Gateway-backed USDC.
- Deposit flow for supported Circle App Kit chains.
- Bridge-only USDC flow with source/destination chain selectors.
- Clean chain logo marks for Arc, Base, Optimism, Avalanche, Arbitrum, Ethereum,
  Linea, Polygon, Sonic, and Unichain testnets.
- Shareable request links with QR code support.
- Copyable wallet address and payment request link.
- Local transaction activity saved per connected wallet in the browser.
- Optional ERC-20 transfer watcher through viem.
- Sonner toasts and transaction confirmation modal.
- Mobile-first layout for phone, tablet, and desktop.

## Current Payment Flows

### Pay

Send USDC from Unified Balance to another Arc Testnet wallet address.

### Request

Create a shareable request link with an optional amount. The receiver can open
the link and pay from the app.

### Deposit

Deposit test USDC from supported App Kit chains into Unified Balance.

### Bridge

Bridge USDC between supported App Kit chains. Swap was removed so the app can
stay focused on the bridge flow that is currently active in the dashboard.

## Supported Bridge And Deposit Chains

- Arc Testnet
- Base Sepolia
- Optimism Sepolia
- Avalanche Fuji
- Arbitrum Sepolia
- Ethereum Sepolia
- Linea Sepolia
- Polygon Amoy
- Sonic Testnet
- Unichain Sepolia

## Circle App Kit Usage

ArcPay currently uses these App Kit actions:

- `unifiedBalance.deposit`
- `unifiedBalance.getBalances`
- `unifiedBalance.spend`
- `kit.send`
- `kit.bridge`

## Environment

Do not commit real keys. Add secrets locally in `.env.local` and in Vercel
project environment variables.

```txt
KIT_KEY=KIT_KEY:your-id:your-secret

# Existing deployments can also use:
# CIRCLE_KIT_KEY=KIT_KEY:your-id:your-secret

# Optional fallback for static/client-only builds:
# NEXT_PUBLIC_KIT_KEY=KIT_KEY:your-id:your-secret

```

Activity history is stored locally in the browser for the connected wallet.

## Local Development

```bash
npm install
npm run dev
```

Then open:

```txt
http://localhost:3000
```

## Useful Scripts

```bash
npm run dev
npm run build
npm run typecheck
```

## Tech Stack

- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS
- Local shadcn/ui-style components
- Circle App Kit
- `@circle-fin/adapter-viem-v2`
- `viem`
- `zustand`
- `lucide-react`
- `framer-motion`
- `qrcode.react`
- `sonner`

## Arc Testnet Config

```txt
Chain ID: 5042002
RPC: https://rpc.testnet.arc.network
Explorer: https://testnet.arcscan.app
Native gas: USDC, 18 decimals
USDC ERC-20 interface: 0x3600000000000000000000000000000000000000
```

## Deployment

The app is configured for Vercel. Push to `main` deploys production when the
GitHub repository is connected to the Vercel project.

Production URL:

```txt
https://arcpay-web-app.vercel.app
```
