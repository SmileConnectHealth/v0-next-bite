"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FeaturedCollectionsProps {
  collections: any[]
  location: string
  onLocationChange: (location: string) => void
  onCollectionClick: (collection: any) => void
}

export default function FeaturedCollections({
  collections,
  location,
  onLocationChange,
  onCollectionClick,
}: FeaturedCollectionsProps) {
  const carouselRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold text-white">Featured Collections</h2>
        <div className="flex items-center">
          <Select value={location} onValueChange={onLocationChange}>
            <SelectTrigger className="w-[180px] bg-[#1D2733] border-[#3D4A5C] text-gray-300">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent className="bg-[#1D2733] border-[#3D4A5C]">
              <SelectItem value="Chicago, IL">Chicago, IL</SelectItem>
              <SelectItem value="New York, NY">New York, NY</SelectItem>
              <SelectItem value="Los Angeles, CA">Los Angeles, CA</SelectItem>
              <SelectItem value="San Francisco, CA">San Francisco, CA</SelectItem>
              <SelectItem value="Miami, FL">Miami, FL</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <p className="text-gray-400 mb-6">Trending categories in your area</p>

      <div className="relative">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#1D2733]/80 rounded-full p-2 text-white shadow-md hidden md:block"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <div ref={carouselRef} className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="min-w-[280px] md:min-w-[300px] snap-start"
              onClick={() => onCollectionClick(collection)}
            >
              <Card className="overflow-hidden h-full hover:shadow-md transition-all cursor-pointer bg-[#1D2733] border-[#3D4A5C]">
                <div className="relative h-40">
                  <div className="grid grid-cols-2 grid-rows-2 h-full">
                    {collection.images.slice(0, 4).map((image: string, index: number) => (
                      <div key={index} className="relative overflow-hidden">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Collection image ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  {collection.trending && (
                    <Badge className="absolute top-2 right-2 bg-primary text-white">Trending</Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg text-white mb-1">{collection.title}</h3>
                  <p className="text-sm text-gray-400 mb-2">{collection.subtitle}</p>
                  <div className="text-xs text-gray-500">{collection.restaurantCount} restaurants</div>
                </CardContent>
              </Card>
            </div>
          ))}

          {/* See All Card */}
          <div className="min-w-[280px] md:min-w-[300px] snap-start">
            <Card className="overflow-hidden h-full hover:shadow-md transition-all cursor-pointer bg-transparent border-[#3D4A5C] border-dashed flex items-center justify-center">
              <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                <h3 className="font-bold text-lg text-white mb-4">See All Collections</h3>
                <ArrowRight className="h-6 w-6 text-primary" />
              </CardContent>
            </Card>
          </div>
        </div>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#1D2733]/80 rounded-full p-2 text-white shadow-md hidden md:block"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div className="flex justify-center mt-4 space-x-1">
        {Array.from({ length: Math.min(5, Math.ceil(collections.length / 4)) }).map((_, index) => (
          <div key={index} className={`h-1.5 rounded-full ${index === 0 ? "w-6 bg-primary" : "w-1.5 bg-[#3D4A5C]"}`} />
        ))}
      </div>
    </div>
  )
}
