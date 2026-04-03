import { useEffect, useState } from "react";
import type { Product } from "../../types/Product";
import "./ProductModal.scss";

interface Props {
  product: Product | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: Props) {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!product) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
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

  return (
    <div className="product-modal-overlay" onClick={handleClose}>
      <div
        className="product-modal"
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

            <button type="button" className="buy-button">
              COMPRAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
