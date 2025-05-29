'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image?: string;
  qty: number;
  cartId: string;
};

type CartCtx = {
  items: CartItem[];
  addItem:    (i: Omit<CartItem, 'qty' | 'cartId'>) => void;
  removeItem: (id: string) => void;
};

const CartContext = createContext<CartCtx>({
  items: [],
  addItem() {},
  removeItem() {},
});

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    fetch('/api/cart')
      .then((r) => r.json())
      .then((data: CartItem[]) => setItems(data))
      .catch(() => {
        const saved = localStorage.getItem('heist-cart');
        if (saved) setItems(JSON.parse(saved));
      });
  }, []);

  useEffect(() => localStorage.setItem('heist-cart', JSON.stringify(items)), [items]);

  const addItem = (p: Omit<CartItem, 'qty' | 'cartId'>) => {
    setItems((prev) => {
      const idx = prev.findIndex((x) => x.id === p.id);
      if (idx > -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      return [...prev, { ...p, qty: 1, cartId: nanoid() }];
    });

    fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: p.id, delta: +1 }),
    }).catch(() => {});
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const idx = prev.findIndex((x) => x.id === id);
      if (idx === -1) return prev;
      const copy = [...prev];
      if (copy[idx].qty > 1) copy[idx].qty -= 1;
      else copy.splice(idx, 1);
      return copy;
    });

    fetch('/api/cart', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    }).catch(() => {});
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}
