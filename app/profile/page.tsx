"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, MapPin, Calendar, Lock, Globe, Edit, Star, Plus } from "lucide-react"
import { useAuth } from "@/context/auth-context"

// Mock data
const userReviews = [
  {
    id: 1,
    restaurantName: "Italian Delight",
    rating: 4.5,
    date: "2 weeks ago",
    content: "Amazing pasta and great service. The ambiance was perfect for a date night.",
    image: "/placeholder.svg?height=150&width=250&text=Italian+Delight",
  },
  {
    id: 2,
    restaurantName: "Sushi Paradise",
    rating: 5.0,
    date: "1 month ago",
    content: "Best sushi in town! Fresh ingredients and creative rolls. Will definitely be back.",
    image: "/placeholder.svg?height=150&width=250&text=Sushi+Paradise",
  },
  {
    id: 3,
    restaurantName: "Burger Joint",
    rating: 3.5,
    date: "2 months ago",
    content: "Good burgers but the service was a bit slow. Fries were excellent though!",
    image: "/placeholder.svg?height=150&width=250&text=Burger+Joint",
  },
]

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
]

export default function ProfilePage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("collections")

  const getPrivacyIcon = (privacy: string) => {
    return privacy === "public" ? (
      <Globe className="h-4 w-4 text-green-500" />
    ) : (
      <Lock className="h-4 w-4 text-muted-foreground" />
    )
  }

  return (
    <div className="min-h-screen py-8 bg-muted/30">
      <div className="container max-w-6xl">
        {/* Profile Header */}
        <div className="mb-8">
          <Card>
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="relative">
                  <Avatar className="h-32 w-32 border-2 border-muted">
                    <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "User"} />
                    <AvatarFallback className="text-3xl">{user?.name?.[0] || "U"}</AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full hover:bg-primary/10 transition-colors duration-200"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold">{user?.name || "User"}</h1>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                  <p className="text-muted-foreground mb-1">
                    @{user?.name?.toLowerCase().replace(/\s+/g, "") || "username"}
                  </p>
                  <p className="text-foreground/80 mb-4 max-w-2xl">
                    Food enthusiast and restaurant explorer. Always on the hunt for the next great meal.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>New York, NY</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Joined May 2023</span>
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">42</div>
                      <div className="text-sm text-muted-foreground">Reviews</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">3</div>
                      <div className="text-sm text-muted-foreground">Collections</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">156</div>
                      <div className="text-sm text-muted-foreground">Followers</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="collections" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
            <TabsTrigger value="collections">Collections</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          {/* Collections Tab */}
          <TabsContent value="collections" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Collections</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Collection
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userCollections.map((collection) => (
                <Card
                  key={collection.id}
                  className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
                >
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
              ))}
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Reviews</h2>
              <Button variant="outline">
                <Star className="h-4 w-4 mr-2" />
                Filter Reviews
              </Button>
            </div>

            <div className="space-y-4">
              {userReviews.map((review) => (
                <Card key={review.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4 h-48 md:h-auto">
                      <img
                        src={review.image || "/placeholder.svg"}
                        alt={review.restaurantName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="flex-1 p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg">{review.restaurantName}</h3>
                        <div className="flex items-center bg-primary/10 text-primary px-2 py-1 rounded-md">
                          <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                          <span className="font-medium">{review.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">Reviewed {review.date}</p>
                      <p className="text-foreground/80 mt-2">{review.content}</p>
                      <div className="flex justify-end mt-4">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Review
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
