'use client'

import { useTranslation } from 'react-i18next'
import { GlobeAltIcon } from '@heroicons/react/24/outline'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const handleLanguageChange = () => {
    const newLang = i18n.language === 'en' ? 'it' : 'en'
    i18n.changeLanguage(newLang)
  }

  return (
    <button
      onClick={handleLanguageChange}
      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
    >
      <GlobeAltIcon className="h-5 w-5" />
      {i18n.language === 'en' ? 'Italiano' : 'English'}
    </button>
  )
} 