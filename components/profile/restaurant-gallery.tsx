"use client"

import { useState } from "react"
import Image from "next/image"
import { MapPin, DollarSign } from "lucide-react"
import { Card } from "@/components/ui/card"
import RestaurantModal from "@/components/discover/restaurant-modal"
import type { Restaurant } from "@/components/discover/restaurant-card"

interface RestaurantGalleryProps {
  restaurants: Restaurant[]
}

export default function RestaurantGallery({ restaurants }: RestaurantGalleryProps) {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const renderPriceLevel = (price: number) => {
    return Array(price)
      .fill(0)
      .map((_, i) => <DollarSign key={i} className="h-3 w-3 text-gray-300 inline-block" />)
  }

  const handleRestaurantClick = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant)
    setIsModalOpen(true)
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {restaurants.map((restaurant) => (
          <Card
            key={restaurant.id}
            className="overflow-hidden hover:shadow-lg transition-all cursor-pointer bg-[#1D2733] border-[#3D4A5C] group"
            onClick={() => handleRestaurantClick(restaurant)}
          >
            <div className="relative aspect-square">
              <Image
                src={restaurant.image || "/placeholder.svg"}
                alt={restaurant.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="font-bold text-white text-sm line-clamp-1 mb-1">{restaurant.name}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg className="h-3 w-3 mr-1 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24">
                      <path d="M12 2C8.43 2 5.23 3.54 3.01 6H21C18.78 3.54 15.57 2 12 2ZM21 8H3C3 8.9 3.12 9.78 3.34 10.64C4.78 11.43 6.96 12 12 12C17.04 12 19.22 11.43 20.66 10.64C20.88 9.78 21 8.9 21 8ZM20.64 12.36C19.27 13.24 16.88 14 12 14C7.12 14 4.73 13.24 3.36 12.36C3.13 13.57 3 14.77 3 16C3 19.31 7.03 22 12 22C16.97 22 21 19.31 21 16C21 14.77 20.87 13.57 20.64 12.36Z" />
                      <circle cx="9" cy="9" r="1" />
                      <circle cx="15" cy="9" r="1" />
                    </svg>
                    <span className="text-white text-xs font-medium">{restaurant.rating}</span>
                  </div>
                  <div className="text-white text-xs">{renderPriceLevel(restaurant.price)}</div>
                </div>
              </div>
            </div>

            {/* Hover overlay with additional details */}
            <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4 text-center">
              <h3 className="font-bold text-white text-sm mb-2">{restaurant.name}</h3>
              <p className="text-gray-300 text-xs mb-2">{restaurant.cuisine}</p>
              <div className="flex items-center text-gray-300 text-xs">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{restaurant.distance}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {selectedRestaurant && (
        <RestaurantModal restaurant={selectedRestaurant} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  )
}
