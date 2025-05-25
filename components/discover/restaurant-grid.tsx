import RestaurantCard from "./restaurant-card"
import type { Restaurant } from "./restaurant-card"

interface RestaurantGridProps {
  restaurants: Restaurant[]
}

export default function RestaurantGrid({ restaurants }: RestaurantGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  )
}
