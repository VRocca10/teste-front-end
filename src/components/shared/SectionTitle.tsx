type SectionTitleProps = {
  title: string;
  className: string;
  rowClassName?: string;
  showViewAll?: boolean;
  viewAllLabel?: string;
  onViewAllClick?: () => void;
};

export function SectionTitle({
  title,
  className,
  rowClassName,
  showViewAll = false,
  viewAllLabel = "Ver todos",
  onViewAllClick,
}: SectionTitleProps) {
  const titleContent = (
    <>
      <span className="line" aria-hidden="true" />
      <h2>{title}</h2>
      <span className="line" aria-hidden="true" />
    </>
  );

  return (
    <header className={className}>
      {rowClassName ? <div className={rowClassName}>{titleContent}</div> : titleContent}
      {showViewAll && (
        <button type="button" onClick={onViewAllClick}>
          {viewAllLabel}
        </button>
      )}
    </header>
  );
}
