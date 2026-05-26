# ArcPay

ArcPay is a non-custodial stablecoin payment app for Arc Testnet. It is designed to make testnet stablecoin payments feel simple, clean, and familiar: connect a wallet, view Unified Balance, deposit USDC, bridge USDC, send payments, create QR payment requests, and review local activity from one premium dashboard.

Production app:

```txt
https://arcpay-web-app.vercel.app
```

---

## What ArcPay Does

ArcPay brings the most important payment actions into one interface:

- **Pay**: send USDC to another Arc Testnet wallet.
- **Request**: create a shareable USDC payment link with an optional amount and memo.
- **QR Request**: generate a clean QR code that sends people directly to the payment request.
- **Deposit**: deposit test USDC into Unified Balance through Circle App Kit.
- **Bridge**: bridge USDC across supported testnet chains.
- **Activity**: keep payment activity locally for the connected wallet.

The goal is to hide unnecessary blockchain complexity and make stablecoin movement feel closer to a modern money app.

---

## Product Highlights

- Premium blue/orange ArcPay brand system.
- Responsive landing page with light and dark mode.
- Premium dashboard with clean cards, motion, and dark-mode contrast polish.
- EVM wallet signup/login with installed browser wallets.
- Passkey-ready auth flow.
- Circle App Kit integration.
- Unified Balance support.
- Deposit, bridge, send, and request flows.
- Payment request links with QR code support.
- Wallet-specific local activity history.
- Chain selectors with custom SVG chain marks.
- Mobile-first layout for phone, tablet, and desktop.

---

## Supported Chains

ArcPay currently includes chain UI support for:

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

---

## How To Use ArcPay

### 1. Open the app

Go to:

```txt
https://arcpay-web-app.vercel.app
```

### 2. Create an account or log in

Use the signup/login screen to continue with:

- EVM wallet
- Passkey

### 3. Connect your wallet

Connect a supported browser wallet such as MetaMask, Rabby, Coinbase Wallet, Binance Wallet, OKX Wallet, Keplr, or another injected EVM wallet.

### 4. Open the dashboard

After connection, ArcPay opens the dashboard where you can view balance, deposit, bridge, send, request, and review activity.

### 5. Request money with QR

In the Request section:

1. Enter an optional amount.
2. Add an optional memo.
3. Copy the payment link or share it.
4. Let the sender scan the QR code or open the request link.

### 6. Send USDC

Use the Pay flow to enter a destination wallet address and send USDC from ArcPay.

### 7. Bridge or deposit USDC

Use the bridge/deposit tools to move test USDC across supported App Kit chains.

---

## Circle App Kit Usage

ArcPay uses Circle App Kit flows for stablecoin actions, including:

- `unifiedBalance.deposit`
- `unifiedBalance.getBalances`
- `unifiedBalance.spend`
- `kit.send`
- `kit.bridge`

---

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

---

## Environment Variables

Do not commit real keys. Add secrets locally in `.env.local` and in Vercel environment variables.

```txt
KIT_KEY=KIT_KEY:your-id:your-secret

# Existing deployments can also use:
# CIRCLE_KIT_KEY=KIT_KEY:your-id:your-secret

# Optional fallback for static/client-only builds:
# NEXT_PUBLIC_KIT_KEY=KIT_KEY:your-id:your-secret

# Optional Privy app ID if enabled:
NEXT_PUBLIC_PRIVY_APP_ID=your-privy-app-id
```

---

## Local Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

Build locally:

```bash
npm run build
```

---

## Useful Scripts

```bash
npm run dev
npm run build
npm run typecheck
```

---

## Arc Testnet Config

```txt
Chain ID: 5042002
RPC: https://rpc.testnet.arc.network
Explorer: https://testnet.arcscan.app
Native gas: USDC, 18 decimals
USDC ERC-20 interface: 0x3600000000000000000000000000000000000000
```

---

## Deployment

ArcPay is deployed on Vercel. Pushing to `main` triggers a production deployment through the connected GitHub repository.

Production URL:

```txt
https://arcpay-web-app.vercel.app
```

---

## Disclaimer

ArcPay is testnet software. It is not financial advice, and it should not be used with real funds unless the project is audited, production-ready, and configured for a supported mainnet environment.

---

Built by [@siribraheem33](https://x.com/siribraheem33).
