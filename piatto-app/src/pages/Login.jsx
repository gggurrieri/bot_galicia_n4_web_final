import { useNavigate } from 'react-router-dom'
import loginPhoto from '../assets/images/login-photo.png'
import iconLog from '../assets/icons/icon-log.svg'
import './Login.css'

function Login() {
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    navigate('/home')
  }

  return (
    <div className="login">
      <div className="login__photo">
        <img src={loginPhoto} alt="" />
      </div>

      <form className="login__form" onSubmit={handleSubmit}>
        <input className="login__input" type="text" placeholder="Usuario" />
        <input className="login__input" type="password" placeholder="Clave" />

        <button className="login__submit" type="submit">
          Ingresar
          <img src={iconLog} alt="" className="login__submit-icon" />
        </button>
      </form>

      <button className="login__register" type="button">
        Registrarse
      </button>
    </div>
  )
}

export default Login
