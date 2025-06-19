'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Locale } from '../i18n/settings';
import LanguageSwitcher from '../components/LanguageSwitcher';
import ProviderMenu from '../components/ProviderMenu';
import type { Transaction } from '../lib/types';
import { mockTransactions } from '../lib/mockData';

interface ProviderDashboardClientProps {
  locale: Locale;
  translations: {
    welcome: string;
    stats: {
      appointments: string;
      revenue: string;
      rating: string;
    };
    upcoming: {
      title: string;
      noAppointments: string;
    };
  };
}

export default function ProviderDashboardClient({ locale, translations }: ProviderDashboardClientProps) {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading appointments
    setTimeout(() => {
      setAppointments(mockTransactions);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
        <div className="absolute top-6 right-6">
          <LanguageSwitcher locale={locale} />
        </div>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      {/* Language Switch Button */}
      <div className="absolute top-6 right-6">
        <LanguageSwitcher locale={locale} />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          {translations.welcome}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-emerald-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-emerald-800">{translations.stats.appointments}</h3>
              <p className="text-3xl font-bold text-emerald-600">{appointments.length}</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800">{translations.stats.revenue}</h3>
              <p className="text-3xl font-bold text-blue-600">€2,450</p>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-800">{translations.stats.rating}</h3>
              <p className="text-3xl font-bold text-yellow-600">4.8</p>
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">{translations.upcoming.title}</h3>
            {appointments.length > 0 ? (
              <div className="space-y-4">
                {appointments.slice(0, 3).map((appointment) => (
                  <div key={appointment.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{appointment.customerName}</p>
                        <p className="text-gray-600">{appointment.serviceType}</p>
                        <p className="text-sm text-gray-500">{appointment.date}</p>
                      </div>
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">{translations.upcoming.noAppointments}</p>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <ProviderMenu locale={locale} />
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 