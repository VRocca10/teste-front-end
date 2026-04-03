import { useEffect, useRef, useState } from "react";
import { ProductCard } from "../components/ProductCard/ProductCard";
import { ProductModal } from "../components/ProductModal/ProductModal";
import { CarouselArrows } from "../components/shared/CarouselArrows";
import { SectionTitle } from "../components/shared/SectionTitle";
import { useCarousel } from "../hooks/useCarousel";
import { useProductModal } from "../hooks/useProductModal";
import { useProducts } from "../hooks/useProducts";
import "./ProductSection.scss";

const categories = [
  "CELULAR",
  "ACESSORIOS",
  "TABLETS",
  "NOTEBOOKS",
  "TVS",
  "VER TODOS",
];

type ProductSectionVariant = "default" | "related";
export type ProductCarouselVariant = "paged" | "autoplay" | "scroll" | "scrollAuto";

type ProductSectionProps = {
  variant?: ProductSectionVariant;
  title?: string;
  carouselVariant?: ProductCarouselVariant;
};

export function ProductSection({
  variant = "default",
  title = "Produtos relacionados",
  carouselVariant = "paged",
}: ProductSectionProps) {
  const products = useProducts();
  const { selected, openProduct, closeProduct } = useProductModal();
  const scrollViewportRef = useRef<HTMLDivElement | null>(null);
  const [scrollState, setScrollState] = useState({ canPrevious: false, canNext: false });
  const isAutoplay = carouselVariant === "autoplay";
  const isScroll = carouselVariant === "scroll" || carouselVariant === "scrollAuto";
  const isScrollAuto = carouselVariant === "scrollAuto";

  const {
    itemsPerPage,
    visibleItems,
    hasPrevious,
    hasNext,
    isAnimating,
    safeStartIndex,
    handlePrevious,
    handleNext,
  } = useCarousel(products, { loop: isAutoplay });

  const isRelated = variant === "related";
  const displayedProducts = isScroll ? products : visibleItems;

  useEffect(() => {
    if (!isAutoplay || products.length <= itemsPerPage) return;

    const intervalId = window.setInterval(() => {
      handleNext();
    }, 3800);

    return () => window.clearInterval(intervalId);
  }, [isAutoplay, products.length, itemsPerPage, handleNext]);

  const getScrollStep = () => {
    const viewport = scrollViewportRef.current;
    if (!viewport) return 320;

    const firstCard = viewport.querySelector<HTMLElement>(".product-card");
    const grid = viewport.querySelector<HTMLElement>(".grid");
    const cardWidth = firstCard?.offsetWidth ?? 304;
    const gap = Number.parseFloat(grid ? window.getComputedStyle(grid).gap : "18") || 18;

    return cardWidth + gap;
  };

  const updateScrollState = () => {
    const viewport = scrollViewportRef.current;
    if (!viewport) return;

    const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    setScrollState({
      canPrevious: viewport.scrollLeft > 1,
      canNext: viewport.scrollLeft < maxScrollLeft - 1,
    });
  };

  const handleScrollPrevious = () => {
    const viewport = scrollViewportRef.current;
    if (!viewport) return;
    const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    if (viewport.scrollLeft <= 1) {
      if (isScrollAuto) {
        viewport.scrollTo({ left: maxScrollLeft, behavior: "smooth" });
      }
      return;
    }

    const nextLeft = Math.max(0, viewport.scrollLeft - getScrollStep());
    viewport.scrollTo({ left: nextLeft, behavior: "smooth" });
  };

  const handleScrollNext = () => {
    const viewport = scrollViewportRef.current;
    if (!viewport) return;
    const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth);

    const atEnd = viewport.scrollLeft >= maxScrollLeft - 1;
    if (atEnd) {
      if (isScrollAuto) {
        viewport.scrollTo({ left: 0, behavior: "smooth" });
      }
      return;
    }

    const nextLeft = Math.min(maxScrollLeft, viewport.scrollLeft + getScrollStep());
    viewport.scrollTo({ left: nextLeft, behavior: "smooth" });
  };

  useEffect(() => {
    if (!isScroll) return;

    const viewport = scrollViewportRef.current;
    if (!viewport) return;

    const onScroll = () => updateScrollState();
    const onResize = () => updateScrollState();

    updateScrollState();
    viewport.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);

    const rafId = window.requestAnimationFrame(() => updateScrollState());

    return () => {
      viewport.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.cancelAnimationFrame(rafId);
    };
  }, [isScroll, products.length]);

  useEffect(() => {
    if (!isScrollAuto || products.length <= 1) return;

    const intervalId = window.setInterval(() => {
      const viewport = scrollViewportRef.current;
      if (!viewport) return;

      const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      const atEnd = viewport.scrollLeft >= maxScrollLeft - 1;

      if (atEnd) {
        viewport.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }

      const nextLeft = Math.min(maxScrollLeft, viewport.scrollLeft + getScrollStep());
      viewport.scrollTo({ left: nextLeft, behavior: "smooth" });
    }, 3200);

    return () => window.clearInterval(intervalId);
  }, [isScrollAuto, products.length]);

  const disablePagedPrevious = !hasPrevious;
  const disablePagedNext = !hasNext;
  const disableAutoplayArrows = products.length <= itemsPerPage;

  const showDisabledPrevious = isScroll
    ? isScrollAuto
      ? false
      : !scrollState.canPrevious
    : isAutoplay
      ? disableAutoplayArrows
      : disablePagedPrevious;

  const showDisabledNext = isScroll
    ? isScrollAuto
      ? false
      : !scrollState.canNext
    : isAutoplay
      ? disableAutoplayArrows
      : disablePagedNext;

  const onPrevious = isScroll ? handleScrollPrevious : handlePrevious;
  const onNext = isScroll ? handleScrollNext : handleNext;

  const header = isRelated ? (
    <SectionTitle
      className="related-products-header"
      rowClassName="title-row"
      title={title}
      showViewAll
    />
  ) : (
    <SectionTitle className="products-header" title={title} />
  );

  const carousel = (
    <div
      className={`${isRelated ? "related-products-carousel" : "products-carousel"} ${isScroll ? "carousel-scroll" : "carousel-paged"} ${isAutoplay ? "carousel-autoplay" : ""} ${isScrollAuto ? "carousel-scroll-auto" : ""}`}
    >
      <CarouselArrows
        onPrevious={onPrevious}
        onNext={onNext}
        disablePrevious={showDisabledPrevious}
        disableNext={showDisabledNext}
      />

      <div
        className={`carousel-track ${isScroll ? "carousel-viewport" : ""}`}
        ref={isScroll ? scrollViewportRef : null}
      >
        <div
          key={isScroll ? `${variant}-scroll-${products.length}` : `${variant}-${safeStartIndex}-${itemsPerPage}`}
          className={`grid ${isAnimating && !isScroll ? "is-animating" : ""}`}
        >
          {displayedProducts.map((product) => (
            <ProductCard
              key={`${variant}-${product.productId}`}
              product={product}
              onClick={() => openProduct(product)}
            />
          ))}
        </div>
      </div>
    </div>
  );

  if (isRelated) {
    return (
      <section className="related-products-section">
        <div className="container">
          {header}
          {carousel}
        </div>
        <ProductModal product={selected} onClose={closeProduct} />
      </section>
    );
  }

  return (
    <section className="products container">
      {header}

      <nav className="products-tabs" aria-label="Categorias de produtos">
        {categories.map((category, index) => (
          <button key={category} type="button" className={index === 0 ? "is-active" : ""}>
            {category}
          </button>
        ))}
      </nav>

      {carousel}

      <ProductModal product={selected} onClose={closeProduct} />
    </section>
  );
}
