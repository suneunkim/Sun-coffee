import { Routes, Route } from 'react-router-dom'
import './index.css'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/Home'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/login" element={<Login />} />
    </Routes>
  )
}

export default App
