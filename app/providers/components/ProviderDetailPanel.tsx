'use client'

import { useEffect, useRef, useState } from 'react'
import { Provider } from '@/lib/types'
import StarRating from '@/components/StarRating'
import DistanceDisplay from '@/components/DistanceDisplay'
import ProviderTags from './ProviderTags'
import ProviderPriceRange from './ProviderPriceRange'
import { StarIcon } from '@heroicons/react/20/solid'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

interface ProviderDetailPanelProps {
  provider: Provider | null
  onClose: () => void
  width: number
  onWidthChange: (width: number) => void
}

export default function ProviderDetailPanel({
  provider,
  onClose,
  width,
  onWidthChange
}: ProviderDetailPanelProps) {
  const { t } = useTranslation('providers')

  if (!provider) return null

  return (
    <div
      className="fixed right-0 top-0 h-full w-[30%] bg-white shadow-lg transition-all duration-300 ease-in-out z-50"
    >
      {/* Resize handle */}
      <div
        className="absolute left-0 top-0 h-full w-1 cursor-ew-resize bg-gray-200 hover:bg-emerald-500"
        onMouseDown={(e) => {
          const startX = e.clientX
          const startWidth = width

          const handleMouseMove = (e: MouseEvent) => {
            const deltaX = startX - e.clientX
            const newWidth = Math.min(Math.max(startWidth + deltaX, 300), 800)
            onWidthChange(newWidth)
          }

          const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
          }

          document.addEventListener('mousemove', handleMouseMove)
          document.addEventListener('mouseup', handleMouseUp)
        }}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 text-gray-500 backdrop-blur-sm hover:bg-white hover:text-gray-700"
      >
        <XMarkIcon className="h-6 w-6" />
      </button>

      {/* Content */}
      <div className="h-full overflow-y-auto p-6">
        <div className="relative h-48 w-full overflow-hidden rounded-lg">
          <Image
            src={provider.image}
            alt={provider.name}
            fill
            className="object-cover"
          />
        </div>

        <h2 className="mt-4 text-2xl font-bold">{provider.name}</h2>

        <div className="mt-2 flex items-center">
          <div className="flex items-center">
            <StarIcon className="h-5 w-5 text-yellow-400" />
            <span className="ml-1 text-gray-700">{provider.rating}</span>
          </div>
          <span className="mx-2 text-gray-300">•</span>
          <span className="text-gray-700">
            {provider.reviewCount} {t('providers:provider.reviews')}
          </span>
        </div>

        <div className="mt-4">
          <span className="text-lg font-semibold text-emerald-600">
            €{provider.priceRange[0]} - €{provider.priceRange[1]}
          </span>
        </div>

        <p className="mt-4 text-gray-600">{provider.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {provider.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-800"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Services Section */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold">{t('providers:provider.services')}</h3>
          <div className="mt-4 space-y-4">
            {provider.services.map((service) => (
              <div
                key={service.id}
                className="rounded-lg border border-gray-200 p-4 hover:border-emerald-500"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{service.name}</h4>
                    <p className="mt-1 text-sm text-gray-600">
                      {service.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-emerald-600">
                      €{service.price}
                    </div>
                    <div className="text-sm text-gray-500">
                      {service.duration} {t('providers:provider.duration')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 