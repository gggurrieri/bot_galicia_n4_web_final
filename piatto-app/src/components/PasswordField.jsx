import { useState } from 'react'
import './PasswordField.css'

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path
        d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path
        d="M3 3l18 18M10.6 5.2A11 11 0 0 1 12 5c7 0 11 7 11 7a13.6 13.6 0 0 1-3.4 4.1M6.6 6.6C3.7 8.3 1 12 1 12s4 7 11 7a10.4 10.4 0 0 0 4.4-1M9.9 9.9a3 3 0 0 0 4.2 4.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PasswordField({
  id,
  label,
  value,
  onChange,
  placeholder,
  inputClassName,
  autoComplete,
  required,
}) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="password-field">
      <label htmlFor={id} className="visually-hidden">
        {label}
      </label>
      <input
        id={id}
        className={inputClassName}
        style={{ paddingRight: 44 }}
        type={visible ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        required={required}
      />
      <button
        type="button"
        className="password-field__toggle"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? 'Ocultar clave' : 'Mostrar clave'}
      >
        {visible ? <EyeOffIcon /> : <EyeIcon />}
      </button>
    </div>
  )
}

export default PasswordField
