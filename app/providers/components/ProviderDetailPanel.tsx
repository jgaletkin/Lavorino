'use client'

import { Provider } from '../../lib/types'

interface ProviderDetailPanelProps {
  provider: Provider | null
  onClose: () => void
}

export default function ProviderDetailPanel({ provider, onClose }: ProviderDetailPanelProps) {
  if (!provider) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-900">{provider.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            {/* Rating */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Rating</h3>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-emerald-600">{provider.rating}</span>
                <span className="text-gray-500 ml-2">/ 5</span>
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Price Range</h3>
              <p className="text-gray-600">
                ${provider.priceRange[0]} - ${provider.priceRange[1]}
              </p>
            </div>

            {/* Distance */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Distance</h3>
              <p className="text-gray-600">{provider.distance} km away</p>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Services</h3>
              <div className="flex flex-wrap gap-2">
                {provider.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 