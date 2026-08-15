import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import loginPhoto from '../assets/images/login-photo.png'
import iconLog from '../assets/icons/icon-log.svg'
import './Login.css'

function Login() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState('')
  const [clave, setClave] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (!usuario.trim() || !clave.trim()) {
      setError('Ingresá tu usuario y clave para continuar.')
      return
    }

    setError('')
    navigate('/home')
  }

  return (
    <div className="login">
      <div className="login__photo">
        <img src={loginPhoto} alt="" />
      </div>

      <form className="login__form" onSubmit={handleSubmit} noValidate>
        <input
          className="login__input"
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(event) => setUsuario(event.target.value)}
        />
        <input
          className="login__input"
          type="password"
          placeholder="Clave"
          value={clave}
          onChange={(event) => setClave(event.target.value)}
        />

        {error && <p className="login__error">{error}</p>}

        <button
          className="login__forgot"
          type="button"
          onClick={() => navigate('/recuperar-clave')}
        >
          ¿Olvidaste tu clave?
        </button>

        <button className="login__submit" type="submit">
          Ingresar
          <img src={iconLog} alt="" className="login__submit-icon" />
        </button>
      </form>

      <button
        className="login__register"
        type="button"
        onClick={() => navigate('/registro')}
      >
        Registrarse
      </button>
    </div>
  )
}

export default Login
