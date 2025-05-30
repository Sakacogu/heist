'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { useAuth } from '@/lib/auth-context';

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
  addItem:  (i: Omit<CartItem, 'qty' | 'cartId'>) => void;
  inc:      (id: string) => void;
  dec:      (id: string) => void;
  removeRow:(id: string) => void;
  totalCount: number; 
};

const CartContext = createContext<CartCtx>({
  items: [],
  addItem() {},
  inc() {},
  dec() {},
  removeRow() {},
  totalCount: 0,
});

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const { user } = useAuth();
  const email   = user?.email;

  const storageKey = email ? `heist-cart-${email}` : 'heist-cart-guest';

  useEffect(() => {
    fetch('/api/cart')
      .then((r) => r.json())
      .then((data: CartItem[]) => setItems(data))
      .catch(() => {
        const saved = localStorage.getItem(storageKey);
        if (saved) setItems(JSON.parse(saved));
      });
  }, []);

useEffect(() => {
  const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
  setItems(saved);
}, [storageKey]);

useEffect(() => {
  localStorage.setItem(storageKey, JSON.stringify(items));
}, [items, storageKey]);

  const addItem = (p: Omit<CartItem, 'qty' | 'cartId'>) => {
    setItems((prev) => {
      const idx = prev.findIndex((x) => x.id === p.id);
      if (idx > -1) {
        const copy = [...prev];
        copy[idx].qty += 1;
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

  const inc = (id: string) =>
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)),
    );

  const dec = (id: string) =>
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0),
    );

  const removeRow = (id: string) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const totalCount = items.reduce((n, i) => n + i.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, inc, dec, removeRow, totalCount }}
    >
      {children}
    </CartContext.Provider>
  );
}
