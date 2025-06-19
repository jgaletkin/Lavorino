import { createInstance } from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { useEffect, useState } from 'react'

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

const resources = {
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

const initI18next = async (locale: string) => {
  const i18nInstance = createInstance()
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((language: string, namespace: string) => 
      import(`./locales/${language}/${namespace}.json`)
    ))
    .init({
      lng: locale,
      fallbackLng: 'en',
      debug: process.env.NODE_ENV === 'development',
      resources,
      interpolation: {
        escapeValue: false,
      },
    })
  return i18nInstance
}

export function useClientTranslation(locale: string, namespaces: string | string[]) {
  const [i18nInstance, setI18nInstance] = useState<ReturnType<typeof createInstance> | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const init = async () => {
      const instance = await initI18next(locale)
      setI18nInstance(instance)
      setIsReady(true)
    }
    init()
  }, [locale])

  // Always call useTranslation, but with a fallback when not ready
  const translation = useTranslation(namespaces, { i18n: i18nInstance || undefined })

  if (!isReady || !i18nInstance) {
    return { t: (key: string) => key, i18n: null }
  }

  return translation
}

export default initI18next 