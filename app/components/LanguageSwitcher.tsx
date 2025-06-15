'use client'

import { useTranslation } from 'next-i18next'
import { GlobeAltIcon } from '@heroicons/react/24/outline'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'it' : 'en'
    i18n.changeLanguage(newLang)
  }

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 focus:outline-none"
      title={i18n.language === 'en' ? 'Switch to Italian' : 'Passa all\'inglese'}
    >
      <GlobeAltIcon className="h-6 w-6 text-gray-600" />
      <span className="text-sm font-medium text-gray-700">
        {i18n.language.toUpperCase()}
      </span>
    </button>
  )
} 