import Image from "next/image"

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Discover",
      description: "Browse nearby restaurants with our advanced filtering system.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      number: "02",
      title: "Explore",
      description: "View detailed restaurant pages with reviews, photos, and menus.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      number: "03",
      title: "Decide",
      description: "Use friend recommendations and community ratings to choose where to eat.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      number: "04",
      title: "Share",
      description: "Write reviews, upload photos, and share your experience with friends.",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Finding your next favorite restaurant has never been easier
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="relative mb-6 rounded-lg overflow-hidden">
                <Image
                  src={step.image || "/placeholder.svg"}
                  alt={step.title}
                  width={400}
                  height={300}
                  className="object-cover aspect-[4/3]"
                />
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  {step.number}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
