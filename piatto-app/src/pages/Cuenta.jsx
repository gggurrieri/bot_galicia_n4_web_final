import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import starFull from '../assets/icons/star-full.svg'
import BackButton from '../components/BackButton.jsx'
import { restaurants } from '../data/restaurants.js'
import { formatComensales, formatMesa, useSearch } from '../context/SearchContext.jsx'
import './Cuenta.css'

function Cuenta() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { search } = useSearch()
  const restaurant = restaurants.find((r) => r.id === id) ?? restaurants[0]
  const [rating, setRating] = useState(0)
  const [enviado, setEnviado] = useState(false)

  function handleSubmit() {
    setEnviado(true)
    setTimeout(() => navigate('/home'), 1200)
  }

  return (
    <div className="cuenta">
      <BackButton to="/home" />

      <h1 className="cuenta__title">¡Solicitaste la cuenta!</h1>

      <div className="cuenta__card">
        <div className="cuenta__card-top">
          <div className="cuenta__card-thumb">
            <img src={restaurant.detailImage} alt={restaurant.name} />
          </div>
          <div className="cuenta__card-details">
            <p className="cuenta__restaurant-name">{restaurant.name}</p>
            <p>{formatMesa(search.mesa)}</p>
            <p>{formatComensales(search)}</p>
          </div>
        </div>
        <p className="cuenta__total">Total $ x.xxx</p>
      </div>

      <div className="cuenta__rating">
        <p className="cuenta__rating-title">Calificá tu experiencia</p>
        <div className="cuenta__stars">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              className="cuenta__star-button"
              onClick={() => setRating(value)}
              aria-label={`${value} estrellas`}
            >
              <img
                src={starFull}
                alt=""
                className={`cuenta__star${value <= rating ? ' cuenta__star--active' : ''}`}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          className="cuenta__submit"
          onClick={handleSubmit}
          disabled={enviado}
        >
          {enviado ? '¡Gracias!' : 'Enviar'}
        </button>
      </div>
    </div>
  )
}

export default Cuenta
