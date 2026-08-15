import iconFavoritos from '../assets/icons/icon-favoritos.svg'
import { useFavorites } from '../context/FavoritesContext.jsx'
import './FavoriteButton.css'

function FavoriteButton({ restaurantId, className }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const active = isFavorite(restaurantId)

  return (
    <button
      type="button"
      className={`favorite-button${active ? ' favorite-button--active' : ''}${
        className ? ` ${className}` : ''
      }`}
      aria-pressed={active}
      aria-label={active ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      onClick={(event) => {
        event.stopPropagation()
        toggleFavorite(restaurantId)
      }}
    >
      <img src={iconFavoritos} alt="" />
    </button>
  )
}

export default FavoriteButton
