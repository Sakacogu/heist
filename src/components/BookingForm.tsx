"use client";

import { useState, useMemo, useEffect } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Modal from "@/components/Modal";
import { useAuth } from "@/lib/AuthContext";

const ALL_TIMES = ["09:00", "11:00", "13:00", "15:00", "17:00"];

export default function BookingForm() {
  const { user } = useAuth();

  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<(typeof ALL_TIMES)[number]>(ALL_TIMES[0]);
  const [name, setName] = useState("");
  const [modal, setModal] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const email = user?.email;

  const today = useMemo(() => new Date(), []);

  /**
   *  Valid times depend on selected date:
   *  – any future date  → all slots
   *  – today      → only slots after `now`
   */
  const validTimes = useMemo(() => {
    if (!date) return ALL_TIMES;
    if (date.toDateString() !== today.toDateString()) return ALL_TIMES;

    const nowMins = today.getHours() * 60 + today.getMinutes();
    return ALL_TIMES.filter((t) => {
      const [h, m] = t.split(":").map(Number);
      return h * 60 + m > nowMins;
    });
  }, [date, today]);

  /* reset selected time if it became invalid */
  useEffect(() => {
    if (date && !validTimes.includes(time)) {
      setTime(validTimes[0] ?? "");
    }
  }, [date, validTimes, time]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!user) {
      setModal("Vinsamlegast skráðu þig inn áður en þú bókar fund 🙂");
      return;
    }
    if (!date || !time) return;

    const [h, m] = time.split(":").map(Number);
    const when = new Date(date);
    when.setHours(h, m, 0, 0);
    if (when <= new Date()) return; // if past slot then ignore

    setSending(true);
    const res = await fetch("/api/book", {
      method: "POST",
      body: JSON.stringify({ name, date: when, time }),
    });
    setSending(false);

    if (res.ok) {
      if (email) {
        const key = `heist-meet-${email}`;
        const prev = JSON.parse(localStorage.getItem(key) || "[]");
        localStorage.setItem(
          key,
          JSON.stringify([...prev, { when: when.toISOString(), name }]),
        );
      }
      setDone(true);
    }
  }

  if (done) {
    return (
      <p className="p-4 bg-green-50 text-green-700 rounded-lg">
        Bókun móttekin - við höfum samband!
      </p>
    );
  }

  return (
    <>
      <Modal open={!!modal} onClose={() => setModal(null)}>
        <p className="whitespace-pre-line text-center">{modal}</p>
      </Modal>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl bg-white p-6 shadow"
      >
        <h3 className="mb-2 text-lg font-semibold">Bóka fund</h3>

        <label className="block text-sm">
          Nafn
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded border px-3 py-2"
          />
        </label>

        <label className="block text-sm">
          Dagsetning
          <div className="mt-1">
            <DatePicker
              selected={date}
              onChange={(d) => setDate(d)}
              dateFormat="dd.MM.yyyy"
              className="w-full border rounded px-3 py-2"
              minDate={today}
              required
            />
          </div>
        </label>

        <label className="block text-sm">
          Tími
          <select
            value={time}
            onChange={(e) =>
              setTime(e.target.value as (typeof ALL_TIMES)[number])
            }
            className="mt-1 w-full rounded border px-3 py-2"
            required
          >
            {validTimes.length === 0 ? (
              <option value="">— Enginn tími laus í dag —</option>
            ) : (
              validTimes.map((t) => <option key={t}>{t}</option>)
            )}
          </select>
        </label>

        <button
          disabled={sending || !time}
          className="w-full bg-cyan-600 text-white py-3 rounded-lg hover:bg-cyan-700 disabled:opacity-50"
        >
          {sending ? "Sendi…" : "Senda beiðni"}
        </button>
      </form>
    </>
  );
}
