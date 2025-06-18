'use client';

import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { getOptions, Locale } from './settings';
import { useTranslation as useTranslationOriginal } from 'react-i18next';

// Create a singleton instance for client-side
let i18nInstance: any = null;

const initI18next = async (lng: Locale, ns: string) => {
  if (!i18nInstance) {
    i18nInstance = createInstance();
    await i18nInstance
      .use(initReactI18next)
      .use(resourcesToBackend((language: string, namespace: string) => 
        import(`./locales/${language}/${namespace}.json`)))
      .init(getOptions(lng, ns));
  }
  return i18nInstance;
};

// This is a client-side hook that should only be used in client components
export function useClientTranslation(lng: Locale, ns: string | string[] = 'common') {
  const namespaces = Array.isArray(ns) ? ns : [ns];
  const { t, i18n } = useTranslationOriginal(namespaces, {
    lng,
    useSuspense: false,
  });

  return { t, i18n };
} 