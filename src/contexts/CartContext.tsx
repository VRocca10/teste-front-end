import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { Product } from "../types/Product";

type CartItem = { product: Product; quantity: number };

type CartContextValue = {
  itemsCount: number;
  addItem: (product: Product, quantity: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((product: Product, quantity: number) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.product.productId === product.productId);
      if (!existingItem) return [...currentItems, { product, quantity }];

      return currentItems.map((item) =>
        item.product.productId === product.productId
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      );
    });
  }, []);

  const value = useMemo(
    () => ({
      itemsCount: items.reduce((total, item) => total + item.quantity, 0),
      addItem,
    }),
    [addItem, items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// O hook acompanha o provider neste módulo para compartilhar o mesmo contexto.
// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart deve ser usado dentro de CartProvider.");
  return context;
}
