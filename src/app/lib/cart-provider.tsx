'use client';

import { createContext, useContext, useState } from 'react';

export type CartItem = { id: string; name: string; price: number };
export const CartContext = createContext<{ items: CartItem[]; addItem: (i: CartItem) => void; removeItem: (id: string) => void; }>({ items: [], addItem: () => {}, removeItem: () => {} });
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const addItem = (item: CartItem) => setItems((s) => [...s, item]);
  const removeItem = (id: string) => setItems((s) => s.filter((x) => x.id !== id));
  return <CartContext.Provider value={{ items, addItem, removeItem }}>{children}</CartContext.Provider>;
}