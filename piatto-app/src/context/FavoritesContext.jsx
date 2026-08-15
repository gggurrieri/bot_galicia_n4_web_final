import { createContext, useContext, useEffect, useState } from 'react'

const FavoritesContext = createContext(null)

const STORAGE_KEY = 'piatto:favorites'

function readStoredFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(readStoredFavorites)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch {
      // localStorage puede fallar en modo privado; el estado en memoria sigue funcionando.
    }
  }, [favorites])

  function toggleFavorite(id) {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    )
  }

  function isFavorite(id) {
    return favorites.includes(id)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites debe usarse dentro de un FavoritesProvider')
  }
  return context
}
