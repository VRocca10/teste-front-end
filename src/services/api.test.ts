import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("getProducts", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("normaliza a resposta da API para o formato usado pela vitrine", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        products: [
          {
            id: "12",
            name: "Produto de teste",
            description: "Descrição do produto",
            image: "https://example.com/product.png",
            salePrice: "28,90",
            priceOld: "30,90",
          },
        ],
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const { getProducts } = await import("./api");
    const result = await getProducts();

    expect(result.isFallback).toBe(false);
    expect(result.products).toEqual([
      expect.objectContaining({
        productId: 12,
        productName: "Produto de teste",
        price: 28.9,
        oldPrice: 30.9,
      }),
    ]);
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it("retorna produtos de demonstração quando a API está indisponível", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Falha de rede")));
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => undefined);

    const { getProducts } = await import("./api");
    const result = await getProducts();

    expect(result.isFallback).toBe(true);
    expect(result.products).not.toHaveLength(0);
    warnSpy.mockRestore();
  });
});
