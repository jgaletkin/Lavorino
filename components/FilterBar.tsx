'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

interface FilterBarProps {
  onFilterChange: (filters: FilterOptions) => void
}

interface FilterOptions {
  search: string
  category: string
  priceRange: [number, number] | null
  rating: number | null
  distance: number | null
}

// List of available specialties based on the mock data
const availableSpecialties = [
  'Elettricista',
  'Idraulico',
  'Costruzione',
  'Manutenzione',
  'IT',
  'Pulizie',
  'Giardinaggio',
  'Trasloco',
  'Installazione',
  'Riparazioni',
  'Bricolage',
  'Supporto Tecnico',
  'Progettazione',
  'Ristrutturazione',
  'Sostenibilità',
  'Trasporto',
  'Montaggio'
]

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const { t } = useTranslation('providers')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null)
  const [rating, setRating] = useState<number | null>(null)
  const [distance, setDistance] = useState<number | null>(null)

  const handleSearchChange = (value: string) => {
    setSearch(value)
    onFilterChange({
      search: value,
      category,
      priceRange,
      rating,
      distance
    })
  }

  const handleRatingChange = (value: number | null) => {
    setRating(value)
    onFilterChange({
      search,
      category,
      priceRange,
      rating: value,
      distance
    })
  }

  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          placeholder={t('providers:filters.searchPlaceholder')}
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        {/* Rating Filter */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">
            {t('providers:filters.rating')}:
          </label>
          <select
            className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            value={rating?.toString() || ''}
            onChange={(e) => {
              const value = e.target.value ? Number(e.target.value) : null
              handleRatingChange(value)
            }}
          >
            <option value="">{t('providers:filters.any')}</option>
            <option value="4">4+ {t('providers:filters.stars')}</option>
            <option value="3">3+ {t('providers:filters.stars')}</option>
            <option value="2">2+ {t('providers:filters.stars')}</option>
          </select>
        </div>

        {/* Price Range Filter */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">
            {t('providers:filters.price')}:
          </label>
          <select
            className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            value={priceRange ? `${priceRange[0]}-${priceRange[1]}` : ''}
            onChange={(e) => {
              const value = e.target.value
              if (!value) {
                setPriceRange(null)
                return
              }
              const [min, max] = value.split('-').map(Number)
              setPriceRange([min, max])
            }}
          >
            <option value="">{t('providers:filters.any')}</option>
            <option value="0-50">€0 - €50</option>
            <option value="50-100">€50 - €100</option>
            <option value="100-200">€100 - €200</option>
            <option value="200-500">€200+</option>
          </select>
        </div>

        {/* Distance Filter */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">
            {t('providers:filters.distance')}:
          </label>
          <select
            className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            value={distance?.toString() || ''}
            onChange={(e) => {
              const value = e.target.value ? Number(e.target.value) : null
              setDistance(value)
            }}
          >
            <option value="">{t('providers:filters.any')}</option>
            <option value="5">{t('providers:filters.distanceOptions.within5km')}</option>
            <option value="10">{t('providers:filters.distanceOptions.within10km')}</option>
            <option value="20">{t('providers:filters.distanceOptions.within20km')}</option>
            <option value="50">{t('providers:filters.distanceOptions.within50km')}</option>
          </select>
        </div>

        {/* Specialty Filter */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">
            {t('providers:filters.specialty')}:
          </label>
          <select
            className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            value={category || ''}
            onChange={(e) => setCategory(e.target.value || '')}
          >
            <option value="">{t('providers:filters.any')}</option>
            {availableSpecialties.map((specialty) => (
              <option key={specialty} value={specialty}>
                {t(`providers:filters.specialties.${specialty}`)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
} 