import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton.jsx'
import PasswordField from '../components/PasswordField.jsx'
import './Registro.css'

const fields = [
  { id: 'nombre', label: 'Nombre', type: 'text', autoComplete: 'given-name' },
  {
    id: 'apellido',
    label: 'Apellido',
    type: 'text',
    autoComplete: 'family-name',
  },
  {
    id: 'nacimiento',
    label: 'Fecha de nacimiento',
    type: 'date',
    autoComplete: 'bday',
  },
  {
    id: 'dni',
    label: 'DNI',
    type: 'text',
    inputMode: 'numeric',
    autoComplete: 'off',
  },
  { id: 'usuario', label: 'Usuario', type: 'text', autoComplete: 'username' },
]

function Registro() {
  const navigate = useNavigate()
  const [values, setValues] = useState({})
  const [clave, setClave] = useState('')
  const [repetirClave, setRepetirClave] = useState('')
  const [error, setError] = useState('')

  function handleChange(id, value) {
    setValues((prev) => ({ ...prev, [id]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (clave.length < 6) {
      setError('La clave debe tener al menos 6 caracteres.')
      return
    }
    if (clave !== repetirClave) {
      setError('Las claves no coinciden.')
      return
    }

    setError('')
    navigate('/home')
  }

  return (
    <div className="registro">
      <BackButton to="/" />

      <h1 className="registro__title">Creá tu cuenta</h1>

      <form className="registro__form" onSubmit={handleSubmit} noValidate>
        {fields.map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id} className="visually-hidden">
              {field.label}
            </label>
            <input
              id={field.id}
              className="registro__input"
              type={field.type}
              inputMode={field.inputMode}
              autoComplete={field.autoComplete}
              placeholder={field.label}
              value={values[field.id] ?? ''}
              onChange={(event) => handleChange(field.id, event.target.value)}
              required
            />
          </div>
        ))}

        <PasswordField
          id="registro-clave"
          label="Clave"
          placeholder="Clave"
          inputClassName="registro__input"
          autoComplete="new-password"
          value={clave}
          onChange={(event) => setClave(event.target.value)}
          required
        />
        <PasswordField
          id="registro-repetir-clave"
          label="Repetir clave"
          placeholder="Repetir clave"
          inputClassName="registro__input"
          autoComplete="new-password"
          value={repetirClave}
          onChange={(event) => setRepetirClave(event.target.value)}
          required
        />

        <div>
          <label htmlFor="celular" className="visually-hidden">
            Celular
          </label>
          <input
            id="celular"
            className="registro__input"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="Celular"
            value={values.celular ?? ''}
            onChange={(event) => handleChange('celular', event.target.value)}
            required
          />
        </div>

        {error && (
          <p className="registro__error" role="alert">
            {error}
          </p>
        )}

        <button className="registro__submit" type="submit">
          Registrarme
        </button>
      </form>
    </div>
  )
}

export default Registro
