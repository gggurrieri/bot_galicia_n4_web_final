import { useLocation, useNavigate } from 'react-router-dom'
import iconHome from '../assets/icons/icon-home.svg'
import iconFavoritos from '../assets/icons/icon-favoritos.svg'
import iconMenu from '../assets/icons/icon-menu.svg'
import './TabBar.css'

function TabBar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <nav className="tab-bar">
      <button
        className={`tab-bar__item${pathname === '/home' ? ' tab-bar__item--active' : ''}`}
        onClick={() => navigate('/home')}
      >
        <img src={iconHome} alt="" className="tab-bar__icon" />
        <span>Home</span>
      </button>
      <button
        className={`tab-bar__item${pathname === '/favoritos' ? ' tab-bar__item--active' : ''}`}
        type="button"
        onClick={() => navigate('/favoritos')}
      >
        <img src={iconFavoritos} alt="" className="tab-bar__icon" />
        <span>Favoritos</span>
      </button>
      <button
        className={`tab-bar__item${pathname === '/menu' ? ' tab-bar__item--active' : ''}`}
        type="button"
        onClick={() => navigate('/menu')}
      >
        <img src={iconMenu} alt="" className="tab-bar__icon" />
        <span>Menú</span>
      </button>
    </nav>
  )
}

export default TabBar
