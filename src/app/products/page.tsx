'use client';

import { useState } from 'react';
import Link from 'next/link';

const categories = ['all', 'ljós', 'ofnar', 'gardínur', 'öryggi', 'innstungur'];
const mock = Array.from({ length: 12 }, (_, i) => ({ id: i + 1, name: `Vara ${i + 1}`, price: ((i * 4321) % 9000 + 1000).toString(), category: categories[i%5] }));

export default function ProductsPage() {
  const [active, setActive] = useState('all');
  const filtered = active==='all'?mock:mock.filter(p=>p.category===active);
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-wrap gap-3 mb-6 justify-center">
        {categories.map(c=> (
          <button key={c} onClick={()=>setActive(c)} className={`px-4 py-2 rounded-full border ${active===c?'bg-cyan-600 text-white':'bg-white'}`}>{c}</button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map(p=> (
          <Link key={p.id} href={`/products/${p.id}`} className="bg-white rounded-xl shadow p-4 flex flex-col">
            <div className="h-40 bg-cyan-50 rounded mb-3 flex items-center justify-center text-cyan-600 font-semibold">{p.name}</div>
            <span className="font-medium">{p.name}</span>
            <span className="mt-auto text-cyan-600 font-semibold">{p.price} kr.</span>
          </Link>
        ))}
      </div>
    </div>
  );
}