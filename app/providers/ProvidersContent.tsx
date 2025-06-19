'use client'

import { useState } from 'react'
import { Locale } from '../i18n/settings'
import { Provider } from '@/lib/types'
import { mockProviders } from '@/lib/mockData'
import ProviderList from '@/components/ProviderList'
import FilterBar, { ProviderFilters } from '@/components/FilterBar'
import ProviderDetailPanel from './components/ProviderDetailPanel'
import { Squares2X2Icon, TableCellsIcon } from '@heroicons/react/24/outline'
import TopNav from '@/components/TopNav'

interface ProvidersContentProps {
  locale: Locale
}

export default function ProvidersContent({ locale }: ProvidersContentProps) {
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null)
  const [isGridView, setIsGridView] = useState(false)
  const [filters, setFilters] = useState<ProviderFilters>({
    search: '',
    rating: null,
    priceRange: null,
    distance: null,
    specialty: null
  })

  const handleFilterChange = (newFilters: ProviderFilters) => {
    console.log('New filters:', newFilters)
    setFilters(newFilters)
  }

  const filteredProviders = mockProviders.filter(provider => {
    let shouldInclude = true

    // Search filter
    if (filters.search && !provider.name.toLowerCase().includes(filters.search.toLowerCase())) {
      shouldInclude = false
    }

    // Rating filter
    if (shouldInclude && filters.rating !== null) {
      console.log('Checking rating:', {
        providerRating: provider.rating,
        filterRating: filters.rating,
        comparison: provider.rating >= filters.rating
      })
      shouldInclude = provider.rating >= filters.rating
    }

    // Price range filter
    if (shouldInclude && filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange
      shouldInclude = !(provider.priceRange[0] > maxPrice || provider.priceRange[1] < minPrice)
    }

    // Distance filter
    if (shouldInclude && filters.distance) {
      shouldInclude = provider.distance <= filters.distance
    }

    // Specialty filter
    if (shouldInclude && filters.specialty) {
      shouldInclude = provider.tags.includes(filters.specialty)
    }

    console.log('Provider filter result:', {
      name: provider.name,
      rating: provider.rating,
      shouldInclude
    })

    return shouldInclude
  })

  console.log('Filtered providers:', filteredProviders.map(p => ({ name: p.name, rating: p.rating })))

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            {/* {t('providers.title')} */}
          </h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsGridView(true)}
              className={`p-2 rounded-md ${
                isGridView ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
            >
              <Squares2X2Icon className="h-5 w-5 text-gray-500" />
            </button>
            <button
              onClick={() => setIsGridView(false)}
              className={`p-2 rounded-md ${
                !isGridView ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
            >
              <TableCellsIcon className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        <FilterBar onFilterChange={handleFilterChange} />

        <ProviderList
          providers={filteredProviders}
          onSelectProvider={setSelectedProvider}
          isGridView={isGridView}
        />

        {selectedProvider && (
          <ProviderDetailPanel
            provider={selectedProvider}
            onClose={() => setSelectedProvider(null)}
            width={400}
            onWidthChange={() => {}}
          />
        )}
      </div>
    </div>
  )
} 