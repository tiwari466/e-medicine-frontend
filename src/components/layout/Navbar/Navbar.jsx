import {
  useState,
  useMemo,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import { ENV } from "../../../config/env";

import { useAuth } from "../../../context/AuthContext";

import { useCart } from "../../../context/CartContext";

import { useTheme } from "../../../context/ThemeContext";

import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const { user, logout } =
    useAuth();

  const { cartCount } =
    useCart();

  const {
    isDark,
    toggleTheme,
  } = useTheme();

  const [isOpen, setIsOpen] =
    useState(false);

  const profileImage =
    useMemo(() => {
      if (!user?.picture) {
        return "https://i.pravatar.cc/40";
      }

      if (
        user.picture.startsWith(
          "http"
        )
      ) {
        return user.picture;
      }

      return `${ENV.IMAGE_BASE_URL}${user.picture}`;
    }, [user]);

  const handleLogout = () => {
    logout();

    setIsOpen(false);

    navigate(
      "/login",
      { replace: true }
    );
  };

  return (
    <div className="navbar">

      <div className="nav-left">

        <span className="logo">
          💊
        </span>

        <span
          className="title"
          onClick={() =>
            navigate("/medicines")
          }
        >
          E-Medicine
        </span>

      </div>

      <div className="nav-right">

        <label className="theme-switch">

          <input
            type="checkbox"
            checked={isDark}
            onChange={
              toggleTheme
            }
          />

          <span className="theme-slider" />

        </label>

        <div
          className="icon-btn"
          onClick={() =>
            navigate("/cart")
          }
        >
          🛒

          {cartCount > 0 && (
            <span className="badge">
              {cartCount}
            </span>
          )}
        </div>

        <div
          style={{
            position:
              "relative",
          }}
        >
          <img
            src={profileImage}
            alt="profile"
            className="profile-img"
            onClick={() =>
              setIsOpen(!isOpen)
            }
          />

          {isOpen && (
            <div className="dropdown">

              <div
                className="dropdown-item"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/profile");
                }}
              >
                My Profile
              </div>

              <div
                className="dropdown-item"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/orders");
                }}
              >
                My Orders
              </div>

              {user?.role ===
                "Admin" && (
                <>
                  <div className="divider" />

                  <div
                    className="dropdown-item"
                    onClick={() => {
                      setIsOpen(false);
                      navigate(
                        "/admin/users"
                      );
                    }}
                  >
                    User Management
                  </div>

                  <div
                    className="dropdown-item"
                    onClick={() => {
                      setIsOpen(false);
                      navigate(
                        "/admin/add-medicine"
                      );
                    }}
                  >
                    Manage Medicines
                  </div>
                </>
              )}

              <div className="divider" />

              <div
                className="dropdown-item logout"
                onClick={
                  handleLogout
                }
              >
                Logout
              </div>

            </div>
          )}
        </div>

        <span className="user-text">
          {user?.email}
        </span>

      </div>

    </div>
  );
}