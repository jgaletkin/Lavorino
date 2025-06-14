module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'it'],
  },
  defaultNS: 'common',
  localePath: './public/locales',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  use: [],
  debug: process.env.NODE_ENV === 'development',
} 