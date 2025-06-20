'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

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

export default function ProviderOnboardingConfirmationContent() {
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
      <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Review Your Information
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Please review all the information before completing your registration
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
              {Object.keys(onboardingData.services).length === 0 ? (
                <p className="text-gray-500">No services configured.</p>
              ) : (
                <div className="space-y-4">
                  {Object.entries(onboardingData.services).map(([serviceName, service]) => (
                    <div key={serviceName} className="border rounded-lg p-4">
                      <h4 className="font-medium text-gray-900">{serviceName}</h4>
                      <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Confirmation Checkboxes */}
            <div className="space-y-4">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="infoConfirmed"
                  checked={isInfoConfirmed}
                  onChange={(e) => setIsInfoConfirmed(e.target.checked)}
                  className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <label htmlFor="infoConfirmed" className="ml-2 text-sm text-gray-700">
                  I confirm that all the information provided is accurate and complete
                </label>
              </div>
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="termsAccepted"
                  checked={isTermsAccepted}
                  onChange={(e) => setIsTermsAccepted(e.target.checked)}
                  className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <label htmlFor="termsAccepted" className="ml-2 text-sm text-gray-700">
                  I agree to the terms and conditions and privacy policy
                </label>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => router.push('/provider-onboarding/services')}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={!isInfoConfirmed || !isTermsAccepted || isSaving}
                className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Saving...' : 'Complete Registration'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 