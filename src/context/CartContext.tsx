"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedMetal: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, size: string, metal: string) => void;
  removeItem: (productId: string, size: string, metal: string) => void;
  updateQuantity: (productId: string, size: string, metal: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);

  const addItem = useCallback((product: Product, size: string, metal: string) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.selectedSize === size && item.selectedMetal === metal
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedSize === size && item.selectedMetal === metal
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, selectedSize: size, selectedMetal: metal }];
    });
    setCartOpen(true);
  }, []);

  const removeItem = useCallback((productId: string, size: string, metal: string) => {
    setItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedSize === size && item.selectedMetal === metal)
      )
    );
  }, []);

  const updateQuantity = useCallback((productId: string, size: string, metal: string, qty: number) => {
    if (qty <= 0) {
      setItems((prev) =>
        prev.filter(
          (item) => !(item.product.id === productId && item.selectedSize === size && item.selectedMetal === metal)
        )
      );
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedSize === size && item.selectedMetal === metal
          ? { ...item, quantity: qty }
          : item
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        setCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
