'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { nanoid }   from 'nanoid';
import { useAuth }  from '@/lib/auth-context';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image?: string;
  qty: number;
  cartId: string;
};

export const discountTiers = [
  { min: 3, pct: 0.05 },
  { min: 5, pct: 0.10 },
  { min: 8, pct: 0.15 },
];
export function computeDiscount(qty: number) {
  return discountTiers
    .filter((t) => qty >= t.min)
    .map((t) => t.pct)
    .at(-1) ?? 0;
}

const freeGift: CartItem = {
  id: 'free-gift-button',
  name: 'Smart Scene-Button (gjöf)',
  price: 0,
  qty: 1,
  cartId: 'FREE',
  image: '/freebies/button.png',
};

type CartCtx = {
  items: CartItem[];
  addItem(p: Omit<CartItem, 'qty' | 'cartId'>, qty?: number): void;
  removeItem(cartId: string): void;
  updateQty(cartId: string, qty: number): void;
  clearCart(): void;
};
const CartContext = createContext<CartCtx>({} as CartCtx);
export const useCart = () => useContext(CartContext);

const STORAGE = (email?: string | null) => `heist-cart-${email ?? 'guest'}`;

export function CartProvider({ children }: { children: ReactNode }) {
  const { user }    = useAuth();
  const storageKey  = STORAGE(user?.email);
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return;
    const parsed: CartItem[] = JSON.parse(raw);
    setItems(parsed.map((r) => ({ ...r, cartId: r.cartId ?? nanoid() })));
  }, [storageKey]);

  useEffect(() => localStorage.setItem(storageKey, JSON.stringify(items)), [items, storageKey]);

  useEffect(() => {
    const total = items.reduce((s, r) => s + r.price * r.qty, 0);
    const hasGift = items.some((i) => i.id === freeGift.id);

    if (total >= 80_000 && !hasGift)          setItems((c) => [...c, freeGift]);
    if (total < 75_000 && hasGift)            setItems((c) => c.filter((i) => i.id !== freeGift.id));
  }, [items]);

  const addItem = (p: Omit<CartItem, 'qty' | 'cartId'>, qty = 1) =>
    setItems((cur) => {
      const row = cur.find((r) => r.id === p.id);
      return row
        ? cur.map((r) => (r.id === p.id ? { ...r, qty: r.qty + qty } : r))
        : [...cur, { ...p, qty, cartId: nanoid() }];
    });

  const removeItem = (cartId: string) => setItems((c) => c.filter((r) => r.cartId !== cartId));
  const updateQty  = (cartId: string, qty: number) =>
    setItems((c) => c.map((r) => (r.cartId === cartId ? { ...r, qty } : r)));
  const clearCart  = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
