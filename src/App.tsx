import { CartProvider } from "./contexts/CartContext";
import { Home } from "./pages/Home/Home";
import "./styles/global.scss";

export default function App() {
  return (
    <CartProvider>
      <Home />
    </CartProvider>
  );
}
