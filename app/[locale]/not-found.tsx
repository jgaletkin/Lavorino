import { getServerTranslations } from '../i18n/server'
import { Locale } from '../i18n/settings'

interface NotFoundProps {
  params: {
    locale: Locale;
  };
}

export default async function NotFound({ params: { locale } }: NotFoundProps) {
  const { t } = await getServerTranslations(locale)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{t('notFound.title')}</h1>
        <p className="text-xl mb-8">{t('notFound.description')}</p>
        <a
          href={`/${locale}`}
          className="text-blue-500 hover:text-blue-700 underline"
        >
          {t('notFound.backHome')}
        </a>
      </div>
    </main>
  )
} 