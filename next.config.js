/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'it'],
    defaultLocale: 'en',
    localeDetection: true,
  },
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
}

module.exports = nextConfig 