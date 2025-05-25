import Image from "next/image"

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Next Bite helped me discover amazing restaurants I never would have found otherwise. The recommendations from my friends are always spot on!",
      name: "Sarah Johnson",
      title: "Food Enthusiast",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "I love how I can filter restaurants by specific dishes. Found the best ramen in town thanks to Next Bite's dish-level reviews!",
      name: "Michael Chen",
      title: "Ramen Lover",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "Creating collections of my favorite restaurants has been a game-changer. Now my friends always ask me where we should eat!",
      name: "Jessica Rodriguez",
      title: "Foodie Explorer",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of food lovers who have discovered their favorite restaurants with Next Bite
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-background rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 fill-primary text-primary" viewBox="0 0 24 24">
                    <path d="M12 2C8.43 2 5.23 3.54 3.01 6H21C18.78 3.54 15.57 2 12 2ZM21 8H3C3 8.9 3.12 9.78 3.34 10.64C4.78 11.43 6.96 12 12 12C17.04 12 19.22 11.43 20.66 10.64C20.88 9.78 21 8.9 21 8ZM20.64 12.36C19.27 13.24 16.88 14 12 14C7.12 14 4.73 13.24 3.36 12.36C3.13 13.57 3 14.77 3 16C3 19.31 7.03 22 12 22C16.97 22 21 19.31 21 16C21 14.77 20.87 13.57 20.64 12.36Z" />
                    <circle cx="9" cy="9" r="1" />
                    <circle cx="15" cy="9" r="1" />
                  </svg>
                ))}
              </div>
              <p className="mb-6 italic">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="flex items-center">
                <div className="mr-4">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
