import ClientLayout from '../ClientLayout'
import ProviderDashboardClient from './ProviderDashboardClient'

export default function ProviderDashboard() {
  const translations = {
    welcome: "Welcome back!",
    stats: {
      appointments: "Appointments",
      revenue: "Revenue",
      rating: "Rating"
    },
    upcoming: {
      title: "Upcoming Appointments",
      noAppointments: "No upcoming appointments"
    }
  }

  return (
    <ClientLayout>
      <main className="flex min-h-screen flex-col p-8">
        <div className="max-w-7xl mx-auto w-full">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
          <ProviderDashboardClient translations={translations} />
        </div>
      </main>
    </ClientLayout>
  )
} 