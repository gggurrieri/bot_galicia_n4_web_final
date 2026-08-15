import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton.jsx'
import Stepper from '../components/Stepper.jsx'
import './Buscar.css'

function Buscar() {
  const navigate = useNavigate()
  const [ubicacion, setUbicacion] = useState('Palermo, Buenos Aires')
  const [adultos, setAdultos] = useState(2)
  const [menores, setMenores] = useState(0)
  const [bebes, setBebes] = useState(0)
  const [mesa, setMesa] = useState('adentro')

  function handleSubmit(event) {
    event.preventDefault()
    navigate('/home')
  }

  return (
    <div className="buscar">
      <BackButton to="/home" />

      <h1 className="buscar__title">¿Dónde y cuándo?</h1>

      <form className="buscar__form" onSubmit={handleSubmit}>
        <section className="buscar__section">
          <label className="buscar__section-label" htmlFor="ubicacion">
            Ubicación
          </label>
          <input
            id="ubicacion"
            className="buscar__input"
            type="text"
            value={ubicacion}
            onChange={(event) => setUbicacion(event.target.value)}
          />
        </section>

        <section className="buscar__section">
          <span className="buscar__section-label">Comensales</span>
          <div className="buscar__steppers">
            <Stepper label="Adultos" value={adultos} onChange={setAdultos} min={1} />
            <Stepper label="Menores" value={menores} onChange={setMenores} />
            <Stepper label="Bebés" value={bebes} onChange={setBebes} />
          </div>
        </section>

        <section className="buscar__section">
          <span className="buscar__section-label">Mesa</span>
          <div className="buscar__toggle">
            <button
              type="button"
              className={`buscar__toggle-option${mesa === 'adentro' ? ' buscar__toggle-option--active' : ''}`}
              onClick={() => setMesa('adentro')}
            >
              Adentro
            </button>
            <button
              type="button"
              className={`buscar__toggle-option${mesa === 'afuera' ? ' buscar__toggle-option--active' : ''}`}
              onClick={() => setMesa('afuera')}
            >
              Afuera
            </button>
          </div>
        </section>

        <button className="buscar__submit" type="submit">
          Buscar
        </button>
      </form>
    </div>
  )
}

export default Buscar
