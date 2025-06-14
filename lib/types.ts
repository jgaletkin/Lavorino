export interface Service {
  id: string
  name: string
  description: string
  price: number
  duration: number // in minutes
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
  calendlyUrl: string
  services: Service[]
} 