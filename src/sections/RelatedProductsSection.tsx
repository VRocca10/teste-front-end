import "./RelatedProductsSection.scss";
import { ProductSection, type ProductCarouselVariant } from "./ProductSection";

type RelatedProductsSectionProps = {
  carouselVariant?: ProductCarouselVariant;
};

export function RelatedProductsSection({ carouselVariant = "paged" }: RelatedProductsSectionProps) {
  return <ProductSection variant="related" carouselVariant={carouselVariant} />;
}
