import { useLocation, useNavigate } from 'react-router-dom'
import iconHome from '../assets/icons/icon-home.svg'
import iconFavoritos from '../assets/icons/icon-favoritos.svg'
import iconMenu from '../assets/icons/icon-menu.svg'
import './TabBar.css'

const tabs = [
  { to: '/home', label: 'Home', icon: iconHome },
  { to: '/favoritos', label: 'Favoritos', icon: iconFavoritos },
  { to: '/menu', label: 'Menú', icon: iconMenu },
]

function TabBar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <nav className="tab-bar">
      {tabs.map((tab) => {
        const active = pathname === tab.to
        return (
          <button
            key={tab.to}
            type="button"
            className={`tab-bar__item${active ? ' tab-bar__item--active' : ''}`}
            aria-current={active ? 'page' : undefined}
            onClick={() => navigate(tab.to)}
          >
            <img src={tab.icon} alt="" className="tab-bar__icon" />
            <span>{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

export default TabBar
