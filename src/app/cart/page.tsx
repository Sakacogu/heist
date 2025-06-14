"use client";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { nanoid } from "nanoid";
import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useCart, discountTiers } from "@/app/cart/cart-provider";
import Modal from "@/components/Modal";
import { useAuth } from "@/lib/AuthContext";


/** Cart page – fully client side because of Stripe.js */
export default function CartPage() {
  const { items, removeItem, updateQty, clearCart } = useCart();
  const { user } = useAuth();
  useTranslation("products");

  const stripe = useStripe();
  const elements = useElements();

  const totalISK = items.reduce((sum, r) => sum + r.price * r.qty, 0);
  const totalQty = items.reduce((sum, r) => sum + r.qty, 0);
  const nextTier = discountTiers.find((t) => totalQty < t.min);

  const [modalMsg, setModalMsg] = useState<string | null>(null);

  const handleCheckout = () => {
    if (!stripe || !elements) return;

    if (!user) {
      setModalMsg("Vinsamlegast skráðu þig inn áður en þú klárar pöntun 🙂");
      return;
    }

    // checkout endpoint (add l8er).
    const order = {
      id: nanoid(),
      total: totalISK,
      date: new Date().toISOString(),
      items,
      status: "pending",
    };
    const key = `heist-orders-${user.email}`;
    const history = JSON.parse(localStorage.getItem(key) || "[]") as typeof order[];
    localStorage.setItem(key, JSON.stringify([order, ...history]));

    clearCart();
    setModalMsg(
      "Stripe greiðslusíða er væntanleg 😊\nPöntunin þín var vistuð á prófílnum.",
    );
  };


  return (
    <div className="mx-auto max-w-6xl p-16 md:flex md:gap-10">
      <Modal open={!!modalMsg} onClose={() => setModalMsg(null)}>
        <p className="whitespace-pre-line text-center">{modalMsg}</p>
      </Modal>

      {/* cart items */}
      <div className="flex-1 space-y-4">
        {items.length === 0 && (
          <p className="flex justify-center pt-10">Karfan er tóm 🤷‍♂️</p>
        )}

        {items.map((row) => (
          <div
            key={row.cartId}
            className="flex items-center justify-between rounded-xl bg-white p-4 shadow"
          >
            {row.image && (
              <Image
                src={row.image}
                alt={row.name}
                width={64}
                height={64}
                className="h-16 w-16 rounded object-cover"
                unoptimized
              />
            )}

            <span className="flex-1 px-4">{row.name}</span>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  updateQty(row.cartId, Math.max(1, row.qty - 1))
                }
                className="rounded bg-gray-100 px-3 py-1"
              >
                -
              </button>
              <span className="min-w-[2ch] text-center">{row.qty}</span>
              <button
                onClick={() => updateQty(row.cartId, row.qty + 1)}
                className="rounded bg-gray-100 px-3 py-1"
              >
                +
              </button>
            </div>

            <span className="w-24 text-right font-medium">
              {(row.price * row.qty).toLocaleString("is-IS")} kr.
            </span>

            <button
              onClick={() => removeItem(row.cartId)}
              className="ml-4 text-lg text-red-500"
              title="Remove item"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <aside className="sticky top-24 mt-10 md:mt-0 md:w-80">
        <div className="space-y-4 rounded-xl bg-white p-6 shadow">
          {nextTier && (
            <div className="mb-2 flex items-center justify-between rounded-lg bg-cyan-50 p-3 text-sm text-cyan-800">
              <span>
                {nextTier.min - totalQty} vör
                {nextTier.min - totalQty === 1 ? "u" : "ur"} til viðbótar →
                <strong> {nextTier.pct * 100}% afsláttur</strong>
              </span>

              <span className="h-2 w-24 overflow-hidden rounded-full bg-cyan-100">
                <span
                  className="block h-full bg-cyan-600 transition-all"
                  style={{
                    width: `${(totalQty / nextTier.min) * 100}%`,
                  }}
                />
              </span>
            </div>
          )}

          <input
            type="text"
            placeholder="Afsláttarkóði"
            className="w-full rounded border p-2"
          />

          <div className="flex justify-between pt-2 font-medium">
            <span>Samtals</span>
            <span>{totalISK.toLocaleString("is-IS")} kr.</span>
          </div>

          <CardElement className="rounded border p-3" />

          <button
            onClick={handleCheckout}
            disabled={!stripe || items.length === 0}
            className="w-full rounded-lg bg-cyan-600 py-3 font-medium text-white shadow hover:bg-cyan-700 disabled:opacity-50"
          >
            Ganga frá pöntun
          </button>
        </div>
      </aside>
    </div>
  );
}
