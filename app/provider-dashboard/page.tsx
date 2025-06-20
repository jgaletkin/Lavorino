import ProviderDashboardClient from './ProviderDashboardClient'
import { Locale } from '../i18n/settings'

export default function ProviderDashboardPage() {
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