import "./BrandsSection.scss";
import econverseLogo from "../assets/images/econverse.svg";
import { BrandBubble } from "../components/shared/BrandBubble";

const brands = Array.from({ length: 5 }, (_, index) => ({
  id: `brand-${index}`,
  logoSrc: econverseLogo,
  alt: "Econverse",
  label: "econverse",
}));

export function BrandsSection() {
  return (
    <section className="brands-section">
      <div className="container">
        <h2>Navegue por marcas</h2>

        <div className="brands-row" aria-label="Lista de marcas">
          {brands.map((brand) => (
            <BrandBubble
              key={brand.id}
              logoSrc={brand.logoSrc}
              alt={brand.alt}
              label={brand.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
