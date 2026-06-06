# ArcPay

ArcPay is a non-custodial stablecoin payment app for Arc Testnet. It is designed to make testnet stablecoin payments feel simple, clean, and familiar: connect a wallet, view Unified Balance, deposit USDC, **swap (Token Exchange) USDC ↔ EURC**, bridge USDC, send payments, create QR payment requests, and review local activity from one premium dashboard.

Production app:

```txt
https://arcpay-web-app.vercel.app
```

---

## ⚠️ One-time Setup for Swap (Token Exchange) — Do This First

The swap will not work until you complete this (it matches exactly how the working demo at https://elementswap-eta.vercel.app/ is configured).

**Fastest way (recommended):**

1. Copy the file `vercel.env.example` from this repo.
2. Replace the placeholder with your real Circle key (the full value that starts with `KIT_KEY:...`).
3. Save it as `vercel.env`.
4. In Vercel (your arcpay-web-app project) → Settings → Environment Variables → **Import** the file.
5. Make sure **Production** is selected.
6. Go to Deployments → latest Production → **Redeploy**.
7. Hard refresh your site.

The yellow "Swap not configured yet" banner will disappear and the form will enable.

Full details + troubleshooting are inside the `vercel.env.example` file itself.

---

## What ArcPay Does

ArcPay brings the most important payment actions into one interface:

- **Pay**: send USDC or EURC to another Arc Testnet wallet.
- **Token Exchange (Swap)**: swap USDC ↔ EURC directly on Arc Testnet (powered by Circle App Kit).
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
- Circle App Kit integration (including Token Exchange / swap).
- Unified Balance support.
- Deposit, bridge, send, request, and **swap** flows.
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

After connection, ArcPay opens the dashboard where you can view balance, **swap tokens**, deposit, bridge, send, request, and review activity.

### 5. Swap / Token Exchange

**Important:** You must complete the "One-time Setup for Swap" section above first.

In the **Token Exchange** section:

1. Enter the amount.
2. Choose from (USDC or EURC) and to token.
3. Make sure you have a small amount of gas (USDC on Arc Testnet) + the token you're swapping from.
4. Click "Exchange tokens".
5. Confirm in your wallet.

Get test funds from the Circle faucet: https://faucet.circle.com (select Arc Testnet).

### 6. Request money with QR

In the Request section:

1. Enter an optional amount.
2. Add an optional memo.
3. Copy the payment link or share it.
4. Let the sender scan the QR code or open the request link.

### 7. Send USDC

Use the Pay flow to enter a destination wallet address and send USDC from ArcPay.

### 8. Bridge or deposit USDC

Use the bridge/deposit tools to move test USDC across supported App Kit chains.

---

## Circle App Kit Usage

ArcPay uses Circle App Kit flows for stablecoin actions, including:

- `unifiedBalance.deposit`
- `unifiedBalance.getBalances`
- `unifiedBalance.spend`
- `kit.send`
- `kit.bridge`
- **Token Exchange (swap)** via `kit.swap` + `estimateSwap`

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

See the dedicated "One-time Setup for Swap" section at the top of this README (and the `vercel.env.example` file).

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

## Arc Testnet Config

```txt
Chain ID: 5042002
RPC: https://rpc.testnet.arc.network
Explorer: https://testnet.arcscan.app
Native gas: USDC (18 decimals) on this testnet
USDC interface: 0x3600000000000000000000000000000000000000
```

## Deployment

ArcPay is deployed on Vercel. **Pushing to `main` on GitHub automatically triggers a production deployment** (GitHub integration is enabled).

Production URL:

```txt
https://arcpay-web-app.vercel.app
```

---

## Disclaimer

ArcPay is testnet software. It is not financial advice, and it should not be used with real funds unless the project is audited, production-ready, and configured for a supported mainnet environment.

---

Built by [@siribraheem33](https://x.com/siribraheem33).
