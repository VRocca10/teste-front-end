import econverseLogo from "../../assets/images/econverse.svg";
import { FiInstagram, FiFacebook, FiLinkedin } from "react-icons/fi";
import { FooterLinksColumn } from "../shared/FooterLinksColumn";
import { SocialIcon } from "../shared/SocialIcon";
import "./Footer.scss";

const socialItems = [
  {
    label: "Instagram",
    icon: <FiInstagram size={24} />,
  },
  {
    label: "Facebook",
    icon: <FiFacebook size={24} />,
  },
  {
    label: "LinkedIn",
    icon: <FiLinkedin size={24} />,
  },
];

const footerColumns = [
  {
    title: "Institucional",
    links: [
      { label: "Sobre Nós", href: "#" },
      { label: "Movimento", href: "#" },
      { label: "Trabalhe conosco", href: "#" },
    ],
  },
  {
    title: "Ajuda",
    links: [
      { label: "Suporte", href: "#" },
      { label: "Fale Conosco", href: "#" },
      { label: "Perguntas Frequentes", href: "#" },
    ],
  },
  {
    title: "Termos",
    links: [
      { label: "Termos e Condições", href: "#" },
      { label: "Política de Privacidade", href: "#" },
      { label: "Troca e Devolução", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="footer">
      <section className="newsletter">
        <div className="container newsletter-content">
          <div className="newsletter-text">
            <h2>Inscreva-se na nossa newsletter</h2>
            <p>Assine a nossa newsletter e receba as novidades e conteúdos exclusivos da Econverse.</p>
          </div>

          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <div className="inputs">
              <input type="text" placeholder="Digite seu nome" aria-label="Digite seu nome" />
              <input type="email" placeholder="Digite seu e-mail" aria-label="Digite seu e-mail" />
              <button type="submit">INSCREVER</button>
            </div>
            <label className="terms">
              <input type="checkbox" /> Aceito os termos e condições
            </label>
          </form>
        </div>
      </section>

      <section className="footer-main">
        <div className="container footer-main-content">
          <div className="brand-block">
            <div className="logo" aria-label="econverse">
              <img className="logo-image" src={econverseLogo} alt="Econverse" />
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <div className="socials" aria-label="Redes sociais">
              {socialItems.map((item) => (
                <SocialIcon key={item.label} label={item.label}>
                  {item.icon}
                </SocialIcon>
              ))}
            </div>
          </div>

          <div className="links-columns">
            {footerColumns.map((column) => (
              <FooterLinksColumn key={column.title} title={column.title} links={column.links} />
            ))}
          </div>
        </div>
      </section>

      <section className="footer-bottom">
        <div className="container">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </section>
    </footer>
  );
}

