'use client'

import { Provider } from '@/lib/types'
import StarRating from '@/components/StarRating'
import DistanceDisplay from '@/components/DistanceDisplay'
import ProviderTags from './ProviderTags'
import ProviderPriceRange from './ProviderPriceRange'

interface ProviderListItemProps {
  provider: Provider
  onClick: () => void
}

export default function ProviderListItem({ provider, onClick }: ProviderListItemProps) {
  return (
    <div
      className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <img
            src={provider.image}
            alt={provider.name}
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 truncate">
              {provider.name}
            </h3>
            <ProviderPriceRange priceRange={provider.priceRange} />
          </div>
          
          <div className="mt-1 flex items-center space-x-4">
            <StarRating rating={provider.rating} size="sm" />
            <DistanceDisplay distance={provider.distance} />
          </div>
          
          <p className="mt-2 text-sm text-gray-500 line-clamp-2">
            {provider.description}
          </p>
          
          <div className="mt-3">
            <ProviderTags tags={provider.tags} />
          </div>
        </div>
      </div>
    </div>
  )
} 