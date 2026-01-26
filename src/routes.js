import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

// User Pages
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Profile from "./pages/user/Profile";
import Cart from "./pages/user/Cart";
import OrderList from "./pages/user/OrderList";
import MedicineList from "./pages/user/MedicineList";
import OrderDetails from "./pages/user/OrderDetails";

// Admin Pages
import AddUpdateMedicine from "./pages/admin/AddUpdateMedicine";
import UserList from "./pages/admin/UserList";

function Layout() {
  const location = useLocation();

  // ✅ Hide navbar only on these pages
  const hideNavbarRoutes = ["/", "/login", "/register","/profile"];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Routes */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
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
        <Route path="/medicines" element={<MedicineList />} />

        {/* Admin Routes */}
        <Route
          path="/admin/add-medicine"
          element={
            <PrivateRoute adminOnly={true}>
              <AddUpdateMedicine />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <PrivateRoute adminOnly={true}>
              <UserList />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Login />} />
      </Routes>
    </>
  );
}

export default function AppRoutes() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
