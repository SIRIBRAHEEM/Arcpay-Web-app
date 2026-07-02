// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./brand-overrides.css";
import "./dark-mode-polish.css";
import "./dashboard-animations.css";
import "./mobile-performance.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: {
    default: "ArcPay — Easy Stablecoin Payments on ARC",
    template: "%s | ArcPay"
  },
  description:
    "A minimalist non-custodial payments app for sending, requesting, bridging, and managing USDC and EURC on Arc Testnet with Circle App Kit.",
  applicationName: "ArcPay",
  keywords: ["Arc", "Circle", "USDC", "EURC", "stablecoin payments", "App Kit"],
  authors: [{ name: "ArcPay" }],
  openGraph: {
    title: "ArcPay — Easy Stablecoin Payments on ARC",
    description: "Pay, request, bridge, and manage stablecoins on ARC.",
    type: "website",
    siteName: "ArcPay"
  },
  twitter: {
    card: "summary_large_image",
    title: "ArcPay — Easy Stablecoin Payments on ARC",
    description: "Pay, request, bridge, and manage stablecoins on ARC."
  },
  icons: {
    icon: "/icon.svg"
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#050914" }
  ],
  colorScheme: "light dark",
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
      <head>
        {/* 
          Inline script to set the correct theme class IMMEDIATELY before any paint.
          This eliminates the flash of the wrong (default light) theme on initial load
          or when user has dark/system preference in localStorage.
          The React ThemeProvider will then take over for state management.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var key = 'arcpay:theme-preference';
                  var stored = localStorage.getItem(key);
                  var theme;
                  if (stored === 'dark' || stored === 'light') {
                    theme = stored;
                  } else {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  var root = document.documentElement;
                  if (theme === 'dark') {
                    root.classList.add('dark');
                    root.style.colorScheme = 'dark';
                  } else {
                    root.classList.remove('dark');
                    root.style.colorScheme = 'light';
                  }
                  root.dataset.themePreference = stored || 'system';
                } catch (e) {
                  // Fail silently — theme will be handled by React provider
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
