export interface Transaction {
  id: string
  customerName: string
  serviceType: string
  amount: number
  date: string
  status: string
}

export interface Provider {
  id: string
  name: string
  description: string
  image: string
  rating: number
  reviewCount: number
  priceRange: [number, number]
  distance: number
  tags: string[]
  services: import('../../lib/types').Service[]
} 