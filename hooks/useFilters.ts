import { useState } from 'react'
import { ProviderFilters } from '@/app/providers/components/FilterBar'

export function useFilters() {
  const [filters, setFilters] = useState<ProviderFilters>({
    search: '',
    rating: null,
    priceRange: null,
    distance: null,
  })

  const updateFilters = (newFilters: Partial<ProviderFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      rating: null,
      priceRange: null,
      distance: null,
    })
  }

  return {
    filters,
    updateFilters,
    clearFilters,
  }
} 