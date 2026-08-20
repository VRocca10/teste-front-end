import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CartProvider, useCart } from "../../contexts/CartContext";
import type { Product } from "../../types/Product";
import { ProductModal } from "./ProductModal";

const product: Product = {
  productId: 1,
  productName: "iPhone 13 Mini",
  descriptionShort: "Descrição do produto",
  photo: "https://example.com/iphone.png",
  price: 28.9,
};

describe("ProductModal", () => {
  const renderModal = (onClose = vi.fn()) =>
    render(
      <CartProvider>
        <ProductModal product={product} onClose={onClose} />
      </CartProvider>,
    );

  it("altera a quantidade e fecha com a tecla Escape", () => {
    const onClose = vi.fn();
    renderModal(onClose);

    fireEvent.click(screen.getByRole("button", { name: "Aumentar quantidade" }));
    expect(screen.getByText("02")).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("fecha ao clicar fora do diálogo", () => {
    const onClose = vi.fn();
    const { container } = renderModal(onClose);

    fireEvent.click(container.querySelector(".product-modal-overlay")!);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("adiciona a quantidade selecionada ao carrinho", () => {
    const CartCount = () => <span>{useCart().itemsCount}</span>;
    const onClose = vi.fn();
    render(
      <CartProvider>
        <ProductModal product={product} onClose={onClose} />
        <CartCount />
      </CartProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Aumentar quantidade" }));
    fireEvent.click(screen.getByRole("button", { name: "COMPRAR" }));

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(onClose).toHaveBeenCalledOnce();
  });
});
