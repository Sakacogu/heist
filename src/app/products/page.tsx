import Link from 'next/link';

export const revalidate = 60;

interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

async function getCocktails(): Promise<Cocktail[]> {
  const res = await fetch(
    'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail',
    { next: { revalidate } }
  );
  if (!res.ok) throw new Error('Failed to fetch cocktails');

  const data = await res.json();
  return Array.isArray(data.drinks) ? data.drinks : [];
}

export default async function ProductsPage() {
  const drinks = await getCocktails();

  return (
    <div className="max-w-7xl mx-auto p-6">
      {drinks.length === 0 ? (
        <p className="text-center text-gray-500">Engar vörur fundust</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {drinks.map((d) => (
            <Link
              key={d.idDrink}
              href={`/products/${d.idDrink}`}
              className="bg-white rounded-xl shadow p-4 flex flex-col"
            >
              <img
                src={d.strDrinkThumb}
                alt={d.strDrink}
                className="h-40 w-full object-cover rounded mb-3"
              />
              <span className="font-medium text-center">{d.strDrink}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
