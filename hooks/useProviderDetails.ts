import { useQuery } from '@tanstack/react-query'
import { getProvider } from '@/lib/api'

export function useProviderDetails(id: string) {
  return useQuery({
    queryKey: ['provider', id],
    queryFn: () => getProvider(id),
    enabled: !!id,
  })
} 