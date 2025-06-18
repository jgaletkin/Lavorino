import { getServerTranslations } from '../../i18n/server'
import { Locale } from '../../i18n/settings'
import ProviderDashboardClient from '../../provider-dashboard/ProviderDashboardClient'

interface PageProps {
  params: {
    locale: Locale;
  };
}

export default async function ProviderDashboard({ params: { locale } }: PageProps) {
  const { t } = await getServerTranslations(locale, 'provider-dashboard')

  return (
    <main className="flex min-h-screen flex-col p-8">
      <div className="max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-8">{t('provider-dashboard.title')}</h1>
        <ProviderDashboardClient locale={locale} />
      </div>
    </main>
  )
} 