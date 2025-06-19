'use client'

import Link from 'next/link'
import { Locale } from '../i18n/settings'

interface ProviderMenuProps {
  locale: Locale;
  translations?: {
    menu: string;
  };
}

export default function ProviderMenu({ locale, translations }: ProviderMenuProps) {
  return (
    <div className="flex space-x-4">
      <Link
        href={`/${locale}/provider-dashboard`}
        className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
      >
        {translations?.menu || 'Dashboard'}
      </Link>
      <Link
        href={`/${locale}/provider-calendar`}
        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
      >
        Calendar
      </Link>
      <Link
        href={`/${locale}/provider-history`}
        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
      >
        History
      </Link>
      <Link
        href={`/${locale}/provider-profile`}
        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
      >
        Profile
      </Link>
    </div>
  )
} 