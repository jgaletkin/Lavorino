'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useClientTranslation } from '../../i18n/client'
import { Locale } from '../../i18n/settings'
import LanguageSwitcher from '@/components/LanguageSwitcher'

interface ProviderOnboardingOwnerContentProps {
  locale: Locale
}

export default function ProviderOnboardingOwnerContent({ locale }: ProviderOnboardingOwnerContentProps) {
  const router = useRouter()
  const { t } = useClientTranslation(locale, ['onboarding', 'common'])
  const [formData, setFormData] = useState({
    ownerName: '',
    registrationNumber: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Save owner details to localStorage
    const ownerDetails = {
      name: formData.ownerName,
      registrationNumber: formData.registrationNumber || undefined
    }
    
    localStorage.setItem('providerOwnerDetails', JSON.stringify(ownerDetails))
    router.push('/provider-onboarding/services')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      {/* Language Switch Button */}
      <div className="absolute top-6 right-6">
        <LanguageSwitcher />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          {t('onboarding.owner.title')}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {t('onboarding.owner.description')}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Owner Name */}
            <div>
              <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">
                {t('onboarding.owner.nameLabel')} *
              </label>
              <input
                type="text"
                name="ownerName"
                id="ownerName"
                required
                value={formData.ownerName}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              />
            </div>

            {/* Business Registration Number */}
            <div>
              <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700">
                {t('onboarding.owner.registrationNumberLabel')}
              </label>
              <input
                type="text"
                name="registrationNumber"
                id="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleInputChange}
                placeholder={t('onboarding.owner.registrationNumberPlaceholder')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              />
              <p className="mt-1 text-sm text-gray-500">
                {t('onboarding.owner.registrationNumberDescription')}
              </p>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                {t('onboarding.owner.continueButton')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 