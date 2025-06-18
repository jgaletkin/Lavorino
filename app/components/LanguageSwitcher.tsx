'use client'

// import { useTranslation } from 'react-i18next'
import { GlobeAltIcon } from '@heroicons/react/24/outline'

export default function LanguageSwitcher() {
  // const { i18n } = useTranslation()

  const toggleLanguage = () => {
    // const newLang = i18n.language === 'en' ? 'it' : 'en'
    // i18n.changeLanguage(newLang)
  }

  return (
    // Replace the button with a static placeholder or remove it entirely for now.
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 focus:outline-none"
      title="Switch Language"
    >
      <GlobeAltIcon className="h-6 w-6 text-gray-600" />
      <span className="text-sm font-medium text-gray-700">
        EN
      </span>
    </button>
  )
} 