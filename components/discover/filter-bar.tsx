"use client"

import { useState, useRef } from "react"
import { ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export default function FilterBar() {
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [distance, setDistance] = useState([2.5])
  const scrollRef = useRef<HTMLDivElement>(null)

  const cuisineTypes = ["Italian", "Japanese", "Mexican", "Indian", "American", "Chinese", "Thai", "French"]
  const priceRanges = ["$", "$$", "$$$", "$$$$"]
  const features = ["Outdoor Seating", "Delivery", "Takeout", "Reservations", "WiFi", "Parking"]

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  const clearAllFilters = () => {
    setActiveFilters([])
  }

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef
      const scrollAmount = 200
      if (direction === "left") {
        current.scrollLeft -= scrollAmount
      } else {
        current.scrollLeft += scrollAmount
      }
    }
  }

  // Filter data
  const mealTypes = [
    "Breakfast",
    "Brunch",
    "Lunch",
    "Dinner",
    "Late Night",
    "Dessert",
    "Coffee & Tea",
    "Bar Food",
    "Fast Food",
  ]

  const tags = [
    "Romantic",
    "Family Friendly",
    "Business Meals",
    "Casual",
    "Upscale",
    "Trendy",
    "Historic",
    "Scenic View",
    "Cozy",
    "Pet Friendly",
    "Sports Bar",
    "Gastropub",
    "Farm-to-Table",
  ]

  const dietary = [
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Dairy-Free",
    "Nut-Free",
    "Halal",
    "Kosher",
    "Organic",
    "Low Carb",
    "Keto Friendly",
    "Paleo Friendly",
  ]

  const isActive = (filter: string) => activeFilters.includes(filter)

  return (
    <div className="bg-[#1D2733] border-b border-[#3D4A5C] py-4 sticky top-[104px] md:top-[72px] z-10">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div ref={scrollRef} className="flex justify-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={isActive("price") ? "default" : "outline"}
                  className={`rounded-full ${isActive("price") ? "" : "border-[#3D4A5C]"}`}
                  onClick={() => toggleFilter("price")}
                >
                  <span className="mr-1">Price Range</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-3 bg-[#1D2733] border-[#3D4A5C] text-gray-300">
                <div className="space-y-4">
                  <h4 className="font-medium">Price Range</h4>
                  <div className="flex justify-between">
                    {priceRanges.map((price, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="min-w-0 px-3 border-[#3D4A5C] hover:bg-[#2A3542] hover:text-white"
                      >
                        {price}
                      </Button>
                    ))}
                  </div>
                  <div className="flex justify-between pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#3D4A5C] hover:bg-[#2A3542] hover:text-white"
                    >
                      Cancel
                    </Button>
                    <Button size="sm">Apply</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={isActive("distance") ? "default" : "outline"}
                  className={`rounded-full ${isActive("distance") ? "" : "border-[#3D4A5C]"}`}
                  onClick={() => toggleFilter("distance")}
                >
                  <span className="mr-1">Distance</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-3 bg-[#1D2733] border-[#3D4A5C] text-gray-300">
                <div className="space-y-4">
                  <h4 className="font-medium">Distance</h4>
                  <Slider value={distance} min={0.5} max={10} step={0.5} onValueChange={setDistance} />
                  <div className="flex justify-between text-sm">
                    <span>0.5 mi</span>
                    <span>{distance[0]} mi</span>
                    <span>10 mi</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#3D4A5C] hover:bg-[#2A3542] hover:text-white"
                    >
                      Cancel
                    </Button>
                    <Button size="sm">Apply</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={isActive("cuisines") ? "default" : "outline"}
                  className={`rounded-full ${isActive("cuisines") ? "" : "border-[#3D4A5C]"}`}
                  onClick={() => toggleFilter("cuisines")}
                >
                  <span className="mr-1">Cuisines</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-3 bg-[#1D2733] border-[#3D4A5C] text-gray-300">
                <div className="space-y-4">
                  <h4 className="font-medium">Cuisines</h4>
                  <div className="max-h-[200px] overflow-y-auto pr-2 space-y-2">
                    {cuisineTypes.map((cuisine, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox
                          id={`cuisine-${index}`}
                          className="border-[#3D4A5C] data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <Label htmlFor={`cuisine-${index}`} className="font-normal text-gray-300">
                          {cuisine}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#3D4A5C] hover:bg-[#2A3542] hover:text-white"
                    >
                      Cancel
                    </Button>
                    <Button size="sm">Apply</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={isActive("meal-types") ? "default" : "outline"}
                  className={`rounded-full ${isActive("meal-types") ? "" : "border-[#3D4A5C]"}`}
                  onClick={() => toggleFilter("meal-types")}
                >
                  <span className="mr-1">Meal Types</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-3 bg-[#1D2733] border-[#3D4A5C] text-gray-300">
                <div className="space-y-4">
                  <h4 className="font-medium">Meal Types</h4>
                  <div className="max-h-[200px] overflow-y-auto pr-2 space-y-2">
                    {mealTypes.map((type, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox
                          id={`meal-${index}`}
                          className="border-[#3D4A5C] data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <Label htmlFor={`meal-${index}`} className="font-normal text-gray-300">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#3D4A5C] hover:bg-[#2A3542] hover:text-white"
                    >
                      Cancel
                    </Button>
                    <Button size="sm">Apply</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={isActive("features") ? "default" : "outline"}
                  className={`rounded-full ${isActive("features") ? "" : "border-[#3D4A5C]"}`}
                  onClick={() => toggleFilter("features")}
                >
                  <span className="mr-1">Features</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-3 bg-[#1D2733] border-[#3D4A5C] text-gray-300">
                <div className="space-y-4">
                  <h4 className="font-medium">Features</h4>
                  <div className="max-h-[200px] overflow-y-auto pr-2 space-y-2">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox
                          id={`feature-${index}`}
                          className="border-[#3D4A5C] data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <Label htmlFor={`feature-${index}`} className="font-normal text-gray-300">
                          {feature}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#3D4A5C] hover:bg-[#2A3542] hover:text-white"
                    >
                      Cancel
                    </Button>
                    <Button size="sm">Apply</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={isActive("dietary") ? "default" : "outline"}
                  className={`rounded-full ${isActive("dietary") ? "" : "border-[#3D4A5C]"}`}
                  onClick={() => toggleFilter("dietary")}
                >
                  <span className="mr-1">Dietary</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-3 bg-[#1D2733] border-[#3D4A5C] text-gray-300">
                <div className="space-y-4">
                  <h4 className="font-medium">Dietary</h4>
                  <div className="max-h-[200px] overflow-y-auto pr-2 space-y-2">
                    {dietary.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox
                          id={`dietary-${index}`}
                          className="border-[#3D4A5C] data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <Label htmlFor={`dietary-${index}`} className="font-normal text-gray-300">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#3D4A5C] hover:bg-[#2A3542] hover:text-white"
                    >
                      Cancel
                    </Button>
                    <Button size="sm">Apply</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {activeFilters.length > 0 && (
            <div className="flex items-center justify-center gap-2 pt-2 border-t border-[#3D4A5C] mt-2">
              <span className="text-sm text-gray-400">Active filters:</span>
              {activeFilters.map((filter) => (
                <Badge key={filter} variant="secondary" className="bg-[#2A3542] text-gray-300 hover:bg-[#3D4A5C]">
                  {filter}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-2 hover:bg-transparent"
                    onClick={() => toggleFilter(filter)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-gray-400 hover:text-white">
                Clear all
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
