import { Provider } from './types'

export const mockProviders: Provider[] = [
  {
    id: '1',
    name: 'CleanPro Services',
    description: 'Professional cleaning services for homes and offices.',
    image: '/images/cleanpro.jpg',
    rating: 4.8,
    reviewCount: 120,
    priceRange: [30, 100],
    distance: 2.1,
    tags: ['Cleaning', 'Home', 'Office'],
    services: [
      { id: '1', name: 'Home Cleaning', description: 'Thorough cleaning for your home', price: 50, duration: 90 },
      { id: '2', name: 'Office Cleaning', description: 'Professional office cleaning', price: 80, duration: 120 }
    ]
  },
  {
    id: '2',
    name: 'Sparkle Spa',
    description: 'Relaxing spa treatments and massages.',
    image: '/images/sparkle-spa.jpg',
    rating: 4.6,
    reviewCount: 98,
    priceRange: [40, 150],
    distance: 3.5,
    tags: ['Spa', 'Massage', 'Relaxation'],
    services: [
      { id: '3', name: 'Swedish Massage', description: 'Relaxing full-body massage', price: 70, duration: 60 },
      { id: '4', name: 'Facial', description: 'Rejuvenating facial treatment', price: 60, duration: 45 }
    ]
  },
  {
    id: '3',
    name: 'Garden Masters',
    description: 'Expert gardening and landscaping services.',
    image: '/images/garden-masters.jpg',
    rating: 4.7,
    reviewCount: 75,
    priceRange: [60, 180],
    distance: 4.2,
    tags: ['Gardening', 'Landscaping', 'Maintenance'],
    services: [
      { id: '5', name: 'Lawn Mowing', description: 'Professional lawn mowing', price: 60, duration: 60 },
      { id: '6', name: 'Hedge Trimming', description: 'Hedge and bush trimming', price: 80, duration: 90 }
    ]
  },
  {
    id: '4',
    name: 'HandyFix',
    description: 'Reliable handyman services for your home.',
    image: '/images/handyfix.jpg',
    rating: 4.5,
    reviewCount: 110,
    priceRange: [40, 120],
    distance: 2.8,
    tags: ['Handyman', 'Repairs', 'Maintenance'],
    services: [
      { id: '7', name: 'Furniture Assembly', description: 'Assembly of home furniture', price: 50, duration: 60 },
      { id: '8', name: 'General Repairs', description: 'Small home repairs', price: 70, duration: 90 }
    ]
  },
  {
    id: '5',
    name: 'Bright Laundry',
    description: 'Fast and affordable laundry services.',
    image: '/images/bright-laundry.jpg',
    rating: 4.4,
    reviewCount: 60,
    priceRange: [20, 80],
    distance: 1.9,
    tags: ['Laundry', 'Cleaning', 'Delivery'],
    services: [
      { id: '9', name: 'Wash & Fold', description: 'Laundry wash and fold service', price: 25, duration: 45 },
      { id: '10', name: 'Dry Cleaning', description: 'Professional dry cleaning', price: 40, duration: 60 }
    ]
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