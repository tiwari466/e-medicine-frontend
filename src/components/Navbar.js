import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();      // ✅ AUTH SOURCE
  const { cartCount } = useCart();         // ✅ CART SOURCE
  const { isDark, setIsDark } = useTheme();



  const [openProfile, setOpenProfile] = useState(false);

  return (
    <div className="navbar">
      {/* LEFT */}
      <div className="nav-left">
        <span className="logo">💊</span>
        <span className="title">E-Medicine</span>
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        {/* Theme toggle */}
        <label className="theme-switch">
          <input
            type="checkbox"
            checked={isDark}
            onChange={() => setIsDark((p) => !p)}
          />
          <span className="theme-slider"></span>
        </label>

        {/* Cart */}
        <div className="icon-btn" onClick={() => navigate("/cart")}>
          🛒
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </div>

        {/* Profile */}
        <div style={{ position: "relative" }}>
          <div
            className="icon-btn"
            onClick={() => setOpenProfile(!openProfile)}
          >
           <img
            src={
              user?.picture
                ? user.picture.startsWith("http")
                  ? user.picture
                  : `http://localhost:5249/uploads/${user.picture}`
                : "https://i.pravatar.cc/40"
            }
            alt="profile"
            className="profile-img"
          />

          </div>

          {openProfile && (
            <div className="dropdown">
              <div
                className="dropdown-item"
                onClick={() => {
                  setOpenProfile(false);
                  navigate("/profile");
                }}
              >
                My Profile
              </div>

              <div
                className="dropdown-item"
                onClick={() => {
                  setOpenProfile(false);
                  navigate("/orders");
                }}
              >
                My Orders
              </div>

              <div className="divider"></div>
               <div
                className="dropdown-item"
                style={{ color: "red" }}
                onClick={() => {
                  setOpenProfile(false);
                  logout();
                  navigate("/login");
                }}
              >
                Logout
              </div>
          
            </div>
          )}
        </div>

        {user?.email && <span className="user-text">{user.email}</span>}
      </div>
    </div>
  );
}
