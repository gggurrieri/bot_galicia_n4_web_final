import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton.jsx'
import './RecuperarClave.css'

function RecuperarClave() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (!usuario.trim()) {
      setError('Ingresá tu usuario o email para continuar.')
      return
    }

    navigate('/nueva-clave')
  }

  return (
    <div className="recuperar">
      <BackButton to="/" />

      <h1 className="recuperar__title">Recuperar clave</h1>
      <p className="recuperar__subtitle">
        Ingresá tu usuario o email y te enviamos un código para crear una
        clave nueva.
      </p>

      <form className="recuperar__form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="recuperar-usuario" className="visually-hidden">
          Usuario o email
        </label>
        <input
          id="recuperar-usuario"
          className="recuperar__input"
          type="text"
          autoComplete="username"
          placeholder="Usuario o email"
          value={usuario}
          onChange={(event) => setUsuario(event.target.value)}
        />

        {error && (
          <p className="recuperar__error" role="alert">
            {error}
          </p>
        )}

        <button className="recuperar__submit" type="submit">
          Enviar código
        </button>
      </form>
    </div>
  )
}

export default RecuperarClave
