import { createContext, useContext, useState, type ReactNode } from "react";
import type { CartItem } from "../domain/CartItem";
import type { ProductDetail } from "../../product/domain/Product";

interface CartContextValue {
  items: CartItem[];
  count: number;
  total: number;
  addItem: (product: ProductDetail, colorCode: number, storageCode: number) => void;
  removeItem: (productId: string, colorCode: number, storageCode: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export const useCart = (): CartContextValue => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside <CartProvider>");
  }
  return context;
};

const isSameItem = (item: CartItem, productId: string, colorCode: number, storageCode: number) => {
  return (
    item.product.id === productId &&
    item.colorCode === colorCode &&
    item.storageCode === storageCode
  );
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: ProductDetail, colorCode: number, storageCode: number) => {
    setItems((prev) => {
      const existing = prev.find((item) => isSameItem(item, product.id, colorCode, storageCode));

      if (existing) {
        return prev.map((item) =>
          isSameItem(item, product.id, colorCode, storageCode)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { product, colorCode, storageCode, quantity: 1 }];
    });
  };

  const removeItem = (productId: string, colorCode: number, storageCode: number) => {
    setItems((prev) => prev.filter((item) => !isSameItem(item, productId, colorCode, storageCode)));
  };

  const clearCart = () => setItems([]);

  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  const total = items.reduce(
    (sum, item) => sum + (Number(item.product.price) || 0) * item.quantity,
    0
  );

  return (
    <CartContext.Provider value={{ items, count, total, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};