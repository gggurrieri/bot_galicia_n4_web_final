import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import mapPalermo from '../assets/images/map-palermo.png'
import catPastas from '../assets/categories/pastas.png'
import catPizza from '../assets/categories/pizza.png'
import catEmpanadas from '../assets/categories/empanadas.png'
import catAsado from '../assets/categories/asado.png'
import catBurger from '../assets/categories/burger.png'
import FavoriteButton from '../components/FavoriteButton.jsx'
import Stars from '../components/Stars.jsx'
import TabBar from '../components/TabBar.jsx'
import { restaurants, categories } from '../data/restaurants.js'
import { formatFecha, useSearch } from '../context/SearchContext.jsx'
import './Home.css'

const categoryImages = {
  pastas: catPastas,
  pizza: catPizza,
  empanadas: catEmpanadas,
  asado: catAsado,
  burger: catBurger,
}

const destacados = restaurants.filter((r) => r.rating >= 4.5)

function Home() {
  const [selectedCategory, setSelectedCategory] = useState('pastas')
  const navigate = useNavigate()
  const { search } = useSearch()

  const selectedLabel =
    categories.find((c) => c.id === selectedCategory)?.label ?? ''
  const filteredRestaurants = restaurants.filter(
    (r) => r.categoryId === selectedCategory,
  )

  function goToRestaurant(id) {
    navigate(`/reserva/${id}`)
  }

  return (
    <div className="home">
      <div className="home__header">
        <p className="home__eyebrow">Buenas noches</p>
        <h1 className="home__heading">¿Dónde cenamos hoy?</h1>
      </div>

      <button
        type="button"
        className="home__search"
        onClick={() => navigate('/buscar')}
      >
        <span className="home__search-primary">{search.ubicacion}</span>
        <span className="home__search-secondary">
          {formatFecha(search.fecha)} {search.hora}
        </span>
      </button>

      {destacados.length > 0 && (
        <section className="home__section">
          <h2 className="home__section-title">Destacados</h2>
          <div className="home__featured-row">
            {destacados.map((restaurant) => (
              <div
                key={restaurant.id}
                className="home__featured-card"
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
                  className="home__featured-card-favorite"
                />
                <div className="home__featured-card-info">
                  <p className="home__featured-card-name">
                    {restaurant.name}
                  </p>
                  <Stars rating={restaurant.rating} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="home__categories">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={`home__category${
              selectedCategory === category.id ? ' home__category--active' : ''
            }`}
            aria-pressed={selectedCategory === category.id}
            onClick={() => setSelectedCategory(category.id)}
          >
            <img src={categoryImages[category.id]} alt="" />
            <span>{category.label}</span>
          </button>
        ))}
      </div>

      <div className="home__map">
        <img src={mapPalermo} alt="Mapa de Palermo" />
      </div>

      <section className="home__section">
        <h2 className="home__section-title">Cerca tuyo</h2>
        {filteredRestaurants.length > 0 ? (
          <div className="home__restaurants">
            {filteredRestaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="home__restaurant-card"
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
                  className="home__restaurant-card-favorite"
                />
                <div className="home__restaurant-card-info">
                  <div>
                    <p className="home__restaurant-card-name">
                      {restaurant.name}
                    </p>
                    <p className="home__restaurant-card-category">
                      {restaurant.category}
                    </p>
                  </div>
                  <Stars rating={restaurant.rating} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="home__empty">
            Todavía no tenemos restaurantes de {selectedLabel.toLowerCase()}{' '}
            cerca tuyo.
          </p>
        )}
      </section>

      <TabBar />
    </div>
  )
}

export default Home
