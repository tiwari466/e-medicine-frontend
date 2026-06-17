import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.css";

import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>

    <AuthProvider>

      <CartProvider>

        <ThemeProvider>

          <App />

          <Toaster
            position="top-right"
          />

        </ThemeProvider>

      </CartProvider>

    </AuthProvider>

  </React.StrictMode>
);