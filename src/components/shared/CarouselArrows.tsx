type CarouselArrowsProps = {
  onPrevious?: () => void;
  onNext?: () => void;
  disablePrevious?: boolean;
  disableNext?: boolean;
  previousLabel?: string;
  nextLabel?: string;
};

export function CarouselArrows({
  onPrevious,
  onNext,
  disablePrevious = false,
  disableNext = false,
  previousLabel = "Anterior",
  nextLabel = "Proximo",
}: CarouselArrowsProps) {
  return (
    <>
      <button
        type="button"
        className="arrow arrow-left"
        aria-label={previousLabel}
        onClick={onPrevious}
        disabled={disablePrevious}
      >
        {"<"}
      </button>
      <button
        type="button"
        className="arrow arrow-right"
        aria-label={nextLabel}
        onClick={onNext}
        disabled={disableNext}
      >
        {">"}
      </button>
    </>
  );
}
