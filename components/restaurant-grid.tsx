import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin } from "lucide-react"

interface Restaurant {
  id: number
  name: string
  cuisine: string
  rating: number
  reviews: number
  price: string
  image: string
  location: string
  distance: string
  tags: string[]
}

interface RestaurantGridProps {
  restaurants: Restaurant[]
}

export default function RestaurantGrid({ restaurants }: RestaurantGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {restaurants.map((restaurant) => (
        <Link key={restaurant.id} href={`/restaurant/${restaurant.id}`}>
          <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
            <div className="relative h-48">
              <Image src={restaurant.image || "/placeholder.svg"} alt={restaurant.name} fill className="object-cover" />
              <div className="absolute top-3 right-3">
                <Badge className="bg-background/90 hover:bg-background/90 text-foreground">{restaurant.price}</Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg line-clamp-1">{restaurant.name}</h3>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                  <span className="text-sm font-medium">{restaurant.rating}</span>
                  <span className="text-xs text-muted-foreground ml-1">({restaurant.reviews})</span>
                </div>
              </div>

              <div className="flex items-center text-sm text-muted-foreground mb-3">
                <span className="mr-3">{restaurant.cuisine}</span>
                <div className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{restaurant.distance}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mt-2">
                {restaurant.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
