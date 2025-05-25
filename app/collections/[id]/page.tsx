"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Search, Share2, UserPlus, Settings, MapPin, DollarSign, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import RestaurantModal from "@/components/collections/collection-restaurant-modal"
import RestaurantGallery from "@/components/profile/restaurant-gallery"
import { List, Grid3X3, MapIcon } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MapSection from "@/components/profile/map-section"

// Mock collection data
const mockCollection = {
  id: 1,
  name: "Chicago Pizza Tour",
  description: "The ultimate guide to Chicago's best pizza spots, curated by local food enthusiasts",
  category: "Food Tour",
  privacy: "collaborative",
  owner: "You",
  collaborators: [
    { name: "Jessica Rodriguez", avatar: "/placeholder.svg?height=32&width=32", role: "Editor" },
    { name: "Alex Chen", avatar: "/placeholder.svg?height=32&width=32", role: "Viewer" },
    { name: "Tom Wilson", avatar: "/placeholder.svg?height=32&width=32", role: "Editor" },
  ],
  createdDate: "2023-12-01",
  lastUpdated: "2024-01-12",
  restaurants: [
    {
      id: 1,
      name: "Pequod's Pizza",
      cuisine: "Pizza",
      city: "Chicago",
      rating: 9.0,
      price: 2,
      distance: "1.8 mi",
      image: "/placeholder.svg?height=200&width=300",
      dateAdded: "2024-01-12",
      addedBy: "Jessica Rodriguez",
      tags: ["Deep Dish", "Casual", "Beer"],
      notes: "Best caramelized crust in the city! Try the sausage and pepperoni.",
      description:
        "Pequod's Pizza is famous for its pan-style deep dish pizzas with a caramelized cheese crust. The casual, pub-like atmosphere makes it a favorite among locals and visitors alike.",
      address: "2207 N Clybourn Ave, Chicago, IL 60614",
      phone: "(773) 327-1512",
      hours: [
        { day: "Monday", hours: "11:00 AM - 12:00 AM" },
        { day: "Tuesday", hours: "11:00 AM - 12:00 AM" },
        { day: "Wednesday", hours: "11:00 AM - 12:00 AM" },
        { day: "Thursday", hours: "11:00 AM - 12:00 AM" },
        { day: "Friday", hours: "11:00 AM - 2:00 AM" },
        { day: "Saturday", hours: "11:00 AM - 2:00 AM" },
        { day: "Sunday", hours: "11:00 AM - 12:00 AM" },
      ],
      features: ["Takeout", "Delivery", "Late Night"],
      ratings: 620,
    },
    {
      id: 2,
      name: "Lou Malnati's",
      cuisine: "Pizza",
      city: "Chicago",
      rating: 8.8,
      price: 2,
      distance: "2.1 mi",
      image: "/placeholder.svg?height=200&width=300",
      dateAdded: "2024-01-10",
      addedBy: "Alex Chen",
      tags: ["Deep Dish", "Family", "Classic"],
      notes: "The original deep dish experience. Their butter crust is legendary.",
      description:
        "Lou Malnati's is considered by many to be the oldest family name in Chicago pizza. The restaurant is famous for its deep dish pizza with a buttery, flaky crust, exclusive sausage blend, and tomato sauce.",
      address: "439 N Wells St, Chicago, IL 60654",
      phone: "(312) 828-9800",
      hours: [
        { day: "Monday", hours: "11:00 AM - 11:00 PM" },
        { day: "Tuesday", hours: "11:00 AM - 11:00 PM" },
        { day: "Wednesday", hours: "11:00 AM - 11:00 PM" },
        { day: "Thursday", hours: "11:00 AM - 11:00 PM" },
        { day: "Friday", hours: "11:00 AM - 12:00 AM" },
        { day: "Saturday", hours: "11:00 AM - 12:00 AM" },
        { day: "Sunday", hours: "12:00 PM - 10:00 PM" },
      ],
      features: ["Takeout", "Delivery", "Family-Friendly"],
      ratings: 580,
    },
    {
      id: 3,
      name: "Giordano's",
      cuisine: "Pizza",
      city: "Chicago",
      rating: 8.5,
      price: 2,
      distance: "1.2 mi",
      image: "/placeholder.svg?height=200&width=300",
      dateAdded: "2024-01-08",
      addedBy: "You",
      tags: ["Stuffed Pizza", "Tourist Favorite"],
      notes: "Famous for their stuffed pizza. Great for first-time visitors.",
      description:
        "Giordano's is a pizzeria chain that specializes in Chicago-style stuffed pizza. Their signature stuffed deep dish has earned them recognition as one of the city's best pizza destinations for over 40 years.",
      address: "130 E Randolph St, Chicago, IL 60601",
      phone: "(312) 616-1200",
      hours: [
        { day: "Monday", hours: "11:00 AM - 10:00 PM" },
        { day: "Tuesday", hours: "11:00 AM - 10:00 PM" },
        { day: "Wednesday", hours: "11:00 AM - 10:00 PM" },
        { day: "Thursday", hours: "11:00 AM - 10:00 PM" },
        { day: "Friday", hours: "11:00 AM - 11:00 PM" },
        { day: "Saturday", hours: "11:00 AM - 11:00 PM" },
        { day: "Sunday", hours: "11:00 AM - 10:00 PM" },
      ],
      features: ["Takeout", "Delivery", "Kid-Friendly"],
      ratings: 540,
    },
    {
      id: 4,
      name: "Spacca Napoli",
      cuisine: "Pizza",
      city: "Chicago",
      rating: 9.2,
      price: 3,
      distance: "3.5 mi",
      image: "/placeholder.svg?height=200&width=300",
      dateAdded: "2024-01-05",
      addedBy: "Tom Wilson",
      tags: ["Neapolitan", "Authentic", "Wood Fired"],
      notes: "Authentic Neapolitan pizza with imported ingredients from Italy.",
      description:
        "Spacca Napoli is dedicated to bringing authentic Neapolitan pizza to Chicago. The restaurant features a wood-burning oven imported from Italy and uses traditional techniques and ingredients to create pizzas that honor the traditions of Naples.",
      address: "1769 W Sunnyside Ave, Chicago, IL 60640",
      phone: "(773) 878-2420",
      hours: [
        { day: "Monday", hours: "Closed" },
        { day: "Tuesday", hours: "5:00 PM - 9:00 PM" },
        { day: "Wednesday", hours: "5:00 PM - 9:00 PM" },
        { day: "Thursday", hours: "5:00 PM - 9:00 PM" },
        { day: "Friday", hours: "12:00 PM - 3:00 PM, 5:00 PM - 10:00 PM" },
        { day: "Saturday", hours: "12:00 PM - 3:00 PM, 5:00 PM - 10:00 PM" },
        { day: "Sunday", hours: "12:00 PM - 3:00 PM, 5:00 PM - 9:00 PM" },
      ],
      features: ["Outdoor Seating", "Wine List", "Reservations"],
      ratings: 420,
    },
  ],
}

export default function CollectionDetailPage({ params }: { params: { id: string } }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("dateAdded")
  const [filterCity, setFilterCity] = useState("all")
  const [filterCuisine, setFilterCuisine] = useState("all")
  const [filterPrice, setFilterPrice] = useState("all")
  const [selectedRestaurant, setSelectedRestaurant] = useState<(typeof mockCollection.restaurants)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"list" | "gallery" | "map">("list")

  const renderPriceLevel = (price: number) => {
    return Array(price)
      .fill(0)
      .map((_, i) => <DollarSign key={i} className="h-3 w-3 text-gray-300 inline-block" />)
  }

  const handleRestaurantClick = (restaurant: (typeof mockCollection.restaurants)[0]) => {
    setSelectedRestaurant(restaurant)
    setIsModalOpen(true)
  }

  const filteredRestaurants = mockCollection.restaurants
    .filter((restaurant) => {
      const matchesSearch =
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.notes.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCity = filterCity === "all" || restaurant.city.toLowerCase() === filterCity
      const matchesCuisine = filterCuisine === "all" || restaurant.cuisine.toLowerCase() === filterCuisine
      const matchesPrice = filterPrice === "all" || restaurant.price.toString() === filterPrice
      return matchesSearch && matchesCity && matchesCuisine && matchesPrice
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "rating":
          return b.rating - a.rating
        case "distance":
          return Number.parseFloat(a.distance) - Number.parseFloat(b.distance)
        case "dateAdded":
        default:
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
      }
    })

  return (
    <div className="min-h-screen bg-[#171F29] py-8">
      <div className="container">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link href="/collections" className="mr-4">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white">{mockCollection.name}</h1>
            <p className="text-gray-400 mt-1">{mockCollection.description}</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="border-[#3D4A5C] text-gray-300 hover:bg-[#2A3542]">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="border-[#3D4A5C] text-gray-300 hover:bg-[#2A3542]">
              <UserPlus className="h-4 w-4 mr-2" />
              Invite
            </Button>
            <Button variant="outline" size="sm" className="border-[#3D4A5C] text-gray-300 hover:bg-[#2A3542]">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Collection Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-[#1D2733] border-[#3D4A5C]">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{mockCollection.restaurants.length}</div>
                <div className="text-sm text-gray-400">Restaurants</div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#1D2733] border-[#3D4A5C]">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{mockCollection.collaborators.length + 1}</div>
                <div className="text-sm text-gray-400">Contributors</div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#1D2733] border-[#3D4A5C]">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {(
                    mockCollection.restaurants.reduce((sum, r) => sum + r.rating, 0) / mockCollection.restaurants.length
                  ).toFixed(1)}
                </div>
                <div className="text-sm text-gray-400">Avg Rating</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Collaborators */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Collaborators</h3>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center space-x-2 bg-[#1D2733] border border-[#3D4A5C] rounded-lg px-3 py-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                Y
              </div>
              <div>
                <div className="text-sm font-medium text-white">You</div>
                <div className="text-xs text-gray-400">Owner</div>
              </div>
            </div>
            {mockCollection.collaborators.map((collaborator, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 bg-[#1D2733] border border-[#3D4A5C] rounded-lg px-3 py-2"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={collaborator.avatar || "/placeholder.svg"} alt={collaborator.name} />
                  <AvatarFallback className="bg-[#2A3542] text-gray-300 text-sm">{collaborator.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium text-white">{collaborator.name}</div>
                  <div className="text-xs text-gray-400">{collaborator.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search restaurants or notes..."
              className="pl-10 bg-[#1D2733] border-[#3D4A5C] text-gray-300 placeholder:text-gray-500"
            />
          </div>
          <Select value={filterCity} onValueChange={setFilterCity}>
            <SelectTrigger className="w-full lg:w-[140px] bg-[#1D2733] border-[#3D4A5C] text-gray-300">
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent className="bg-[#1D2733] border-[#3D4A5C]">
              <SelectItem value="all">All Cities</SelectItem>
              <SelectItem value="chicago">Chicago</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterCuisine} onValueChange={setFilterCuisine}>
            <SelectTrigger className="w-full lg:w-[140px] bg-[#1D2733] border-[#3D4A5C] text-gray-300">
              <SelectValue placeholder="Cuisine" />
            </SelectTrigger>
            <SelectContent className="bg-[#1D2733] border-[#3D4A5C]">
              <SelectItem value="all">All Cuisines</SelectItem>
              <SelectItem value="pizza">Pizza</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterPrice} onValueChange={setFilterPrice}>
            <SelectTrigger className="w-full lg:w-[140px] bg-[#1D2733] border-[#3D4A5C] text-gray-300">
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent className="bg-[#1D2733] border-[#3D4A5C]">
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="1">$</SelectItem>
              <SelectItem value="2">$$</SelectItem>
              <SelectItem value="3">$$$</SelectItem>
              <SelectItem value="4">$$$$</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full lg:w-[160px] bg-[#1D2733] border-[#3D4A5C] text-gray-300">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-[#1D2733] border-[#3D4A5C]">
              <SelectItem value="dateAdded">Date Added</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="distance">Distance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* View Toggle */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-white">Restaurants ({filteredRestaurants.length})</h3>

          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)} className="w-auto">
            <TabsList className="bg-[#2A3542] border border-[#3D4A5C]">
              <TabsTrigger value="list" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                <List className="h-4 w-4 mr-2" />
                List
              </TabsTrigger>
              <TabsTrigger value="gallery" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                <Grid3X3 className="h-4 w-4 mr-2" />
                Gallery
              </TabsTrigger>
              <TabsTrigger value="map" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                <MapIcon className="h-4 w-4 mr-2" />
                Map
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Content based on view mode */}
        {viewMode === "list" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <Card
                key={restaurant.id}
                className="overflow-hidden hover:shadow-lg transition-all bg-[#1D2733] border-[#3D4A5C] cursor-pointer"
                onClick={() => handleRestaurantClick(restaurant)}
              >
                <div className="relative h-48">
                  <Image
                    src={restaurant.image || "/placeholder.svg"}
                    alt={restaurant.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-black/50 text-white border-none">{renderPriceLevel(restaurant.price)}</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-white line-clamp-1">{restaurant.name}</h3>
                    <div className="flex items-center">
                      <div className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        🍔{restaurant.rating}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-gray-400 mb-3">
                    <span className="mr-3">{restaurant.cuisine}</span>
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{restaurant.distance}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {restaurant.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-[#3D4A5C] text-gray-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {restaurant.notes && <p className="text-sm text-gray-300 mb-3 line-clamp-2">{restaurant.notes}</p>}

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>Added {new Date(restaurant.dateAdded).toLocaleDateString()}</span>
                    </div>
                    <span>by {restaurant.addedBy}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {viewMode === "gallery" && <RestaurantGallery restaurants={filteredRestaurants} />}

        {viewMode === "map" && <MapSection />}

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">No restaurants found</div>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {selectedRestaurant && (
        <RestaurantModal restaurant={selectedRestaurant} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  )
}
