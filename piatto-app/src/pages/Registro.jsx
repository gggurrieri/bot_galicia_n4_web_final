import { useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton.jsx'
import './Registro.css'

function Registro() {
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    navigate('/home')
  }

  return (
    <div className="registro">
      <BackButton to="/" />

      <h1 className="registro__title">Creá tu cuenta</h1>

      <form className="registro__form" onSubmit={handleSubmit}>
        <input className="registro__input" type="text" placeholder="Nombre" required />
        <input className="registro__input" type="text" placeholder="Apellido" required />
        <input
          className="registro__input"
          type="date"
          placeholder="Fecha de nacimiento"
          required
        />
        <input className="registro__input" type="text" placeholder="DNI" required />
        <input className="registro__input" type="text" placeholder="Usuario" required />
        <input className="registro__input" type="password" placeholder="Clave" required />
        <input
          className="registro__input"
          type="password"
          placeholder="Repetir clave"
          required
        />
        <input className="registro__input" type="tel" placeholder="Celular" required />

        <button className="registro__submit" type="submit">
          Registrarme
        </button>
      </form>
    </div>
  )
}

export default Registro
