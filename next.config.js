/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    dirs: ['pages', 'components']
  },
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
