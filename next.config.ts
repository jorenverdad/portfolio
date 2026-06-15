import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  experimental: {
    optimizePackageImports: [
      'react-icons',
      'lucide-react',
      'motion',
      'motion/react',
    ],
  },
};

export default nextConfig;
