"use client"

import { useState, useRef, useEffect } from "react"
import { Search, X, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function EnhancedSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>(["Trending"])
  const [showResults, setShowResults] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState("")
  const searchRef = useRef<HTMLDivElement>(null)

  const filters = ["Recs Nearby", "Trending", "Popular", "Friend Recs"]

  // Mock search results
  const searchResults = {
    restaurants: [
      { id: 1, name: "Alinea", cuisine: "Fine Dining", rating: 9.6, image: "/placeholder.svg?height=50&width=50" },
      {
        id: 2,
        name: "Girl & The Goat",
        cuisine: "American",
        rating: 9.4,
        image: "/placeholder.svg?height=50&width=50",
      },
    ],
    members: [
      { id: 1, name: "Sarah Chen", followers: 245, image: "/placeholder.svg?height=50&width=50" },
      { id: 2, name: "Mike Rodriguez", followers: 189, image: "/placeholder.svg?height=50&width=50" },
    ],
    places: [
      { id: 1, name: "West Loop", count: 42, image: "/placeholder.svg?height=50&width=50" },
      { id: 2, name: "River North", count: 38, image: "/placeholder.svg?height=50&width=50" },
    ],
  }

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f) => f !== filter))
    } else {
      setActiveFilters([...activeFilters, filter])
    }
  }

  const handleSearchFocus = () => {
    setShowResults(true)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
      setShowResults(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="bg-[#1D2733] border-b border-[#3D4A5C] py-6 sticky top-16 z-10">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white text-center mb-2">What are you craving?</h1>
          <p className="text-gray-400 text-center mb-8">Discover trending restaurants and collections in your area</p>

          <div ref={searchRef} className="relative mb-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={handleSearchFocus}
                  placeholder="Search for restaurants, cuisines, or dishes..."
                  className="pl-12 pr-4 py-6 text-lg bg-[#171F29] border-[#3D4A5C] text-gray-300 placeholder:text-gray-500 focus:border-primary"
                />
                {searchQuery && (
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>

              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-48 py-6 bg-[#171F29] border-[#3D4A5C] text-gray-300">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Location" />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-[#1D2733] border-[#3D4A5C]">
                  <SelectItem value="chicago">Chicago, IL</SelectItem>
                  <SelectItem value="newyork">New York, NY</SelectItem>
                  <SelectItem value="losangeles">Los Angeles, CA</SelectItem>
                  <SelectItem value="sanfrancisco">San Francisco, CA</SelectItem>
                  <SelectItem value="miami">Miami, FL</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {filters.map((filter) => (
              <Badge
                key={filter}
                variant={activeFilters.includes(filter) ? "default" : "outline"}
                className={`text-sm py-2 px-4 cursor-pointer transition-colors ${
                  activeFilters.includes(filter)
                    ? "bg-orange-500 hover:bg-orange-600 text-white border-orange-500"
                    : "border-[#3D4A5C] text-gray-300 hover:bg-[#2A3542]"
                }`}
                onClick={() => toggleFilter(filter)}
              >
                {filter}
              </Badge>
            ))}
          </div>

          {showResults && searchQuery && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#1D2733] border border-[#3D4A5C] rounded-md shadow-lg overflow-hidden z-20">
              {/* Restaurants */}
              <div className="p-3 border-b border-[#3D4A5C]">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Restaurants</h3>
                <div className="space-y-2">
                  {searchResults.restaurants.map((restaurant) => (
                    <div
                      key={restaurant.id}
                      className="flex items-center p-2 hover:bg-[#2A3542] rounded-md cursor-pointer"
                    >
                      <div className="h-10 w-10 rounded-md overflow-hidden mr-3">
                        <img
                          src={restaurant.image || "/placeholder.svg"}
                          alt={restaurant.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-white">{restaurant.name}</div>
                        <div className="text-sm text-gray-400">{restaurant.cuisine}</div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-orange-400 font-medium">🍔{restaurant.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Members */}
              <div className="p-3 border-b border-[#3D4A5C]">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Members</h3>
                <div className="space-y-2">
                  {searchResults.members.map((member) => (
                    <div key={member.id} className="flex items-center p-2 hover:bg-[#2A3542] rounded-md cursor-pointer">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={member.image || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback className="bg-[#2A3542] text-white">{member.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium text-white">{member.name}</div>
                        <div className="text-sm text-gray-400">{member.followers} followers</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Places */}
              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Places</h3>
                <div className="space-y-2">
                  {searchResults.places.map((place) => (
                    <div key={place.id} className="flex items-center p-2 hover:bg-[#2A3542] rounded-md cursor-pointer">
                      <div className="h-10 w-10 rounded-md overflow-hidden mr-3">
                        <img
                          src={place.image || "/placeholder.svg"}
                          alt={place.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-white">{place.name}</div>
                        <div className="text-sm text-gray-400">{place.count} restaurants</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
