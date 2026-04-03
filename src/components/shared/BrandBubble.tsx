type BrandBubbleProps = {
  logoSrc: string;
  alt: string;
  label?: string;
};

export function BrandBubble({ logoSrc, alt, label = "Marca" }: BrandBubbleProps) {
  return (
    <article className="brand-bubble" aria-label={label}>
      <img src={logoSrc} alt={alt} className="brand-logo" />
    </article>
  );
}
