import { getTranslations } from '../i18n/server'
import { Locale, locales } from '../i18n/settings'

export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }))
}

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const { t } = await getTranslations(locale, 'home')

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold">{t('home.title')}</h1>
        <p className="text-xl">{t('home.description')}</p>
      </div>
    </main>
  )
} 