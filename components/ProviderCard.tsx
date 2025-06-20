import Image from 'next/image'
import { Provider } from '@/lib/types'
import { StarIcon } from '@heroicons/react/20/solid'

interface ProviderCardProps {
  provider: Provider
}

export default function ProviderCard({ provider }: ProviderCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
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
            <span>{provider.reviewCount} reviews</span>
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
  )
} 