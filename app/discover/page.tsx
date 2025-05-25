import RestaurantGrid from "@/components/discover/restaurant-grid"
import DiscoverHeader from "@/components/discover/discover-header"
import FilterBar from "@/components/discover/filter-bar"
import MapSection from "@/components/discover/map-section"
import { restaurantData } from "@/data/restaurant-data"

export default function DiscoverPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#171F29]">
      <DiscoverHeader />
      <FilterBar />
      <MapSection />
      <div className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Restaurants near you</h2>
          <p className="text-sm text-gray-400">{restaurantData.length} results</p>
        </div>
        <RestaurantGrid restaurants={restaurantData} />
      </div>
    </div>
  )
}
