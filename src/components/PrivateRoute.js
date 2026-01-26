import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, adminOnly }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.type !== "Admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
}
