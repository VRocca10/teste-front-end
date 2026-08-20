import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useCarousel } from "./useCarousel";

describe("useCarousel", () => {
  beforeEach(() => {
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 1400 });
  });

  it("avança e retorna pelos itens sem ultrapassar os limites", () => {
    const { result } = renderHook(() => useCarousel([1, 2, 3, 4, 5]));

    expect(result.current.visibleItems).toEqual([1, 2, 3, 4]);
    expect(result.current.hasPrevious).toBe(false);
    expect(result.current.hasNext).toBe(true);

    act(() => result.current.handleNext());
    expect(result.current.visibleItems).toEqual([2, 3, 4, 5]);
    expect(result.current.hasNext).toBe(false);

    act(() => result.current.handlePrevious());
    expect(result.current.visibleItems).toEqual([1, 2, 3, 4]);
  });
});
