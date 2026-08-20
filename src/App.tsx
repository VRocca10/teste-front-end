import { CartProvider } from "./contexts/CartContext";
import { CartToast } from "./components/CartToast/CartToast";
import { Home } from "./pages/Home/Home";
import "./styles/global.scss";

export default function App() {
  return (
    <CartProvider>
      <Home />
      <CartToast />
    </CartProvider>
  );
}
