import { Routes, Route } from 'react-router-dom'
import './App.css'
import { SearchProvider } from './context/SearchContext.jsx'
import { FavoritesProvider } from './context/FavoritesContext.jsx'
import { ReservationsProvider } from './context/ReservationsContext.jsx'
import { ToastProvider } from './context/ToastContext.jsx'
import Login from './pages/Login.jsx'
import Registro from './pages/Registro.jsx'
import RecuperarClave from './pages/RecuperarClave.jsx'
import NuevaClave from './pages/NuevaClave.jsx'
import Home from './pages/Home.jsx'
import Buscar from './pages/Buscar.jsx'
import Reserva from './pages/Reserva.jsx'
import Reservado from './pages/Reservado.jsx'
import Cuenta from './pages/Cuenta.jsx'
import Favoritos from './pages/Favoritos.jsx'
import Menu from './pages/Menu.jsx'
import MisReservas from './pages/MisReservas.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  return (
    <SearchProvider>
      <FavoritesProvider>
        <ReservationsProvider>
          <div className="phone">
            <ToastProvider>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/recuperar-clave" element={<RecuperarClave />} />
                <Route path="/nueva-clave" element={<NuevaClave />} />
                <Route path="/home" element={<Home />} />
                <Route path="/buscar" element={<Buscar />} />
                <Route path="/reserva/:id" element={<Reserva />} />
                <Route path="/reservado/:id" element={<Reservado />} />
                <Route path="/cuenta/:id" element={<Cuenta />} />
                <Route path="/favoritos" element={<Favoritos />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/mis-reservas" element={<MisReservas />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ToastProvider>
          </div>
        </ReservationsProvider>
      </FavoritesProvider>
    </SearchProvider>
  )
}

export default App
