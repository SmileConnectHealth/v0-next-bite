"use client"

import { useState } from "react"
import Link from "next/link"
import { X, List, Grid3X3, MapIcon, Search, Filter } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RestaurantGrid from "@/components/discover/restaurant-grid"
import RestaurantGallery from "@/components/profile/restaurant-gallery"
import MapSection from "@/components/discover/map-section"
import { restaurantData } from "@/data/restaurant-data"

interface CollectionModalProps {
  collection: any
  isOpen: boolean
  onClose: () => void
}

export default function CollectionModal({ collection, isOpen, onClose }: CollectionModalProps) {
  const [viewMode, setViewMode] = useState<"list" | "gallery" | "map">("list")
  const [searchQuery, setSearchQuery] = useState("")

  // Mock restaurants for the collection
  const collectionRestaurants = restaurantData.slice(0, collection.restaurantCount || 6)

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] p-0 overflow-hidden max-h-[90vh] flex flex-col bg-[#1D2733] border-[#3D4A5C] text-gray-300">
        {/* Header */}
        <div className="p-6 border-b border-[#3D4A5C] flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">{collection.name}</h2>
            <p className="text-gray-400">
              {collection.description} • {collection.restaurantCount} restaurants
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Link href={`/collections/${collection.id}`}>
              <Button variant="outline" size="sm" className="border-[#3D4A5C] text-gray-300 hover:bg-[#2A3542]">
                View Full Collection
              </Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Search and View Toggle */}
        <div className="p-6 border-b border-[#3D4A5C]">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search restaurants..."
                className="pl-10 bg-[#171F29] border-[#3D4A5C] text-gray-300"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="border-[#3D4A5C] text-gray-300 hover:bg-[#2A3542]">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>

              <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)} className="w-auto">
                <TabsList className="bg-[#2A3542] border border-[#3D4A5C]">
                  <TabsTrigger
                    value="list"
                    className="data-[state=active]:bg-primary data-[state=active]:text-white"
                    size="sm"
                  >
                    <List className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger
                    value="gallery"
                    className="data-[state=active]:bg-primary data-[state=active]:text-white"
                    size="sm"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger
                    value="map"
                    className="data-[state=active]:bg-primary data-[state=active]:text-white"
                    size="sm"
                  >
                    <MapIcon className="h-4 w-4" />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {viewMode === "list" && <RestaurantGrid restaurants={collectionRestaurants} />}
          {viewMode === "gallery" && <RestaurantGallery restaurants={collectionRestaurants} />}
          {viewMode === "map" && <MapSection />}
        </div>
      </DialogContent>
    </Dialog>
  )
}
