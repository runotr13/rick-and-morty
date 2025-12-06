import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rickandmortyapi.com',
        pathname: '/api/character/avatar/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/characters',
        permanent: true,
      },
      {
        source: '/home',
        destination: '/characters',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
