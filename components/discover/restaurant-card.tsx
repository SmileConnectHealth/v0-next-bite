"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { MapPin, DollarSign, Clock, Wifi, Utensils, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import RestaurantModal from "./restaurant-modal"
import AddToCollectionModal from "./add-to-collection-modal"

export interface Restaurant {
  id: number
  name: string
  cuisine: string
  distance: string
  rating: number
  ratings: number
  price: number
  image: string
  tags: string[]
  features: string[]
  description: string
  address: string
  phone: string
  hours: { day: string; hours: string }[]
  city?: string
}

interface RestaurantCardProps {
  restaurant: Restaurant
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAddToCollectionOpen, setIsAddToCollectionOpen] = useState(false)

  const renderPriceLevel = (price: number) => {
    return Array(price)
      .fill(0)
      .map((_, i) => <DollarSign key={i} className="h-3.5 w-3.5 text-gray-300 inline-block" />)
  }

  const handleAddToCollection = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsAddToCollectionOpen(true)
  }

  return (
    <>
      <Card
        className="overflow-hidden h-full hover:shadow-md transition-all cursor-pointer bg-[#1D2733] border-[#3D4A5C]"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative h-48">
          <Image src={restaurant.image || "/placeholder.svg"} alt={restaurant.name} fill className="object-cover" />
          <Button
            size="sm"
            className="absolute top-3 right-3 h-8 w-8 p-0 bg-[#1D2733]/90 hover:bg-[#1D2733] border border-[#3D4A5C]"
            onClick={handleAddToCollection}
          >
            <Plus className="h-4 w-4 text-white" />
          </Button>
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-bold text-lg text-white">{restaurant.name}</h3>
            <div className="flex items-center bg-orange-500/10 text-orange-400 px-2 py-1 rounded-md">
              <span className="font-medium text-sm">🍔{restaurant.rating}</span>
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-400 mb-3">
            <span className="mr-3">{restaurant.cuisine}</span>
            <div className="flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{restaurant.distance}</span>
            </div>
          </div>

          <div className="flex items-center mb-3">
            <div className="mr-3">{renderPriceLevel(restaurant.price)}</div>
            <div className="flex space-x-2">
              {restaurant.features.slice(0, 3).map((feature, index) => {
                let Icon = Utensils
                if (feature === "Wifi") Icon = Wifi
                if (feature === "Open Late") Icon = Clock

                return (
                  <div key={index} className="p-1 bg-[#2A3542] rounded-full">
                    <Icon className="h-3.5 w-3.5 text-gray-300" />
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {restaurant.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs font-normal border-[#3D4A5C] text-gray-300">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <RestaurantModal restaurant={restaurant} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <AddToCollectionModal
        restaurant={restaurant}
        isOpen={isAddToCollectionOpen}
        onClose={() => setIsAddToCollectionOpen(false)}
      />
    </>
  )
}
