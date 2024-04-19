import { Routes, Route } from 'react-router-dom'
import './index.css'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/Home'
import SellerHome from './pages/SellerHome'
import ProtectedRoute from './components/routing/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route
        path="/seller-home"
        element={
          <ProtectedRoute>
            <SellerHome />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Home />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/login" element={<Login />} />
    </Routes>
  )
}

export default App
