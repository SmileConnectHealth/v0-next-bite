"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"

export default function PreferencesSettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [preferences, setPreferences] = useState({
    cuisines: ["Italian", "Asian", "Mexican"],
    dietaryRestrictions: ["Vegetarian"],
    searchRadius: [5],
    locationSharing: "always",
    reviewVisibility: "public",
    friendVisibility: "friends",
  })

  const cuisineTypes = [
    "Italian",
    "Asian",
    "Mexican",
    "American",
    "Mediterranean",
    "Indian",
    "French",
    "Middle Eastern",
    "Vegetarian",
  ]

  const dietaryRestrictions = [
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Dairy-Free",
    "Nut-Free",
    "Halal",
    "Kosher",
    "Pescatarian",
  ]

  const toggleCuisine = (cuisine: string) => {
    setPreferences((prev) => ({
      ...prev,
      cuisines: prev.cuisines.includes(cuisine)
        ? prev.cuisines.filter((c) => c !== cuisine)
        : [...prev.cuisines, cuisine],
    }))
  }

  const toggleDietaryRestriction = (restriction: string) => {
    setPreferences((prev) => ({
      ...prev,
      dietaryRestrictions: prev.dietaryRestrictions.includes(restriction)
        ? prev.dietaryRestrictions.filter((r) => r !== restriction)
        : [...prev.dietaryRestrictions, restriction],
    }))
  }

  const handleSave = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Preferences updated",
        description: "Your preferences have been updated successfully.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-white mb-6">Food Preferences</h2>

        <div className="space-y-6">
          <div>
            <Label className="text-gray-300 mb-3 block">Favorite Cuisines</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {cuisineTypes.map((cuisine) => (
                <div key={cuisine} className="flex items-center space-x-2">
                  <Checkbox
                    id={`cuisine-${cuisine}`}
                    checked={preferences.cuisines.includes(cuisine)}
                    onCheckedChange={() => toggleCuisine(cuisine)}
                    className="border-[#3D4A5C] data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <Label htmlFor={`cuisine-${cuisine}`} className="text-sm text-gray-300 cursor-pointer">
                    {cuisine}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-gray-300 mb-3 block">Dietary Restrictions</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {dietaryRestrictions.map((restriction) => (
                <div key={restriction} className="flex items-center space-x-2">
                  <Checkbox
                    id={`restriction-${restriction}`}
                    checked={preferences.dietaryRestrictions.includes(restriction)}
                    onCheckedChange={() => toggleDietaryRestriction(restriction)}
                    className="border-[#3D4A5C] data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <Label htmlFor={`restriction-${restriction}`} className="text-sm text-gray-300 cursor-pointer">
                    {restriction}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-[#3D4A5C]" />

      <div>
        <h2 className="text-xl font-semibold text-white mb-6">Location Settings</h2>

        <div className="space-y-6">
          <div>
            <Label className="text-gray-300 mb-3 block">Default Search Radius</Label>
            <div className="space-y-4">
              <Slider
                value={preferences.searchRadius}
                min={1}
                max={20}
                step={1}
                onValueChange={(value) => setPreferences({ ...preferences, searchRadius: value })}
              />
              <div className="flex justify-between text-sm text-gray-400">
                <span>1 mile</span>
                <span>{preferences.searchRadius[0]} miles</span>
                <span>20 miles</span>
              </div>
            </div>
          </div>

          <div>
            <Label className="text-gray-300 mb-3 block">Location Sharing</Label>
            <RadioGroup
              value={preferences.locationSharing}
              onValueChange={(value) => setPreferences({ ...preferences, locationSharing: value })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="always" id="location-always" className="border-[#3D4A5C] text-primary" />
                <Label htmlFor="location-always" className="text-gray-300">
                  Always (Recommended for better restaurant suggestions)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="while-using"
                  id="location-while-using"
                  className="border-[#3D4A5C] text-primary"
                />
                <Label htmlFor="location-while-using" className="text-gray-300">
                  Only while using the app
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="never" id="location-never" className="border-[#3D4A5C] text-primary" />
                <Label htmlFor="location-never" className="text-gray-300">
                  Never
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>

      <Separator className="bg-[#3D4A5C]" />

      <div>
        <h2 className="text-xl font-semibold text-white mb-6">Review Settings</h2>

        <div className="space-y-6">
          <div>
            <Label className="text-gray-300 mb-3 block">Review Visibility</Label>
            <RadioGroup
              value={preferences.reviewVisibility}
              onValueChange={(value) => setPreferences({ ...preferences, reviewVisibility: value })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="public" id="review-public" className="border-[#3D4A5C] text-primary" />
                <Label htmlFor="review-public" className="text-gray-300">
                  Public (Anyone can see your reviews)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="friends" id="review-friends" className="border-[#3D4A5C] text-primary" />
                <Label htmlFor="review-friends" className="text-gray-300">
                  Friends Only
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="private" id="review-private" className="border-[#3D4A5C] text-primary" />
                <Label htmlFor="review-private" className="text-gray-300">
                  Private (Only visible to you)
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label className="text-gray-300 mb-3 block">Friend Visibility</Label>
            <RadioGroup
              value={preferences.friendVisibility}
              onValueChange={(value) => setPreferences({ ...preferences, friendVisibility: value })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="public" id="friend-public" className="border-[#3D4A5C] text-primary" />
                <Label htmlFor="friend-public" className="text-gray-300">
                  Public (Anyone can see your friends)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="friends" id="friend-friends" className="border-[#3D4A5C] text-primary" />
                <Label htmlFor="friend-friends" className="text-gray-300">
                  Friends Only (Only your friends can see your other friends)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="private" id="friend-private" className="border-[#3D4A5C] text-primary" />
                <Label htmlFor="friend-private" className="text-gray-300">
                  Private (Only visible to you)
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <Button variant="outline" className="border-[#3D4A5C] text-gray-300 hover:bg-[#2A3542]">
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  )
}
