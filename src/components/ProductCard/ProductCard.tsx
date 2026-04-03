import type { SyntheticEvent } from "react";
import econverseLogo from "../../assets/images/econverse.svg";
import type { Product } from "../../types/Product";
import "./ProductCard.scss";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

function formatPrice(value: number): string {
  return value.toFixed(2).replace(".", ",");
}

function getInstallmentText(price: number): string {
  const installmentCount = 2;
  const installmentValue = price / installmentCount;
  return `ou ${installmentCount}x de R$ ${formatPrice(installmentValue)} sem juros`;
}

function handleImageError(event: SyntheticEvent<HTMLImageElement>) {
  const img = event.currentTarget;
  img.onerror = null;
  img.src = econverseLogo;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const installmentText = getInstallmentText(product.price);
  const shippingText = product.shippingText ?? "Frete grátis";
  const descriptionText =
    product.descriptionShort.toLowerCase().includes("lorem ipsum")
      ? product.productName
      : product.descriptionShort;

  return (
    <article className="product-card">
      <button
        type="button"
        className="product-card-trigger"
        onClick={onClick}
        aria-label={`Abrir detalhes do produto ${product.productName}`}
      >
        <img src={product.photo} alt={product.productName} onError={handleImageError} />
        <p className="description">{descriptionText}</p>
        {typeof product.oldPrice === "number" && (
          <p className="old-price">R$ {formatPrice(product.oldPrice)}</p>
        )}
        <p className="current-price">R$ {formatPrice(product.price)}</p>
        <p className="installments">{installmentText}</p>
        <p className="shipping">{shippingText}</p>
        <span className="buy-button">COMPRAR</span>
      </button>
    </article>
  );
}
