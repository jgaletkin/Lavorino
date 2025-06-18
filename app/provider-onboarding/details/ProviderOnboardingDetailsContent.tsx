'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
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

export default function ProviderOnboardingDetailsContent() {
  const router = useRouter()
  const { t } = useTranslation(['onboarding', 'common'])
  const [formData, setFormData] = useState({
    businessName: '',
    categories: [] as string[],
    city: '',
    address: '',
    serviceArea: '',
    logo: null as File | null,
    coverImage: null as File | null,
    email: '',
    phone: '',
    website: '',
    social: {
      facebook: '',
      instagram: '',
      linkedin: ''
    }
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCategoryChange = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'coverImage') => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        [type]: e.target.files![0]
      }))
    }
  }

  const handleSocialChange = (platform: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      social: {
        ...prev.social,
        [platform]: value
      }
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Save business details to localStorage
    const businessDetails = {
      businessName: formData.businessName,
      businessType: formData.categories[0], // Using the first category as business type
      location: formData.address || formData.city || formData.serviceArea,
      contact: {
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
        social: formData.social
      }
    }
    
    localStorage.setItem('providerBusinessDetails', JSON.stringify(businessDetails))
    router.push('/provider-onboarding/owner')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      {/* Language Switch Button */}
      <div className="absolute top-6 right-6">
        <LanguageSwitcher />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Business Details
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Tell us about your business
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business Name */}
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
                Business Name *
              </label>
              <input
                type="text"
                name="businessName"
                id="businessName"
                required
                value={formData.businessName}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              />
            </div>

            {/* Business Categories */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Categories *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {BUSINESS_CATEGORIES.map((category) => (
                  <label key={category} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.categories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="space-y-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="serviceArea" className="block text-sm font-medium text-gray-700">
                  Service Area
                </label>
                <input
                  type="text"
                  name="serviceArea"
                  id="serviceArea"
                  value={formData.serviceArea}
                  onChange={handleInputChange}
                  placeholder="e.g., Within 20 miles of city center"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Images */}
            <div className="space-y-4">
              <div>
                <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
                  Business Logo
                </label>
                <input
                  type="file"
                  name="logo"
                  id="logo"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'logo')}
                  className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-medium
                    file:bg-emerald-50 file:text-emerald-700
                    hover:file:bg-emerald-100"
                />
              </div>
              <div>
                <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">
                  Cover Image
                </label>
                <input
                  type="file"
                  name="coverImage"
                  id="coverImage"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'coverImage')}
                  className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-medium
                    file:bg-emerald-50 file:text-emerald-700
                    hover:file:bg-emerald-100"
                />
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  id="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">Social Media</h3>
              <div>
                <label htmlFor="facebook" className="block text-sm font-medium text-gray-700">
                  Facebook
                </label>
                <input
                  type="url"
                  name="facebook"
                  id="facebook"
                  value={formData.social.facebook}
                  onChange={(e) => handleSocialChange('facebook', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">
                  Instagram
                </label>
                <input
                  type="url"
                  name="instagram"
                  id="instagram"
                  value={formData.social.instagram}
                  onChange={(e) => handleSocialChange('instagram', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
                  LinkedIn
                </label>
                <input
                  type="url"
                  name="linkedin"
                  id="linkedin"
                  value={formData.social.linkedin}
                  onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                Continue to Owner Information
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 