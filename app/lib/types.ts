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
  rating: number
  priceRange: [number, number]
  distance: number
  tags: string[]
} 