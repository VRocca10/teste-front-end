import bannerApoio from "../assets/images/banner_apoio.svg";
import "./PartnersSection.scss";

const partnerCards = [
  {
    title: "Parceiros",
    description: "Lorem ipsum dolor sit amet, consectetur",
    image: bannerApoio,
  },
  {
    title: "Parceiros",
    description: "Lorem ipsum dolor sit amet, consectetur",
    image: bannerApoio,
  },
];

export function PartnersSection() {
  return (
    <section className="partners-section">
      <div className="container partners-grid">
        {partnerCards.map((card, index) => (
          <article
            key={`${card.title}-${index}`}
            className="partner-card"
            style={{ backgroundImage: `url(${card.image})` }}
          >
            <div className="partner-overlay">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <button type="button">CONFIRA</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
