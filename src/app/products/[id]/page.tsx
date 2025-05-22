import { notFound } from 'next/navigation';
import { AddToCartButton } from '../../../components/AddToCartButton';

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

  const json = await res.json();
  const drinks: Drink[] | null = json.drinks;

  if (!drinks || drinks.length === 0) {
    notFound();
  }

  return drinks[0];
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const drink = await fetchDrink(params.id);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 md:flex md:gap-10">
      <img
        src={drink.strDrinkThumb}
        alt={drink.strDrink}
        className="md:w-1/2 rounded-xl object-cover"
      />

      <div className="md:w-1/2 mt-6 md:mt-0 space-y-6 justify-center align-center">
        <h1 className="text-2xl font-semibold text-center">{drink.strDrink}</h1>
        <p className="text-gray-700 text-center">{drink.strInstructions}</p>

        <AddToCartButton
          id={drink.idDrink}
          name={drink.strDrink}
          price={0}
          image={drink.strDrinkThumb}
        />
      </div>
    </div>
  );
}
