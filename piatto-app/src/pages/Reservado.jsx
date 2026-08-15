import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { restaurants } from '../data/restaurants.js'
import {
  formatComensales,
  formatFecha,
  formatMesa,
  useSearch,
} from '../context/SearchContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import './Reservado.css'

const COUNTDOWN_START_SECONDS = 10 * 60

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function Reservado() {
  const { id } = useParams()
  const navigate = useNavigate()
  const restaurant = restaurants.find((r) => r.id === id) ?? restaurants[0]
  const { search } = useSearch()
  const { showToast } = useToast()
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_START_SECONDS)
  const [confirmingCancel, setConfirmingCancel] = useState(false)

  useEffect(() => {
    if (secondsLeft <= 0) return
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearTimeout(timer)
  }, [secondsLeft])

  function handleCancel() {
    showToast('Reserva cancelada')
    navigate('/home')
  }

  function handleLlegue() {
    showToast('¡Que disfrutes la cena!')
    navigate(`/cuenta/${restaurant.id}`)
  }

  return (
    <div className="reservado">
      <div className="reservado__photo">
        <img src={restaurant.detailImage} alt={restaurant.name} />
      </div>

      <h1 className="reservado__title">¡Reservaste!</h1>
      <p className="reservado__datetime">
        {formatFecha(search.fecha)} · {search.hora}
      </p>

      <div className="reservado__card">
        <div className="reservado__card-thumb">
          <img src={restaurant.detailImage} alt="" />
        </div>
        <div className="reservado__card-details">
          <p className="reservado__restaurant-name">{restaurant.name}</p>
          <p>{formatMesa(search.mesa)}</p>
          <p>{formatComensales(search)}</p>
          <p>{search.nota || 'Sin pedido especial'}</p>
        </div>
      </div>

      <div className="reservado__countdown">
        <p className="reservado__countdown-label">
          Anunciá tu llegada antes de:
        </p>
        <p className="reservado__countdown-time">
          {formatTime(secondsLeft)} <span>min</span>
        </p>

        {confirmingCancel ? (
          <div className="reservado__confirm">
            <p className="reservado__confirm-text">¿Cancelar la reserva?</p>
            <div className="reservado__actions">
              <button
                type="button"
                className="reservado__button reservado__button--ghost"
                onClick={() => setConfirmingCancel(false)}
              >
                No, volver
              </button>
              <button
                type="button"
                className="reservado__button reservado__button--danger"
                onClick={handleCancel}
              >
                Sí, cancelar
              </button>
            </div>
          </div>
        ) : (
          <div className="reservado__actions">
            <button
              type="button"
              className="reservado__button reservado__button--ghost"
              onClick={() => setConfirmingCancel(true)}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="reservado__button reservado__button--solid"
              onClick={handleLlegue}
            >
              Llegué
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Reservado
