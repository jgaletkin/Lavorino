import { t } from '../../i18n/server'
import { Locale } from '../../i18n/settings'
import ProviderDashboardClient from '../../provider-dashboard/ProviderDashboardClient'

interface PageProps {
  params: {
    locale: Locale;
  };
}

export default function ProviderDashboard({ params: { locale } }: PageProps) {
  const translations = {
    title: t(locale, 'provider-dashboard', 'title'),
    welcome: t(locale, 'provider-dashboard', 'welcome'),
    stats: {
      appointments: t(locale, 'provider-dashboard', 'stats.appointments'),
      revenue: t(locale, 'provider-dashboard', 'stats.revenue'),
      rating: t(locale, 'provider-dashboard', 'stats.rating')
    },
    upcoming: {
      title: t(locale, 'provider-dashboard', 'upcoming.title'),
      noAppointments: t(locale, 'provider-dashboard', 'upcoming.noAppointments')
    }
  }

  return (
    <main className="flex min-h-screen flex-col p-8">
      <div className="max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-8">{translations.title}</h1>
        <ProviderDashboardClient locale={locale} translations={translations} />
      </div>
    </main>
  )
} 