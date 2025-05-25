import { Search, Star, Users, Utensils, Map, Heart } from "lucide-react"

export default function FeatureSection() {
  const features = [
    {
      icon: <Search className="h-10 w-10 text-primary" />,
      title: "Advanced Search",
      description: "Filter by cuisine, price, dietary needs, and more to find exactly what you're craving.",
    },
    {
      icon: <Star className="h-10 w-10 text-primary" />,
      title: "Trusted Reviews",
      description: "Read honest reviews from friends and local food enthusiasts you can trust.",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Social Recommendations",
      description: "See where your friends eat and what dishes they recommend.",
    },
    {
      icon: <Utensils className="h-10 w-10 text-primary" />,
      title: "Dish-Level Reviews",
      description: "Find the best dishes at any restaurant with specific dish ratings and photos.",
    },
    {
      icon: <Map className="h-10 w-10 text-primary" />,
      title: "Interactive Maps",
      description: "Discover restaurants near you with our easy-to-use map interface.",
    },
    {
      icon: <Heart className="h-10 w-10 text-primary" />,
      title: "Custom Collections",
      description: "Create and share lists of your favorite restaurants and dishes.",
    },
  ]

  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Next Bite?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're more than just restaurant reviews. Next Bite helps you discover amazing food through the people you
            trust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-background rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
