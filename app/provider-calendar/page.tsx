import Link from 'next/link'
import { Locale } from '../i18n/settings'
import ProviderCalendarClient from './ProviderCalendarClient'

interface PageProps {
  params: { locale: Locale }
}

export default function ProviderCalendar({ params: { locale } }: PageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col space-y-2">
            <Link
              href="/provider-dashboard"
              className="focus:outline-none self-start"
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                Lavorino
              </span>
            </Link>
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="mb-4 flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-emerald-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Confirmed</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-amber-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Suggested</span>
            </div>
          </div>
          <ProviderCalendarClient locale={locale} />
        </div>
      </div>
    </div>
  );
} 