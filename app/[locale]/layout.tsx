import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { locales, Locale } from '../i18n/settings'

const inter = Inter({ subsets: ['latin'] })

interface LayoutProps {
  children: React.ReactNode
  params: { locale: Locale }
}

export default function LocaleLayout({ children, params: { locale } }: LayoutProps) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) notFound()

  return (
    <div className={inter.className}>
      {children}
    </div>
  )
} 