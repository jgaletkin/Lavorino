import { useQuery } from '@tanstack/react-query'
import { getProviders } from '@/lib/api'
import { ProviderFilters } from '@/app/providers/components/FilterBar'

export function useProviderSearch(filters: ProviderFilters) {
  return useQuery({
    queryKey: ['providers', filters],
    queryFn: () => getProviders({
      search: filters.search,
      rating: filters.rating,
      priceRange: filters.priceRange,
      distance: filters.distance,
    }),
  })
} 