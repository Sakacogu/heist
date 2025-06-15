"use client";

import { nanoid } from "nanoid";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { useAuth } from "@/lib/AuthContext";

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
  { min: 5, pct: 0.1 },
  { min: 8, pct: 0.15 },
];

export function computeDiscount(quantity: number): number {
  return (
    discountTiers
      .filter((t) => quantity >= t.min)
      .map((t) => t.pct)
      .at(-1) ?? 0
  );
}

/** Free gift logic is **client only** – it is not written back to the server, this is temporary/in testing */
const freeGift: CartItem = {
  id: "free-gift-button",
  name: "Smart Scene-Button (gjöf)",
  price: 0,
  qty: 1,
  cartId: "FREE",
  image: "/freebies/button.png",
};

type CartCtx = {
  items: CartItem[];
  addItem(p: Omit<CartItem, "qty" | "cartId">, qty?: number): void;
  addItems(batch: Array<Omit<CartItem, "cartId">>): void;
  removeItem(cartId: string): void;
  updateQty(cartId: string, qty: number): void;
  clearCart(): void;
};

const CartContext = createContext<CartCtx>({} as CartCtx);
export const useCart = () => useContext(CartContext);

const storageKey = (email?: string | null) => `heist-cart-${email ?? "guest"}`;

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const key = storageKey(user?.email);

  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(key);
    if (!raw) return;
    const parsed: CartItem[] = JSON.parse(raw);
    setItems(parsed.map((r) => ({ ...r, cartId: r.cartId ?? nanoid() })));
  }, [key]);

  useEffect(
    () => localStorage.setItem(key, JSON.stringify(items)),
    [items, key],
  );

  useEffect(() => {
    const total = items.reduce((s, r) => s + r.price * r.qty, 0);
    const hasGift = items.some((i) => i.id === freeGift.id);

    if (total >= 80_000 && !hasGift) {
      setItems((c) => [...c, freeGift]);
    }
    if (total < 75_000 && hasGift) {
      setItems((c) => c.filter((i) => i.id !== freeGift.id));
    }
  }, [items]);

  /** add / bump a single item */
  const addItem = (p: Omit<CartItem, "qty" | "cartId">, qty = 1) =>
    setItems((cur) => {
      const existing = cur.find((r) => r.id === p.id);
      return existing
        ? cur.map((r) => (r.id === p.id ? { ...r, qty: r.qty + qty } : r))
        : [...cur, { ...p, qty, cartId: nanoid() }];
    });

  /** merge a batch of items in one state update (used in cancelOrder) */
  const addItems = (batch: Array<Omit<CartItem, "cartId">>) =>
    setItems((cur) => {
      const map = new Map<string, CartItem>();

      cur.forEach((it) => map.set(it.id, it));

      batch.forEach((it) => {
        const existing = map.get(it.id);
        map.set(
          it.id,
          existing
            ? { ...existing, qty: existing.qty + it.qty }
            : { ...it, cartId: nanoid() },
        );
      });

      return Array.from(map.values());
    });

  const removeItem = (cartId: string) =>
    setItems((c) => c.filter((r) => r.cartId !== cartId));

  const updateQty = (cartId: string, qty: number) =>
    setItems((c) => c.map((r) => (r.cartId === cartId ? { ...r, qty } : r)));

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider
      value={{ items, addItem, addItems, removeItem, updateQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
