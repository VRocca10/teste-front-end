import { useCallback, useState } from "react";
import type { Product } from "../types/Product";

export function useProductModal() {
  const [selected, setSelected] = useState<Product | null>(null);

  const openProduct = useCallback((product: Product) => {
    setSelected(product);
  }, []);

  const closeProduct = useCallback(() => {
    setSelected(null);
  }, []);

  return {
    selected,
    openProduct,
    closeProduct,
  };
}
