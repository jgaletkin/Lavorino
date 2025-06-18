'use client'

import TopNav from './components/TopNav'
import { Locale } from './i18n/settings'

interface ClientLayoutProps {
  children: React.ReactNode;
  locale: Locale;
}

export default function ClientLayout({ children, locale }: ClientLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav locale={locale} />
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  )
} 