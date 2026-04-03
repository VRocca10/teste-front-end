import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import type { Product } from "../types/Product";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts).catch((error) => {
      console.error("Erro ao carregar produtos:", error);
      setProducts([]);
    });
  }, []);

  return products;
}
