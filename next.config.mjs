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

  // Reduce bundle size
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Client-side only optimizations
      config.resolve.alias = {
        ...config.resolve.alias
      };
    }
    return config;
  }
};

export default nextConfig;
