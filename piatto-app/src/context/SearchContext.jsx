import { createContext, useContext, useState } from 'react'

const SearchContext = createContext(null)

function todayISO() {
  const now = new Date()
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset())
  return now.toISOString().slice(0, 10)
}

const defaultSearch = {
  ubicacion: 'Palermo, Buenos Aires',
  fecha: todayISO(),
  hora: '20:00',
  adultos: 2,
  menores: 0,
  bebes: 0,
  mesa: 'adentro',
  nota: '',
}

export function SearchProvider({ children }) {
  const [search, setSearch] = useState(defaultSearch)

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearch debe usarse dentro de un SearchProvider')
  }
  return context
}

export function formatComensales({ adultos, menores, bebes }) {
  const parts = []
  if (adultos > 0) parts.push(`${adultos} adulto${adultos === 1 ? '' : 's'}`)
  if (menores > 0) parts.push(`${menores} menor${menores === 1 ? '' : 'es'}`)
  if (bebes > 0) parts.push(`${bebes} bebé${bebes === 1 ? '' : 's'}`)
  return parts.length > 0 ? parts.join(', ') : 'Sin comensales'
}

export function formatMesa(mesa) {
  return mesa === 'afuera' ? 'Mesa afuera' : 'Mesa adentro'
}

export function formatFecha(fechaISO) {
  const [year, month, day] = fechaISO.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const diffDays = Math.round((date - today) / 86400000)

  if (diffDays === 0) return 'Hoy'
  if (diffDays === 1) return 'Mañana'
  return date.toLocaleDateString('es-AR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
}

export function formatFechaHora(search) {
  return `${formatFecha(search.fecha)} · ${search.hora}`
}
