"use client"

import { useState } from "react"
import { X, List, MapIcon, Share2, BookmarkPlus } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RestaurantGrid from "@/components/discover/restaurant-grid"
import MapSection from "@/components/discover/map-section"

interface CollectionDetailModalProps {
  collection: any
  isOpen: boolean
  onClose: () => void
}

export default function CollectionDetailModal({ collection, isOpen, onClose }: CollectionDetailModalProps) {
  const [viewMode, setViewMode] = useState<"list" | "map">("list")

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[90vw] md:max-w-[80vw] p-0 overflow-hidden max-h-[90vh] flex flex-col bg-[#1D2733] border-[#3D4A5C] text-gray-300">
        <div className="p-6 border-b border-[#3D4A5C] flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">{collection.title}</h2>
            <p className="text-gray-400">
              {collection.subtitle} • {collection.restaurantCount} restaurants
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="border-[#3D4A5C] text-gray-300 hover:bg-[#2A3542]">
              <BookmarkPlus className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm" className="border-[#3D4A5C] text-gray-300 hover:bg-[#2A3542]">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <Tabs defaultValue="list" className="w-full">
              <div className="flex justify-between items-center">
                <TabsList className="bg-[#2A3542]">
                  <TabsTrigger
                    value="list"
                    onClick={() => setViewMode("list")}
                    className="data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    <List className="h-4 w-4 mr-2" />
                    List View
                  </TabsTrigger>
                  <TabsTrigger
                    value="map"
                    onClick={() => setViewMode("map")}
                    className="data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    <MapIcon className="h-4 w-4 mr-2" />
                    Map View
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="list" className="mt-6">
                {collection.restaurants && collection.restaurants.length > 0 ? (
                  <RestaurantGrid restaurants={collection.restaurants} />
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-400">No restaurants in this collection yet.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="map" className="mt-6">
                <MapSection />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
