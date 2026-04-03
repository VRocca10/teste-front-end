import { useState } from "react";
import type { Product } from "../types/Product";

export function useProductModal() {
  const [selected, setSelected] = useState<Product | null>(null);

  const openProduct = (product: Product) => {
    setSelected(product);
  };

  const closeProduct = () => {
    setSelected(null);
  };

  return {
    selected,
    openProduct,
    closeProduct,
  };
}
