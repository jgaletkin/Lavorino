'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Locale } from '../i18n/settings'
import LanguageSwitcher from './LanguageSwitcher'

interface TopNavProps {
  locale: Locale;
  translations: {
    logo: string;
    providers: string;
    logout: string;
  };
}

export default function TopNav({ locale, translations }: TopNavProps): JSX.Element | null {
  const pathname = usePathname()
  const router = useRouter()

  // Don't show TopNav on the login page
  if (pathname === '/') {
    return null;
  }

  const handleLogout = (): void => {
    // Clear any auth tokens or user data
    localStorage.removeItem('auth-token')
    // Redirect to login page
    router.push('/')
  }

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/providers" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                {translations.logo}
              </span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link 
              href="/providers"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === '/providers' 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-900 hover:bg-gray-100'
              }`}
            >
              {translations.providers}
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100"
            >
              {translations.logout}
            </button>
            <LanguageSwitcher locale={locale} />
          </div>
        </div>
      </div>
    </nav>
  )
} 