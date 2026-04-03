import "./CategoryStrip.scss";
import tecnologiaIcon from "../../assets/images/tecnologia.svg";
import supermercadoIcon from "../../assets/images/supermercado.svg";
import bebidasIcon from "../../assets/images/bebidas.svg";
import ferramentasIcon from "../../assets/images/ferramentas.svg";
import saudeIcon from "../../assets/images/saude.svg";
import esportesIcon from "../../assets/images/esportes.svg";
import modaIcon from "../../assets/images/moda.svg";

type Category = {
  name: string;
  icon: string;
  active?: boolean;
};

const categories: Category[] = [
  { name: "Tecnologia", icon: tecnologiaIcon, active: true },
  { name: "Supermercado", icon: supermercadoIcon },
  { name: "Bebidas", icon: bebidasIcon },
  { name: "Ferramentas", icon: ferramentasIcon },
  { name: "Saúde", icon: saudeIcon },
  { name: "Esportes e Fitness", icon: esportesIcon },
  { name: "Moda", icon: modaIcon },
];

export function CategoryStrip() {
  return (
    <section className="category-strip">
      <div className="container category-strip-row" role="list" aria-label="Categorias">
        {categories.map((category) => (
          <button
            key={category.name}
            type="button"
            className={`category-chip${category.active ? " is-active" : ""}`}
            role="listitem"
          >
            <span className="icon-box" aria-hidden="true">
              <img src={category.icon} alt="" />
            </span>
            <span className="label">{category.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
