import { useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton.jsx'
import { useReservations } from '../context/ReservationsContext.jsx'
import {
  formatComensales,
  formatFecha,
  formatMesa,
} from '../context/SearchContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import './MisReservas.css'

function MisReservas() {
  const navigate = useNavigate()
  const { reservations, removeReservation } = useReservations()
  const { showToast } = useToast()

  function handleRemove(id) {
    removeReservation(id)
    showToast('Reserva eliminada del historial')
  }

  return (
    <div className="mis-reservas">
      <BackButton to="/menu" />

      <h1 className="mis-reservas__title">Mis reservas</h1>

      {reservations.length === 0 ? (
        <p className="mis-reservas__empty">
          Todavía no hiciste ninguna reserva. Elegí un restaurante en Home
          para empezar.
        </p>
      ) : (
        <div className="mis-reservas__list">
          {reservations.map((reservation) => (
            <div key={reservation.id} className="mis-reservas__card">
              <button
                type="button"
                className="mis-reservas__card-main"
                onClick={() => navigate(`/reserva/${reservation.restaurantId}`)}
              >
                <img src={reservation.image} alt="" />
                <div className="mis-reservas__card-info">
                  <p className="mis-reservas__card-name">
                    {reservation.restaurantName}
                  </p>
                  <p className="mis-reservas__card-datetime">
                    {formatFecha(reservation.fecha)} · {reservation.hora}
                  </p>
                  <p className="mis-reservas__card-details">
                    {formatMesa(reservation.mesa)} ·{' '}
                    {formatComensales(reservation)}
                  </p>
                </div>
              </button>
              <button
                type="button"
                className="mis-reservas__card-remove"
                onClick={() => handleRemove(reservation.id)}
                aria-label={`Eliminar reserva en ${reservation.restaurantName}`}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MisReservas
