# ArcPay Product Document

## 1. Overview

ArcPay is a non-custodial stablecoin payment app built for Arc Testnet. The goal is to make stablecoin payments feel simple, fast, and familiar for everyday users while still keeping the wallet-first nature of Web3.

ArcPay brings the most important payment actions into one clean dashboard: users can connect a wallet, view their balance, send USDC, request money with a QR code, bridge testnet stablecoins, and exchange supported tokens on Arc Testnet.

Live app:

```txt
https://arcpay-web-app.vercel.app
```

## 2. Product Vision

ArcPay is being built to make stablecoin payments easier for people who may not understand complex blockchain flows. Instead of forcing users to think about chains, tokens, bridges, and transaction steps separately, ArcPay organizes everything into a simple payment experience.

The long-term vision is to become a clean, trusted, non-custodial payment interface for stablecoins on Arc, starting from testnet and growing into a stronger product as the Arc ecosystem matures.

## 3. Problem

Stablecoin payments can still feel difficult for many users because they often need to understand:

- Wallet setup
- Testnet networks
- Gas fees
- Token balances
- Bridge routes
- Transaction approvals
- Recipient addresses
- QR/payment request formats

For new users, this creates confusion and slows down adoption.

## 4. Solution

ArcPay solves this by putting the main stablecoin actions into one polished interface:

- Connect an EVM wallet or use passkey-ready access.
- View balance from the dashboard.
- Send USDC to another wallet.
- Request payment using a shareable link and QR code.
- Deposit test USDC into Unified Balance.
- Bridge supported testnet assets.
- Exchange supported Arc Testnet tokens.
- Track recent activity locally for the connected wallet.

The product is designed to feel like a modern fintech app, while still being non-custodial and wallet-controlled.

## 5. Target Users

ArcPay is useful for:

- Arc Testnet builders
- Stablecoin payment testers
- Web3 developers
- Community members testing Arc apps
- Users learning how stablecoin payments work
- People who want a simpler payment-request flow
- Builders who want to demonstrate payments on Arc

## 6. Core Features

### 6.1 Wallet and Login

ArcPay supports a wallet-first access flow. Users can connect an EVM wallet and continue into the dashboard. The signup/login experience also includes a passkey-ready path for a more familiar authentication experience.

### 6.2 Dashboard

The dashboard is the main product hub. It gives the user access to payments, requests, balance, bridge tools, token exchange, and activity in one place.

### 6.3 Send Payment

Users can send USDC to another wallet address from the dashboard. The goal is to make on-chain sending feel simple, clear, and controlled.

### 6.4 Request Money With QR Code

ArcPay allows users to create a payment request with an optional amount and memo. The request can be shared as a link or scanned as a QR code.

This is one of the most important flows because it makes ArcPay feel closer to a real payment app.

### 6.5 Deposit

ArcPay supports deposit flow through Circle App Kit so users can bring test USDC into the ArcPay experience.

### 6.6 Bridge

ArcPay includes bridge support for moving USDC across supported testnet chains. The bridge flow is designed to reduce friction for users who need liquidity on Arc Testnet.

### 6.7 Token Exchange

ArcPay includes a Token Exchange section for same-chain Arc Testnet token exchange between supported assets such as USDC, EURC, and cirBTC.

This feature is being tested and improved to make sure the App Kit flow works correctly with the connected wallet and Vercel environment configuration.

### 6.8 Activity History

ArcPay stores recent wallet activity locally in the browser so users can see previous actions from the same connected wallet.

## 7. Supported Chains

ArcPay currently includes UI support for these chains:

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

## 8. Supported Assets

ArcPay currently focuses on testnet stablecoin/payment assets:

- USDC
- EURC
- cirBTC

USDC is the primary payment asset and gas asset on Arc Testnet.

## 9. User Flow

### New user flow

1. User opens ArcPay.
2. User signs up or logs in.
3. User connects an EVM wallet.
4. ArcPay switches or guides the wallet to Arc Testnet.
5. User lands on the dashboard.
6. User can send, request, deposit, bridge, exchange, or review activity.

### Request money flow

1. User opens the Request Money section.
2. User enters amount and memo.
3. ArcPay generates a request link and QR code.
4. User shares the link or lets someone scan the QR.
5. Sender opens the request and completes the payment.

### Bridge flow

1. User selects source chain.
2. User selects destination chain.
3. User enters amount.
4. ArcPay sends the route request through Circle App Kit.
5. User confirms wallet actions.
6. ArcPay records the activity locally.

## 10. Technical Stack

ArcPay is built with:

- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS
- Local shadcn-style UI components
- Circle App Kit
- Circle Viem adapter
- viem
- Zustand
- qrcode.react
- lucide-react
- framer-motion
- sonner
- Vercel deployment

## 11. Brand Direction

ArcPay uses a premium blue and orange visual identity.

The design direction is:

- Deep navy background
- Polished blue primary colour
- Warm orange accent
- Glassmorphism cards
- Clean dashboard spacing
- Dark-mode friendly contrast
- Premium fintech look
- Mobile-first layout

The brand should feel trustworthy, modern, simple, and built by a real founder with attention to detail.

## 12. Current Roadmap

### Phase 1: Foundation — Completed

- Build landing page.
- Set up Next.js and TypeScript project.
- Add responsive UI system.
- Add premium ArcPay blue/orange brand style.
- Deploy on Vercel.

### Phase 2: Authentication and Wallet Access — Completed

- Add signup/login page.
- Add EVM wallet connection.
- Add installed wallet discovery.
- Add passkey-ready access flow.
- Improve auth page branding with ArcPay SVG logo.

### Phase 3: Core Payment Dashboard — Completed

- Add premium dashboard layout.
- Add balance card.
- Add send payment panel.
- Add request money panel.
- Add QR code request flow.
- Add activity history.
- Improve dark-mode polish.

### Phase 4: Bridge and Multi-Chain UI — Completed / Active

- Add bridge panel.
- Add supported testnet chains.
- Add official-looking SVG chain logos.
- Add source and destination chain selection.
- Improve bridge UI and error handling.

### Phase 5: Token Exchange — In Progress / Testing

- Add Token Exchange section.
- Support USDC, EURC, and cirBTC on Arc Testnet.
- Connect exchange flow to Circle App Kit.
- Validate Vercel environment configuration.
- Improve error messages and wallet confirmation flow.

### Phase 6: Community Beta — Next

- Share ArcPay with the Arc community.
- Collect feedback from testers.
- Improve mobile layouts.
- Fix edge cases from real wallet testing.
- Add better transaction status updates.

### Phase 7: Product Polish — Next

- Add stronger loading states.
- Add clearer transaction confirmation modals.
- Add better empty states.
- Improve QR request page.
- Add more onboarding help for new users.

### Phase 8: Growth and Mainnet Readiness — Future

- Prepare for production-grade audits.
- Add stronger security review.
- Improve backend/session handling if needed.
- Add analytics for product usage.
- Explore merchant payment pages.
- Explore invoice/payment link management.
- Prepare a mainnet-ready version when the ecosystem is ready.

## 13. Community Message

ArcPay is being built to show that stablecoin payments on Arc can be simple, clean, and useful. It is still growing, but the foundation is already strong: wallet login, dashboard, send, request, QR, bridge, token exchange, and premium UI.

The mission is to keep improving ArcPay until it becomes one of the simplest ways to test and understand stablecoin payments on Arc.

## 14. Disclaimer

ArcPay is currently testnet software. It is not financial advice and should not be used with real funds unless the product is audited, production-ready, and configured for a supported mainnet environment.

---

Built by SIRIBRAHEEM.
