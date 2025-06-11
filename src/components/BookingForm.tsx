"use client";

import { useState, useMemo, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "@/lib/AuthContext";

export default function BookingForm() {
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState("09:00");
  const [name, setName] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const { user } = useAuth();
  const email = user?.email;

  const today = new Date();
  const allTimes = ["09:00", "11:00", "13:00", "15:00", "17:00"];

  const validTimes = useMemo(() => {
    if (!date) return allTimes;
    if (date.toDateString() !== today.toDateString()) return allTimes;

    const nowMins = today.getHours() * 60 + today.getMinutes();
    return allTimes.filter((t) => {
      const [h, m] = t.split(":").map(Number);
      return h * 60 + m > nowMins;
    });
  }, [date]);

  useEffect(() => {
    if (date && !validTimes.includes(time)) {
      setTime(validTimes[0] ?? "");
    }
  }, [date, validTimes, time]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) return;

    const [h, m] = time.split(":").map(Number);
    const when = new Date(date);
    when.setHours(h, m, 0, 0);
    if (when <= new Date()) return;

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
  };

  if (done) {
    return (
      <p className="p-4 bg-green-50 text-green-700 rounded-lg">
        Bókun móttekin – við höfum samband!
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-xl shadow"
    >
      <h3 className="text-lg font-semibold mb-2">Bóka fund</h3>

      <label className="block text-sm">
        Nafn
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full border rounded px-3 py-2"
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
            minDate={today} /* blocks past days */
            required
          />
        </div>
      </label>

      <label className="block text-sm">
        Tími
        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="mt-1 w-full border rounded px-3 py-2"
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
  );
}
