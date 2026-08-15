import { useNavigate } from 'react-router-dom'
import TabBar from '../components/TabBar.jsx'
import './Menu.css'

const menuItems = [
  { label: 'Mis reservas', to: '/mis-reservas' },
  { label: 'Favoritos', to: '/favoritos' },
  { label: 'Configuración', comingSoon: true },
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
              disabled={item.comingSoon}
              onClick={() => item.to && navigate(item.to)}
            >
              {item.label}
              {item.comingSoon && (
                <span className="menu__badge">Próximamente</span>
              )}
            </button>
          ))}
        </nav>
      </div>

      <TabBar />
    </div>
  )
}

export default Menu
