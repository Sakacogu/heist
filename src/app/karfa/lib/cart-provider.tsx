'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
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
  addItem(p: Omit<CartItem, 'qty' | 'cartId'>, qty?: number): void;
  removeItem(cartId: string): void;
  updateQty(cartId: string, qty: number): void;
  clearCart(): void;
};

const STORAGE = (email?: string | null) =>
  `heist-cart-${email ?? 'guest'}`;

const CartContext = createContext<CartCtx>({} as CartCtx);
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user }    = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);

  const key = STORAGE(user?.email);

  useEffect(() => {
    const raw = localStorage.getItem(key);
    if (!raw) return;

    const parsed: CartItem[] = JSON.parse(raw);

    const merged: Record<string, CartItem> = {};
    parsed.forEach((row) => {
      const safeRow: CartItem = {
        ...row,
        cartId: row.cartId ?? nanoid(),
        qty: row.qty ?? 1,
      };
      const k = safeRow.cartId;
      if (!merged[k]) merged[k] = safeRow;
      else merged[k].qty += safeRow.qty;
    });

    setItems(Object.values(merged));
  }, [key]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(items));
  }, [items, key]);

  const addItem = (
    p: Omit<CartItem, 'qty' | 'cartId'>,
    qty = 1,
  ) =>
    setItems((cur) => {
      const row = cur.find((r) => r.id === p.id);
      if (row) {
        return cur.map((r) =>
          r.id === p.id ? { ...r, qty: r.qty + qty } : r,
        );
      }
      return [...cur, { ...p, qty, cartId: nanoid() }];
    });

  const removeItem = (cartId: string) =>
    setItems((cur) => cur.filter((r) => r.cartId !== cartId));

  const updateQty = (cartId: string, qty: number) =>
    setItems((cur) =>
      cur.map((r) => (r.cartId === cartId ? { ...r, qty } : r)),
    );

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
