import { useNavigate } from 'react-router-dom'
import './BackButton.css'

function BackButton({ to }) {
  const navigate = useNavigate()

  return (
    <button
      type="button"
      className="back-button"
      onClick={() => (to ? navigate(to) : navigate(-1))}
      aria-label="Volver"
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
        <path
          d="M15 5L8 12L15 19"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

export default BackButton
