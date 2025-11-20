import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.expressentryimmigration.ca',
      },
    ],
  },
};

export default nextConfig;
