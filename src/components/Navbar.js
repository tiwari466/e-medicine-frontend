import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [openProfile, setOpenProfile] = useState(false);
  const { isDark, setIsDark } = useTheme();

const { cartCount } = useCart();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div style={styles.navbar}>
      {/* Left Logo */}
      <div style={styles.left}>
        <span style={styles.logo}>💊</span>
        <span style={styles.title}>E-Medicine</span>
      </div>
      {/* Right Side */}
      <div style={styles.right}>
        {/* Cart Icon */}
   <label className="theme-switch">
  <input
    type="checkbox"
    checked={isDark}
    onChange={() => setIsDark((prev) => !prev)}
  />
  <span className="theme-slider"></span>
</label>
        <div
          style={styles.iconBtn}
          onClick={() => navigate("/cart")}
          title="Cart"
        >
          🛒
          {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
        </div>

        {/* Profile Icon */}
        <div style={{ position: "relative" }}>
          <div
            style={styles.iconBtn}
            onClick={() => setOpenProfile(!openProfile)}
            title="Profile"
          >
           <img
  src={user?.picture || "https://i.pravatar.cc/40"}
  alt="profile"
  style={{ width: 35, height: 35, borderRadius: "50%" }}
/>
          </div>


          {/* Dropdown */}
          {openProfile && (
            <div style={styles.dropdown}>
              <div
                style={styles.dropdownItem}
                onClick={() => {
                  setOpenProfile(false);
                  navigate("/profile");
                }}
              >
                My Profile
              </div>

              <div
                style={styles.dropdownItem}
                onClick={() => {
                  setOpenProfile(false);
                  navigate("/orders");
                }}
              >
                My Orders
              </div>

              <div
                style={styles.dropdownItem}
                onClick={() => {
                  setOpenProfile(false);
                  navigate("/address");
                }}
              >
                Address
              </div>

              <div style={styles.divider}></div>

              <div
                style={{ ...styles.dropdownItem, color: "red" }}
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          )}
        </div>

        {/* Show username/email small */}
        {user?.email && <span style={styles.userText}>{user.email}</span>}
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    height: "60px",
    background: "#0b1c35",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0px 18px",
    position: "sticky",
    top: 0,
    zIndex: 999,
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  logo: {
    fontSize: "22px",
  },

  title: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#56ccf2",
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  iconBtn: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    position: "relative",
    fontSize: "18px",
  },

  badge: {
    position: "absolute",
    top: "-6px",
    right: "-6px",
    background: "red",
    color: "white",
    fontSize: "12px",
    padding: "2px 6px",
    borderRadius: "999px",
    fontWeight: "bold",
  },

  dropdown: {
    position: "absolute",
    top: "50px",
    right: 0,
    width: "180px",
    background: "#111c2f",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
  },

  dropdownItem: {
    padding: "12px",
    cursor: "pointer",
    fontSize: "14px",
  },

  divider: {
    height: "1px",
    background: "rgba(255,255,255,0.12)",
  },

  userText: {
    fontSize: "12px",
    opacity: 0.7,
  },
};
