'use client';

import React, { createContext, useContext, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import PackagesPage from './pages/PackagesPage';
import CartPage from './pages/CartPage';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export default function App() {
  const [items, setItems] = useState([]);
  const addItem = (item) => setItems((s) => [...s, item]);
  const removeItem = (id) => setItems((s) => s.filter((x) => x.id !== id));
  return (
    <CartContext.Provider value={{ items, addItem, removeItem }}>
      <Elements stripe={stripePromise}>
        <div className="min-h-screen flex flex-col bg-white text-gray-900">
          <NavBar />
          <main className="flex-1 mt-16">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/pakkar" element={<PackagesPage />} />
              <Route path="/karfa" element={<CartPage />} />
            </Routes>
          </main>
        </div>
      </Elements>
    </CartContext.Provider>
  );
}