"use client"

import { useState } from "react"
import EnhancedSearch from "@/components/trending/enhanced-search"
import FeaturedCollections from "@/components/trending/featured-collections"
import TrendingPlaces from "@/components/trending/trending-places"
import FriendsActivityFeed from "@/components/trending/friends-activity-feed"
import CollectionDetailModal from "@/components/trending/collection-detail-modal"
import { featuredCollectionsData } from "@/data/featured-collections-data"
import { restaurantData } from "@/data/restaurant-data"
import { friendsActivityData } from "@/data/friends-activity-data"

export default function TrendingPage() {
  const [selectedCollection, setSelectedCollection] = useState<any>(null)
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState("Chicago, IL")

  const handleCollectionClick = (collection: any) => {
    setSelectedCollection(collection)
    setIsCollectionModalOpen(true)
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#171F29]">
      <EnhancedSearch />

      <div className="container py-8">
        <FeaturedCollections
          collections={featuredCollectionsData}
          location={selectedLocation}
          onLocationChange={setSelectedLocation}
          onCollectionClick={handleCollectionClick}
        />

        <TrendingPlaces restaurants={restaurantData.slice(0, 6)} />

        <FriendsActivityFeed activities={friendsActivityData} />
      </div>

      {selectedCollection && (
        <CollectionDetailModal
          collection={selectedCollection}
          isOpen={isCollectionModalOpen}
          onClose={() => setIsCollectionModalOpen(false)}
        />
      )}
    </div>
  )
}
