'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Locale } from '../../i18n/settings'
import LanguageSwitcher from '../../components/LanguageSwitcher'

interface BusinessDetails {
  businessName: string
  businessType: string
  location: string
  logo?: string
  coverImage?: string
  contact: {
    email: string
    phone: string
    website?: string
    social?: {
      facebook?: string
      instagram?: string
      linkedin?: string
    }
  }
}

interface OwnerDetails {
  name: string
  registrationNumber?: string
}

interface ServiceDetails {
  description: string
  pricingModel: string
  priceRange: {
    min: string
    max: string
  }
  availability: {
    [key: string]: {
      start: string
      end: string
      available: boolean
    }
  }
}

interface OnboardingData {
  businessDetails: BusinessDetails
  ownerDetails: OwnerDetails
  services: Record<string, ServiceDetails>
  uniformHours: boolean
  uniformAvailability?: {
    [key: string]: {
      start: string
      end: string
      available: boolean
    }
  }
}

interface ProviderOnboardingConfirmationContentProps {
  locale: Locale
}

export default function ProviderOnboardingConfirmationContent({ locale }: ProviderOnboardingConfirmationContentProps) {
  const router = useRouter()
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null)
  const [isInfoConfirmed, setIsInfoConfirmed] = useState(false)
  const [isTermsAccepted, setIsTermsAccepted] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    // Load data from localStorage
    const detailsData = localStorage.getItem('providerBusinessDetails')
    const ownerData = localStorage.getItem('providerOwnerDetails')
    const servicesData = localStorage.getItem('providerServices')
    const uniformHoursData = localStorage.getItem('providerUniformHours')

    if (detailsData && ownerData && servicesData) {
      setOnboardingData({
        businessDetails: JSON.parse(detailsData),
        ownerDetails: JSON.parse(ownerData),
        services: JSON.parse(servicesData),
        uniformHours: uniformHoursData ? JSON.parse(uniformHoursData) : false,
        uniformAvailability: localStorage.getItem('providerUniformAvailability') 
          ? JSON.parse(localStorage.getItem('providerUniformAvailability')!) 
          : undefined
      })
    }
  }, [])

  const handleSave = async () => {
    if (!isInfoConfirmed || !isTermsAccepted) return

    setIsSaving(true)
    try {
      // Save all data under the user's profile
      const userData = {
        ...onboardingData,
        createdAt: new Date().toISOString(),
        status: 'active'
      }

      // Get existing providers or initialize empty array
      const existingProviders = localStorage.getItem('providers')
      const providers = existingProviders ? JSON.parse(existingProviders) : []
      
      // Add new provider
      providers.push(userData)
      
      // Save updated providers list
      localStorage.setItem('providers', JSON.stringify(providers))

      // Clear onboarding data from localStorage
      localStorage.removeItem('providerBusinessDetails')
      localStorage.removeItem('providerOwnerDetails')
      localStorage.removeItem('providerServices')
      localStorage.removeItem('providerUniformHours')
      localStorage.removeItem('providerUniformAvailability')

      // Redirect to provider dashboard or home page
      router.push('/provider-dashboard')
    } catch (error) {
      console.error('Error saving provider data:', error)
    } finally {
      setIsSaving(false)
    }
  }

  if (!onboardingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Loading...
          </h2>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      {/* Language Switch Button */}
      <div className="absolute top-6 right-6">
        <LanguageSwitcher locale={locale} />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          {/* Translation placeholder */}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {/* Translation placeholder */}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-3xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-8">
            {/* Business Details Section */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Business Information</h3>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Business Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{onboardingData.businessDetails.businessName}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Business Type</dt>
                  <dd className="mt-1 text-sm text-gray-900">{onboardingData.businessDetails.businessType}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Location</dt>
                  <dd className="mt-1 text-sm text-gray-900">{onboardingData.businessDetails.location}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Contact Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">{onboardingData.businessDetails.contact.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                  <dd className="mt-1 text-sm text-gray-900">{onboardingData.businessDetails.contact.phone}</dd>
                </div>
                {onboardingData.businessDetails.contact.website && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Website</dt>
                    <dd className="mt-1 text-sm text-gray-900">{onboardingData.businessDetails.contact.website}</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Owner Details Section */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Owner Information</h3>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Owner Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{onboardingData.ownerDetails.name}</dd>
                </div>
                {onboardingData.ownerDetails.registrationNumber && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Registration Number</dt>
                    <dd className="mt-1 text-sm text-gray-900">{onboardingData.ownerDetails.registrationNumber}</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Services Section */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Services</h3>
              <div className="space-y-6">
                {Object.entries(onboardingData.services).map(([serviceName, service]) => (
                  <div key={serviceName} className="border-t border-gray-200 pt-4">
                    <h4 className="text-md font-medium text-gray-900">{serviceName}</h4>
                    <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Description</dt>
                        <dd className="mt-1 text-sm text-gray-900">{service.description}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Pricing Model</dt>
                        <dd className="mt-1 text-sm text-gray-900">{service.pricingModel}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Price Range</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {service.priceRange.min} - {service.priceRange.max}
                        </dd>
                      </div>
                    </dl>
                  </div>
                ))}
              </div>
            </div>

            {/* Working Hours Section */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {onboardingData.uniformHours ? 'Working Hours' : 'Service Availability'}
              </h3>
              <div className="space-y-2">
                {Object.entries(
                  onboardingData.uniformHours 
                    ? onboardingData.uniformAvailability! 
                    : onboardingData.services[Object.keys(onboardingData.services)[0]].availability
                ).map(([day, schedule]) => (
                  <div key={day} className="flex items-center space-x-4">
                    <span className="w-32 text-sm text-gray-700">{day}</span>
                    {schedule.available ? (
                      <span className="text-sm text-gray-900">
                        {schedule.start} - {schedule.end}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-500">Not available</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Confirmation Checkboxes */}
            <div className="space-y-4">
              <label className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    checked={isInfoConfirmed}
                    onChange={(e) => setIsInfoConfirmed(e.target.checked)}
                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <span className="text-gray-700">
                    {/* Translation placeholder */}
                  </span>
                </div>
              </label>

              <label className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    checked={isTermsAccepted}
                    onChange={(e) => setIsTermsAccepted(e.target.checked)}
                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <span className="text-gray-700">
                    {/* Translation placeholder */}
                  </span>
                </div>
              </label>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="button"
                onClick={handleSave}
                disabled={!isInfoConfirmed || !isTermsAccepted || isSaving}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Creating Profile...' : 'Create Profile'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 