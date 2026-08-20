import { useEffect } from "react";
import { ProductCarousel, type ProductSectionVariant } from "../components/ProductCarousel/ProductCarousel";
import { ProductModal } from "../components/ProductModal/ProductModal";
import { ProductTabs } from "../components/ProductTabs/ProductTabs";
import { SectionTitle } from "../components/shared/SectionTitle";
import { useCarousel } from "../hooks/useCarousel";
import { useProductModal } from "../hooks/useProductModal";
import { useProducts } from "../hooks/useProducts";
import { useScrollCarousel } from "../hooks/useScrollCarousel";
import "./ProductSection.scss";

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
  const { products, isLoading, isFallback } = useProducts();
  const { selected, openProduct, closeProduct } = useProductModal();
  const isAutoplay = carouselVariant === "autoplay";
  const isScroll = carouselVariant === "scroll" || carouselVariant === "scrollAuto";
  const isScrollAuto = carouselVariant === "scrollAuto";
  const isRelated = variant === "related";

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
  const {
    viewportRef,
    scrollState,
    handlePrevious: handleScrollPrevious,
    handleNext: handleScrollNext,
  } = useScrollCarousel({
    isActive: isScroll,
    loop: isScrollAuto,
    itemsCount: products.length,
  });

  useEffect(() => {
    if (!isAutoplay || products.length <= itemsPerPage) return;

    const intervalId = window.setInterval(handleNext, 3800);
    return () => window.clearInterval(intervalId);
  }, [handleNext, isAutoplay, itemsPerPage, products.length]);

  const disablePrevious = isScroll
    ? !isScrollAuto && !scrollState.canPrevious
    : isAutoplay
      ? products.length <= itemsPerPage
      : !hasPrevious;
  const disableNext = isScroll
    ? !isScrollAuto && !scrollState.canNext
    : isAutoplay
      ? products.length <= itemsPerPage
      : !hasNext;
  const displayedProducts = isScroll ? products : visibleItems;

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
    <ProductCarousel
      variant={variant}
      products={displayedProducts}
      isScroll={isScroll}
      isAutoplay={isAutoplay}
      isScrollAuto={isScrollAuto}
      isAnimating={isAnimating}
      safeStartIndex={safeStartIndex}
      itemsPerPage={itemsPerPage}
      scrollViewportRef={viewportRef}
      disablePrevious={disablePrevious}
      disableNext={disableNext}
      onPrevious={isScroll ? handleScrollPrevious : handlePrevious}
      onNext={isScroll ? handleScrollNext : handleNext}
      onProductClick={openProduct}
    />
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

      {isLoading && <p className="products-status" role="status">Carregando produtos...</p>}
      {isFallback && !isLoading && (
        <p className="products-status products-status-warning" role="status">
          Exibindo produtos de demonstração enquanto a vitrine é atualizada.
        </p>
      )}

      <ProductTabs />
      {carousel}
      <ProductModal product={selected} onClose={closeProduct} />
    </section>
  );
}
