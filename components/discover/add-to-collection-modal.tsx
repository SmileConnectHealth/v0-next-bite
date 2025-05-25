"use client"

import { useState } from "react"
import { X, Plus, Users, Lock, Globe } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import type { Restaurant } from "./restaurant-card"

interface AddToCollectionModalProps {
  restaurant: Restaurant
  isOpen: boolean
  onClose: () => void
}

// Mock existing collections
const existingCollections = [
  {
    id: 1,
    name: "Date Night Spots",
    category: "Romantic",
    privacy: "private",
    restaurantCount: 8,
    collaborators: ["Sarah", "Mike"],
  },
  {
    id: 2,
    name: "Chicago Pizza Tour",
    category: "Food Tour",
    privacy: "collaborative",
    restaurantCount: 12,
    collaborators: ["Jessica", "Alex", "Tom"],
  },
  {
    id: 3,
    name: "Business Lunch",
    category: "Professional",
    privacy: "private",
    restaurantCount: 5,
    collaborators: [],
  },
]

export default function AddToCollectionModal({ restaurant, isOpen, onClose }: AddToCollectionModalProps) {
  const [selectedCollections, setSelectedCollections] = useState<number[]>([])
  const [showCreateNew, setShowCreateNew] = useState(false)
  const [newCollection, setNewCollection] = useState({
    name: "",
    category: "",
    description: "",
    privacy: "private",
    collaborators: "",
  })
  const { toast } = useToast()

  const handleCollectionToggle = (collectionId: number) => {
    setSelectedCollections((prev) =>
      prev.includes(collectionId) ? prev.filter((id) => id !== collectionId) : [...prev, collectionId],
    )
  }

  const handleAddToCollections = () => {
    if (selectedCollections.length === 0 && !showCreateNew) {
      toast({
        title: "No collections selected",
        description: "Please select at least one collection or create a new one.",
        variant: "destructive",
      })
      return
    }

    // Mock adding to collections
    toast({
      title: "Restaurant added!",
      description: `${restaurant.name} has been added to ${selectedCollections.length} collection(s).`,
    })
    onClose()
  }

  const handleCreateCollection = () => {
    if (!newCollection.name.trim()) {
      toast({
        title: "Collection name required",
        description: "Please enter a name for your collection.",
        variant: "destructive",
      })
      return
    }

    // Mock creating collection
    toast({
      title: "Collection created!",
      description: `"${newCollection.name}" has been created and ${restaurant.name} has been added.`,
    })
    onClose()
  }

  const getPrivacyIcon = (privacy: string) => {
    switch (privacy) {
      case "private":
        return <Lock className="h-3 w-3" />
      case "collaborative":
        return <Users className="h-3 w-3" />
      case "public":
        return <Globe className="h-3 w-3" />
      default:
        return <Lock className="h-3 w-3" />
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] bg-[#1D2733] border-[#3D4A5C] text-gray-300 max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center justify-between">
            Add to Collection
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Restaurant Info */}
          <div className="flex items-center space-x-3 p-3 bg-[#2A3542] rounded-lg">
            <div className="w-12 h-12 bg-[#3D4A5C] rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold text-white">{restaurant.name[0]}</span>
            </div>
            <div>
              <h3 className="font-medium text-white">{restaurant.name}</h3>
              <p className="text-sm text-gray-400">
                {restaurant.cuisine} • {restaurant.distance}
              </p>
            </div>
          </div>

          {/* Existing Collections */}
          <div>
            <h3 className="font-medium text-white mb-3">Add to existing collections</h3>
            <div className="space-y-2 max-h-[200px] overflow-y-auto">
              {existingCollections.map((collection) => (
                <div
                  key={collection.id}
                  className="flex items-center space-x-3 p-3 bg-[#2A3542] rounded-lg hover:bg-[#3D4A5C] transition-colors cursor-pointer"
                  onClick={() => handleCollectionToggle(collection.id)}
                >
                  <Checkbox
                    checked={selectedCollections.includes(collection.id)}
                    onChange={() => handleCollectionToggle(collection.id)}
                    className="border-[#3D4A5C] data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-white">{collection.name}</span>
                      {getPrivacyIcon(collection.privacy)}
                      <Badge variant="outline" className="text-xs border-[#3D4A5C] text-gray-400">
                        {collection.category}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <span>{collection.restaurantCount} restaurants</span>
                      {collection.collaborators.length > 0 && (
                        <span>• {collection.collaborators.length} collaborators</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Create New Collection */}
          <div>
            <Button
              variant="outline"
              className="w-full border-[#3D4A5C] text-gray-300 hover:bg-[#2A3542] hover:text-white"
              onClick={() => setShowCreateNew(!showCreateNew)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Collection
            </Button>

            {showCreateNew && (
              <div className="mt-4 space-y-4 p-4 bg-[#2A3542] rounded-lg">
                <div>
                  <Label htmlFor="collection-name" className="text-gray-300">
                    Collection Name *
                  </Label>
                  <Input
                    id="collection-name"
                    value={newCollection.name}
                    onChange={(e) => setNewCollection({ ...newCollection, name: e.target.value })}
                    placeholder="e.g., Weekend Brunch Spots"
                    className="mt-1 bg-[#171F29] border-[#3D4A5C] text-gray-300"
                  />
                </div>

                <div>
                  <Label htmlFor="collection-category" className="text-gray-300">
                    Category
                  </Label>
                  <Select
                    value={newCollection.category}
                    onValueChange={(value) => setNewCollection({ ...newCollection, category: value })}
                  >
                    <SelectTrigger className="mt-1 bg-[#171F29] border-[#3D4A5C] text-gray-300">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1D2733] border-[#3D4A5C]">
                      <SelectItem value="romantic">Romantic</SelectItem>
                      <SelectItem value="family">Family Friendly</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="casual">Casual Dining</SelectItem>
                      <SelectItem value="fine-dining">Fine Dining</SelectItem>
                      <SelectItem value="food-tour">Food Tour</SelectItem>
                      <SelectItem value="special-occasion">Special Occasion</SelectItem>
                      <SelectItem value="quick-bites">Quick Bites</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="collection-description" className="text-gray-300">
                    Description
                  </Label>
                  <Textarea
                    id="collection-description"
                    value={newCollection.description}
                    onChange={(e) => setNewCollection({ ...newCollection, description: e.target.value })}
                    placeholder="Describe your collection..."
                    className="mt-1 bg-[#171F29] border-[#3D4A5C] text-gray-300"
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="collection-privacy" className="text-gray-300">
                    Privacy
                  </Label>
                  <Select
                    value={newCollection.privacy}
                    onValueChange={(value) => setNewCollection({ ...newCollection, privacy: value })}
                  >
                    <SelectTrigger className="mt-1 bg-[#171F29] border-[#3D4A5C] text-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1D2733] border-[#3D4A5C]">
                      <SelectItem value="private">
                        <div className="flex items-center space-x-2">
                          <Lock className="h-3 w-3" />
                          <span>Private - Only you</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="collaborative">
                        <div className="flex items-center space-x-2">
                          <Users className="h-3 w-3" />
                          <span>Collaborative - Invite friends</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="public">
                        <div className="flex items-center space-x-2">
                          <Globe className="h-3 w-3" />
                          <span>Public - Anyone can view</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {newCollection.privacy === "collaborative" && (
                  <div>
                    <Label htmlFor="collaborators" className="text-gray-300">
                      Invite Collaborators
                    </Label>
                    <Input
                      id="collaborators"
                      value={newCollection.collaborators}
                      onChange={(e) => setNewCollection({ ...newCollection, collaborators: e.target.value })}
                      placeholder="Enter email addresses separated by commas"
                      className="mt-1 bg-[#171F29] border-[#3D4A5C] text-gray-300"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1 border-[#3D4A5C] hover:bg-[#2A3542]">
              Cancel
            </Button>
            <Button
              onClick={showCreateNew ? handleCreateCollection : handleAddToCollections}
              className="flex-1"
              disabled={!showCreateNew && selectedCollections.length === 0}
            >
              {showCreateNew ? "Create & Add" : "Add to Collections"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
