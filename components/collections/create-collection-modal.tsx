"use client"

import { useState } from "react"
import { X, Lock, Globe } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface CreateCollectionModalProps {
  isOpen: boolean
  onClose: () => void
  onCollectionCreate: (collection: any) => void
}

export default function CreateCollectionModal({ isOpen, onClose, onCollectionCreate }: CreateCollectionModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    privacy: "private",
  })
  const { toast } = useToast()

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Collection name required",
        description: "Please enter a name for your collection.",
        variant: "destructive",
      })
      return
    }

    if (!formData.category) {
      toast({
        title: "Category required",
        description: "Please select a category for your collection.",
        variant: "destructive",
      })
      return
    }

    const newCollection = {
      id: Date.now(),
      name: formData.name.trim(),
      description: formData.description.trim(),
      category: formData.category,
      privacy: formData.privacy,
      restaurantCount: 0,
      lastUpdated: new Date().toISOString().split("T")[0],
      coverImage: "/placeholder.svg?height=200&width=300",
      recentRestaurants: [],
    }

    onCollectionCreate(newCollection)

    toast({
      title: "Collection created!",
      description: `"${formData.name}" has been created successfully.`,
    })

    // Reset form
    setFormData({
      name: "",
      category: "",
      description: "",
      privacy: "private",
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] bg-[#1D2733] border-[#3D4A5C] text-gray-300">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center justify-between">
            Create New Collection
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Collection Name */}
          <div>
            <Label htmlFor="collection-name" className="text-gray-300">
              Collection Name *
            </Label>
            <Input
              id="collection-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Weekend Brunch Spots"
              className="mt-1 bg-[#171F29] border-[#3D4A5C] text-gray-300"
              maxLength={50}
            />
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="collection-category" className="text-gray-300">
              Category *
            </Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
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
                <SelectItem value="discovery">Discovery</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="collection-description" className="text-gray-300">
              Description
            </Label>
            <Textarea
              id="collection-description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your collection..."
              className="mt-1 bg-[#171F29] border-[#3D4A5C] text-gray-300"
              rows={3}
              maxLength={200}
            />
            <div className="text-right text-xs text-gray-500 mt-1">{formData.description.length}/200 characters</div>
          </div>

          {/* Privacy Settings */}
          <div>
            <Label className="text-gray-300 mb-3 block">Privacy Settings</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="private"
                  name="privacy"
                  checked={formData.privacy === "private"}
                  onChange={() => setFormData({ ...formData, privacy: "private" })}
                  className="text-primary"
                />
                <label htmlFor="private" className="flex items-center space-x-2 text-gray-300 cursor-pointer">
                  <Lock className="h-4 w-4" />
                  <span>Private - Only you can view and edit</span>
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="public"
                  name="privacy"
                  checked={formData.privacy === "public"}
                  onChange={() => setFormData({ ...formData, privacy: "public" })}
                  className="text-primary"
                />
                <label htmlFor="public" className="flex items-center space-x-2 text-gray-300 cursor-pointer">
                  <Globe className="h-4 w-4" />
                  <span>Public - Anyone can view, only you can edit</span>
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1 border-[#3D4A5C] hover:bg-[#2A3542]">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="flex-1">
              Create
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
