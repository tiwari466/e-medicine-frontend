import {
  createContext,
  useContext,
  useState,
} from "react";

const CartContext = createContext();

export function CartProvider({
  children,
}) {
  const [cartCount, setCartCount] =
    useState(0);

  const updateCartCount = (
    count
  ) => {
    setCartCount(count);
  };

  const resetCart = () => {
    setCartCount(0);
  };

  return (
    <CartContext.Provider
      value={{
        cartCount,
        updateCartCount,
        resetCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () =>
  useContext(CartContext);