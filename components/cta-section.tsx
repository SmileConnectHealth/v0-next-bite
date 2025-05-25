import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CtaSection() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="bg-primary text-primary-foreground rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to discover your next favorite restaurant?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of food lovers who are sharing and discovering amazing restaurants every day.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" variant="secondary">
                Sign Up Now
              </Button>
            </Link>
            <Link href="/discover">
              <Button
                size="lg"
                variant="outline"
                className="bg-primary-foreground/10 hover:bg-primary-foreground/20 border-primary-foreground/20"
              >
                Explore Restaurants
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
