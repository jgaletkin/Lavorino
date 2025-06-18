'use client';

import { useProviderDetails } from '@/hooks/useProviderDetails';
import StarRating from '@/components/StarRating';
import DistanceDisplay from '@/components/DistanceDisplay';
import ProviderTags from '../components/ProviderTags';
import ProviderPriceRange from '../components/ProviderPriceRange';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import EmptyState from '@/components/EmptyState';

export default function ProviderDetailClient({ id }: { id: string }) {
  const { data: provider, isLoading, error } = useProviderDetails(id);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LoadingSkeleton className="h-96" />
      </div>
    );
  }

  if (error || !provider) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EmptyState
          title="Provider not found"
          description="The provider you're looking for doesn't exist or has been removed."
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <div className="flex items-center space-x-4">
            <img
              src={provider.image}
              alt={provider.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{provider.name}</h1>
              <div className="mt-2 flex items-center space-x-4">
                <StarRating rating={provider.rating} />
                <span className="text-sm text-gray-500">
                  ({provider.reviewCount} reviews)
                </span>
                <DistanceDisplay distance={provider.distance} />
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-3">
              <div className="prose max-w-none">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
                <p className="text-gray-600">{provider.description}</p>

                <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                  Specialties
                </h2>
                <ProviderTags tags={provider.tags} />

                <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                  Pricing
                </h2>
                <ProviderPriceRange priceRange={provider.priceRange} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 