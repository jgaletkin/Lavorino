import { getServerTranslations } from '../../i18n/server'
import { Locale } from '../../i18n/settings'
import ProviderCalendarContent from '../../provider-calendar/ProviderCalendarContent'

interface PageProps {
  params: {
    locale: Locale;
  };
}

export default async function ProviderCalendar({ params: { locale } }: PageProps) {
  const { t } = await getServerTranslations(locale, 'provider-calendar')

  return (
    <main className="flex min-h-screen flex-col p-8">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{t('provider-calendar.title')}</h1>
          <div className="space-x-4">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              {t('provider-calendar.addAvailability')}
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              {t('provider-calendar.export')}
            </button>
          </div>
        </div>
        <ProviderCalendarContent locale={locale} />
      </div>
    </main>
  )
} 