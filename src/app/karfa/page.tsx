'use client';

import { useCart } from './lib/cart-provider';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useAuth } from '@/lib/auth-context';

export default function CartPage() {
  const { items, inc, dec, removeRow } = useCart();
  
  const { user } = useAuth();
  const email   = user?.email;

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  const stripe = useStripe();
  const elements = useElements();
  const handleCheckout = () => {
    if (!stripe || !elements) return;
    alert('Stripe checkout coming soon, order saved in the meantime');

      if (email && items.length) {
      const total = items.reduce((s, i) => s + i.price * i.qty, 0);
      const order = {
      id:   crypto.randomUUID(),
      total,
      date: new Date().toISOString(),
    };

    const key   = `heist-orders-${email}`;
    const prev  = JSON.parse(localStorage.getItem(key) || '[]');
    localStorage.setItem(key, JSON.stringify([...prev, order]));
    }
  };

  return (
    <div className="max-w-6xl mx-auto md:flex md:gap-10 p-16">
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

            <div className="flex items-center gap-1">
              <button
                onClick={() => dec(i.id)}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                −
              </button>
              <span className="px-2">{i.qty}</span>
              <button
                onClick={() => inc(i.id)}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                +
              </button>
            </div>

            <span className="font-medium ml-4">
              {(i.price * i.qty).toLocaleString('is-IS')} kr.
            </span>

            <button
              onClick={() => removeRow(i.id)}
              className="text-red-500 text-lg ml-4"
              title="Remove all"
            >
              ✕
            </button>
          </div>
        ))}

        {items.length === 0 && (
          <p className="flex justify-center pt-10 opacity-70">
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
            disabled={!stripe}
            className="w-full bg-cyan-600 text-white py-3 rounded-lg font-medium shadow hover:bg-cyan-700 disabled:opacity-50"
          >
            Ganga frá pöntun
          </button>
        </div>
      </aside>
    </div>
  );
}
