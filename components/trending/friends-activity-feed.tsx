"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, MessageCircle, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Activity {
  id: number
  user: {
    name: string
    username: string
    image: string
  }
  restaurant: {
    name: string
    image: string
  }
  rating: number
  reviewText?: string
  timestamp: string
  likes: number
  comments: number
}

interface FriendsActivityFeedProps {
  activities: Activity[]
}

export default function FriendsActivityFeed({ activities }: FriendsActivityFeedProps) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-6">Friends Activity</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <Card key={activity.id} className="bg-[#1D2733] border-[#3D4A5C]">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={activity.user.image || "/placeholder.svg"} alt={activity.user.name} />
                    <AvatarFallback className="bg-[#2A3542] text-gray-300">{activity.user.name[0]}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-white">{activity.user.username}</span>
                      <span className="text-gray-400">rated</span>
                      <span className="font-medium text-white">{activity.restaurant.name}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm text-gray-400">{activity.timestamp}</span>
                    </div>

                    {activity.reviewText && <p className="text-gray-300 mb-3">"{activity.reviewText}"</p>}

                    <div className="flex items-center space-x-6">
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-0">
                        <Heart className="h-4 w-4 mr-2" />
                        {activity.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-0">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        {activity.comments}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-0">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Rating on the far right */}
                <div className="flex items-center bg-orange-500/10 text-orange-400 px-3 py-2 rounded-md ml-4">
                  <span className="font-bold text-lg">🍔{activity.rating}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
