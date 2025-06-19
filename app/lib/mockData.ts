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
    description: 'Professional beauty salon offering hair, nails, and massage services.',
    image: '/images/salon-a.jpg',
    rating: 4.5,
    reviewCount: 127,
    priceRange: [20, 100],
    distance: 2.5,
    tags: ['Hair', 'Nails', 'Massage'],
    services: [
      { id: '1', name: 'Haircut', description: 'Professional haircut service', price: 30, duration: 45 },
      { id: '2', name: 'Manicure', description: 'Classic manicure service', price: 25, duration: 30 },
      { id: '3', name: 'Massage', description: 'Relaxing massage therapy', price: 60, duration: 60 }
    ]
  },
  {
    id: '2',
    name: 'Spa Center B',
    description: 'Luxury spa center specializing in massage, facial, and body treatments.',
    image: '/images/spa-b.jpg',
    rating: 4.8,
    reviewCount: 89,
    priceRange: [50, 200],
    distance: 3.0,
    tags: ['Massage', 'Facial', 'Body Treatment'],
    services: [
      { id: '4', name: 'Swedish Massage', description: 'Classic Swedish massage', price: 80, duration: 60 },
      { id: '5', name: 'Facial Treatment', description: 'Rejuvenating facial', price: 75, duration: 45 },
      { id: '6', name: 'Body Scrub', description: 'Exfoliating body treatment', price: 90, duration: 75 }
    ]
  },
  {
    id: '3',
    name: 'Hair Studio C',
    description: 'Modern hair studio offering cutting-edge styling and coloring services.',
    image: '/images/studio-c.jpg',
    rating: 4.2,
    reviewCount: 156,
    priceRange: [30, 150],
    distance: 1.5,
    tags: ['Hair', 'Styling', 'Color'],
    services: [
      { id: '7', name: 'Haircut & Style', description: 'Cut and style service', price: 45, duration: 60 },
      { id: '8', name: 'Hair Coloring', description: 'Professional hair coloring', price: 120, duration: 120 },
      { id: '9', name: 'Hair Treatment', description: 'Deep conditioning treatment', price: 35, duration: 30 }
    ]
  },
  {
    id: '4',
    name: 'Wellness Center D',
    description: 'Holistic wellness center focusing on massage, yoga, and meditation.',
    image: '/images/wellness-d.jpg',
    rating: 4.7,
    reviewCount: 203,
    priceRange: [40, 180],
    distance: 4.0,
    tags: ['Massage', 'Yoga', 'Meditation'],
    services: [
      { id: '10', name: 'Deep Tissue Massage', description: 'Therapeutic deep tissue massage', price: 95, duration: 75 },
      { id: '11', name: 'Yoga Session', description: 'Private yoga instruction', price: 50, duration: 60 },
      { id: '12', name: 'Meditation Class', description: 'Guided meditation session', price: 40, duration: 45 }
    ]
  },
  {
    id: '5',
    name: 'Beauty Bar E',
    description: 'Trendy beauty bar offering nails, makeup, and hair services.',
    image: '/images/beauty-e.jpg',
    rating: 4.3,
    reviewCount: 94,
    priceRange: [25, 120],
    distance: 2.0,
    tags: ['Nails', 'Makeup', 'Hair'],
    services: [
      { id: '13', name: 'Gel Manicure', description: 'Long-lasting gel manicure', price: 35, duration: 45 },
      { id: '14', name: 'Makeup Application', description: 'Professional makeup service', price: 65, duration: 60 },
      { id: '15', name: 'Hair Styling', description: 'Special occasion hair styling', price: 55, duration: 45 }
    ]
  }
] 