import { Provider } from './types'

export const mockProviders: Provider[] = [
  {
    id: '1',
    name: 'CleanPro Services',
    rating: 4.8,
    priceRange: [50, 150],
    distance: 2.5,
    tags: ['Cleaning', 'Housekeeping', 'Deep Cleaning']
  },
  {
    id: '2',
    name: 'Garden Masters',
    rating: 4.6,
    priceRange: [80, 200],
    distance: 3.2,
    tags: ['Gardening', 'Landscaping', 'Maintenance']
  },
  {
    id: '3',
    name: 'TechFix Solutions',
    rating: 4.9,
    priceRange: [100, 300],
    distance: 1.8,
    tags: ['IT Support', 'Computer Repair', 'Networking']
  },
  {
    id: '4',
    name: 'HandyMan Express',
    rating: 4.7,
    priceRange: [60, 180],
    distance: 4.1,
    tags: ['Plumbing', 'Electrical', 'Carpentry']
  },
  {
    id: '5',
    name: 'Beauty & Wellness',
    rating: 4.5,
    priceRange: [70, 250],
    distance: 2.9,
    tags: ['Massage', 'Beauty', 'Wellness']
  }
]

export const mockTransactions = [
  {
    id: '1',
    customerName: 'John Doe',
    serviceType: 'Cleaning',
    amount: 150,
    date: '2024-01-15',
    status: 'completed'
  },
  {
    id: '2',
    customerName: 'Jane Smith',
    serviceType: 'Gardening',
    amount: 200,
    date: '2024-01-14',
    status: 'pending'
  },
  {
    id: '3',
    customerName: 'Bob Johnson',
    serviceType: 'Plumbing',
    amount: 300,
    date: '2024-01-13',
    status: 'completed'
  }
] 