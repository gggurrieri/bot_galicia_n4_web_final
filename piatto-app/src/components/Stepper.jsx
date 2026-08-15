import './Stepper.css'

function Stepper({ label, value, onChange, min = 0, max = 20 }) {
  return (
    <div className="stepper">
      <span className="stepper__label">{label}</span>
      <div className="stepper__controls">
        <button
          type="button"
          className="stepper__button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label={`Restar ${label}`}
        >
          −
        </button>
        <span className="stepper__value">{value}</span>
        <button
          type="button"
          className="stepper__button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label={`Sumar ${label}`}
        >
          +
        </button>
      </div>
    </div>
  )
}

export default Stepper
