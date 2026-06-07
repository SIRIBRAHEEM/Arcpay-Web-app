/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // NOTE: framer-motion is intentionally NOT in optimizePackageImports.
  // It was causing "Module 'framer-motion' has no exported member 'AnimatePresence'"
  // during type checking in the Vercel build worker (even after removal, due to sticky cache).
  // We also removed all AnimatePresence usage from the codebase (mobile-dashboard-section).
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "gsap",
      "lottie-react",
      "@radix-ui/react-dialog",
      "@radix-ui/react-select",
      "sonner"
    ],
    serverActions: {
      bodySizeLimit: "2mb"
    }
  },

  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@farcaster/mini-app-solana': false,
      };
    }
    return config;
  }
};

export default nextConfig;
