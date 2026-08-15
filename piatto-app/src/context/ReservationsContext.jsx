import { createContext, useContext, useEffect, useState } from 'react'

const ReservationsContext = createContext(null)

const STORAGE_KEY = 'piatto:reservations'

function readStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function ReservationsProvider({ children }) {
  const [reservations, setReservations] = useState(readStored)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations))
    } catch {
      // localStorage puede fallar en modo privado; el estado en memoria sigue funcionando.
    }
  }, [reservations])

  function addReservation(reservation) {
    setReservations((prev) => [
      { id: `${reservation.restaurantId}-${Date.now()}`, ...reservation },
      ...prev,
    ])
  }

  function removeReservation(id) {
    setReservations((prev) => prev.filter((r) => r.id !== id))
  }

  return (
    <ReservationsContext.Provider
      value={{ reservations, addReservation, removeReservation }}
    >
      {children}
    </ReservationsContext.Provider>
  )
}

export function useReservations() {
  const context = useContext(ReservationsContext)
  if (!context) {
    throw new Error(
      'useReservations debe usarse dentro de un ReservationsProvider',
    )
  }
  return context
}
