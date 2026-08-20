import { Check } from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import "./CartToast.scss";

export function CartToast() {
  const { notification } = useCart();
  if (!notification) return null;

  return (
    <div className="cart-toast" role="status" aria-live="polite">
      <Check size={20} aria-hidden="true" />
      <span>{notification}</span>
    </div>
  );
}
