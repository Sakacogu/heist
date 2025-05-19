export const revalidate = 60;

interface Drink {
  idDrink: string;
  strDrink: string;
  strInstructions: string;
  strDrinkThumb: string;
}

async function fetchDrink(id: string): Promise<Drink> {
  const res = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
    { next: { revalidate } }
  );
  if (!res.ok) throw new Error('Failed to fetch drink');
  const { drinks } = await res.json();
  return drinks[0];
}

export default async function Page({ params }: { params: { id: string } }) {
  const drink = await fetchDrink(params.id);

  return (
    <section className="max-w-5xl mx-auto px-4 py-10 md:flex md:gap-10">
      <img
        src={drink.strDrinkThumb}
        alt={drink.strDrink}
        className="md:w-1/2 rounded-xl object-cover"
      />

      <div className="md:w-1/2 mt-6 md:mt-0 space-y-6">
        <h1 className="text-2xl font-semibold">{drink.strDrink}</h1>
        <p className="text-gray-700">{drink.strInstructions}</p>

        <AddToCart
          id={drink.idDrink}
          name={drink.strDrink}
          price={0}
        />
      </div>
    </section>
  );
}

'use client';

import { useCart } from '../../lib/cart-provider';

export function AddToCart({
  id,
  name,
  price,
}: {
  id: string;
  name: string;
  price: number;
}) {
  const { addItem } = useCart();
  return (
    <button
      onClick={() => addItem({ id, name, price })}
      className="w-full bg-cyan-600 text-white py-3 rounded-lg font-medium shadow hover:bg-cyan-700"
    >
      Setja í körfu
    </button>
  );
}
