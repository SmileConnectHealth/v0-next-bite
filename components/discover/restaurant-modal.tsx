"use client"

import { useState } from "react"
import Image from "next/image"
import { X, Star, MapPin, Phone, Globe, Plus } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { Restaurant } from "./restaurant-card"
import AddToCollectionModal from "./add-to-collection-modal"
import RatingModal from "./rating-modal"

interface RestaurantModalProps {
  restaurant: Restaurant
  isOpen: boolean
  onClose: () => void
}

export default function RestaurantModal({ restaurant, isOpen, onClose }: RestaurantModalProps) {
  // Mock reviews data
  const reviews = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        image: "/placeholder.svg?height=100&width=100",
      },
      rating: 5,
      date: "2 weeks ago",
      text: "Absolutely amazing! The food was delicious and the service was impeccable. I highly recommend the chef's special.",
      tags: ["Great Food", "Excellent Service", "Ambiance"],
    },
    {
      id: 2,
      user: {
        name: "Michael Chen",
        image: "/placeholder.svg?height=100&width=100",
      },
      rating: 4,
      date: "1 month ago",
      text: "Really enjoyed my meal here. The atmosphere was great and the food was delicious. Only giving 4 stars because it was a bit noisy.",
      tags: ["Good Value", "Tasty Food"],
    },
  ]

  // Mock photos data
  const photos = [
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
  ]

  const [activeTab, setActiveTab] = useState("overview")
  const [isAddToCollectionOpen, setIsAddToCollectionOpen] = useState(false)
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false)
  const [restaurantReviews, setRestaurantReviews] = useState(reviews)

  const handleAddToCollection = () => {
    setIsAddToCollectionOpen(true)
  }

  const handleGiveRating = () => {
    setIsRatingModalOpen(true)
  }

  const handleRatingSubmit = (rating: number, reviewText: string) => {
    const newReview = {
      id: Date.now(),
      user: { name: "You", image: "/placeholder.svg?height=100&width=100", reviews: 1 },
      rating: rating,
      date: "Just now",
      text: reviewText,
      likes: 0,
      images: [],
      tags: [], // Add empty tags array
    }
    setRestaurantReviews([newReview, ...restaurantReviews])
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] md:max-w-[800px] p-0 overflow-hidden max-h-[90vh] flex flex-col bg-[#1D2733] border-[#3D4A5C] text-gray-300">
        <div className="relative h-64">
          <Image src={restaurant.image || "/placeholder.svg"} alt={restaurant.name} fill className="object-cover" />
          <button
            className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
          <button
            className="absolute top-4 right-16 p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
            onClick={() => setIsAddToCollectionOpen(true)}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <div className="mb-6">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold text-white">{restaurant.name}</h2>
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="font-medium text-white">{restaurant.rating}</span>
                <span className="text-sm text-gray-400 ml-1">({restaurant.ratings})</span>
              </div>
            </div>
            <div className="flex items-center text-gray-400 mt-1">
              <span className="mr-3">{restaurant.cuisine}</span>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{restaurant.distance}</span>
              </div>
            </div>
          </div>

          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="text-gray-300">
            <TabsList className="mb-6 bg-[#2A3542]">
              <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Overview
              </TabsTrigger>
              <TabsTrigger value="reviews" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Ratings
              </TabsTrigger>
              <TabsTrigger value="photos" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Photos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div>
                <h3 className="font-medium text-white mb-2">About</h3>
                <p className="text-gray-300">{restaurant.description}</p>
              </div>

              <div>
                <h3 className="font-medium text-white mb-2">Contact</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-300">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{restaurant.address}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{restaurant.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Globe className="h-4 w-4 mr-2" />
                    <span>www.{restaurant.name.toLowerCase().replace(/\s+/g, "")}.com</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-white mb-2">Hours</h3>
                <div className="space-y-1">
                  {restaurant.hours.map((item, index) => (
                    <div key={index} className="flex justify-between text-gray-300">
                      <span>{item.day}</span>
                      <span>{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-white">Customer Ratings</h3>
                <Button onClick={() => setIsRatingModalOpen(true)}>
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.43 2 5.23 3.54 3.01 6H21C18.78 3.54 15.57 2 12 2ZM21 8H3C3 8.9 3.12 9.78 3.34 10.64C4.78 11.43 6.96 12 12 12C17.04 12 19.22 11.43 20.66 10.64C20.88 9.78 21 8.9 21 8ZM20.64 12.36C19.27 13.24 16.88 14 12 14C7.12 14 4.73 13.24 3.36 12.36C3.13 13.57 3 14.77 3 16C3 19.31 7.03 22 12 22C16.97 22 21 19.31 21 16C21 14.77 20.87 13.57 20.64 12.36Z" />
                    <circle cx="9" cy="9" r="1" />
                    <circle cx="15" cy="9" r="1" />
                  </svg>
                  Give a Rating
                </Button>
              </div>

              <div className="space-y-6">
                {restaurantReviews.map((review) => (
                  <div key={review.id} className="border-b border-[#3D4A5C] pb-6">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={review.user.image || "/placeholder.svg"} alt={review.user.name} />
                          <AvatarFallback>{review.user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-white">{review.user.name}</div>
                          <div className="text-sm text-gray-400">{review.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <svg className="h-4 w-4 mr-1 text-primary" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.43 2 5.23 3.54 3.01 6H21C18.78 3.54 15.57 2 12 2ZM21 8H3C3 8.9 3.12 9.78 3.34 10.64C4.78 11.43 6.96 12 12 12C17.04 12 19.22 11.43 20.66 10.64C20.88 9.78 21 8.9 21 8ZM20.64 12.36C19.27 13.24 16.88 14 12 14C7.12 14 4.73 13.24 3.36 12.36C3.13 13.57 3 14.77 3 16C3 19.31 7.03 22 12 22C16.97 22 21 19.31 21 16C21 14.77 20.87 13.57 20.64 12.36Z" />
                          <circle cx="9" cy="9" r="1" />
                          <circle cx="15" cy="9" r="1" />
                        </svg>
                        <span className="font-medium text-white">{review.rating}/10</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {review.tags &&
                        review.tags.length > 0 &&
                        review.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs bg-[#2A3542] text-gray-300 hover:bg-[#3D4A5C]"
                          >
                            {tag}
                          </Badge>
                        ))}
                    </div>

                    <p className="text-gray-300">{review.text}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="photos">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {photos.map((photo, index) => (
                  <div key={index} className="relative aspect-square rounded-md overflow-hidden">
                    <Image
                      src={photo || "/placeholder.svg"}
                      alt={`${restaurant.name} photo ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
      <AddToCollectionModal
        restaurant={restaurant}
        isOpen={isAddToCollectionOpen}
        onClose={() => setIsAddToCollectionOpen(false)}
      />
      <RatingModal
        restaurant={restaurant}
        isOpen={isRatingModalOpen}
        onClose={() => setIsRatingModalOpen(false)}
        onRatingSubmit={handleRatingSubmit}
      />
    </Dialog>
  )
}
