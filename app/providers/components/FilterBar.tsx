'use client'

import { useState } from 'react'

interface FilterBarProps {
  onFilterChange: (filters: FilterOptions) => void
}

interface FilterOptions {
  search: string
  category?: string
  priceRange: [number, number] | null
  rating: number | null
  distance: number | null
}

export interface ProviderFilters {
  search: string
  rating: number | null
  priceRange: [number, number] | null
  distance: number | null
}

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const [filters, setFilters] = useState<ProviderFilters>({
    search: '',
    rating: null,
    priceRange: null,
    distance: null,
  })

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, search: e.target.value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleRatingChange = (rating: number) => {
    const newFilters = { ...filters, rating }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search providers..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={filters.search}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="flex space-x-4">
          <select
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => handleRatingChange(Number(e.target.value))}
            value={filters.rating || ''}
          >
            <option value="">Rating</option>
            <option value="4">4+ Stars</option>
            <option value="3">3+ Stars</option>
            <option value="2">2+ Stars</option>
          </select>
        </div>
      </div>
    </div>
  )
} 