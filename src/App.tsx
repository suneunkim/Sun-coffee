import { Routes, Route } from 'react-router-dom'
import './index.css'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/Home'
import SellerHome from './pages/seller/SellerHome'
import ProtectedRoute from './components/routing/ProtectedRoute'
import UploadProduct from './pages/seller/UploadProduct'
import CategoryPage from './pages/CategoryPage'
import MyOrder from './pages/MyOrder'
import OrderHistory from './pages/seller/OrderHistory'

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
      <Route path="/my-orders" element={<MyOrder />} />
      <Route path="/orders-history" element={<OrderHistory />} />
      <Route path="/:category" element={<CategoryPage />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/upload" element={<UploadProduct />} />
    </Routes>
  )
}

export default App
