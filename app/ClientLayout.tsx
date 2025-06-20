'use client'

import { ReactNode } from 'react'
import { UserProvider } from '../lib/contexts/UserContext'
import TopNav from './components/TopNav'
import { Locale } from './i18n/settings'

interface ClientLayoutProps {
  children: ReactNode;
  locale: Locale;
}

export default function ClientLayout({ children, locale }: ClientLayoutProps): JSX.Element {
  const translations = {
    logo: 'Lavorino',
    providers: 'Providers',
    logout: 'Logout'
  }

  return (
    <UserProvider>
      <div className="min-h-screen bg-gray-50">
        <TopNav locale={locale} translations={translations} />
        <main className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </UserProvider>
  )
} 