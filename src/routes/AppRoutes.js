import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import Navbar from "../components/layout/Navbar/Navbar";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";

import Cart from "../pages/Cart/Cart";
import MedicineList from "../pages/Medicines/MedicineList";

import OrderList from "../pages/Orders/OrderList";
import OrderDetails from "../pages/Orders/OrderDetails";

import Profile from "../pages/Profile/Profile";

import Dashboard from "../pages/Dashboard/Dashboard";

import AddUpdateMedicine from "../pages/admin/AddUpdateMedicine";
import UserList from "../pages/admin/UserList";

import PrivateRoute from "../components/PrivateRoute";
import MainLayout from "../components/layout/MainLayout";
function AppContent() {

  const location = useLocation();

  const hideNavbarRoutes = [
    "/",
    "/login",
    "/register",
  ];

  return (
    <>
      {!hideNavbarRoutes.includes(
        location.pathname
      ) && <Navbar />}

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/medicines"
          element={
            <PrivateRoute>
              <MedicineList />
            </PrivateRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <OrderList />
            </PrivateRoute>
          }
        />

        <Route
          path="/order-details/:orderId"
          element={
            <PrivateRoute>
              <OrderDetails />
            </PrivateRoute>
          }
        />

        <Route
 path="/profile"
 element={
  <PrivateRoute>
    <Profile />
  </PrivateRoute>
 }
/>

        <Route
          path="/admin/add-medicine"
          element={
            <PrivateRoute adminOnly>
              <AddUpdateMedicine />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <PrivateRoute adminOnly>
              <UserList />
            </PrivateRoute>
          }
        />

      </Routes>
    </>
  );
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}