import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({
  children,
  adminOnly = false,
}) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "50px",
        }}
      >
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (
    adminOnly &&
    user?.type !== "Admin"
  ) {
    return <Navigate to="/medicines" replace />;
  }

  return children;
}