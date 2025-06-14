"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { nanoid } from "nanoid";

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

export const computeDiscount = (qty: number) =>
  discountTiers
    .filter((t) => qty >= t.min)
    .map((t) => t.pct)
    .at(-1) ?? 0;

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
  addItem(item: Omit<CartItem, "qty" | "cartId">, qty?: number): void;
  removeItem(cartId: string): void;
  updateQty(cartId: string, qty: number): void;
  clearCart(): void;
};

const CartContext = createContext<CartCtx>({} as CartCtx);
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);

  /* --- helpers that speak to the server --- */

  const sync = async (next: CartItem[]) => {

    await Promise.all(
      items.map((i) => fetch("/api/cart", { method: "DELETE", body: JSON.stringify({ id: i.id }) })),
    );
    await Promise.all(
      next.map((i) => fetch("/api/cart", { method: "POST", body: JSON.stringify(i) })),
    );
    setItems(next);
  };

  const fetchInitial = useCallback(async () => {
    const res = await fetch("/api/cart");
    if (!res.ok) return;
    const data = (await res.json()) as CartItem[];
    // Ensure every row has a cartId
    setItems(
      data.map((row) => ({ ...row, cartId: row.cartId ?? nanoid() })),
    );
  }, []);

  useEffect(() => {
    fetchInitial();
  }, [fetchInitial]);

  /** Inject / remove the free gift purely on the client */
  useEffect(() => {
    const total = items.reduce((s, r) => s + r.price * r.qty, 0);
    const hasGift = items.some((i) => i.id === freeGift.id);

    if (total >= 80_000 && !hasGift) setItems((c) => [...c, freeGift]);
    if (total < 75_000 && hasGift) setItems((c) => c.filter((i) => i.id !== freeGift.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const addItem = async (
    product: Omit<CartItem, "qty" | "cartId">,
    qty = 1,
  ) => {
    const existing = items.find((r) => r.id === product.id);
    const next = existing
      ? items.map((r) =>
          r.id === product.id ? { ...r, qty: r.qty + qty } : r,
        )
      : [...items, { ...product, qty, cartId: nanoid() }];

    await sync(next);
  };

  const removeItem = async (cartId: string) => {
    const next = items.filter((r) => r.cartId !== cartId);
    await sync(next);
  };

  const updateQty = async (cartId: string, qty: number) => {
    const next = items.map((r) =>
      r.cartId === cartId ? { ...r, qty } : r,
    );
    await sync(next);
  };

  const clearCart = async () => {
    await sync([]);
  };

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
