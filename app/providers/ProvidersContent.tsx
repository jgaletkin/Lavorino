'use client'

import { useState, useEffect } from 'react'
import { Locale } from '../i18n/settings'
import { Provider } from '../../lib/types'
import { mockProviders } from '../../lib/mockData'
import ProviderList from './components/ProviderList'
import FilterBar from '../../components/FilterBar'
import ProviderDetailPanel from './components/ProviderDetailPanel'
import { Squares2X2Icon, TableCellsIcon } from '@heroicons/react/24/outline'
import TopNav from '@/components/TopNav'

interface ProvidersContentProps {
  locale: Locale
}

export default function ProvidersContent({ locale: _ }: ProvidersContentProps) {
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null)
  const [isGridView, setIsGridView] = useState(false)
  const [providers, setProviders] = useState<Provider[]>([])
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([])

  useEffect(() => {
    setProviders(mockProviders)
    setFilteredProviders(mockProviders)
  }, [])

  const handleFilterChange = (filters: { search: string; category: string; priceRange: [number, number] | null; rating: number | null; distance: number | null }) => {
    let filtered = providers

    if (filters.search) {
      filtered = filtered.filter(provider =>
        provider.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        provider.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()))
      )
    }

    if (filters.rating) {
      filtered = filtered.filter(provider => provider.rating >= filters.rating!)
    }

    if (filters.priceRange) {
      filtered = filtered.filter(provider =>
        provider.priceRange[0] >= filters.priceRange![0] &&
        provider.priceRange[1] <= filters.priceRange![1]
      )
    }

    if (filters.distance) {
      filtered = filtered.filter(provider => provider.distance <= filters.distance!)
    }

    setFilteredProviders(filtered)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Service Providers</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsGridView(!isGridView)}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              {isGridView ? (
                <TableCellsIcon className="h-5 w-5" />
              ) : (
                <Squares2X2Icon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <FilterBar onFilterChange={handleFilterChange} />

        <div className="mt-8">
          <ProviderList
            providers={filteredProviders}
            isGridView={isGridView}
            onProviderSelect={setSelectedProvider}
          />
        </div>

        {selectedProvider && (
          <ProviderDetailPanel
            provider={selectedProvider}
            onClose={() => setSelectedProvider(null)}
          />
        )}
      </div>
    </div>
  )
} 