'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ProviderMenu from '../components/ProviderMenu'

interface BusinessData {
  businessDetails: {
    businessName: string
    categories: string[]
    location: string
    contactDetails: {
      email: string
      phone: string
      website?: string
    }
  }
  ownerDetails: {
    name: string
    registrationNumber?: string
  }
  services: Array<{
    name: string
    description: string
    pricingModel: string
    priceRange: {
      min: number
      max: number
      currency: string
    }
    availability?: string[]
  }>
}

export default function ProviderProfileContent() {
  const router = useRouter()
  const [businessData, setBusinessData] = useState<BusinessData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [formData, setFormData] = useState<BusinessData | null>(null)

  useEffect(() => {
    try {
      // Load business data from localStorage (only in browser)
      if (typeof window !== 'undefined') {
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
      if (typeof window !== 'undefined') {
        const providers = localStorage.getItem('providers')
        if (providers && formData) {
          const providersList = JSON.parse(providers)
          const updatedData = { ...businessData, ...formData }
          providersList[providersList.length - 1] = updatedData
          localStorage.setItem('providers', JSON.stringify(providersList))
          setBusinessData(updatedData)
          setEditingSection(null)
        }
      }
    } catch (err) {
      console.error('Error saving data:', err)
      setError('Error saving changes')
    }
  }

  const handleInputChange = (section: string, field: string, value: unknown) => {
    if (!formData) return
    
    setFormData((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        [section]: {
          ...prev[section as keyof BusinessData],
          [field]: value
        }
      }
    })
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

  if (!businessData || !formData) {
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
              <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
              <div className="flex items-center space-x-4">
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
                      value={formData.businessDetails.businessName}
                      onChange={(e) => handleInputChange('businessDetails', 'businessName', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Location</label>
                    <input
                      type="text"
                      value={formData.businessDetails.location}
                      onChange={(e) => handleInputChange('businessDetails', 'location', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Email</label>
                    <input
                      type="email"
                      value={formData.businessDetails.contactDetails.email}
                      onChange={(e) => handleInputChange('businessDetails', 'contactDetails', { ...formData.businessDetails.contactDetails, email: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Phone</label>
                    <input
                      type="tel"
                      value={formData.businessDetails.contactDetails.phone}
                      onChange={(e) => handleInputChange('businessDetails', 'contactDetails', { ...formData.businessDetails.contactDetails, phone: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Business Name</dt>
                    <dd className="mt-1 text-sm text-gray-900">{businessDetails.businessName}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Location</dt>
                    <dd className="mt-1 text-sm text-gray-900">{businessDetails.location}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900">{businessDetails.contactDetails.email}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Phone</dt>
                    <dd className="mt-1 text-sm text-gray-900">{businessDetails.contactDetails.phone}</dd>
                  </div>
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
                      value={formData.ownerDetails.name}
                      onChange={(e) => handleInputChange('ownerDetails', 'name', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Registration Number</label>
                    <input
                      type="text"
                      value={formData.ownerDetails.registrationNumber || ''}
                      onChange={(e) => handleInputChange('ownerDetails', 'registrationNumber', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Owner Name</dt>
                    <dd className="mt-1 text-sm text-gray-900">{ownerDetails.name}</dd>
                  </div>
                  {ownerDetails.registrationNumber && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Registration Number</dt>
                      <dd className="mt-1 text-sm text-gray-900">{ownerDetails.registrationNumber}</dd>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Services */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Services</h2>
            {services.length > 0 ? (
              <div className="space-y-4">
                {services.map((service, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-medium text-gray-900">{service.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                    <div className="mt-2 text-sm text-gray-500">
                      <span className="font-medium">Pricing:</span> {service.pricingModel} - ${service.priceRange.min} - ${service.priceRange.max}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No services configured.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 