import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(
    Number(localStorage.getItem("cartCount") || 0)
  );

  // ✅ Refresh count ONLY from localStorage (NO API)
  const refreshCartCount = () => {
    const count = Number(localStorage.getItem("cartCount") || 0);
    setCartCount(count);
  };

  // ✅ Sync when app loads / login / logout
  useEffect(() => {
    refreshCartCount();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, refreshCartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
