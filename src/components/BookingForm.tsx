'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function BookingForm() {
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string>('09:00');
  const [name, setName] = useState('');
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!date) return;
    setSending(true);

    const res = await fetch('/api/book', {
      method: 'POST',
      body: JSON.stringify({ name, date, time }),
    });

    setSending(false);
    if (res.ok) setDone(true);
  }

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
        >
          {['09:00', '11:00', '13:00', '15:00', '17:00'].map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>

      <button
        disabled={sending}
        className="w-full bg-cyan-600 text-white py-3 rounded-lg hover:bg-cyan-700 disabled:opacity-50"
      >
        {sending ? 'Sendi…' : 'Senda beiðni'}
      </button>
    </form>
  );
}
