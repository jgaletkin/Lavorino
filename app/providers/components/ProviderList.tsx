'use client'

import { Provider } from '@/lib/types'
import ProviderListItem from './ProviderListItem'
import LoadingSkeleton from '@/components/LoadingSkeleton'
import EmptyState from '@/components/EmptyState'

interface ProviderListProps {
  providers: Provider[]
  isLoading: boolean
  onProviderSelect: (provider: Provider) => void
}

export default function ProviderList({ 
  providers, 
  isLoading, 
  onProviderSelect 
}: ProviderListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <LoadingSkeleton key={index} className="h-32" />
        ))}
      </div>
    )
  }

  if (providers.length === 0) {
    return (
      <EmptyState
        title="No providers found"
        description="Try adjusting your search filters to find more providers."
      />
    )
  }

  return (
    <div className="space-y-4">
      {providers.map((provider) => (
        <ProviderListItem
          key={provider.id}
          provider={provider}
          onClick={() => onProviderSelect(provider)}
        />
      ))}
    </div>
  )
} 