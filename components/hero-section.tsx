"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin } from "lucide-react"

export default function HeroSection() {
  const [location, setLocation] = useState("")

  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Food background"
          fill
          className="object-cover brightness-[0.4]"
          priority
        />
      </div>

      <div className="container relative z-10 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Discover Your Next Favorite Restaurant</h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Find the best restaurants recommended by friends and local food enthusiasts
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 max-w-xl mx-auto">
            <div className="relative w-full">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter your location"
                className="pl-10 h-12 bg-background/95"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <Button size="lg" className="w-full sm:w-auto">
              <Search className="mr-2 h-5 w-5" />
              Find Restaurants
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-gray-200">
            <span className="px-3 py-1 bg-primary/20 rounded-full">Italian</span>
            <span className="px-3 py-1 bg-primary/20 rounded-full">Japanese</span>
            <span className="px-3 py-1 bg-primary/20 rounded-full">Mexican</span>
            <span className="px-3 py-1 bg-primary/20 rounded-full">Vegetarian</span>
            <span className="px-3 py-1 bg-primary/20 rounded-full">Brunch</span>
            <span className="px-3 py-1 bg-primary/20 rounded-full">Fine Dining</span>
          </div>
        </div>
      </div>
    </div>
  )
}
