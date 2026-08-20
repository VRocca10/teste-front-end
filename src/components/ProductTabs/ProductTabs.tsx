const categories = ["CELULAR", "ACESSORIOS", "TABLETS", "NOTEBOOKS", "TVS", "VER TODOS"];

export function ProductTabs() {
  return (
    <nav className="products-tabs" aria-label="Categorias de produtos">
      {categories.map((category, index) => (
        <button key={category} type="button" className={index === 0 ? "is-active" : ""}>
          {category}
        </button>
      ))}
    </nav>
  );
}
