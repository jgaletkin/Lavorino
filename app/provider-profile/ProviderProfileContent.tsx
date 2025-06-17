'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'next-i18next'
import LanguageSwitcher from '../components/LanguageSwitcher'
import ProviderMenu from '../components/ProviderMenu'

export default function ProviderProfileContent() {
  const router = useRouter()
  const { t } = useTranslation(['profile', 'common'])
  const [businessData, setBusinessData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [formData, setFormData] = useState<any>({})

  useEffect(() => {
    try {
      // Load business data from localStorage
      const providers = localStorage.getItem('providers')
      if (providers) {
        const providersList = JSON.parse(providers)
        if (providersList.length > 0) {
          const data = providersList[providersList.length - 1]
          setBusinessData(data)
          setFormData(data)
        } else {
          setError('No provider data found')
        }
      } else {
        setError('No provider data found')
      }
    } catch (err) {
      setError('Error loading provider data')
      console.error('Error loading provider data:', err)
    }
  }, [])

  const handleEdit = (section: string) => {
    setEditingSection(section)
  }

  const handleCancel = () => {
    setEditingSection(null)
    setFormData(businessData) // Reset form data to original values
  }

  const handleSave = () => {
    try {
      const providers = localStorage.getItem('providers')
      if (providers) {
        const providersList = JSON.parse(providers)
        const updatedData = { ...businessData, ...formData }
        providersList[providersList.length - 1] = updatedData
        localStorage.setItem('providers', JSON.stringify(providersList))
        setBusinessData(updatedData)
        setEditingSection(null)
      }
    } catch (err) {
      console.error('Error saving data:', err)
      setError('Error saving changes')
    }
  }

  const handleInputChange = (section: string, field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            {error}
          </h2>
        </div>
      </div>
    )
  }

  if (!businessData) {
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

  const { businessDetails, ownerDetails, services } = businessData

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
              <h1 className="text-3xl font-bold text-gray-900">{t('profile:title')}</h1>
              <div className="flex items-center space-x-4">
                <LanguageSwitcher />
                <ProviderMenu />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-8">
          {/* Business Details */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Business Information</h2>
              {editingSection !== 'businessDetails' ? (
                <button
                  onClick={() => handleEdit('businessDetails')}
                  className="px-4 py-2 text-sm font-medium text-emerald-600 hover:text-emerald-700"
                >
                  Edit
                </button>
              ) : (
                <div className="space-x-2">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {editingSection === 'businessDetails' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Business Name</label>
                    <input
                      type="text"
                      value={formData.businessDetails?.businessName || ''}
                      onChange={(e) => handleInputChange('businessDetails', 'businessName', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Location</label>
                    <input
                      type="text"
                      value={formData.businessDetails?.location || ''}
                      onChange={(e) => handleInputChange('businessDetails', 'location', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Contact Email</label>
                    <input
                      type="email"
                      value={formData.businessDetails?.contactDetails?.email || ''}
                      onChange={(e) => handleInputChange('businessDetails', 'contactDetails', {
                        ...formData.businessDetails?.contactDetails,
                        email: e.target.value
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.businessDetails?.contactDetails?.phone || ''}
                      onChange={(e) => handleInputChange('businessDetails', 'contactDetails', {
                        ...formData.businessDetails?.contactDetails,
                        phone: e.target.value
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Website</label>
                    <input
                      type="url"
                      value={formData.businessDetails?.contactDetails?.website || ''}
                      onChange={(e) => handleInputChange('businessDetails', 'contactDetails', {
                        ...formData.businessDetails?.contactDetails,
                        website: e.target.value
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Business Name</h3>
                    <p className="mt-1 text-lg text-gray-900">{businessDetails?.businessName || 'N/A'}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Business Category</h3>
                    <p className="mt-1 text-lg text-gray-900">
                      {Array.isArray(businessDetails?.categories) 
                        ? businessDetails.categories.join(', ') 
                        : businessDetails?.categories || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Location</h3>
                    <p className="mt-1 text-lg text-gray-900">{businessDetails?.location || 'N/A'}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Contact Email</h3>
                    <p className="mt-1 text-lg text-gray-900">{businessDetails?.contactDetails?.email || 'N/A'}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                    <p className="mt-1 text-lg text-gray-900">{businessDetails?.contactDetails?.phone || 'N/A'}</p>
                  </div>
                  {businessDetails?.contactDetails?.website && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Website</h3>
                      <p className="mt-1 text-lg text-gray-900">{businessDetails.contactDetails.website}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Owner Details */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Owner Information</h2>
              {editingSection !== 'ownerDetails' ? (
                <button
                  onClick={() => handleEdit('ownerDetails')}
                  className="px-4 py-2 text-sm font-medium text-emerald-600 hover:text-emerald-700"
                >
                  Edit
                </button>
              ) : (
                <div className="space-x-2">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {editingSection === 'ownerDetails' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Owner Name</label>
                    <input
                      type="text"
                      value={formData.ownerDetails?.name || ''}
                      onChange={(e) => handleInputChange('ownerDetails', 'name', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Business Registration Number</label>
                    <input
                      type="text"
                      value={formData.ownerDetails?.registrationNumber || ''}
                      onChange={(e) => handleInputChange('ownerDetails', 'registrationNumber', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Owner Name</h3>
                    <p className="mt-1 text-lg text-gray-900">{ownerDetails?.name || 'N/A'}</p>
                  </div>
                  {ownerDetails?.registrationNumber && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Business Registration Number</h3>
                      <p className="mt-1 text-lg text-gray-900">{ownerDetails.registrationNumber}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Services */}
          {Array.isArray(services) && services.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Services Offered</h2>
                {editingSection !== 'services' ? (
                  <button
                    onClick={() => handleEdit('services')}
                    className="px-4 py-2 text-sm font-medium text-emerald-600 hover:text-emerald-700"
                  >
                    Edit
                  </button>
                ) : (
                  <div className="space-x-2">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              <div className="space-y-6">
                {services.map((service: any, index: number) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                    {editingSection === 'services' ? (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-500">Service Name</label>
                          <input
                            type="text"
                            value={formData.services[index]?.name || ''}
                            onChange={(e) => {
                              const newServices = [...formData.services]
                              newServices[index] = { ...newServices[index], name: e.target.value }
                              setFormData({ ...formData, services: newServices })
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500">Description</label>
                          <textarea
                            value={formData.services[index]?.description || ''}
                            onChange={(e) => {
                              const newServices = [...formData.services]
                              newServices[index] = { ...newServices[index], description: e.target.value }
                              setFormData({ ...formData, services: newServices })
                            }}
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-500">Pricing Model</label>
                            <input
                              type="text"
                              value={formData.services[index]?.pricingModel || ''}
                              onChange={(e) => {
                                const newServices = [...formData.services]
                                newServices[index] = { ...newServices[index], pricingModel: e.target.value }
                                setFormData({ ...formData, services: newServices })
                              }}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-500">Price Range</label>
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="number"
                                placeholder="Min"
                                value={formData.services[index]?.priceRange?.min || ''}
                                onChange={(e) => {
                                  const newServices = [...formData.services]
                                  newServices[index] = {
                                    ...newServices[index],
                                    priceRange: {
                                      ...newServices[index]?.priceRange,
                                      min: e.target.value
                                    }
                                  }
                                  setFormData({ ...formData, services: newServices })
                                }}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                              />
                              <input
                                type="number"
                                placeholder="Max"
                                value={formData.services[index]?.priceRange?.max || ''}
                                onChange={(e) => {
                                  const newServices = [...formData.services]
                                  newServices[index] = {
                                    ...newServices[index],
                                    priceRange: {
                                      ...newServices[index]?.priceRange,
                                      max: e.target.value
                                    }
                                  }
                                  setFormData({ ...formData, services: newServices })
                                }}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">{service.name || 'Unnamed Service'}</h3>
                        <p className="text-gray-600 mb-4">{service.description || 'No description available'}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Pricing Model</h4>
                            <p className="mt-1 text-gray-900">{service.pricingModel || 'N/A'}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Price Range</h4>
                            <p className="mt-1 text-gray-900">
                              {service.priceRange?.min || 'N/A'} - {service.priceRange?.max || 'N/A'} {service.priceRange?.currency || ''}
                            </p>
                          </div>
                          {Array.isArray(service.availability) && service.availability.length > 0 && (
                            <div className="md:col-span-2">
                              <h4 className="text-sm font-medium text-gray-500">Availability</h4>
                              <div className="mt-1 grid grid-cols-2 md:grid-cols-4 gap-2">
                                {service.availability.map((day: string) => (
                                  <span
                                    key={day}
                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800"
                                  >
                                    {day}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 