/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },

  i18n: {
    locales: ['en', 'de'],
    defaultLocale: 'en',
  },
}

module.exports = nextConfig
