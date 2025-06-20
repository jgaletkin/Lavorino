import { Locale } from '../i18n/settings'
import ProviderDashboardClient from './ProviderDashboardClient'

export const dynamic = 'force-dynamic'

export default function ProviderDashboard() {
  const translations = {
    welcome: 'Welcome to your Dashboard',
    stats: {
      appointments: 'Appointments',
      revenue: 'Revenue',
      rating: 'Rating'
    },
    upcoming: {
      title: 'Upcoming Appointments',
      noAppointments: 'No upcoming appointments'
    }
  }

  return <ProviderDashboardClient locale={'en' as Locale} translations={translations} />
} 