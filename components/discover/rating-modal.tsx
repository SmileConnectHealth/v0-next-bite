"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import type { Restaurant } from "./restaurant-card"

interface RatingModalProps {
  restaurant: Restaurant
  isOpen: boolean
  onClose: () => void
  onRatingSubmit: (rating: number, review: string) => void
}

export default function RatingModal({ restaurant, isOpen, onClose, onRatingSubmit }: RatingModalProps) {
  const [rating, setRating] = useState([7.5])
  const [review, setReview] = useState("")
  const { toast } = useToast()

  const handleSubmit = () => {
    if (review.trim().length < 10) {
      toast({
        title: "Review too short",
        description: "Please write at least 10 characters for your review.",
        variant: "destructive",
      })
      return
    }

    onRatingSubmit(rating[0], review.trim())
    toast({
      title: "Rating submitted!",
      description: `Your ${rating[0]}/10 rating for ${restaurant.name} has been saved.`,
    })

    // Reset form
    setRating([7.5])
    setReview("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] bg-[#1D2733] border-[#3D4A5C] text-gray-300">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center justify-between">
            Rate {restaurant.name}
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

          {/* Rating Slider */}
          <div>
            <Label className="text-gray-300 mb-3 block">Your Rating</Label>
            <div className="space-y-4">
              <Slider value={rating} onValueChange={setRating} min={1} max={10} step={0.1} className="w-full" />
              <div className="flex items-center justify-center space-x-2">
                <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.43 2 5.23 3.54 3.01 6H21C18.78 3.54 15.57 2 12 2ZM21 8H3C3 8.9 3.12 9.78 3.34 10.64C4.78 11.43 6.96 12 12 12C17.04 12 19.22 11.43 20.66 10.64C20.88 9.78 21 8.9 21 8ZM20.64 12.36C19.27 13.24 16.88 14 12 14C7.12 14 4.73 13.24 3.36 12.36C3.13 13.57 3 14.77 3 16C3 19.31 7.03 22 12 22C16.97 22 21 19.31 21 16C21 14.77 20.87 13.57 20.64 12.36Z" />
                  <circle cx="9" cy="9" r="1" />
                  <circle cx="15" cy="9" r="1" />
                </svg>
                <span className="text-2xl font-bold text-white">{rating[0].toFixed(1)}/10</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Terrible</span>
                <span>Amazing</span>
              </div>
            </div>
          </div>

          {/* Review Text */}
          <div>
            <Label htmlFor="review" className="text-gray-300">
              Your Review
            </Label>
            <Textarea
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share your experience at this restaurant..."
              className="mt-2 bg-[#171F29] border-[#3D4A5C] text-gray-300 min-h-[100px]"
              maxLength={500}
            />
            <div className="text-right text-xs text-gray-500 mt-1">{review.length}/500 characters</div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1 border-[#3D4A5C] hover:bg-[#2A3542]">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="flex-1" disabled={review.trim().length < 10}>
              Submit Rating
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
