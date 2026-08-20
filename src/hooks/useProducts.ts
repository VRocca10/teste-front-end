import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import type { Product } from "../types/Product";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    let isMounted = true;

    getProducts()
      .then((result) => {
        if (!isMounted) return;
        setProducts(result.products);
        setIsFallback(result.isFallback);
      })
      .catch((error) => {
        console.error("Erro ao carregar produtos:", error);
        if (isMounted) setProducts([]);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { products, isLoading, isFallback };
}
