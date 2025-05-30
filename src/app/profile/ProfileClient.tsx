'use client';

import { useAuth } from '@/lib/auth-context';
import { useCart } from '@/app/karfa/lib/cart-provider';
import { redirect } from 'next/navigation';
import Image from 'next/image';

type Order   = { id: string; total: number; date: string };
type Meeting = { when: string; name?: string };

export default function ProfileClient() {
  const { user, logout } = useAuth();
  const { items }        = useCart();

  if (!user) redirect('/innskraning?next=/profile');

  const orders : Order[] = JSON.parse(
    typeof window !== 'undefined'
      ? localStorage.getItem(`heist-orders-${user.email}`) || '[]'
      : '[]',
  );

  const meetings : Meeting[] = JSON.parse(
    typeof window !== 'undefined'
      ? localStorage.getItem(`heist-meet-${user.email}`) || '[]'
      : '[]',
  );

  const now      = new Date();
  const upcoming = meetings.filter(m => new Date(m.when) >  now);
  const past     = meetings.filter(m => new Date(m.when) <= now);

  return (
    <main className="max-w-4xl mx-auto p-8 space-y-10">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">👋 {user.email}</h1>
        <button onClick={logout} className="text-red-600 underline">
          Log out
        </button>
      </header>

      <section>
        <h2 className="text-xl font-semibold mb-3">Current cart</h2>
        {items.length === 0 && <p>No items in cart.</p>}
        {items.map((i) => (
          <div key={i.cartId} className="flex gap-3 py-2 border-b">
            {i.image && (
              <Image src={i.image} alt={i.name} width={48} height={36} className="rounded" />
            )}
            <span className="flex-1">{i.name}</span>
            <span>× {i.qty}</span>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Upcoming meetings</h2>
        {upcoming.length === 0 && <p>Nothing booked.</p>}
        {upcoming.map((m, i) => (
          <div key={i} className="border p-3 rounded mb-2">
            {new Date(m.when).toLocaleString('is-IS')}
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Past meetings</h2>
        {past.length === 0 && <p>—</p>}
        {past.map((m, i) => (
          <div key={i} className="border p-3 rounded mb-2 opacity-60">
            {new Date(m.when).toLocaleDateString('is-IS')}{' '}
            {new Date(m.when).toLocaleTimeString('is-IS', { hour: '2-digit', minute: '2-digit' })}
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Orders</h2>
        {orders.length === 0 && <p>No orders yet.</p>}
        {orders.map((o) => (
          <div key={o.id} className="border p-3 rounded mb-2">
            {new Date(o.date).toLocaleDateString('is-IS')} –{' '}
            {o.total.toLocaleString('is-IS')} kr.
          </div>
        ))}
      </section>
    </main>
  );
}
