"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import RestaurantCard from "@/components/discover/restaurant-card"
import type { Restaurant } from "@/components/discover/restaurant-card"

interface TrendingPlacesProps {
  restaurants: Restaurant[]
}

export default function TrendingPlaces({ restaurants }: TrendingPlacesProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-6">Trending Places Near You</h2>

      <div className="relative">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#1D2733]/80 rounded-full p-2 text-white shadow-md hidden md:block"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <div ref={scrollRef} className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="min-w-[280px] md:min-w-[320px] snap-start">
              <RestaurantCard restaurant={restaurant} />
            </div>
          ))}
        </div>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#1D2733]/80 rounded-full p-2 text-white shadow-md hidden md:block"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}
