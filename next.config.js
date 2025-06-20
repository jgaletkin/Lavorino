/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    domains: ['images.unsplash.com'],
  },
  experimental: {
    serverComponentsExternalPackages: [],
  },
  // Disable static generation
  staticPageGenerationTimeout: 0,
}

module.exports = nextConfig 