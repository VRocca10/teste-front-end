import econverseLogo from "../../assets/images/econverse.svg";
import { useCart } from "../../contexts/CartContext";
import "./Header.scss";
import "./HeaderCart.scss";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Search,
  Package,
  Heart,
  CircleUserRound,
  ShoppingCart,
  Crown,
} from "lucide-react";

export function Header() {
  const { itemsCount } = useCart();

  return (
    <header className="header">
      <div className="topbar">
        <div className="container topbar-content">
          <span>
            <ShieldCheck size={20} strokeWidth={2} /> Compra <strong>100% segura</strong>
          </span>
          <span>
            <Truck size={20} strokeWidth={2} /> <strong>Frete grátis</strong> acima de R$ 200
          </span>
          <span>
            <CreditCard size={20} strokeWidth={2} /> <strong>Parcele</strong> suas compras
          </span>
        </div>
      </div>

      <div className="header-main container">
        <div className="logo" aria-label="econverse">
          <img className="logo-image" src={econverseLogo} alt="Econverse" />
        </div>

        <div className="search">
          <input placeholder="O que você está buscando?" />
          <Search className="search-icon" size={28} strokeWidth={2} />
        </div>

        <div className="icons">
          <button type="button" aria-label="Pedidos">
            <Package size={32} strokeWidth={2} />
          </button>
          <button type="button" aria-label="Favoritos">
            <Heart size={32} strokeWidth={2} />
          </button>
          <button type="button" aria-label="Perfil">
            <CircleUserRound size={32} strokeWidth={2} />
          </button>
          <button
            type="button"
            className="cart-button"
            aria-label={`Carrinho com ${itemsCount} ${itemsCount === 1 ? "item" : "itens"}`}
          >
            <ShoppingCart size={32} strokeWidth={2} />
            {itemsCount > 0 && <span className="cart-count">{itemsCount}</span>}
          </button>
        </div>
      </div>

      <nav className="menu">
        <ul className="container">
          <li>TODAS CATEGORIAS</li>
          <li>SUPERMERCADO</li>
          <li>LIVROS</li>
          <li>MODA</li>
          <li>LANÇAMENTOS</li>
          <li className="active">OFERTAS DO DIA</li>
          <li className="menu-subscription">
            <Crown size={20} strokeWidth={2} />
            ASSINATURA
          </li>
        </ul>
      </nav>
    </header>
  );
}
