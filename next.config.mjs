/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Lightning-fast optimizations
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "gsap",
      "lottie-react",
      "@radix-ui/react-dialog",
      "@radix-ui/react-select",
      "sonner"
    ],
    // Enable React 19 + Next.js 15 performance features
    serverActions: {
      bodySizeLimit: "2mb"
    }
  },

  // Optimize images & assets
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30 // 30 days
  },

  // Reduce bundle size and handle optional Privy deps
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Client-side only optimizations
      config.resolve.alias = {
        ...config.resolve.alias,
        // Ignore optional Privy integrations that aren't installed (Farcaster mini-app, etc.)
        // These are pulled in by @privy-io/react-auth but not used in this app
        '@farcaster/mini-app-solana': false,
      };
    }
    return config;
  }
};

export default nextConfig;
