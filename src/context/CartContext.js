import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] =
    useState(0);

  useEffect(() => {
    const savedCount =
      Number(
        localStorage.getItem(
          "cartCount"
        )
      ) || 0;

    setCartCount(savedCount);
  }, []);

  const updateCartCount = (
    count
  ) => {
    const newCount =
      Number(count) || 0;

    setCartCount(newCount);

    localStorage.setItem(
      "cartCount",
      String(newCount)
    );
  };

  const resetCart = () => {
    setCartCount(0);

    localStorage.removeItem(
      "cartCount"
    );
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