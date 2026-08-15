import { useNavigate } from 'react-router-dom'
import iconFavoritos from '../assets/icons/icon-favoritos.svg'
import Stars from '../components/Stars.jsx'
import TabBar from '../components/TabBar.jsx'
import { restaurants } from '../data/restaurants.js'
import './Favoritos.css'

function Favoritos() {
  const navigate = useNavigate()

  return (
    <div className="favoritos">
      <h1 className="favoritos__title">Tus favoritos</h1>

      {restaurants.length === 0 ? (
        <p className="favoritos__empty">Todavía no tenés favoritos.</p>
      ) : (
        <div className="favoritos__grid">
          {restaurants.map((restaurant) => (
            <button
              key={restaurant.id}
              type="button"
              className="favoritos__card"
              onClick={() => navigate(`/reserva/${restaurant.id}`)}
            >
              <img src={restaurant.cardImage} alt={restaurant.name} />
              <span className="favoritos__heart">
                <img src={iconFavoritos} alt="" />
              </span>
              <div className="favoritos__card-info">
                <p className="favoritos__card-name">{restaurant.name}</p>
                <p className="favoritos__card-category">
                  {restaurant.category}
                </p>
                <Stars rating={restaurant.rating} />
              </div>
            </button>
          ))}
        </div>
      )}

      <TabBar />
    </div>
  )
}

export default Favoritos
