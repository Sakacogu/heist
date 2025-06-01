'use client';

import { useState } from 'react';
import { nanoid } from 'nanoid';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useCart } from './lib/cart-provider';
import { useAuth } from '@/lib/auth-context';
import Modal from '@/components/modal';

export default function CartPage() {
  const { items, removeItem, updateQty, clearCart } = useCart();
  const { user } = useAuth();

  const stripe   = useStripe();
  const elements = useElements();
  const total    = items.reduce((s, r) => s + r.price * r.qty, 0);

  const [modalMsg, setModalMsg] = useState<string | null>(null);

  const handleCheckout = () => {
    if (!stripe || !elements) return;

    if (!user) {
      setModalMsg('Vinsamlegast skráðu þig inn áður en þú klárar pöntun 🙂');
      return;
    }

    const order = {
      id:    nanoid(),
      total,
      date:  new Date().toISOString(),
      items,
      status: 'pending',
    };
    const key     = `heist-orders-${user.email}`;
    const history = JSON.parse(localStorage.getItem(key) || '[]');
    localStorage.setItem(key, JSON.stringify([order, ...history]));

    clearCart();
    setModalMsg(
      'Stripe greiðslusíða er væntanleg 😊\nPöntunin þín var vistuð á prófílnum.',
    );
  };

  return (
    <div className="max-w-6xl mx-auto md:flex md:gap-10 p-16">
      <Modal open={!!modalMsg} onClose={() => setModalMsg(null)}>
        <p className="whitespace-pre-line text-center">{modalMsg}</p>
      </Modal>

      <div className="flex-1 space-y-4">
        {items.map((i) => (
          <div
            key={i.cartId}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
          >
            {i.image && (
              <img
                src={i.image}
                alt={i.name}
                className="w-16 h-16 object-cover rounded"
              />
            )}

            <span className="flex-1 px-4">{i.name}</span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQty(i.cartId, Math.max(1, i.qty - 1))}
                className="px-3 py-1 bg-gray-100 rounded"
              >
                −
              </button>
              <span className="min-w-[2ch] text-center">{i.qty}</span>
              <button
                onClick={() => updateQty(i.cartId, i.qty + 1)}
                className="px-3 py-1 bg-gray-100 rounded"
              >
                +
              </button>
            </div>

            <span className="w-24 text-right font-medium">
              {(i.price * i.qty).toLocaleString('is-IS')} kr.
            </span>

            <button
              onClick={() => removeItem(i.cartId)}
              className="text-red-500 text-lg ml-4"
              title="Remove item"
            >
              ✕
            </button>
          </div>
        ))}

        {items.length === 0 && (
          <p className="flex justify-center pt-10">
            Karfan er tóm 🤷‍♂️
          </p>
        )}
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
            <span>{total.toLocaleString('is-IS')} kr.</span>
          </div>

          <CardElement className="p-3 border rounded" />

          <button
            onClick={handleCheckout}
            disabled={!stripe || items.length === 0}
            className="w-full bg-cyan-600 text-white py-3 rounded-lg font-medium
                       shadow hover:bg-cyan-700 disabled:opacity-50"
          >
            Ganga frá pöntun
          </button>
        </div>
      </aside>
    </div>
  );
}
