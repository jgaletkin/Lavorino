import { Locale } from './settings'

// Import all translations
import enCommon from './locales/en/common.json'
import enHome from './locales/en/home.json'
import enProviderDashboard from './locales/en/provider-dashboard.json'
import enProviderHistory from './locales/en/provider-history.json'
import enProviderCalendar from './locales/en/provider-calendar.json'
import enProviderOnboarding from './locales/en/provider-onboarding.json'

import itCommon from './locales/it/common.json'
import itHome from './locales/it/home.json'
import itProviderDashboard from './locales/it/provider-dashboard.json'
import itProviderHistory from './locales/it/provider-history.json'
import itProviderCalendar from './locales/it/provider-calendar.json'
import itProviderOnboarding from './locales/it/provider-onboarding.json'

type TranslationResources = {
  [locale: string]: {
    [namespace: string]: Record<string, unknown>
  }
}

const resources: TranslationResources = {
  en: {
    common: enCommon,
    home: enHome,
    'provider-dashboard': enProviderDashboard,
    'provider-history': enProviderHistory,
    'provider-calendar': enProviderCalendar,
    'provider-onboarding': enProviderOnboarding
  },
  it: {
    common: itCommon,
    home: itHome,
    'provider-dashboard': itProviderDashboard,
    'provider-history': itProviderHistory,
    'provider-calendar': itProviderCalendar,
    'provider-onboarding': itProviderOnboarding
  }
}

export function getTranslations(locale: Locale, namespace: string) {
  const translations = resources[locale]?.[namespace] || resources.en[namespace] || {}
  return translations
}

export function t(locale: Locale, namespace: string, key: string): string {
  const translations = getTranslations(locale, namespace)
  const keys = key.split('.')
  let value: unknown = translations
  
  for (const k of keys) {
    if (typeof value === 'object' && value !== null && k in value) {
      value = (value as Record<string, unknown>)[k]
    } else {
      value = undefined
    }
    if (value === undefined) {
      // Fallback to English
      const enTranslations = getTranslations('en', namespace)
      let enValue: unknown = enTranslations
      for (const enK of keys) {
        if (typeof enValue === 'object' && enValue !== null && enK in enValue) {
          enValue = (enValue as Record<string, unknown>)[enK]
        } else {
          enValue = undefined
        }
        if (enValue === undefined) return key
      }
      return String(enValue)
    }
  }
  
  return String(value || key)
} 