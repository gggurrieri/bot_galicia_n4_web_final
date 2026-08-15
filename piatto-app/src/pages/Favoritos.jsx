import { useNavigate } from 'react-router-dom'
import FavoriteButton from '../components/FavoriteButton.jsx'
import Stars from '../components/Stars.jsx'
import TabBar from '../components/TabBar.jsx'
import { restaurants } from '../data/restaurants.js'
import { useFavorites } from '../context/FavoritesContext.jsx'
import './Favoritos.css'

function Favoritos() {
  const navigate = useNavigate()
  const { favorites } = useFavorites()
  const favoriteRestaurants = restaurants.filter((r) =>
    favorites.includes(r.id),
  )

  function goToRestaurant(id) {
    navigate(`/reserva/${id}`)
  }

  return (
    <div className="favoritos">
      <h1 className="favoritos__title">Tus favoritos</h1>

      {favoriteRestaurants.length === 0 ? (
        <p className="favoritos__empty">
          Todavía no tenés favoritos. Tocá el corazón de un restaurante en
          Home para guardarlo acá.
        </p>
      ) : (
        <div className="favoritos__grid">
          {favoriteRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="favoritos__card"
              role="button"
              tabIndex={0}
              onClick={() => goToRestaurant(restaurant.id)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  goToRestaurant(restaurant.id)
                }
              }}
            >
              <img src={restaurant.cardImage} alt={restaurant.name} />
              <FavoriteButton
                restaurantId={restaurant.id}
                className="favoritos__heart"
              />
              <div className="favoritos__card-info">
                <p className="favoritos__card-name">{restaurant.name}</p>
                <p className="favoritos__card-category">
                  {restaurant.category}
                </p>
                <Stars rating={restaurant.rating} />
              </div>
            </div>
          ))}
        </div>
      )}

      <TabBar />
    </div>
  )
}

export default Favoritos
