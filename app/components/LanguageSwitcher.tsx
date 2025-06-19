'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Locale } from '../i18n/settings'

interface LanguageSwitcherProps {
  locale: Locale;
  translations?: {
    en: string;
    it: string;
  };
}

export default function LanguageSwitcher({ locale, translations }: LanguageSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageChange = (newLocale: Locale) => {
    if (!pathname) return
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
  }

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-3 py-1 rounded-md text-sm font-medium ${
          locale === 'en'
            ? 'bg-emerald-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        {translations?.en || 'EN'}
      </button>
      <button
        onClick={() => handleLanguageChange('it')}
        className={`px-3 py-1 rounded-md text-sm font-medium ${
          locale === 'it'
            ? 'bg-emerald-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        {translations?.it || 'IT'}
      </button>
    </div>
  )
} 