'use client';

import React from 'react';
import { useCart } from '../app';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

export default function CartPage() {
  const { items, removeItem } = useCart();
  const total = items.reduce((sum, i) => sum + (i.price || 0), 0);
  const stripe = useStripe();
  const elements = useElements();

  const handleCheckout = async () => {
    if (!stripe || !elements) return;
    // Mock checkout; integrate server‑side PaymentIntent later
    alert('Stripe checkout coming soon 🚀');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 md:flex md:gap-10">
      <div className="flex-1 space-y-4">
        {items.map((i) => (
          <div key={i.id} className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
            <span>{i.name}</span>
            <div className="flex items-center gap-4">
              <span className="font-medium">{i.price} kr.</span>
              <button onClick={() => removeItem(i.id)} className="text-red-500">✕</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p>Karfa er tóm 🤷‍♂️</p>}
      </div>
      <aside className="md:w-80 mt-10 md:mt-0">
        <div className="bg-white p-6 rounded-xl shadow space-y-4 sticky top-24">
          <input
            type="text"
            placeholder="Afsláttarkóði"
            className="w-full border rounded p-2"
          />
          <div className="flex justify-between font-medium">
            <span>Samtals</span>
            <span>{total} kr.</span>
          </div>
          <CardElement className="p-3 border rounded" />
          <button
            onClick={handleCheckout}
            disabled={!stripe}
            className="w-full bg-cyan-600 text-white py-3 rounded-lg font-medium shadow hover:bg-cyan-700"
          >
            Ganga frá pöntun
          </button>
        </div>
      </aside>
    </div>
  );
}