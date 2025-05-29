'use client';

import { useCart } from './lib/cart-provider';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

export default function CartPage() {
  const { items, removeItem } = useCart();
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  const stripe = useStripe();
  const elements = useElements();

  const handleCheckout = async () => {
    if (!stripe || !elements) return;
    alert('Stripe checkout coming soon');
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
              <img src={i.image} alt={i.name} className="w-16 h-16 object-cover rounded" />
            )}

            <span className="flex-1 px-4">{i.name}</span>

            <span className="mr-6 bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm">
              × {i.qty}
            </span>

            <div className="flex items-center gap-4">
              <span className="font-medium">{(i.price * i.qty).toLocaleString('is-IS')} kr.</span>
              <button
                onClick={() => removeItem(i.id)}
                className="text-red-500 text-lg"
                title="Remove one"
              >
                ✕
              </button>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <p className="flex justify-center pt-10 opacity-70">Karfan er tóm 🤷‍♂️</p>
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
