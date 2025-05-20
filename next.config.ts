import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.ibb.co' },
      { protocol: 'https', hostname: '*' },
    ],
  },
  experimental: {
    turbo: {}, // Enables the Turbo engine
    serverActions: {
      bodySizeLimit: '15mb', // increase from default 1mb, adjust as needed
    },
  },
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: false,
      os: false,
    };
    return config;
  },
};

export default nextConfig;
