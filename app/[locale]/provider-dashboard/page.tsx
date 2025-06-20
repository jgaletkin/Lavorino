import { getTranslations } from '../../i18n/server'
import { Locale, locales } from '../../i18n/settings'
import ProviderDashboardClient from '../../provider-dashboard/ProviderDashboardClient'

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

export default async function ProviderDashboard({ params }: PageProps) {
  const { locale } = await params
  const { t } = await getTranslations(locale, 'provider-dashboard')

  const translations = {
    welcome: t('provider-dashboard.welcome'),
    stats: {
      appointments: t('provider-dashboard.stats.appointments'),
      revenue: t('provider-dashboard.stats.revenue'),
      rating: t('provider-dashboard.stats.rating')
    },
    upcoming: {
      title: t('provider-dashboard.upcoming.title'),
      noAppointments: t('provider-dashboard.upcoming.noAppointments')
    }
  }

  return (
    <main className="flex min-h-screen flex-col p-8">
      <div className="max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-8">{t('provider-dashboard.title')}</h1>
        <ProviderDashboardClient locale={locale} translations={translations} />
      </div>
    </main>
  )
} 