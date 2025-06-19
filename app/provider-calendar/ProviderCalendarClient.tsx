'use client';

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Locale } from '../i18n/settings'
import LanguageSwitcher from '../components/LanguageSwitcher'
import ProviderMenu from '../components/ProviderMenu'

interface Appointment {
  id: string
  title: string
  start: Date
  end: Date
  customer: string
}

interface ProviderCalendarClientProps {
  locale: Locale;
}

export default function ProviderCalendarClient({ locale }: ProviderCalendarClientProps) {
  const router = useRouter()
  const [currentDate] = useState(new Date())

  useEffect(() => {
    // Mock appointments data
    const mockAppointments: Appointment[] = [
      {
        id: '1',
        title: 'Cleaning Service',
        start: new Date(2024, 0, 15, 9, 0),
        end: new Date(2024, 0, 15, 11, 0),
        customer: 'John Doe'
      },
      {
        id: '2',
        title: 'Garden Maintenance',
        start: new Date(2024, 0, 16, 14, 0),
        end: new Date(2024, 0, 16, 16, 0),
        customer: 'Jane Smith'
      }
    ]
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('auth-token')
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => router.push('/provider-dashboard')}
              className="focus:outline-none self-start"
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                Lavorino
              </span>
            </button>
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
              <div className="flex items-center space-x-4">
                <LanguageSwitcher locale={locale} />
                <ProviderMenu locale={locale} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-4">
              <button className="px-3 py-1 border rounded-md hover:bg-gray-50">
                Today
              </button>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border rounded-md hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-1 border rounded-md hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
            <h2 className="text-lg font-semibold">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Day headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="bg-white p-2 text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}

            {/* Calendar days would go here */}
            <div className="bg-white p-2 h-32">
              <p className="text-sm text-gray-500">No events</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 