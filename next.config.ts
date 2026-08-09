import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve("."),
  },
  reactCompiler: true,
  cacheComponents: true,
  experimental: {
    optimizePackageImports: [
      'react-icons',
      'lucide-react',
      'motion',
      'motion/react',
      'tech-stack-icons',
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
