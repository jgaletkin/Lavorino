import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { locales, Locale } from '../i18n/settings'
import { getServerTranslations } from '../i18n/server'

const inter = Inter({ subsets: ['latin'] })

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) {
  if (!locales.includes(locale)) notFound()

  // Get translations on the server
  const { t } = await getServerTranslations(locale)

  return (
    <html lang={locale}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
} 