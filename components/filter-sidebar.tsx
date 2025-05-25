"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

export default function FilterSidebar() {
  const [priceRange, setPriceRange] = useState([0, 100])
  const [distance, setDistance] = useState([5])

  const cuisines = [
    "Italian",
    "Japanese",
    "Mexican",
    "American",
    "Indian",
    "Chinese",
    "Thai",
    "Mediterranean",
    "Vietnamese",
    "French",
  ]

  const dietaryOptions = ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Nut-Free", "Halal", "Kosher"]

  const features = [
    "Outdoor Seating",
    "Delivery",
    "Takeout",
    "Reservations",
    "Private Dining",
    "Happy Hour",
    "Live Music",
    "BYOB",
  ]

  const mealTypes = ["Breakfast", "Brunch", "Lunch", "Dinner", "Dessert", "Coffee & Tea", "Bar"]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-4">Price Range</h3>
        <div className="space-y-4">
          <Slider value={priceRange} min={0} max={100} step={1} onValueChange={setPriceRange} />
          <div className="flex justify-between text-sm">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
          <div className="flex justify-between">
            {["$", "$$", "$$$", "$$$$"].map((price, index) => (
              <Button key={index} variant="outline" size="sm" className="min-w-0 px-3">
                {price}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">Distance</h3>
        <div className="space-y-4">
          <Slider value={distance} min={0.5} max={10} step={0.5} onValueChange={setDistance} />
          <div className="flex justify-between text-sm">
            <span>0.5 mi</span>
            <span>{distance[0]} mi</span>
            <span>10 mi</span>
          </div>
        </div>
      </div>

      <Accordion type="multiple" defaultValue={["cuisines"]} className="w-full">
        <AccordionItem value="cuisines">
          <AccordionTrigger className="py-3">Cuisines</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {cuisines.map((cuisine, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox id={`cuisine-${index}`} />
                  <Label htmlFor={`cuisine-${index}`} className="font-normal">
                    {cuisine}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="dietary">
          <AccordionTrigger className="py-3">Dietary</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {dietaryOptions.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox id={`dietary-${index}`} />
                  <Label htmlFor={`dietary-${index}`} className="font-normal">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="features">
          <AccordionTrigger className="py-3">Features</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox id={`feature-${index}`} />
                  <Label htmlFor={`feature-${index}`} className="font-normal">
                    {feature}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="mealTypes">
          <AccordionTrigger className="py-3">Meal Types</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {mealTypes.map((type, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox id={`meal-${index}`} />
                  <Label htmlFor={`meal-${index}`} className="font-normal">
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div>
        <h3 className="font-medium mb-3">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {["Pizza", "Sushi", "Burgers", "Tacos", "Pasta", "Ramen", "Brunch", "Cocktails"].map((tag, index) => (
            <Badge key={index} variant="outline" className="cursor-pointer hover:bg-muted">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="pt-4 flex gap-2">
        <Button variant="outline" className="flex-1">
          Reset
        </Button>
        <Button className="flex-1">Apply Filters</Button>
      </div>
    </div>
  )
}
