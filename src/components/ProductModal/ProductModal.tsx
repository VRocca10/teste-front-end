import { useEffect, useRef, useState } from "react";
import { useCart } from "../../contexts/CartContext";
import type { Product } from "../../types/Product";
import "./ProductModal.scss";

interface Props {
  product: Product | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: Props) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!product) return;

    triggerElementRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const dialog = dialogRef.current;
    const focusableSelector = 'button:not([disabled]), [href], input:not([disabled])';
    const focusableElements = () =>
      Array.from(dialog?.querySelectorAll<HTMLElement>(focusableSelector) ?? []);

    window.requestAnimationFrame(() => focusableElements()[0]?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setQuantity(1);
        onClose();
        return;
      }

      if (event.key === "Tab") {
        const elements = focusableElements();
        if (elements.length === 0) return;

        const first = elements[0];
        const last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      triggerElementRef.current?.focus();
    };
  }, [product, onClose]);

  if (!product) return null;

  const handleClose = () => {
    setQuantity(1);
    onClose();
  };

  const formattedPrice = product.price.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const decreaseQuantity = () => setQuantity((current) => Math.max(1, current - 1));
  const increaseQuantity = () => setQuantity((current) => current + 1);
  const addToCart = () => {
    addItem(product, quantity);
    handleClose();
  };

  return (
    <div className="product-modal-overlay" onClick={handleClose}>
      <div
        className="product-modal"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Detalhes de ${product.productName}`}
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="close-button" aria-label="Fechar modal" onClick={handleClose}>
          ×
        </button>

        <div className="product-modal-image">
          <img src={product.photo} alt={product.productName} />
        </div>

        <div className="product-modal-content">
          <h2>{product.productName}</h2>
          <strong>R$ {formattedPrice}</strong>
          <p>{product.descriptionShort}</p>
          <button type="button" className="details-link">
            Veja mais detalhes do produto &gt;
          </button>

          <div className="actions">
            <div className="quantity-control">
              <button type="button" aria-label="Diminuir quantidade" onClick={decreaseQuantity}>
                <span className="minus-icon" aria-hidden="true" />
              </button>
              <span>{String(quantity).padStart(2, "0")}</span>
              <button
                type="button"
                className="plus-button"
                aria-label="Aumentar quantidade"
                onClick={increaseQuantity}
              >
                <span className="plus-icon" aria-hidden="true" />
              </button>
            </div>

            <button type="button" className="buy-button" onClick={addToCart}>
              COMPRAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
