import Image from 'next/image'
import { Provider } from '@/lib/types'
import { StarIcon, XMarkIcon } from '@heroicons/react/24/solid'

interface ProviderModalProps {
  provider: Provider | null
  onClose: () => void
}

export default function ProviderModal({ provider, onClose }: ProviderModalProps) {
  if (!provider) return null

  const [minPrice, maxPrice] = provider.priceRange

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-xl overflow-y-auto">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{provider.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="relative h-64 w-full mb-6">
          <Image
            src={provider.image}
            alt={provider.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <div className="flex items-center mb-4">
          <StarIcon className="h-5 w-5 text-yellow-400" />
          <span className="ml-1 text-gray-600">
            {provider.rating} ({provider.reviewCount} reviews)
          </span>
        </div>

        <p className="text-gray-600 mb-6">{provider.description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {provider.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="flex justify-between text-gray-600 mb-4">
            <span>Price Range:</span>
            <span>${minPrice} - ${maxPrice}/hr</span>
          </div>
          <div className="flex justify-between text-gray-600 mb-6">
            <span>Distance:</span>
            <span>{provider.distance} km away</span>
          </div>
          <a
            href={provider.calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            Book Now
          </a>
        </div>
      </div>
    </div>
  )
} 