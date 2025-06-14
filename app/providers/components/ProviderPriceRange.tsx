'use client'

interface ProviderPriceRangeProps {
  priceRange: [number, number]
}

export default function ProviderPriceRange({ priceRange }: ProviderPriceRangeProps) {
  const [min, max] = priceRange
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="text-sm text-gray-600">
      {min === max ? (
        formatPrice(min)
      ) : (
        `${formatPrice(min)} - ${formatPrice(max)}`
      )}
    </div>
  )
} 