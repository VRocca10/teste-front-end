type FooterLink = {
  label: string;
  href: string;
};

type FooterLinksColumnProps = {
  title: string;
  links: FooterLink[];
};

export function FooterLinksColumn({ title, links }: FooterLinksColumnProps) {
  return (
    <div>
      <h3>{title}</h3>
      {links.map((link) => (
        <a key={`${title}-${link.label}`} href={link.href}>
          {link.label}
        </a>
      ))}
    </div>
  );
}
