export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'it'],
} as const

export type Locale = (typeof i18n)['locales'][number]

export function getOptions(lng = i18n.defaultLocale) {
  return {
    supportedLngs: i18n.locales,
    fallbackLng: i18n.defaultLocale,
    lng,
    fallbackNS: 'common',
    defaultNS: 'common',
    ns: ['common'],
  }
} 