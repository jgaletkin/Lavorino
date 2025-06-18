export const locales = ['en', 'it'] as const;
export type Locale = typeof locales[number];

export const defaultNS = 'common';

export function getOptions(lng: Locale, ns: string = defaultNS) {
  return {
    supportedLngs: locales,
    fallbackLng: 'en',
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
} 