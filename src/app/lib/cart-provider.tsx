'use client'

import { createContext, useContext, useState, useEffect } from 'react'

export type CartItem = {
  id: string
  name: string
  price: number
  image?: string
}

type CartContextType = {
  items: CartItem[]
  addItem: (i: CartItem) => void
  removeItem: (id: string) => void
}

const CartContext = createContext<CartContextType>({
  items: [],
  addItem() {},
  removeItem() {},
})

export const useCart = () => useContext(CartContext)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    fetch('/api/cart')
      .then((res) => res.json())
      .then((data: CartItem[]) => setItems(data))
      .catch(() => {})
  }, [])

  const addItem = (item: CartItem) => {
    fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    })
      .then((res) => res.json())
      .then((data: CartItem[]) => setItems(data))
      .catch(() => {})
  }

  const removeItem = (id: string) => {
    fetch('/api/cart', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data: CartItem[]) => setItems(data))
      .catch(() => {})
  }

  return (
    <CartContext.Provider value={{ items, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  )
}
