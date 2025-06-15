import { Provider } from './types'

const specialties = [
  'Personal Training',
  'Nutrition',
  'Yoga',
  'Meditation',
  'Life Coaching',
  'Fitness',
  'Wellness',
  'Mindfulness',
  'Health',
  'Sports'
]

const names = [
  'Sarah Johnson',
  'Michael Chen',
  'Emma Rodriguez',
  'David Kim',
  'Lisa Patel',
  'James Wilson',
  'Maria Garcia',
  'Robert Taylor',
  'Sophie Anderson',
  'John Martinez'
]

const descriptions = [
  'Dedicated to helping you achieve your fitness goals through personalized training programs.',
  'Expert in nutrition and wellness, focusing on sustainable lifestyle changes.',
  'Certified yoga instructor with a passion for mindfulness and holistic health.',
  'Experienced life coach helping you unlock your full potential.',
  'Specialized in sports performance and athletic training.',
  'Wellness expert with a focus on mental and physical health.',
  'Fitness professional dedicated to making exercise enjoyable and effective.',
  'Health coach helping you create lasting healthy habits.',
  'Mindfulness practitioner with expertise in stress reduction.',
  'Personal trainer specializing in strength and conditioning.'
]

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

function getRandomPriceRange(): [number, number] {
  const min = Math.floor(Math.random() * 50) + 50 // $50-$100
  const max = min + Math.floor(Math.random() * 100) + 50 // $50-$150 more than min
  return [min, max]
}

function getRandomTags(): string[] {
  const count = Math.floor(Math.random() * 3) + 2 // 2-4 tags
  const shuffled = [...specialties].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export const mockProviders: Provider[] = [
  {
    id: '1',
    name: 'Tecnici Rossi',
    description: 'Servizi elettrici professionali per abitazioni e aziende. Installazione, manutenzione e riparazioni di impianti elettrici.',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    rating: 4.8,
    reviewCount: 127,
    priceRange: [50, 100],
    distance: 3.5,
    tags: ['Elettricista', 'Installazione', 'Manutenzione'],
    services: [
      {
        id: 's1',
        name: 'Installazione Prese Elettriche',
        description: 'Installazione di nuove prese elettriche in abitazioni e uffici',
        price: 50,
        duration: 60
      },
      {
        id: 's2',
        name: 'Manutenzione Impianto',
        description: 'Controllo e manutenzione dell\'impianto elettrico esistente',
        price: 80,
        duration: 90
      },
      {
        id: 's3',
        name: 'Riparazione Guasti',
        description: 'Diagnosi e riparazione di guasti elettrici',
        price: 70,
        duration: 120
      }
    ]
  },
  {
    id: '2',
    name: 'Idraulici Bianchi',
    description: 'Servizi idraulici completi. Risolviamo problemi di perdite, installazione e manutenzione di impianti idraulici.',
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    rating: 4.6,
    reviewCount: 98,
    priceRange: [60, 120],
    distance: 2.8,
    tags: ['Idraulico', 'Riparazioni', 'Installazione'],
    services: [
      {
        id: 's4',
        name: 'Riparazione Perdite',
        description: 'Identificazione e riparazione di perdite d\'acqua',
        price: 60,
        duration: 90
      },
      {
        id: 's5',
        name: 'Installazione Rubinetteria',
        description: 'Installazione di nuovi rubinetti e sanitari',
        price: 90,
        duration: 120
      },
      {
        id: 's6',
        name: 'Manutenzione Caldaia',
        description: 'Controllo e manutenzione della caldaia',
        price: 120,
        duration: 60
      }
    ]
  },
  {
    id: '3',
    name: 'Costruzioni Verdi',
    description: 'Costruzione e ristrutturazione di edifici residenziali e commerciali. Progetti su misura e soluzioni sostenibili.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    rating: 4.9,
    reviewCount: 156,
    priceRange: [80, 150],
    distance: 5.2,
    tags: ['Costruzione', 'Ristrutturazione', 'Sostenibilità'],
    services: [
      {
        id: 's7',
        name: 'Ristrutturazione Bagno',
        description: 'Completa ristrutturazione del bagno',
        price: 150,
        duration: 480
      },
      {
        id: 's8',
        name: 'Ristrutturazione Cucina',
        description: 'Completa ristrutturazione della cucina',
        price: 200,
        duration: 600
      },
      {
        id: 's9',
        name: 'Consulenza Progettuale',
        description: 'Consulenza per progetti di ristrutturazione',
        price: 80,
        duration: 120
      }
    ]
  },
  {
    id: '4',
    name: 'Tuttofare Romano',
    description: 'Servizi di manutenzione generale, piccole riparazioni e lavori di bricolage per la casa e l\'ufficio.',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    rating: 4.7,
    reviewCount: 89,
    priceRange: [40, 80],
    distance: 1.5,
    tags: ['Manutenzione', 'Riparazioni', 'Bricolage'],
    services: [
      {
        id: 's10',
        name: 'Montaggio Mobili',
        description: 'Montaggio di mobili e scaffalature',
        price: 40,
        duration: 120
      },
      {
        id: 's11',
        name: 'Piccole Riparazioni',
        description: 'Riparazioni generali e piccoli lavori di manutenzione',
        price: 50,
        duration: 90
      },
      {
        id: 's12',
        name: 'Installazione Accessori',
        description: 'Installazione di accessori per la casa',
        price: 35,
        duration: 60
      }
    ]
  },
  {
    id: '5',
    name: 'Tech Solutions Milano',
    description: 'Servizi IT professionali per aziende e privati. Installazione, manutenzione e supporto tecnico.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    rating: 4.8,
    reviewCount: 112,
    priceRange: [70, 130],
    distance: 4.1,
    tags: ['IT', 'Supporto Tecnico', 'Installazione'],
    services: [
      {
        id: 's13',
        name: 'Assistenza PC',
        description: 'Diagnosi e risoluzione problemi PC',
        price: 70,
        duration: 90
      },
      {
        id: 's14',
        name: 'Configurazione Rete',
        description: 'Installazione e configurazione rete domestica',
        price: 100,
        duration: 120
      },
      {
        id: 's15',
        name: 'Recupero Dati',
        description: 'Recupero dati da dispositivi danneggiati',
        price: 130,
        duration: 180
      }
    ]
  },
  {
    id: '6',
    name: 'Pulizie Professionali Napoli',
    description: 'Servizi di pulizia per uffici, negozi e abitazioni. Pulizie ordinarie e straordinarie.',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    rating: 4.5,
    reviewCount: 76,
    priceRange: [30, 60],
    distance: 2.3,
    tags: ['Pulizie', 'Manutenzione', 'Professionale'],
    services: [
      {
        id: 's20',
        name: 'Pulizia Ufficio',
        description: 'Pulizia ordinaria di uffici',
        price: 30,
        duration: 120
      },
      {
        id: 's21',
        name: 'Pulizia Straordinaria',
        description: 'Pulizia straordinaria di locali',
        price: 60,
        duration: 240
      }
    ]
  },
  {
    id: '7',
    name: 'Giardini & Parchi Torino',
    description: 'Progettazione e manutenzione di giardini, parchi e aree verdi. Soluzioni personalizzate per ogni spazio.',
    image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    rating: 2.8,
    reviewCount: 45,
    priceRange: [40, 90],
    distance: 3.7,
    tags: ['Giardinaggio', 'Manutenzione', 'Progettazione'],
    services: [
      {
        id: 's16',
        name: 'Manutenzione Giardino',
        description: 'Manutenzione ordinaria del giardino',
        price: 40,
        duration: 120
      },
      {
        id: 's17',
        name: 'Progettazione Giardino',
        description: 'Progettazione di nuovi giardini',
        price: 90,
        duration: 180
      }
    ]
  },
  {
    id: '8',
    name: 'Sicurezza Roma',
    description: 'Installazione e manutenzione di sistemi di sicurezza e videosorveglianza per abitazioni e aziende.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    rating: 4.9,
    reviewCount: 118,
    priceRange: [90, 160],
    distance: 4.5,
    tags: ['Sicurezza', 'Videosorveglianza', 'Installazione'],
    services: []
  },
  {
    id: '9',
    name: 'Climatizzazione Firenze',
    description: 'Installazione e manutenzione di impianti di climatizzazione e condizionamento per ogni esigenza.',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    rating: 4.6,
    reviewCount: 85,
    priceRange: [70, 140],
    distance: 3.2,
    tags: ['Climatizzazione', 'Condizionamento', 'Manutenzione'],
    services: []
  },
  {
    id: '10',
    name: 'Traslochi Veloci',
    description: 'Servizi di trasloco completi per abitazioni e uffici. Imballaggio, trasporto e montaggio mobili.',
    image: 'https://images.unsplash.com/photo-1600514973912-036d123b6b49?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    rating: 2.5,
    reviewCount: 32,
    priceRange: [100, 200],
    distance: 4.5,
    tags: ['Trasloco', 'Trasporto', 'Montaggio'],
    services: [
      {
        id: 's18',
        name: 'Trasloco Completo',
        description: 'Servizio completo di trasloco',
        price: 200,
        duration: 480
      },
      {
        id: 's19',
        name: 'Montaggio Mobili',
        description: 'Montaggio di mobili dopo il trasloco',
        price: 100,
        duration: 180
      }
    ]
  }
] 