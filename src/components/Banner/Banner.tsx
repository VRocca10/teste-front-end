import "./Banner.scss";

export function Banner() {
  return (
    <section className="banner">
      <div className="container banner-content">
        <h1>
          Venha conhecer nossas
          <br />
          promoções
        </h1>
        <p>
          <strong>50% Off</strong> nos produtos
        </p>
        <button>Ver produto</button>
      </div>
    </section>
  );
}
