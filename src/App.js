import AppRoutes from "./routes";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";
function App() {
  return (
    <CartProvider>
      <ThemeProvider>
      <AppRoutes />
      </ThemeProvider>
    </CartProvider>
  );
}

export default App;
