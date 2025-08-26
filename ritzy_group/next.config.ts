/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.ritzygroupbd.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.ritzygroupbd.com',
        port: '',
        pathname: '/storage/**',
      },
    ],
  },
}

module.exports = nextConfig