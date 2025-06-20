/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Disabled static export
  trailingSlash: true,
  images: {
    unoptimized: true,
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
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable static generation
  experimental: {
    serverComponentsExternalPackages: [],
  },
  // Force server-side rendering
  generateStaticParams: false,
}

module.exports = nextConfig 