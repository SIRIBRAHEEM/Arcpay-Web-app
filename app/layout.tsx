import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: {
    default: "ArcPay - Private Stablecoin Payments on ARC",
    template: "%s | ArcPay"
  },
  description:
    "A non-custodial payments app for sending, requesting, bridging, and managing USDC on Arc Testnet with Circle App Kit.",
  applicationName: "ArcPay",
  keywords: ["Arc", "Circle", "USDC", "EURC", "stablecoin payments", "App Kit"],
  authors: [{ name: "ArcPay" }],
  openGraph: {
    title: "ArcPay - Private Stablecoin Payments on ARC",
    description: "Pay, request, bridge, and manage stablecoins on ARC.",
    type: "website",
    siteName: "ArcPay"
  },
  twitter: {
    card: "summary_large_image",
    title: "ArcPay - Private Stablecoin Payments on ARC",
    description: "Pay, request, bridge, and manage stablecoins on ARC."
  },
  icons: {
    icon: "/icon.svg"
  }
};

export const viewport: Viewport = {
  themeColor: "#f8f6ef",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
