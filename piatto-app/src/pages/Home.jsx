import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import mapPalermo from '../assets/images/map-palermo.png'
import catPastas from '../assets/categories/pastas.png'
import catPizza from '../assets/categories/pizza.png'
import catEmpanadas from '../assets/categories/empanadas.png'
import catAsado from '../assets/categories/asado.png'
import catBurger from '../assets/categories/burger.png'
import Stars from '../components/Stars.jsx'
import TabBar from '../components/TabBar.jsx'
import { restaurants, categories } from '../data/restaurants.js'
import './Home.css'

const categoryImages = {
  pastas: catPastas,
  pizza: catPizza,
  empanadas: catEmpanadas,
  asado: catAsado,
  burger: catBurger,
}

function Home() {
  const [selectedCategory, setSelectedCategory] = useState('pastas')
  const navigate = useNavigate()

  return (
    <div className="home">
      <button
        type="button"
        className="home__search"
        onClick={() => navigate('/buscar')}
      >
        <span>Palermo, Buenos Aires · 2 Adultos</span>
      </button>

      <div className="home__categories">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={`home__category${
              selectedCategory === category.id ? ' home__category--active' : ''
            }`}
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

      <div className="home__restaurants">
        {restaurants.map((restaurant) => (
          <button
            key={restaurant.id}
            type="button"
            className="home__restaurant-card"
            onClick={() => navigate(`/reserva/${restaurant.id}`)}
          >
            <img src={restaurant.cardImage} alt={restaurant.name} />
            <div className="home__restaurant-card-info">
              <div>
                <p className="home__restaurant-card-name">{restaurant.name}</p>
                <p className="home__restaurant-card-category">
                  {restaurant.category}
                </p>
              </div>
              <Stars rating={restaurant.rating} />
            </div>
          </button>
        ))}
      </div>

      <TabBar />
    </div>
  )
}

export default Home
