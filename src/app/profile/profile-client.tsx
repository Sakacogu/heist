"use client";

import {
  ChevronDown,
  ShoppingCart,
  CalendarClock,
  History,
  Receipt,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { useCart } from "@/app/cart/cart-provider";
import { useAuth } from "@/lib/AuthContext";

type OrderItem = {
  id: string;
  name: string;
  qty: number;
  price: number;
  image?: string;
};

export type OrderStatus = "pending" | "paid" | "canceled";

export type Order = {
  id: string;
  total: number;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
};

type Meeting = { when: string; name?: string };

export default function ProfileClient() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { items: cartItems, addItems } = useCart();

  const [orders, setOrders] = useState<Order[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) router.replace("/login?next=/profile");
  }, [user, router]);

  /* load orders on mount/user change */
  useEffect(() => {
    if (!user) return;

    const raw = localStorage.getItem(`heist-orders-${user.email}`) ?? "[]";
    const parsed = JSON.parse(raw) as unknown[];

    const cleaned: Order[] = parsed.map((row) => {
      const o = row as Partial<Order>;
      const status: OrderStatus =
        o.status === "paid"
          ? "paid"
          : o.status === "canceled"
            ? "canceled"
            : "pending";

      return {
        id: o.id ?? crypto.randomUUID(),
        total: o.total ?? 0,
        date: o.date ?? new Date().toISOString(),
        items: o.items ?? [],
        status,
      };
    });

    setOrders(cleaned);
  }, [user]);

  if (!user) return null;

  const persistOrders = (next: Order[]) => {
    setOrders(next);
    localStorage.setItem(`heist-orders-${user.email}`, JSON.stringify(next));
  };

  const finishPay = (id: string) => {
    const next = orders.map((o) =>
      o.id === id ? { ...o, status: "paid" as OrderStatus } : o,
    );
    persistOrders(next);
    alert("(stub) Stripe checkout would open now");
  };

  /** cancel -> mark order + batch-restore its items */
  const cancelOrder = (id: string) => {
    const next = orders.map((o) =>
      o.id === id ? { ...o, status: "canceled" as OrderStatus } : o,
    );
    persistOrders(next);

    const canceled = next.find((o) => o.id === id);
    if (canceled) {
      // map OrderItem → CartItem-like for addItems
      addItems(
        canceled.items.map((it) => ({
          ...it,
          cartId: "", // placeholder, provider will replace with nanoid()
        })),
      );
    }
  };


  const meetings: Meeting[] = JSON.parse(
    localStorage.getItem(`heist-meet-${user.email}`) || "[]",
  );
  const now = new Date();
  const upcoming = meetings.filter((m) => new Date(m.when) > now);
  const past = meetings.filter((m) => new Date(m.when) <= now);

  const badge = (s: OrderStatus) =>
    ({
      paid: "bg-green-100 text-green-700",
      canceled: "bg-red-100 text-red-600",
      pending: "bg-gray-100 text-gray-600",
    })[s];

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };
  return (
    <main className="max-w-5xl mx-auto py-12 px-6 space-y-14">
      <header className="rounded-3xl bg-gradient-to-r from-cyan-600 to-blue-500 text-white p-8 shadow-lg relative overflow-hidden">
        <h1 className="text-3xl font-semibold">
          👋 {user.email.split("@")[0]}
        </h1>
        <p className="opacity-90">
          Manage your cart, bookings and orders in one place.
        </p>
        <button
          onClick={handleLogout}
          className="absolute top-6 right-6 text-sm bg-white/10 hover:bg-white/20 transition px-3 py-1.5 rounded-full"
        >
          Log out
        </button>
      </header>

      <section className="section-card">
        <h2 className="section-heading">
          <ShoppingCart className="w-5 h-5 mr-2" />
          Current cart
        </h2>

        {cartItems.length === 0 && <p>No items in cart.</p>}

        {cartItems.map((i) => (
          <div key={i.cartId} className="item-row">
            {i.image && (
              <Image
                src={i.image}
                alt={i.name}
                width={60}
                height={45}
                className="rounded object-cover"
              />
            )}
            <span className="flex-1">{i.name}</span>
            <span className="badge-neutral">× {i.qty}</span>
          </div>
        ))}
      </section>

      <section className="grid md:grid-cols-2 gap-8">
        <div className="section-card">
          <h2 className="section-heading">
            <CalendarClock className="w-5 h-5 mr-2" />
            Upcoming meetings
          </h2>
          {upcoming.length === 0 && <p>Nothing booked.</p>}
          {upcoming.map((m, i) => (
            <div key={i} className="meeting-row bg-cyan-50/40">
              {new Date(m.when).toLocaleString("is-IS")}
            </div>
          ))}
        </div>

        <div className="section-card">
          <h2 className="section-heading">
            <History className="w-5 h-5 mr-2" />
            Past meetings
          </h2>
          {past.length === 0 && <p>—</p>}
          {past.map((m, i) => (
            <div key={i} className="meeting-row opacity-60">
              {new Date(m.when).toLocaleDateString("is-IS")}{" "}
              {new Date(m.when).toLocaleTimeString("is-IS", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          ))}
        </div>
      </section>

      <section className="section-card">
        <h2 className="section-heading">
          <Receipt className="w-5 h-5 mr-2" />
          Orders
        </h2>
        {orders.length === 0 && <p>No orders yet.</p>}

        {orders.map((o) => (
          <div key={o.id} className="border-b last:border-0">
            <button
              onClick={() => setOpenId((c) => (c === o.id ? null : o.id))}
              className="w-full flex items-center justify-between py-3 gap-4 hover:bg-gray-50"
            >
              <span>
                {new Date(o.date).toLocaleDateString("is-IS")} •{" "}
                {o.total.toLocaleString("is-IS")} kr.
              </span>

              <span className={`badge ${badge(o.status)}`}>{o.status}</span>

              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  openId === o.id ? "rotate-180" : ""
                }`}
              />
            </button>

            {openId === o.id && (
              <div className="space-y-3 pb-4 px-1 animate-fade-in">
                {o.items.map((it) => (
                  <div key={it.id} className="item-row text-sm border">
                    {it.image && (
                      <Image
                        src={it.image}
                        alt={it.name}
                        width={46}
                        height={34}
                        className="rounded object-cover"
                      />
                    )}
                    <span className="flex-1">{it.name}</span>
                    <span className="text-gray-500">× {it.qty}</span>
                    <span className="font-medium">
                      {(it.price * it.qty).toLocaleString("is-IS")} kr.
                    </span>
                  </div>
                ))}

                {o.status === "pending" && (
                  <div className="flex gap-4 pt-3">
                    <button
                      onClick={() => finishPay(o.id)}
                      className="btn-primary flex-1"
                    >
                      Finish paying
                    </button>
                    <button
                      onClick={() => cancelOrder(o.id)}
                      className="btn-neutral flex-1"
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
