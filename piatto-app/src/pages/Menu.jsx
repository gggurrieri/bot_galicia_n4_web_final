import { useNavigate } from 'react-router-dom'
import TabBar from '../components/TabBar.jsx'
import './Menu.css'

const menuItems = [
  { label: 'Mi cuenta', to: '/cuenta/il-quotidiano' },
  { label: 'Favoritos', to: '/favoritos' },
  { label: 'Configuración', to: '/menu' },
  { label: 'Cerrar sesión', to: '/' },
]

function Menu() {
  const navigate = useNavigate()

  return (
    <div className="menu">
      <div className="menu__panel">
        <div className="menu__avatar">G</div>
        <p className="menu__name">Gabriel</p>

        <nav className="menu__list">
          {menuItems.map((item) => (
            <button
              key={item.label}
              type="button"
              className="menu__item"
              onClick={() => navigate(item.to)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <TabBar />
    </div>
  )
}

export default Menu
