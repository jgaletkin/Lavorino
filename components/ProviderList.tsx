import { Provider } from '@/lib/types'
import { StarIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

interface ProviderListProps {
  providers: Provider[]
  onSelectProvider: (provider: Provider) => void
  isGridView?: boolean
}

export default function ProviderList({
  providers,
  onSelectProvider,
  isGridView = false
}: ProviderListProps) {
  const { t } = useTranslation('providers')

  if (isGridView) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {providers.map((provider) => (
          <div
            key={provider.id}
            className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md cursor-pointer"
            onClick={() => onSelectProvider(provider)}
          >
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={provider.image}
                alt={provider.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">{provider.name}</h3>

              <div className="mt-2 flex items-center">
                <div className="flex items-center text-sm text-gray-500">
                  <StarIcon className="h-5 w-5 text-yellow-400" />
                  <span className="ml-1">{provider.rating}</span>
                  <span className="mx-1">•</span>
                  <span>{provider.reviewCount} {t('providers:provider.reviews')}</span>
                </div>
              </div>

              <div className="mt-2">
                <span className="text-lg font-semibold text-emerald-600">
                  €{provider.priceRange[0]} - €{provider.priceRange[1]}
                </span>
              </div>

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
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {providers.map((provider) => (
        <div
          key={provider.id}
          className="flex cursor-pointer gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-emerald-500 hover:shadow-md"
          onClick={() => onSelectProvider(provider)}
        >
          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
            <Image
              src={provider.image}
              alt={provider.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-1 flex-col">
            <h3 className="text-lg font-semibold text-gray-900">
              {provider.name}
            </h3>

            <div className="mt-1 flex items-center">
              <div className="flex items-center text-sm text-gray-500">
                <StarIcon className="h-5 w-5 text-yellow-400" />
                <span className="ml-1">{provider.rating}</span>
                <span className="mx-1">•</span>
                <span>{provider.reviewCount} {t('providers:provider.reviews')}</span>
              </div>
            </div>

            <div className="mt-2">
              <span className="text-lg font-semibold text-emerald-600">
                €{provider.priceRange[0]} - €{provider.priceRange[1]}
              </span>
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
              {provider.tags?.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 