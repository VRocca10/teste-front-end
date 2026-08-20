import type { RefObject } from "react";
import { ProductCard } from "../ProductCard/ProductCard";
import { CarouselArrows } from "../shared/CarouselArrows";
import type { Product } from "../../types/Product";

export type ProductSectionVariant = "default" | "related";

type ProductCarouselProps = {
  variant: ProductSectionVariant;
  products: Product[];
  isScroll: boolean;
  isAutoplay: boolean;
  isScrollAuto: boolean;
  isAnimating: boolean;
  safeStartIndex: number;
  itemsPerPage: number;
  scrollViewportRef: RefObject<HTMLDivElement | null>;
  disablePrevious: boolean;
  disableNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onProductClick: (product: Product) => void;
};

export function ProductCarousel({
  variant,
  products,
  isScroll,
  isAutoplay,
  isScrollAuto,
  isAnimating,
  safeStartIndex,
  itemsPerPage,
  scrollViewportRef,
  disablePrevious,
  disableNext,
  onPrevious,
  onNext,
  onProductClick,
}: ProductCarouselProps) {
  const isRelated = variant === "related";

  return (
    <div
      className={`${isRelated ? "related-products-carousel" : "products-carousel"} ${isScroll ? "carousel-scroll" : "carousel-paged"} ${isAutoplay ? "carousel-autoplay" : ""} ${isScrollAuto ? "carousel-scroll-auto" : ""}`}
    >
      <CarouselArrows
        onPrevious={onPrevious}
        onNext={onNext}
        disablePrevious={disablePrevious}
        disableNext={disableNext}
      />

      <div
        className={`carousel-track ${isScroll ? "carousel-viewport" : ""}`}
        ref={isScroll ? scrollViewportRef : null}
      >
        <div
          key={isScroll ? `${variant}-scroll-${products.length}` : `${variant}-${safeStartIndex}-${itemsPerPage}`}
          className={`grid ${isAnimating && !isScroll ? "is-animating" : ""}`}
        >
          {products.map((product) => (
            <ProductCard
              key={`${variant}-${product.productId}`}
              product={product}
              onClick={() => onProductClick(product)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
