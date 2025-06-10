import { NextRequest, NextResponse } from 'next/server'
import type { CartItem } from '../../karfa/lib/Cart-Provider'

const COOKIE_NAME = 'cart'

function readCart(req: NextRequest): CartItem[] {
  const cookie = req.cookies.get(COOKIE_NAME)
  if (!cookie) return []
  try { return JSON.parse(cookie.value) } catch { return [] }
}

export function GET(req: NextRequest) {
  const items = readCart(req)
  return NextResponse.json(items)
}

export async function POST(req: NextRequest) {
  const newItem = (await req.json()) as CartItem
  const items = readCart(req)
  items.push(newItem)
  const res = NextResponse.json(items)
  res.cookies.set({
    name: COOKIE_NAME,
    value: JSON.stringify(items),
    httpOnly: true,
    maxAge: 60 * 60,
    path: '/'
  })
  return res
}

export async function DELETE(req: NextRequest) {
  const { id } = (await req.json()) as { id: string }
  const items = readCart(req).filter((i) => i.id !== id)
  const res = NextResponse.json(items)
  res.cookies.set({
    name: COOKIE_NAME,
    value: JSON.stringify(items),
    httpOnly: true,
    maxAge: 60 * 60,
    path: '/'
  })
  return res
}
