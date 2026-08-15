import { useNavigate, useParams } from 'react-router-dom'
import mapPalermo from '../assets/images/map-palermo.png'
import Stars from '../components/Stars.jsx'
import TabBar from '../components/TabBar.jsx'
import { restaurants } from '../data/restaurants.js'
import './Reserva.css'

function Reserva() {
  const { id } = useParams()
  const navigate = useNavigate()
  const restaurant = restaurants.find((r) => r.id === id) ?? restaurants[0]

  return (
    <div className="reserva">
      <div className="reserva__map">
        <img src={mapPalermo} alt="Mapa de Palermo" />
      </div>

      <div className="reserva__card">
        <div className="reserva__card-top">
          <div className="reserva__card-thumb">
            <img src={restaurant.detailImage} alt={restaurant.name} />
          </div>
          <div className="reserva__card-details">
            <p>{restaurant.mesa}</p>
            <p>{restaurant.personas}</p>
            <p>{restaurant.pedido}</p>
          </div>
        </div>

        <div className="reserva__card-bottom">
          <div className="reserva__card-info">
            <p className="reserva__card-name">{restaurant.name}</p>
            <p className="reserva__card-category">{restaurant.description}</p>
            <Stars rating={restaurant.rating} />
          </div>

          <button
            type="button"
            className="reserva__button"
            onClick={() => navigate(`/reservado/${restaurant.id}`)}
          >
            Reservar
          </button>
        </div>
      </div>

      <TabBar />
    </div>
  )
}

export default Reserva
