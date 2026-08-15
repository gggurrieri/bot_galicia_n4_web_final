import cardIlQuotidiano from '../assets/images/card-il-quotidiano.png'
import cardRagusa from '../assets/images/card-ragusa.png'
import cardPisaDiRoma from '../assets/images/card-pisa-di-roma.png'
import cardParadiso from '../assets/images/card-paradiso.png'
import thumbIlQuotidiano from '../assets/images/restaurant-thumb.png'

export const restaurants = [
  {
    id: 'il-quotidiano',
    name: 'Il Quotidiano',
    category: 'Pastas',
    description: 'Comida italiana',
    rating: 4.5,
    cardImage: cardIlQuotidiano,
    detailImage: thumbIlQuotidiano,
    mesa: 'Mesa adentro',
    personas: '2 Adultos',
    pedido: 'Sin pedido especial',
  },
  {
    id: 'ragusa',
    name: 'Ragusa',
    category: 'Pastas',
    description: 'Comida italiana',
    rating: 4,
    cardImage: cardRagusa,
    detailImage: cardRagusa,
    mesa: 'Mesa adentro',
    personas: '2 Adultos',
    pedido: 'Sin pedido especial',
  },
  {
    id: 'pisa-di-roma',
    name: 'Pisa di Roma',
    category: 'Pastas',
    description: 'Comida italiana',
    rating: 4,
    cardImage: cardPisaDiRoma,
    detailImage: cardPisaDiRoma,
    mesa: 'Mesa adentro',
    personas: '2 Adultos',
    pedido: 'Sin pedido especial',
  },
  {
    id: 'paradiso',
    name: 'Paradiso',
    category: 'Pastas',
    description: 'Comida italiana',
    rating: 4.5,
    cardImage: cardParadiso,
    detailImage: cardParadiso,
    mesa: 'Mesa adentro',
    personas: '2 Adultos',
    pedido: 'Sin pedido especial',
  },
]

export const categories = [
  { id: 'pastas', label: 'Pastas' },
  { id: 'pizza', label: 'Pizza' },
  { id: 'empanadas', label: 'Empanadas' },
  { id: 'asado', label: 'Asado' },
  { id: 'burger', label: 'Burger' },
]
