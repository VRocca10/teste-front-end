import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ProductCard } from "./ProductCard";
import type { Product } from "../../types/Product";

const product: Product = {
  productId: 1,
  productName: "iPhone 13 Mini",
  descriptionShort: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  photo: "https://example.com/iphone.png",
  price: 28.9,
  oldPrice: 30.9,
  installmentText: "ou 2x de R$ 14,95 sem juros",
  shippingText: "Frete grátis",
};

describe("ProductCard", () => {
  it("exibe os dados comerciais e abre o produto ao clicar", () => {
    const onClick = vi.fn();
    render(<ProductCard product={product} onClick={onClick} />);

    expect(screen.getByText("R$ 30,90")).toHaveClass("old-price");
    expect(screen.getByText("R$ 28,90")).toBeInTheDocument();
    expect(screen.getByText(product.installmentText!)).toBeInTheDocument();
    expect(screen.getByText("Frete grátis")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /abrir detalhes/i }));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
