'use client';

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { getOptions } from './settings';

// Initialize i18next only on the client side
if (typeof window !== 'undefined') {
  i18next
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`../../public/locales/${language}/${namespace}.json`)
      )
    )
    .init({
      ...getOptions(),
      lng: 'en', // Set English as default
      fallbackLng: 'en',
      detection: {
        order: ['localStorage', 'navigator'],
      },
    });
}

export default i18next; 