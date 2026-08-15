import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton.jsx'
import PasswordField from '../components/PasswordField.jsx'
import './NuevaClave.css'

function NuevaClave() {
  const navigate = useNavigate()
  const [clave, setClave] = useState('')
  const [repetirClave, setRepetirClave] = useState('')
  const [error, setError] = useState('')
  const [guardado, setGuardado] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()

    if (!clave || clave.length < 6) {
      setError('La clave debe tener al menos 6 caracteres.')
      return
    }
    if (clave !== repetirClave) {
      setError('Las claves no coinciden.')
      return
    }

    setError('')
    setGuardado(true)
    setTimeout(() => navigate('/'), 1200)
  }

  return (
    <div className="nueva-clave">
      <BackButton to="/recuperar-clave" />

      <h1 className="nueva-clave__title">Creá tu nueva clave</h1>
      <p className="nueva-clave__subtitle">
        Elegí una clave nueva para tu cuenta de Piatto.
      </p>

      <form className="nueva-clave__form" onSubmit={handleSubmit} noValidate>
        <PasswordField
          id="nueva-clave"
          label="Nueva clave"
          placeholder="Nueva clave"
          inputClassName="nueva-clave__input"
          autoComplete="new-password"
          value={clave}
          onChange={(event) => setClave(event.target.value)}
        />
        <PasswordField
          id="repetir-clave"
          label="Repetir clave"
          placeholder="Repetir clave"
          inputClassName="nueva-clave__input"
          autoComplete="new-password"
          value={repetirClave}
          onChange={(event) => setRepetirClave(event.target.value)}
        />

        {error && (
          <p className="nueva-clave__error" role="alert">
            {error}
          </p>
        )}

        <button
          className="nueva-clave__submit"
          type="submit"
          disabled={guardado}
        >
          {guardado ? '¡Clave actualizada!' : 'Guardar clave'}
        </button>
      </form>
    </div>
  )
}

export default NuevaClave
