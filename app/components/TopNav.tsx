'use client'

import { useClientTranslation } from '../i18n/client'
import { Locale } from '../i18n/settings'
import LanguageSwitcher from './LanguageSwitcher'

interface TopNavProps {
  locale: Locale
}

export default function TopNav({ locale }: TopNavProps) {
  const { t } = useClientTranslation(locale, 'common')

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              {t('nav.logo')}
            </div>
          </div>
          <div className="flex items-center">
            <LanguageSwitcher locale={locale} />
          </div>
        </div>
      </div>
    </nav>
  )
} 