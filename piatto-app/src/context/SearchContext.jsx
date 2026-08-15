import { createContext, useContext, useState } from 'react'

const SearchContext = createContext(null)

const defaultSearch = {
  ubicacion: 'Palermo, Buenos Aires',
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
