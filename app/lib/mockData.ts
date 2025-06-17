import { Transaction, Provider } from './types'

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    customerName: 'John Doe',
    serviceType: 'Haircut',
    amount: 30,
    date: '2024-03-15',
    status: 'Completed'
  },
  {
    id: '2',
    customerName: 'Jane Smith',
    serviceType: 'Manicure',
    amount: 25,
    date: '2024-03-14',
    status: 'Completed'
  },
  {
    id: '3',
    customerName: 'Mike Johnson',
    serviceType: 'Massage',
    amount: 60,
    date: '2024-03-13',
    status: 'Completed'
  },
  {
    id: '4',
    customerName: 'Sarah Williams',
    serviceType: 'Facial',
    amount: 45,
    date: '2024-03-12',
    status: 'Completed'
  },
  {
    id: '5',
    customerName: 'David Brown',
    serviceType: 'Haircut',
    amount: 30,
    date: '2024-03-11',
    status: 'Completed'
  }
]

export const mockProviders: Provider[] = [
  {
    id: '1',
    name: 'Beauty Salon A',
    rating: 4.5,
    priceRange: [20, 100],
    distance: 2.5,
    tags: ['Hair', 'Nails', 'Massage']
  },
  {
    id: '2',
    name: 'Spa Center B',
    rating: 4.8,
    priceRange: [50, 200],
    distance: 3.0,
    tags: ['Massage', 'Facial', 'Body Treatment']
  },
  {
    id: '3',
    name: 'Hair Studio C',
    rating: 4.2,
    priceRange: [30, 150],
    distance: 1.5,
    tags: ['Hair', 'Styling', 'Color']
  },
  {
    id: '4',
    name: 'Wellness Center D',
    rating: 4.7,
    priceRange: [40, 180],
    distance: 4.0,
    tags: ['Massage', 'Yoga', 'Meditation']
  },
  {
    id: '5',
    name: 'Beauty Bar E',
    rating: 4.3,
    priceRange: [25, 120],
    distance: 2.0,
    tags: ['Nails', 'Makeup', 'Hair']
  }
] 