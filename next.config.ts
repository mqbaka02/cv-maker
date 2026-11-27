import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  allowedDevOrigins: ['192.168.88.254'],
  // serverExternalPackages: ["@embedpdf/viewer-react"],
  webpack: (config)=> {
    config.resolve.alias.canvas= false;
    return config;
  }
};

export default nextConfig;
