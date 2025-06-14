import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { CartItem } from "../../cart/cart-provider";

const CART_COOKIE = "cart";
const ONE_HOUR = 60 * 60; // seconds

// Read the cart from the cookie
const readCart = async (): Promise<CartItem[]> => {
  const store = await cookies();               // async in ≥ 13.5, sync before that
  const raw = store.get(CART_COOKIE)?.value;
  if (!raw) return [];

  try {
    return JSON.parse(raw) as CartItem[];
  } catch {
    return [];
  }
};

// Persist the cart to the cookie
const writeCart = async (items: CartItem[]) => {
  const store = await cookies();
  store.set({
    name: CART_COOKIE,
    value: JSON.stringify(items),
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: ONE_HOUR,
  });
};

export async function GET() {
  return NextResponse.json(await readCart());
}

export async function POST(req: Request) {
  const newItem = (await req.json()) as CartItem;
  const next = [...(await readCart()), newItem];
  await writeCart(next);
  return NextResponse.json(next, { status: 201 });
}

export async function DELETE(req: Request) {
  const { id } = (await req.json()) as { id: string };
  const next = (await readCart()).filter((row) => row.id !== id);
  await writeCart(next);
  return NextResponse.json(next, { status: 200 });
}
