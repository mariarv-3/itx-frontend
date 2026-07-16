import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { CartItem } from "../domain/CartItem";
import type { ProductDetail } from "../../product/domain/Product";

interface CartContextValue {
  items: CartItem[];
  count: number;
  total: number;
  addItem: (product: ProductDetail, colorId: number, storage: string) => void;
  removeItem: (productId: string, colorId: number, storage: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside <CartProvider>");
  }
  return ctx;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: ProductDetail, colorId: number, storage: string) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) =>
          item.product.id === product.id &&
          item.colorId === colorId &&
          item.storage === storage
      );

      if (existing) {
        return prev.map((item) =>
          item === existing
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { product, colorId, storage, quantity: 1 }];
    });
  };

  const removeItem = (productId: string, colorId: number, storage: string) => {
    setItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.colorId === colorId &&
            item.storage === storage
          )
      )
    );
  };

  const clearCart = () => setItems([]);

  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce(
    (sum, item) => sum + (item.product.price ?? 0) * item.quantity,
    0
  );

  return (
    <CartContext.Provider value={{ items, count, total, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
