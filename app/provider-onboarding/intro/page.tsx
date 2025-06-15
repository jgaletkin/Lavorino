'use client'

import { useRouter } from 'next/navigation'
import { useTranslation } from 'next-i18next'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function ProviderOnboardingIntro() {
  const router = useRouter()
  const { t } = useTranslation(['onboarding', 'common'])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      {/* Language Switch Button */}
      <div className="absolute top-6 right-6">
        <LanguageSwitcher />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Welcome to Lavorino
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Join our growing community of service providers
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div className="text-gray-600 space-y-4">
              <p>
                Registering your business with Lavorino is quick and easy - it takes just a few minutes to get started. Once registered, you'll be able to:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Create a professional business profile</li>
                <li>List your services and expertise</li>
                <li>Connect with potential customers in your area</li>
                <li>Grow your business through our platform</li>
              </ul>
              <p>
                Let's get your business online and start connecting with customers who need your services.
              </p>
            </div>
            <button
              onClick={() => router.push('/provider-onboarding/details')}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Let's Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 