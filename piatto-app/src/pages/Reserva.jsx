import { useNavigate, useParams } from 'react-router-dom'
import mapPalermo from '../assets/images/map-palermo.png'
import BackButton from '../components/BackButton.jsx'
import FavoriteButton from '../components/FavoriteButton.jsx'
import Stars from '../components/Stars.jsx'
import TabBar from '../components/TabBar.jsx'
import { restaurants } from '../data/restaurants.js'
import {
  formatComensales,
  formatFecha,
  formatMesa,
  useSearch,
} from '../context/SearchContext.jsx'
import { useReservations } from '../context/ReservationsContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import './Reserva.css'

function Reserva() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { search } = useSearch()
  const { addReservation } = useReservations()
  const { showToast } = useToast()
  const restaurant = restaurants.find((r) => r.id === id) ?? restaurants[0]

  function handleReservar() {
    addReservation({
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      image: restaurant.detailImage,
      fecha: search.fecha,
      hora: search.hora,
      mesa: search.mesa,
      adultos: search.adultos,
      menores: search.menores,
      bebes: search.bebes,
      nota: search.nota,
    })
    showToast(`Mesa solicitada en ${restaurant.name}`)
    navigate(`/reservado/${restaurant.id}`)
  }

  return (
    <div className="reserva">
      <div className="reserva__hero">
        <img src={restaurant.detailImage} alt={restaurant.name} />
        <div className="reserva__hero-top">
          <BackButton to="/home" />
          <FavoriteButton
            restaurantId={restaurant.id}
            className="reserva__hero-favorite"
          />
        </div>
        <div className="reserva__hero-info">
          <p className="reserva__name">{restaurant.name}</p>
          <div className="reserva__hero-meta">
            <Stars rating={restaurant.rating} />
            <span>·</span>
            <span>{restaurant.description}</span>
            <span>·</span>
            <span>{restaurant.priceRange}</span>
          </div>
        </div>
      </div>

      <div className="reserva__body">
        <p className="reserva__address">{restaurant.address}</p>
        <p className="reserva__hours">{restaurant.hours}</p>

        <div className="reserva__tags">
          {restaurant.tags.map((tag) => (
            <span key={tag} className="reserva__tag">
              {tag}
            </span>
          ))}
        </div>

        <button
          type="button"
          className="reserva__summary"
          onClick={() => navigate('/buscar')}
        >
          <div>
            <p className="reserva__summary-title">
              {formatFecha(search.fecha)} · {search.hora}
            </p>
            <p className="reserva__summary-subtitle">
              {formatMesa(search.mesa)} · {formatComensales(search)}
            </p>
          </div>
          <span className="reserva__summary-edit">Editar</span>
        </button>

        <div className="reserva__map">
          <img src={mapPalermo} alt="Mapa de Palermo" />
        </div>

        <button
          type="button"
          className="reserva__button"
          onClick={handleReservar}
        >
          Reservar mesa
        </button>
      </div>

      <TabBar />
    </div>
  )
}

export default Reserva
