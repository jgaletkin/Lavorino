import { Provider } from './types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

export async function getProviders(params: {
  search?: string
  rating?: number
  priceRange?: [number, number]
  distance?: number
}): Promise<Provider[]> {
  const searchParams = new URLSearchParams()
  
  if (params.search) searchParams.append('search', params.search)
  if (params.rating) searchParams.append('rating', params.rating.toString())
  if (params.priceRange) {
    searchParams.append('minPrice', params.priceRange[0].toString())
    searchParams.append('maxPrice', params.priceRange[1].toString())
  }
  if (params.distance) searchParams.append('distance', params.distance.toString())

  const response = await fetch(`${API_BASE_URL}/providers?${searchParams.toString()}`)
  
  if (!response.ok) {
    throw new Error('Failed to fetch providers')
  }

  return response.json()
}

export async function getProvider(id: string): Promise<Provider> {
  const response = await fetch(`${API_BASE_URL}/providers/${id}`)
  
  if (!response.ok) {
    throw new Error('Failed to fetch provider')
  }

  return response.json()
} 