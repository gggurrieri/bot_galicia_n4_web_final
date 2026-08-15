import { useNavigate } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="not-found">
      <p className="not-found__code">404</p>
      <h1 className="not-found__title">No encontramos esta pantalla</h1>
      <p className="not-found__subtitle">
        Puede que el enlace esté roto o la página ya no exista.
      </p>
      <button
        type="button"
        className="not-found__button"
        onClick={() => navigate('/home')}
      >
        Volver al inicio
      </button>
    </div>
  )
}

export default NotFound
