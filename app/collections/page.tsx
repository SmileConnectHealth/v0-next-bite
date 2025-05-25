"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, Lock, Globe, Users } from "lucide-react"
import { useAuth } from "@/context/auth-context"

// Mock collections
const userCollections = [
  {
    id: "favorites",
    name: "Favorites",
    description: "My all-time favorite restaurants",
    restaurantCount: 12,
    privacy: "private",
    images: [
      "/placeholder.svg?height=150&width=150",
      "/placeholder.svg?height=150&width=150",
      "/placeholder.svg?height=150&width=150",
      "/placeholder.svg?height=150&width=150",
    ],
    lastUpdated: "2 days ago",
  },
  {
    id: "want-to-try",
    name: "Want to Try",
    description: "Places I want to visit soon",
    restaurantCount: 24,
    privacy: "private",
    images: [
      "/placeholder.svg?height=150&width=150",
      "/placeholder.svg?height=150&width=150",
      "/placeholder.svg?height=150&width=150",
      "/placeholder.svg?height=150&width=150",
    ],
    lastUpdated: "1 week ago",
  },
  {
    id: "visited",
    name: "Visited",
    description: "Restaurants I've been to",
    restaurantCount: 8,
    privacy: "public",
    images: [
      "/placeholder.svg?height=150&width=150",
      "/placeholder.svg?height=150&width=150",
      "/placeholder.svg?height=150&width=150",
      "/placeholder.svg?height=150&width=150",
    ],
    lastUpdated: "3 days ago",
  },
  {
    id: "italian-tour",
    name: "Italian Tour",
    description: "The best Italian restaurants in the city",
    restaurantCount: 6,
    privacy: "public",
    images: [
      "/placeholder.svg?height=150&width=150",
      "/placeholder.svg?height=150&width=150",
      "/placeholder.svg?height=150&width=150",
      "/placeholder.svg?height=150&width=150",
    ],
    lastUpdated: "2 weeks ago",
  },
  {
    id: "date-night",
    name: "Date Night",
    description: "Romantic spots for special occasions",
    restaurantCount: 9,
    privacy: "private",
    images: [
      "/placeholder.svg?height=150&width=150",
      "/placeholder.svg?height=150&width=150",
      "/placeholder.svg?height=150&width=150",
      "/placeholder.svg?height=150&width=150",
    ],
    lastUpdated: "1 month ago",
  },
]

export default function CollectionsPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCollections = userCollections.filter(
    (collection) =>
      collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collection.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getPrivacyIcon = (privacy: string) => {
    return privacy === "public" ? (
      <Globe className="h-4 w-4 text-green-500" />
    ) : (
      <Lock className="h-4 w-4 text-muted-foreground" />
    )
  }

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Collections</h1>
            <p className="text-muted-foreground mt-1">Organize and save your favorite restaurants</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Collection
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search collections..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="sm:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCollections.map((collection) => (
            <Link href={`/collections/${collection.id}`} key={collection.id}>
              <Card className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group h-full">
                <div className="relative h-40">
                  <div className="grid grid-cols-2 grid-rows-2 h-full">
                    {collection.images.slice(0, 4).map((image, index) => (
                      <div key={index} className="relative overflow-hidden">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Collection image ${index + 1}`}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="absolute top-2 right-2 flex items-center space-x-1">
                    {getPrivacyIcon(collection.privacy)}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-1 line-clamp-1">{collection.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{collection.description}</p>
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>{collection.restaurantCount} restaurants</span>
                    <span>Updated {collection.lastUpdated}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredCollections.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">No collections found</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              {searchQuery
                ? `No collections match "${searchQuery}". Try a different search term.`
                : "You haven't created any collections yet. Start organizing your favorite restaurants."}
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Collection
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
