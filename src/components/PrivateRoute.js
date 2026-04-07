import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export default function PrivateRoute({ children, adminOnly }) {
  const storedUser = localStorage.getItem("user");
const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.type !== "Admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
}


