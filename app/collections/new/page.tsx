"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, Users, Lock, Globe } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function NewCollectionPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    privacy: "private",
  })

  const categories = [
    { value: "romantic", label: "Romantic" },
    { value: "family", label: "Family Friendly" },
    { value: "business", label: "Business" },
    { value: "casual", label: "Casual Dining" },
    { value: "fine-dining", label: "Fine Dining" },
    { value: "food-tour", label: "Food Tour" },
    { value: "special-occasion", label: "Special Occasion" },
    { value: "quick-bites", label: "Quick Bites" },
    { value: "discovery", label: "Discovery" },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleCreateCollection = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Collection name required",
        description: "Please enter a name for your collection.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Collection created!",
        description: `"${formData.name}" has been created successfully.`,
      })
      router.push("/collections")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#171F29] py-8">
      <div className="container max-w-3xl">
        <div className="flex items-center mb-6">
          <Link href="/collections" className="mr-4">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-white">Create New Collection</h1>
        </div>

        <Card className="bg-[#1D2733] border-[#3D4A5C]">
          <CardContent className="p-6 space-y-6">
            <div>
              <Label htmlFor="name" className="text-gray-300 text-lg">
                Collection Name *
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Chicago Pizza Tour"
                className="mt-2 bg-[#171F29] border-[#3D4A5C] text-gray-300"
              />
            </div>

            <div>
              <Label htmlFor="category" className="text-gray-300 text-lg">
                Category
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="mt-2 bg-[#171F29] border-[#3D4A5C] text-gray-300">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-[#1D2733] border-[#3D4A5C]">
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description" className="text-gray-300 text-lg">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your collection..."
                className="mt-2 bg-[#171F29] border-[#3D4A5C] text-gray-300"
                rows={4}
              />
            </div>

            <div>
              <Label className="text-gray-300 text-lg mb-3 block">Privacy</Label>
              <RadioGroup
                value={formData.privacy}
                onValueChange={(value) => setFormData({ ...formData, privacy: value })}
                className="space-y-4"
              >
                <div className="flex items-start space-x-3 p-4 rounded-md bg-[#2A3542]">
                  <RadioGroupItem value="private" id="privacy-private" className="border-[#3D4A5C] text-primary mt-1" />
                  <div>
                    <Label htmlFor="privacy-private" className="text-white font-medium flex items-center">
                      <Lock className="h-4 w-4 mr-2" />
                      Private
                    </Label>
                    <p className="text-sm text-gray-400 mt-1">Only you can view and edit this collection</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 rounded-md bg-[#2A3542]">
                  <RadioGroupItem
                    value="collaborative"
                    id="privacy-collaborative"
                    className="border-[#3D4A5C] text-primary mt-1"
                  />
                  <div>
                    <Label htmlFor="privacy-collaborative" className="text-white font-medium flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      Collaborative
                    </Label>
                    <p className="text-sm text-gray-400 mt-1">
                      Invite friends to contribute to this collection. You control who can edit.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 rounded-md bg-[#2A3542]">
                  <RadioGroupItem value="public" id="privacy-public" className="border-[#3D4A5C] text-primary mt-1" />
                  <div>
                    <Label htmlFor="privacy-public" className="text-white font-medium flex items-center">
                      <Globe className="h-4 w-4 mr-2" />
                      Public
                    </Label>
                    <p className="text-sm text-gray-400 mt-1">
                      Anyone can view this collection, but only you can edit it
                    </p>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button
                variant="outline"
                className="border-[#3D4A5C] text-gray-300 hover:bg-[#2A3542]"
                onClick={() => router.push("/collections")}
              >
                Cancel
              </Button>
              <Button onClick={handleCreateCollection} disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Collection"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
