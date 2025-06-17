'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'next-i18next'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function ProviderOnboardingOwnerContent() {
  const router = useRouter()
  const { t } = useTranslation(['onboarding', 'common'])
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
          Owner Information
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Tell us about yourself
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Owner Name */}
            <div>
              <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">
                Owner Name *
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
                Business Registration Number
              </label>
              <input
                type="text"
                name="registrationNumber"
                id="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleInputChange}
                placeholder="If applicable"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              />
              <p className="mt-1 text-sm text-gray-500">
                If your business is registered, please provide the registration number
              </p>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                Continue to Services
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 