import { useEffect, useState } from "react";

type UseCarouselResult<T> = {
  itemsPerPage: number;
  visibleItems: T[];
  hasPrevious: boolean;
  hasNext: boolean;
  isAnimating: boolean;
  safeStartIndex: number;
  handlePrevious: () => void;
  handleNext: () => void;
};

function getItemsPerPage(width: number): number {
  if (width <= 768) return 1;
  if (width <= 1200) return 2;
  return 4;
}

type UseCarouselOptions = {
  loop?: boolean;
};

export function useCarousel<T>(items: T[], options: UseCarouselOptions = {}): UseCarouselResult<T> {
  const { loop = false } = options;
  const [itemsPerPage, setItemsPerPage] = useState<number>(getItemsPerPage(window.innerWidth));
  const [startIndex, setStartIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const onResize = () => setItemsPerPage(getItemsPerPage(window.innerWidth));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const maxStart = Math.max(0, items.length - itemsPerPage);
  const safeStartIndex = Math.min(startIndex, maxStart);
  const visibleItems = items.slice(safeStartIndex, safeStartIndex + itemsPerPage);
  const hasPrevious = safeStartIndex > 0;
  const hasNext = safeStartIndex + itemsPerPage < items.length;

  const handlePrevious = () => {
    if (!hasPrevious && !loop) return;
    setIsAnimating(true);
    if (!hasPrevious && loop) {
      setStartIndex(maxStart);
      return;
    }
    setStartIndex(Math.max(0, safeStartIndex - itemsPerPage));
  };

  const handleNext = () => {
    if (!hasNext && !loop) return;
    setIsAnimating(true);
    if (!hasNext && loop) {
      setStartIndex(0);
      return;
    }
    setStartIndex(Math.min(safeStartIndex + itemsPerPage, maxStart));
  };

  useEffect(() => {
    if (!isAnimating) return;

    const timeoutId = window.setTimeout(() => {
      setIsAnimating(false);
    }, 260);

    return () => window.clearTimeout(timeoutId);
  }, [isAnimating, safeStartIndex]);

  return {
    itemsPerPage,
    visibleItems,
    hasPrevious,
    hasNext,
    isAnimating,
    safeStartIndex,
    handlePrevious,
    handleNext,
  };
}
