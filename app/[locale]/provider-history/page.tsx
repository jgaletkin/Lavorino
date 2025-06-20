import { getTranslations } from '../../i18n/server'
import { Locale, locales } from '../../i18n/settings'
import ProviderHistoryContent from '../../provider-history/ProviderHistoryContent'

interface PageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }))
}

export default async function ProviderHistory({ params }: PageProps) {
  const { locale } = await params
  const { t } = await getTranslations(locale, 'provider-history')

  return (
    <main className="flex min-h-screen flex-col p-8">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{t('provider-history.title')}</h1>
          <div className="flex space-x-4">
            <select className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option value="all">{t('provider-history.filterAll')}</option>
              <option value="completed">{t('provider-history.filterCompleted')}</option>
              <option value="cancelled">{t('provider-history.filterCancelled')}</option>
            </select>
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              {t('provider-history.export')}
            </button>
          </div>
        </div>
        <ProviderHistoryContent locale={locale} />
      </div>
    </main>
  )
} 