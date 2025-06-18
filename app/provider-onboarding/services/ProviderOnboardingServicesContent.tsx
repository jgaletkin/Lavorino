'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useClientTranslation } from '../../i18n/client'
import { Locale } from '../../i18n/settings'
import LanguageSwitcher from '@/components/LanguageSwitcher'

const BUSINESS_CATEGORIES = [
  'Construction',
  'Gardening & Landscaping',
  'Handyman Services',
  'Electrical',
  'Plumbing',
  'HVAC',
  'Painting',
  'Carpentry',
  'Roofing',
  'Cleaning Services'
]

const SERVICE_CATEGORIES = {
  'Construction': [
    'New Home Construction',
    'Commercial Construction',
    'Renovation',
    'Demolition',
    'Foundation Work',
    'Structural Repairs'
  ],
  'Gardening & Landscaping': [
    'Lawn Maintenance',
    'Garden Design',
    'Tree Planting & Care',
    'Irrigation Systems',
    'Outdoor Lighting',
    'Patio & Deck Construction'
  ],
  'Handyman Services': [
    'General Repairs',
    'Furniture Assembly',
    'Door & Window Repairs',
    'Drywall Repairs',
    'Fence Installation',
    'Gutter Cleaning'
  ],
  'Electrical': [
    'Light Fixture Installation',
    'Electrical Repairs',
    'Wiring Installation',
    'Circuit Breaker Service',
    'Electrical Safety Inspection',
    'Smart Home Installation'
  ],
  'Plumbing': [
    'Pipe Installation',
    'Drain Cleaning',
    'Water Heater Service',
    'Bathroom Fixtures',
    'Leak Detection',
    'Emergency Plumbing'
  ],
  'HVAC': [
    'AC Installation',
    'Heating System Service',
    'Ventilation Systems',
    'Air Quality Testing',
    'Duct Cleaning',
    'Thermostat Installation'
  ],
  'Painting': [
    'Interior Painting',
    'Exterior Painting',
    'Cabinet Refinishing',
    'Wallpaper Installation',
    'Stucco & Texture',
    'Deck Staining'
  ],
  'Carpentry': [
    'Custom Closets',
    'Cabinet Installation',
    'Trim Work',
    'Custom Furniture',
    'Door Installation',
    'Window Frames'
  ],
  'Roofing': [
    'Roof Installation',
    'Roof Repairs',
    'Gutter Installation',
    'Skylight Installation',
    'Roof Inspection',
    'Weatherproofing'
  ],
  'Cleaning Services': [
    'Residential Cleaning',
    'Commercial Cleaning',
    'Deep Cleaning',
    'Carpet Cleaning',
    'Window Cleaning',
    'Post-Construction Cleaning'
  ]
}

const PRICING_MODELS = [
  'Hourly Rate',
  'Fixed Price',
  'Per Square Foot',
  'Per Unit',
  'Custom Quote'
]

const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

interface ProviderOnboardingServicesContentProps {
  locale: Locale;
}

export default function ProviderOnboardingServicesContent({ locale }: ProviderOnboardingServicesContentProps) {
  const router = useRouter()
  const { t } = useClientTranslation(locale, ['onboarding', 'common'])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedServices, setSelectedServices] = useState<Record<string, {
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
  }>>({})
  const [uniformHours, setUniformHours] = useState(false)
  const [uniformAvailability, setUniformAvailability] = useState<{
    [key: string]: {
      start: string
      end: string
      available: boolean
    }
  }>(DAYS_OF_WEEK.reduce((acc, day) => ({
    ...acc,
    [day]: {
      start: '09:00',
      end: '17:00',
      available: day !== 'Sunday'
    }
  }), {}))

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => {
      const newSelectedCategories = prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]

      // If category is being deselected, remove all its services
      if (prev.includes(category)) {
        const servicesToRemove = SERVICE_CATEGORIES[category as keyof typeof SERVICE_CATEGORIES]
        setSelectedServices(prevServices => {
          const updatedServices = { ...prevServices }
          servicesToRemove.forEach(service => {
            delete updatedServices[service]
          })
          return updatedServices
        })
      }

      return newSelectedCategories
    })
  }

  const handleServiceToggle = (service: string) => {
    setSelectedServices(prev => {
      if (prev[service]) {
        const { [service]: removed, ...rest } = prev
        return rest
      } else {
        return {
          ...prev,
          [service]: {
            description: '',
            pricingModel: PRICING_MODELS[0],
            priceRange: {
              min: '',
              max: ''
            },
            availability: DAYS_OF_WEEK.reduce((acc, day) => ({
              ...acc,
              [day]: {
                start: '09:00',
                end: '17:00',
                available: day !== 'Sunday'
              }
            }), {})
          }
        }
      }
    })
  }

  const handleServiceChange = (serviceId: string, field: string, value: string) => {
    setSelectedServices(prev => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        [field]: value
      }
    }))
  }

  const handlePriceChange = (serviceId: string, field: 'min' | 'max', value: string) => {
    setSelectedServices(prev => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        priceRange: {
          ...prev[serviceId].priceRange,
          [field]: value
        }
      }
    }))
  }

  const handleAvailabilityChange = (serviceId: string, day: string, field: string, value: string | boolean) => {
    setSelectedServices(prev => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        availability: {
          ...prev[serviceId].availability,
          [day]: {
            ...prev[serviceId].availability[day],
            [field]: value
          }
        }
      }
    }))
  }

  const handleUniformHoursChange = (checked: boolean) => {
    setUniformHours(checked)
    if (checked) {
      // Apply uniform hours to all selected services
      const updatedServices = Object.keys(selectedServices).reduce((acc, serviceId) => ({
        ...acc,
        [serviceId]: {
          ...selectedServices[serviceId],
          availability: uniformAvailability
        }
      }), {})
      setSelectedServices(updatedServices)
    }
  }

  const handleUniformAvailabilityChange = (day: string, field: string, value: string | boolean) => {
    setUniformAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }))

    if (uniformHours) {
      // Update all services with the new uniform availability
      const updatedServices = Object.keys(selectedServices).reduce((acc, serviceId) => ({
        ...acc,
        [serviceId]: {
          ...selectedServices[serviceId],
          availability: {
            ...selectedServices[serviceId].availability,
            [day]: {
              ...selectedServices[serviceId].availability[day],
              [field]: value
            }
          }
        }
      }), {})
      setSelectedServices(updatedServices)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Save services and uniform hours to localStorage
    localStorage.setItem('providerServices', JSON.stringify(selectedServices))
    localStorage.setItem('providerUniformHours', JSON.stringify(uniformHours))
    
    if (uniformHours) {
      localStorage.setItem('providerUniformAvailability', JSON.stringify(uniformAvailability))
    }
    
    router.push('/provider-onboarding/confirmation')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      {/* Language Switch Button */}
      <div className="absolute top-6 right-6">
        <LanguageSwitcher />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          {t('onboarding.services.title')}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {t('onboarding.services.description')}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-3xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Business Categories */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                {t('onboarding.services.categories.label')} *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {BUSINESS_CATEGORIES.map((category) => (
                  <label key={category} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryToggle(category)}
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Service Selection */}
            {selectedCategories.map(category => (
              <div key={category} className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SERVICE_CATEGORIES[category as keyof typeof SERVICE_CATEGORIES].map(service => (
                    <label key={service} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={!!selectedServices[service]}
                        onChange={() => handleServiceToggle(service)}
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{service}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            {/* Uniform Hours Section */}
            {Object.keys(selectedServices).length > 0 && (
              <div className="border-t border-gray-200 pt-6">
                <div className="mb-4">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={uniformHours}
                      onChange={(e) => handleUniformHoursChange(e.target.checked)}
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {t('onboarding.services.uniformHours.label')}
                    </span>
                  </label>
                </div>

                {uniformHours && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('onboarding.services.uniformHours.workingHours')}
                    </label>
                    <div className="space-y-2">
                      {DAYS_OF_WEEK.map(day => (
                        <div key={day} className="flex items-center space-x-4">
                          <label className="inline-flex items-center w-32">
                            <input
                              type="checkbox"
                              checked={uniformAvailability[day].available}
                              onChange={(e) => handleUniformAvailabilityChange(day, 'available', e.target.checked)}
                              className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">{day}</span>
                          </label>
                          {uniformAvailability[day].available && (
                            <>
                              <input
                                type="time"
                                value={uniformAvailability[day].start}
                                onChange={(e) => handleUniformAvailabilityChange(day, 'start', e.target.value)}
                                className="rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                              />
                              <span className="text-gray-500">{t('onboarding.services.uniformHours.to')}</span>
                              <input
                                type="time"
                                value={uniformAvailability[day].end}
                                onChange={(e) => handleUniformAvailabilityChange(day, 'end', e.target.value)}
                                className="rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                              />
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Service Details */}
            {Object.entries(selectedServices).map(([serviceId, service]) => (
              <div key={serviceId} className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{serviceId}</h3>
                
                {/* Description */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    {t('onboarding.services.description.label')}
                  </label>
                  <textarea
                    value={service.description}
                    onChange={(e) => handleServiceChange(serviceId, 'description', e.target.value)}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                    placeholder={t('onboarding.services.description.placeholder')}
                  />
                </div>

                {/* Pricing */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('onboarding.services.pricing.label')}
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600">{t('onboarding.services.pricing.model')}</label>
                      <select
                        value={service.pricingModel}
                        onChange={(e) => handleServiceChange(serviceId, 'pricingModel', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                      >
                        {PRICING_MODELS.map(model => (
                          <option key={model} value={model}>{model}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">{t('onboarding.services.pricing.minPrice')}</label>
                      <input
                        type="number"
                        value={service.priceRange.min}
                        onChange={(e) => handlePriceChange(serviceId, 'min', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                        placeholder={t('onboarding.services.pricing.minPlaceholder')}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">{t('onboarding.services.pricing.maxPrice')}</label>
                      <input
                        type="number"
                        value={service.priceRange.max}
                        onChange={(e) => handlePriceChange(serviceId, 'max', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                        placeholder={t('onboarding.services.pricing.maxPlaceholder')}
                      />
                    </div>
                  </div>
                </div>

                {/* Availability */}
                {!uniformHours && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('onboarding.services.availability.label')}
                    </label>
                    <div className="space-y-2">
                      {DAYS_OF_WEEK.map(day => (
                        <div key={day} className="flex items-center space-x-4">
                          <label className="inline-flex items-center w-32">
                            <input
                              type="checkbox"
                              checked={service.availability[day].available}
                              onChange={(e) => handleAvailabilityChange(serviceId, day, 'available', e.target.checked)}
                              className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">{day}</span>
                          </label>
                          {service.availability[day].available && (
                            <>
                              <input
                                type="time"
                                value={service.availability[day].start}
                                onChange={(e) => handleAvailabilityChange(serviceId, day, 'start', e.target.value)}
                                className="rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                              />
                              <span className="text-gray-500">{t('onboarding.services.availability.to')}</span>
                              <input
                                type="time"
                                value={service.availability[day].end}
                                onChange={(e) => handleAvailabilityChange(serviceId, day, 'end', e.target.value)}
                                className="rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                              />
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                {t('onboarding.services.submit')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 