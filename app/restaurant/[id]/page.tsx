import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, ChevronLeft } from "lucide-react"
import RestaurantHeader from "@/components/restaurant-header"
import RestaurantTabs from "@/components/restaurant-tabs"
import ReviewForm from "@/components/review-form"

export default function RestaurantPage({ params }: { params: { id: string } }) {
  // Mock data for a restaurant
  const restaurant = {
    id: Number.parseInt(params.id),
    name: "Pasta Paradise",
    cuisine: "Italian",
    rating: 4.7,
    reviews: 243,
    price: "$$",
    description: "Authentic Italian cuisine featuring handmade pasta and wood-fired pizzas in a cozy, rustic setting with a curated wine selection.",
    address: "123 Main St, New York, NY 10001",
    phone: "(212) 555-1234",
    website: "www.pastaparadise.com",
    hours: [
      { day: "Monday", hours: "11:00 AM - 10:00 PM" },
      { day: "Tuesday", hours: "11:00 AM - 10:00 PM" },
      { day: "Wednesday", hours: "11:00 AM - 10:00 PM" },
      { day: "Thursday", hours: "11:00 AM - 10:00 PM" },
      { day: "Friday", hours: "11:00 AM - 11:00 PM" },
      { day: "Saturday", hours: "10:00 AM - 11:00 PM" },
      { day: "Sunday", hours: "10:00 AM - 9:00 PM" }
    ],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800"
    ],
    tags: ["Pasta", "Pizza", "Wine", "Italian", "Romantic", "Outdoor Seating"],
    menu: [
      {
        category: "Appetizers",
        items: [
          { name: "Bruschetta", price: 9.99, description: "Toasted bread topped with fresh tomatoes, garlic, and basil", rating: 4.5, reviews: 87 },
          { name: "Calamari Fritti", price: 12.99, description: "Crispy fried calamari served with marinara sauce", rating: 4.3, reviews: 65 },
          { name: "Caprese Salad", price: 10.99, description: "Fresh mozzarella, tomatoes, and basil with balsamic glaze", rating: 4.7, reviews: 92 }
        ]
      },
      {
        category: "Pasta",
        items: [
          { name: "Spaghetti Carbonara", price: 16.99, description: "Classic carbonara with pancetta, egg, and pecorino cheese", rating: 4.8, reviews: 124 },
          { name: "Fettuccine Alfredo", price: 15.99, description: "Creamy alfredo sauce with parmesan cheese", rating: 4.6, reviews: 108 },
          { name: "Lasagna Bolognese", price: 18.99, description: "Layered pasta with meat sauce, béchamel, and cheese", rating: 4.9, reviews: 156 }
        ]
      },
      {
        category: "Pizza",
        items: [
          { name: "Margherita", price: 14.99, description: "Classic pizza with tomato sauce, mozzarella, and basil", rating: 4.7, reviews: 132 },
          { name: "Quattro Formaggi", price: 16.99, description: "Four cheese pizza with mozzarella, gorgonzola, fontina, and parmesan", rating: 4.5, reviews: 98 },
          { name: "Prosciutto e Funghi", price: 17.99, description: "Pizza with prosciutto, mushrooms, and truffle oil", rating: 4.8, reviews: 115 }
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        user: { name: "Sarah Johnson", image: "/placeholder.svg?height=100&width=100", reviews: 42 },
        rating: 5,
        date: "2023-12-15",
        text: "Absolutely amazing! The pasta is clearly homemade and the flavors are authentic. The service was impeccable and the ambiance was perfect for our anniversary dinner. Will definitely be coming back!",
        likes: 24,
        images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"]
      },
      {
        id: 2,
        user: { name: "Michael Chen", image: "/placeholder.svg?height=100&width=100", reviews: 18 },
        rating: 4,
        date: "2023-11-28",
        text: "Great food and atmosphere. The carbonara was delicious and the wine selection is impressive. Only giving 4 stars because it was a bit noisy, but that's to be expected on a Saturday night. Would recommend!",
        likes: 12,
        images: []
      },
      {
        id: 3,
        user: { name: "Jessica Rodriguez", image: "/placeholder.svg?height=100&width=100", reviews: 36 },
        rating: 5,
        date: "2023-11-10",
        text: "One of the best Italian restaurants in the city! The pizza is cooked to perfection in their wood-fired oven. The staff is friendly and knowledgeable about their menu and wine pairings. A must-visit!",
        likes: 31,
        images: ["/placeholder.svg?height=300&width=400"]
      }
    ]
  }

  return (
    <div className="pb-12">
      <RestaurantHeader restaurant={restaurant} />
      
      <div className="container mt-8">
        <Link href="/discover" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to search results
        </Link>
        
        <RestaurantTabs restaurant={restaurant} />
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Reviews</h2>
          
          <div className="mb-8">
            <ReviewForm />
          </div>
          
          <div className="space-y-8">
            {restaurant.reviews.map((review) => (
              <div key={review.id} className="border-b pb-8">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={review.user.image || "/placeholder.svg"} alt={review.user.name} />
                      <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{review.user.name}</div>
                      <div className="text-sm text-muted-foreground">{review.user.reviews} reviews</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "text-muted"}`} 
                        />
                      ))}
                    </div>
                    <span className="text\
