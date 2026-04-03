import { Header } from "../../components/Header/Header";
import { Banner } from "../../components/Banner/Banner";
import { CategoryStrip } from "../../components/CategoryStrip/CategoryStrip";
import { ProductSection } from "../../sections/ProductSection";
import { PartnersSection } from "../../sections/PartnersSection";
import { RelatedProductsSection } from "../../sections/RelatedProductsSection";
import { BrandsSection } from "../../sections/BrandsSection";
import { Footer } from "../../components/Footer/Footer";
import "./Home.scss";

export function Home() {
  return (
    <>
      <Header />
      <main className="home-sections">
        <Banner />
        <div className="home-categories">
          <CategoryStrip />
        </div>
        <ProductSection carouselVariant="paged" />
        <PartnersSection />
        <RelatedProductsSection carouselVariant="autoplay" />
        <PartnersSection />
        <BrandsSection />
        <RelatedProductsSection carouselVariant="scrollAuto" />
      </main>
      <Footer />
    </>
  );
}
