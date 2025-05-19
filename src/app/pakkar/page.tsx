'use client';

import { useCart } from '../lib/cart-provider';

const pkgs=[{id:1,title:'Pakki 1',items:3},{id:2,title:'Pakki 2',items:5},{id:3,title:'Pakki 3 - mix & match',items:7}];

export default function PackagesPage(){

  const { addItem } = useCart();

  return(
    <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 p-6">
      {pkgs.map(p=>(
        <div key={p.id} className="bg-white rounded-2xl shadow p-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-4">{p.title}</h2>
          <ul className="flex-1 space-y-2 mb-6">{Array.from({length:p.items}).map((_,i)=>(<li key={i} className="h-4 bg-gray-100 rounded"/>))}</ul>
          <button onClick={()=>addItem({id:`pakki-${p.id}`,name:p.title,price:p.items*10000})} className="bg-cyan-600 text-white w-full py-3 rounded-lg font-medium shadow hover:bg-cyan-700">Setja í körfu</button>
        </div>
      ))}
    </div>
  );
}