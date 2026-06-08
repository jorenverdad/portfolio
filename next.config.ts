import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  experimental: {
    optimizePackageImports: [
      'react-icons',
      'lucide-react',
      'framer-motion',
    ],
  },
};

export default nextConfig;
