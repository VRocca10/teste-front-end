import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "../types/Product";

type CartItem = { product: Product; quantity: number };

type CartContextValue = {
  itemsCount: number;
  notification: string | null;
  addItem: (product: Product, quantity: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

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
    setNotification(`${quantity} ${quantity === 1 ? "item adicionado" : "itens adicionados"} ao carrinho`);
  }, []);

  useEffect(() => {
    if (!notification) return;

    const timeoutId = window.setTimeout(() => setNotification(null), 3000);
    return () => window.clearTimeout(timeoutId);
  }, [notification]);

  const value = useMemo(
    () => ({
      itemsCount: items.reduce((total, item) => total + item.quantity, 0),
      notification,
      addItem,
    }),
    [addItem, items, notification],
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
