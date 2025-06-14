import {  NextRequest, NextResponse } from "next/server";

import type { CartItem } from "../../cart/cart-provider";

const CART_COOKIE = "cart";
const ONE_HOUR = 60 * 60; // seconds

/**
 * Reads the cart JSON stored in the signed cookie.
 * Returns an empty array if the cookie is missing or corrupt.
 */
function getCartFromCookie(req: NextRequest): CartItem[] {
  const raw = req.cookies.get(CART_COOKIE)?.value;
  if (!raw) return [];

  try {
    return JSON.parse(raw) as CartItem[];
  } catch {
    return [];
  }
}

export function GET(req: NextRequest) {
  const items = getCartFromCookie(req);
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const newItem = (await req.json()) as CartItem;
  const items = [...getCartFromCookie(req), newItem];

  const res = NextResponse.json(items);
  res.cookies.set(CART_COOKIE, JSON.stringify(items), {
    httpOnly: true,
    maxAge: ONE_HOUR,
    path: "/",
  });

  return res;
}

export async function DELETE(req: NextRequest) {
  const { id } = (await req.json()) as { id: string };

  const items = getCartFromCookie(req).filter((i) => i.id !== id);

  const res = NextResponse.json(items);
  res.cookies.set(CART_COOKIE, JSON.stringify(items), {
    httpOnly: true,
    maxAge: ONE_HOUR,
    path: "/",
  });

  return res;
}
