import cardIlQuotidiano from '../assets/images/card-il-quotidiano.png'
import cardRagusa from '../assets/images/card-ragusa.png'
import cardPisaDiRoma from '../assets/images/card-pisa-di-roma.png'
import cardParadiso from '../assets/images/card-paradiso.png'
import thumbIlQuotidiano from '../assets/images/restaurant-thumb.png'

export const restaurants = [
  {
    id: 'il-quotidiano',
    name: 'Il Quotidiano',
    categoryId: 'pastas',
    category: 'Pastas',
    description: 'Comida italiana',
    rating: 4.5,
    priceRange: '$$$',
    address: 'Gorriti 4900, Palermo Soho',
    hours: 'Abre hasta las 00:00',
    tags: ['Pastas caseras', 'Vinos naturales', 'Apto sin TACC'],
    cardImage: cardIlQuotidiano,
    detailImage: thumbIlQuotidiano,
  },
  {
    id: 'ragusa',
    name: 'Ragusa',
    categoryId: 'pastas',
    category: 'Pastas',
    description: 'Comida italiana',
    rating: 4,
    priceRange: '$$',
    address: 'Thames 1700, Palermo Hollywood',
    hours: 'Abre hasta la 01:00',
    tags: ['Patio verde', 'Para grupos', 'Delivery'],
    cardImage: cardRagusa,
    detailImage: cardRagusa,
  },
  {
    id: 'pisa-di-roma',
    name: 'Pisa di Roma',
    categoryId: 'pastas',
    category: 'Pastas',
    description: 'Comida italiana',
    rating: 4,
    priceRange: '$$',
    address: 'Honduras 4800, Palermo Soho',
    hours: 'Abre hasta las 00:30',
    tags: ['Al paso', 'Mesas en la vereda', 'Pet friendly'],
    cardImage: cardPisaDiRoma,
    detailImage: cardPisaDiRoma,
  },
  {
    id: 'paradiso',
    name: 'Paradiso',
    categoryId: 'pastas',
    category: 'Pastas',
    description: 'Comida italiana',
    rating: 4.5,
    priceRange: '$$$',
    address: 'Costa Rica 5500, Palermo Hollywood',
    hours: 'Abre hasta las 23:30',
    tags: ['Carta de vinos', 'Ideal para citas', 'Terraza'],
    cardImage: cardParadiso,
    detailImage: cardParadiso,
  },
]

export const categories = [
  { id: 'pastas', label: 'Pastas' },
  { id: 'pizza', label: 'Pizza' },
  { id: 'empanadas', label: 'Empanadas' },
  { id: 'asado', label: 'Asado' },
  { id: 'burger', label: 'Burger' },
]
