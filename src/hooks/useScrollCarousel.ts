import { useCallback, useEffect, useRef, useState } from "react";

type UseScrollCarouselOptions = {
  isActive: boolean;
  loop: boolean;
  itemsCount: number;
};

export function useScrollCarousel({ isActive, loop, itemsCount }: UseScrollCarouselOptions) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [scrollState, setScrollState] = useState({ canPrevious: false, canNext: false });

  const getScrollStep = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return 320;

    const firstCard = viewport.querySelector<HTMLElement>(".product-card");
    const grid = viewport.querySelector<HTMLElement>(".grid");
    const cardWidth = firstCard?.offsetWidth ?? 304;
    const gap = Number.parseFloat(grid ? window.getComputedStyle(grid).gap : "18") || 18;

    return cardWidth + gap;
  }, []);

  const updateScrollState = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    setScrollState({
      canPrevious: viewport.scrollLeft > 1,
      canNext: viewport.scrollLeft < maxScrollLeft - 1,
    });
  }, []);

  const handlePrevious = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    if (viewport.scrollLeft <= 1) {
      if (loop) viewport.scrollTo({ left: maxScrollLeft, behavior: "smooth" });
      return;
    }

    viewport.scrollTo({ left: Math.max(0, viewport.scrollLeft - getScrollStep()), behavior: "smooth" });
  }, [getScrollStep, loop]);

  const handleNext = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    const atEnd = viewport.scrollLeft >= maxScrollLeft - 1;
    if (atEnd) {
      if (loop) viewport.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    viewport.scrollTo({ left: Math.min(maxScrollLeft, viewport.scrollLeft + getScrollStep()), behavior: "smooth" });
  }, [getScrollStep, loop]);

  useEffect(() => {
    if (!isActive) return;

    const viewport = viewportRef.current;
    if (!viewport) return;

    const onScroll = () => updateScrollState();
    const onResize = () => updateScrollState();
    updateScrollState();
    viewport.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    const rafId = window.requestAnimationFrame(updateScrollState);

    return () => {
      viewport.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.cancelAnimationFrame(rafId);
    };
  }, [isActive, itemsCount, updateScrollState]);

  useEffect(() => {
    if (!isActive || !loop || itemsCount <= 1) return;

    const intervalId = window.setInterval(handleNext, 3200);
    return () => window.clearInterval(intervalId);
  }, [handleNext, isActive, itemsCount, loop]);

  return { viewportRef, scrollState, handlePrevious, handleNext };
}
