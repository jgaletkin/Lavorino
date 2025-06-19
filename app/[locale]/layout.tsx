import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { locales, Locale } from '../i18n/settings'
import { getTranslations } from '../i18n/server'

const inter = Inter({ subsets: ['latin'] })

interface LayoutProps {
  children: React.ReactNode
  params: { locale: Locale }
}

export default async function LocaleLayout({ children, params: { locale } }: LayoutProps) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) notFound()

  // Get translations on the server
  await getTranslations(locale, 'common')

  return (
    <html lang={locale}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
} 