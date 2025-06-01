'use client';

import { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

import { useAuth } from '@/lib/auth-context';
import { useCart } from '@/app/karfa/lib/cart-provider';

type OrderItem = {
  id: string;
  name: string;
  qty: number;
  price: number;
  image?: string;
};

type OrderStatus = 'pending' | 'paid' | 'canceled';

type Order = {
  id: string;
  total: number;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
};

type Meeting = { when: string; name?: string };

export default function ProfileClient() {
  const { user, logout } = useAuth();
  const { items: cartItems, addItem } = useCart();

  if (!user) redirect('/innskraning?next=/profile');

  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    const raw = localStorage.getItem(`heist-orders-${user.email}`) || '[]';
    const parsed: (Omit<Order, 'status'> & { status?: string })[] =
      JSON.parse(raw);

    const cleaned: Order[] = parsed.map((o) => ({
      ...o,
      status:
        o.status === 'paid' || o.status === 'canceled'
          ? (o.status as OrderStatus)
          : 'pending',
    }));
    setOrders(cleaned);
  }, [user.email]);

  const saveOrders = (next: Order[]) => {
    setOrders(next);
    localStorage.setItem(`heist-orders-${user.email}`, JSON.stringify(next));
  };

  const meetings: Meeting[] = JSON.parse(
    localStorage.getItem(`heist-meet-${user.email}`) || '[]',
  );
  const now = new Date();
  const upcoming = meetings.filter((m) => new Date(m.when) > now);
  const past = meetings.filter((m) => new Date(m.when) <= now);

  const [openId, setOpenId] = useState<string | null>(null);

  const finishPay = (id: string) => {
    saveOrders(
      orders.map((o) =>
        o.id === id ? { ...o, status: 'paid' as OrderStatus } : o,
      ),
    );
    alert('(Stub) Redirect to Stripe Checkout here');
  };

  const cancelOrder = (id: string) => {
    const next = orders.map((o) =>
      o.id === id ? { ...o, status: 'canceled' as OrderStatus } : o,
    );
    saveOrders(next);

    const canceled = next.find((o) => o.id === id);
    canceled?.items.forEach((it) =>
      addItem(
        { id: it.id, name: it.name, price: it.price, image: it.image },
        it.qty,
      ),
    );
  };

  return (
    <main className="max-w-4xl mx-auto p-8 space-y-10">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">👋 {user.email}</h1>
        <button onClick={logout} className="text-red-600 underline">
          Log&nbsp;out
        </button>
      </header>

      <section className="bg-white rounded-xl shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold">Current cart</h2>
        {cartItems.length === 0 && <p>No items in cart.</p>}
        {cartItems.map((i) => (
          <div key={i.cartId} className="flex gap-3 py-2 border-b last:border-0">
            {i.image && (
              <Image
                src={i.image}
                alt={i.name}
                width={56}
                height={42}
                className="rounded object-cover"
              />
            )}
            <span className="flex-1">{i.name}</span>
            <span className="text-sm">× {i.qty}</span>
          </div>
        ))}
      </section>

      <section className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold">Upcoming meetings</h2>
          {upcoming.length === 0 && <p>Nothing booked.</p>}
          {upcoming.map((m, i) => (
            <div key={i} className="border rounded p-3">
              {new Date(m.when).toLocaleString('is-IS')}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold">Past meetings</h2>
          {past.length === 0 && <p>—</p>}
          {past.map((m, i) => (
            <div key={i} className="border rounded p-3 opacity-60">
              {new Date(m.when).toLocaleDateString('is-IS')}{' '}
              {new Date(m.when).toLocaleTimeString('is-IS', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Orders</h2>
        {orders.length === 0 && <p>No orders yet.</p>}

        {orders.map((o) => (
          <div key={o.id} className="border-b last:border-0">
            <button
              onClick={() => setOpenId((cur) => (cur === o.id ? null : o.id))}
              className="w-full flex items-center justify-between py-3 gap-4"
            >
              <span>
                {new Date(o.date).toLocaleDateString('is-IS')} –{' '}
                {o.total.toLocaleString('is-IS')} kr.
              </span>

              <span
                className={`px-2 py-0.5 text-xs rounded-full ${
                  o.status === 'paid'
                    ? 'bg-green-100 text-green-700'
                    : o.status === 'canceled'
                    ? 'bg-red-100 text-red-600'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {o.status}
              </span>

              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  openId === o.id ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openId === o.id && (
              <div className="space-y-3 pb-4 px-1">
                {o.items.map((it) => (
                  <div
                    key={it.id}
                    className="flex items-center gap-3 text-sm border rounded p-2"
                  >
                    {it.image && (
                      <Image
                        src={it.image}
                        alt={it.name}
                        width={40}
                        height={32}
                        className="rounded object-cover"
                      />
                    )}
                    <span className="flex-1">{it.name}</span>
                    <span className="text-gray-500">× {it.qty}</span>
                    <span className="font-medium">
                      {(it.price * it.qty).toLocaleString('is-IS')} kr.
                    </span>
                  </div>
                ))}

                {o.status === 'pending' && (
                  <div className="flex gap-4 pt-3">
                    <button
                      onClick={() => finishPay(o.id)}
                      className="flex-1 bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700"
                    >
                      Finish paying
                    </button>
                    <button
                      onClick={() => cancelOrder(o.id)}
                      className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200"
                    >
                      Cancel order
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}
