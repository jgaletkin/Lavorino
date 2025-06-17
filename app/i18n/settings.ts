export const defaultLocale = 'en';
export const locales = ['en', 'it'] as const;

export type Locale = (typeof locales)[number];

export function getOptions() {
  return {
    supportedLngs: locales,
    fallbackLng: defaultLocale,
    lng: defaultLocale,
    fallbackNS: 'common',
    defaultNS: 'common',
    ns: ['common', 'profile', 'login', 'provider-login', 'provider-dashboard', 'provider-profile', 'provider-history', 'provider-calendar', 'provider-onboarding'],
  };
} 