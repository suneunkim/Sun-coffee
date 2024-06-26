import { Routes, Route } from "react-router-dom";
import "./index.css";
import { Suspense, lazy } from "react";
import Loading from "./components/common/Loading";
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const SellerHome = lazy(() => import("./pages/seller/SellerHome"));
const ProtectedRoute = lazy(
  () => import("./components/routing/ProtectedRoute"),
);
const UploadProduct = lazy(() => import("./pages/seller/UploadProduct"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const MyOrder = lazy(() => import("./pages/MyOrder"));
const OrderHistory = lazy(() => import("./pages/seller/OrderHistory"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
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
    </Suspense>
  );
}

export default App;
