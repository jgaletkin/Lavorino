import { getServerTranslations } from '../i18n/server'
import { Locale } from '../i18n/settings'

export default async function Home({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
  const { t } = await getServerTranslations(locale)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">{t('home.title')}</h1>
        <p className="text-xl mb-4">{t('home.description')}</p>
      </div>
    </main>
  )
} 