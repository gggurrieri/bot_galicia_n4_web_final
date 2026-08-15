import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton.jsx'
import Stepper from '../components/Stepper.jsx'
import { useSearch } from '../context/SearchContext.jsx'
import './Buscar.css'

function Buscar() {
  const navigate = useNavigate()
  const { search, setSearch } = useSearch()
  const [ubicacion, setUbicacion] = useState(search.ubicacion)
  const [adultos, setAdultos] = useState(search.adultos)
  const [menores, setMenores] = useState(search.menores)
  const [bebes, setBebes] = useState(search.bebes)
  const [mesa, setMesa] = useState(search.mesa)
  const [nota, setNota] = useState(search.nota)

  function handleSubmit(event) {
    event.preventDefault()
    setSearch({ ubicacion, adultos, menores, bebes, mesa, nota: nota.trim() })
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
            autoComplete="address-level2"
            value={ubicacion}
            onChange={(event) => setUbicacion(event.target.value)}
          />
        </section>

        <section className="buscar__section">
          <span className="buscar__section-label" id="comensales-label">
            Comensales
          </span>
          <div className="buscar__steppers" role="group" aria-labelledby="comensales-label">
            <Stepper label="Adultos" value={adultos} onChange={setAdultos} min={1} />
            <Stepper label="Menores" value={menores} onChange={setMenores} />
            <Stepper label="Bebés" value={bebes} onChange={setBebes} />
          </div>
        </section>

        <section className="buscar__section">
          <span className="buscar__section-label" id="mesa-label">
            Mesa
          </span>
          <div className="buscar__toggle" role="group" aria-labelledby="mesa-label">
            <button
              type="button"
              className={`buscar__toggle-option${mesa === 'adentro' ? ' buscar__toggle-option--active' : ''}`}
              aria-pressed={mesa === 'adentro'}
              onClick={() => setMesa('adentro')}
            >
              Adentro
            </button>
            <button
              type="button"
              className={`buscar__toggle-option${mesa === 'afuera' ? ' buscar__toggle-option--active' : ''}`}
              aria-pressed={mesa === 'afuera'}
              onClick={() => setMesa('afuera')}
            >
              Afuera
            </button>
          </div>
        </section>

        <section className="buscar__section">
          <label className="buscar__section-label" htmlFor="nota">
            Pedido especial (opcional)
          </label>
          <textarea
            id="nota"
            className="buscar__textarea"
            placeholder="Ej: mesa junto a la ventana, alergia al maní..."
            value={nota}
            onChange={(event) => setNota(event.target.value)}
            rows={2}
          />
        </section>

        <button className="buscar__submit" type="submit">
          Buscar
        </button>
      </form>
    </div>
  )
}

export default Buscar
