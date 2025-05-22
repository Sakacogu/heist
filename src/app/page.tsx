import FeaturedCarousel, { FeaturedItem } from '@/components/FeaturedCarousel'
import BrandList from '@/components/BrandList'
import VoiceAssistantSection from '@/components/VoiceAssistantSection'
import VideoList from '@/components/VideoList'

export const revalidate = 60

interface Cocktail {
  idDrink: string
  strDrink: string
  strDrinkThumb: string
}

async function getFeaturedCocktails(): Promise<Cocktail[]> {
  const res = await fetch(
    'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail',
    { next: { revalidate } }
  )
  if (!res.ok) throw new Error('Unable to fetch featured')
  const data = await res.json()
  return Array.isArray(data.drinks) ? data.drinks : []
}

export default async function Home() {
  const drinks = await getFeaturedCocktails()
  const featured: FeaturedItem[] = drinks.slice(0, 4).map((d) => ({
    id: d.idDrink,
    name: d.strDrink,
    image: d.strDrinkThumb,
  }))

  return (
    <div>
      <FeaturedCarousel items={featured} />

      <div className="md:flex md:items-start md:justify-center md:gap-8 px-4">
        <div className="md:w-2/3">
          <BrandList />
          <VoiceAssistantSection />
        </div>
        <aside className="md:w-1/3">
          <VideoList />
        </aside>
      </div>
    </div>
  )
}
