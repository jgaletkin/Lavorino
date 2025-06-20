'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

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

export default function ProviderOnboardingServicesContent() {
  const router = useRouter()
  const [services, setServices] = useState<Record<string, ServiceDetails>>({})
  const [uniformHours, setUniformHours] = useState(false)
  const [uniformAvailability, setUniformAvailability] = useState<Record<string, { start: string; end: string; available: boolean }>>({})

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  useEffect(() => {
    // Load existing services from localStorage
    const savedServices = localStorage.getItem('providerServices')
    if (savedServices) {
      setServices(JSON.parse(savedServices))
    }

    // Load uniform hours setting
    const savedUniformHours = localStorage.getItem('providerUniformHours')
    if (savedUniformHours) {
      setUniformHours(JSON.parse(savedUniformHours))
    }

    // Load uniform availability
    const savedUniformAvailability = localStorage.getItem('providerUniformAvailability')
    if (savedUniformAvailability) {
      setUniformAvailability(JSON.parse(savedUniformAvailability))
    }
  }, [])

  const removeService = (serviceName: string) => {
    const newServices = { ...services }
    delete newServices[serviceName]
    setServices(newServices)
  }

  const updateService = (serviceName: string, field: keyof ServiceDetails, value: unknown) => {
    setServices(prev => ({
      ...prev,
      [serviceName]: {
        ...prev[serviceName],
        [field]: value
      }
    }))
  }

  const updateAvailability = (serviceName: string, day: string, field: 'start' | 'end' | 'available', value: string | boolean) => {
    setServices(prev => ({
      ...prev,
      [serviceName]: {
        ...prev[serviceName],
        availability: {
          ...prev[serviceName].availability,
          [day]: {
            ...prev[serviceName].availability[day],
            [field]: value
          }
        }
      }
    }))
  }

  const updateUniformAvailability = (day: string, field: 'start' | 'end' | 'available', value: string | boolean) => {
    setUniformAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }))
  }

  const handleNext = () => {
    // Save services to localStorage
    localStorage.setItem('providerServices', JSON.stringify(services))
    localStorage.setItem('providerUniformHours', JSON.stringify(uniformHours))
    localStorage.setItem('providerUniformAvailability', JSON.stringify(uniformAvailability))

    // Navigate to next step
    router.push('/provider-onboarding/confirmation')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Services Configuration
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Configure your services and availability
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-3xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-8">
            {/* Services List */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Your Services</h3>
              {Object.keys(services).length === 0 ? (
                <p className="text-gray-500">No services configured yet.</p>
              ) : (
                <div className="space-y-4">
                  {Object.entries(services).map(([serviceName, service]) => (
                    <div key={serviceName} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-gray-900">{serviceName}</h4>
                        <button
                          type="button"
                          onClick={() => removeService(serviceName)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => router.push('/provider-onboarding/owner')}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 