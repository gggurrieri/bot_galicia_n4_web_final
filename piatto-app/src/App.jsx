import { Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Reserva from './pages/Reserva.jsx'

function App() {
  return (
    <div className="phone">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/reserva/:id" element={<Reserva />} />
      </Routes>
    </div>
  )
}

export default App
