import { createContext, useContext, useEffect, useState } from "react";
import { getCartItems } from "../api/api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [cartCount, setCartCount] = useState(0);

  const refreshCartCount = async () => {
    try {
      if (!user?.user_id) {
        setCartCount(0);
        return;
      }

      const res = await getCartItems(user.user_id);
      const items = res.data.listCarts || [];

      // 🔥 Total qty count (not only items length)
      const totalQty = items.reduce((sum, x) => sum + Number(x.qty || 0), 0);

      setCartCount(totalQty);
    } catch (err) {
      console.log("CART COUNT ERROR:", err);
      setCartCount(0);
    }
  };

  // auto load on app start
  useEffect(() => {
    refreshCartCount();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, refreshCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
