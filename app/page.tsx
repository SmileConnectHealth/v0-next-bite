import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Search, TrendingUp, Utensils, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Discover Your Next Favorite Restaurant
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Find, review, and share the best dining experiences in your city with our community of food lovers.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/discover">
                <Button size="lg" className="gap-1">
                  <Search className="h-4 w-4" />
                  Explore Restaurants
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="lg" variant="outline" className="gap-1">
                  <Users className="h-4 w-4" />
                  Join Community
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Featured Restaurants</h2>
            <p className="text-muted-foreground">Discover top-rated places loved by our community</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow transition-all hover:shadow-lg"
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={`/placeholder.svg?height=300&width=500&text=Restaurant+${i}`}
                    alt={`Restaurant ${i}`}
                    className="object-cover w-full h-full transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">Restaurant Name {i}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="ml-1 text-sm font-medium">{(4 + i * 0.2).toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="flex items-center mt-2 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    <span>City Location {i}</span>
                  </div>
                  <p className="mt-2 text-sm line-clamp-2">
                    A wonderful restaurant with amazing food and atmosphere. Perfect for any occasion.
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                      Italian
                    </span>
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                      $$
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Link href="/discover">
              <Button variant="outline">View All Restaurants</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-16 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">How It Works</h2>
            <p className="text-muted-foreground">Simple steps to enhance your dining experience</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                <Search className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold">Discover</h3>
              <p className="text-muted-foreground">
                Find restaurants based on your location, cuisine preferences, or search for specific places.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                <Star className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold">Review</h3>
              <p className="text-muted-foreground">
                Share your dining experiences by rating and reviewing restaurants you've visited.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                <Utensils className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold">Enjoy</h3>
              <p className="text-muted-foreground">
                Save your favorite spots, create collections, and share recommendations with friends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-10">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
              <TrendingUp className="h-3.5 w-3.5 mr-1" />
              <span>Popular Right Now</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Trending This Week</h2>
            <p className="text-muted-foreground">The hottest spots everyone's talking about</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow"
              >
                <div className="aspect-square w-full overflow-hidden">
                  <img
                    src={`/placeholder.svg?height=300&width=300&text=Trending+${i}`}
                    alt={`Trending Restaurant ${i}`}
                    className="object-cover w-full h-full transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                  <h3 className="font-semibold text-white">Trending Spot {i}</h3>
                  <div className="flex items-center mt-1">
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-xs font-medium text-white">{(4.5 + i * 0.1).toFixed(1)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Link href="/trending">
              <Button>See All Trending</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Ready to start your culinary journey?</h2>
            <p className="mx-auto max-w-[600px]">
              Join thousands of food enthusiasts discovering and sharing the best restaurants in your area.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <Button size="lg" variant="secondary">
                  Sign Up Now
                </Button>
              </Link>
              <Link href="/discover">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/20"
                >
                  Explore Restaurants
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
