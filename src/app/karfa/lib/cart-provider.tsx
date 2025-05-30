'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
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
  addItem: (p: Omit<CartItem, 'qty' | 'cartId'>, qty?: number) => void;
  removeItem: (cartId: string) => void;
  updateQty: (cartId: string, qty: number) => void;
};

const CartContext = createContext<CartCtx>({} as CartCtx);
export const useCart = () => useContext(CartContext);

const STORAGE_KEY = 'heist-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    const parsed: CartItem[] = JSON.parse(raw);

    const merged: Record<string, CartItem> = {};
    parsed.forEach((row) => {
      const safeRow: CartItem = {
        ...row,
        cartId: row.cartId ?? nanoid(),
        qty: row.qty ?? 1,
      };

      const key = safeRow.cartId;
      if (!merged[key]) merged[key] = safeRow;
      else merged[key].qty += safeRow.qty;
    });

    setItems(Object.values(merged));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (
    p: Omit<CartItem, 'qty' | 'cartId'>,
    qty: number = 1,
  ) => {
    setItems((cur) => {
      const existing = cur.find((r) => r.id === p.id);
      if (existing) {
        return cur.map((r) =>
          r.id === p.id ? { ...r, qty: r.qty + qty } : r,
        );
      }
      return [...cur, { ...p, qty, cartId: nanoid() }];
    });
  };

  const removeItem = (cartId: string) =>
    setItems((cur) => cur.filter((r) => r.cartId !== cartId));

  const updateQty = (cartId: string, qty: number) =>
    setItems((cur) =>
      cur.map((r) => (r.cartId === cartId ? { ...r, qty } : r)),
    );

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty }}>
      {children}
    </CartContext.Provider>
  );
}
