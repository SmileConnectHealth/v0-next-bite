"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Plus, Minus, RotateCcw, Maximize2 } from "lucide-react"

// Mock restaurant data for map
const mapRestaurants = [
  { id: 1, name: "Pequod's Pizza", lat: 41.9242, lng: -87.6544, rating: 9.0 },
  { id: 2, name: "Lou Malnati's", lat: 41.8919, lng: -87.6278, rating: 8.8 },
  { id: 3, name: "Giordano's", lat: 41.8847, lng: -87.6212, rating: 8.5 },
  { id: 4, name: "Spacca Napoli", lat: 41.9631, lng: -87.6631, rating: 9.2 },
]

export default function MapSection() {
  const [zoom, setZoom] = useState(12)
  const [center, setCenter] = useState({ lat: 41.9242, lng: -87.6544 })
  const [isDragging, setIsDragging] = useState(false)

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 1, 18))
  }

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 1, 8))
  }

  const handleReset = () => {
    setZoom(12)
    setCenter({ lat: 41.9242, lng: -87.6544 })
  }

  return (
    <Card className="bg-[#1D2733] border-[#3D4A5C] overflow-hidden">
      <CardContent className="p-0">
        <div className="relative h-[500px] bg-gradient-to-br from-[#2A3542] to-[#1D2733]">
          {/* Map Background */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 800 500">
              {/* Grid pattern */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3D4A5C" strokeWidth="1" opacity="0.3" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Streets */}
              <path
                d="M 0 150 Q 200 140 400 150 T 800 160"
                stroke="#3D4A5C"
                strokeWidth="3"
                fill="none"
                opacity="0.6"
              />
              <path
                d="M 0 250 Q 300 240 600 250 T 800 260"
                stroke="#3D4A5C"
                strokeWidth="3"
                fill="none"
                opacity="0.6"
              />
              <path
                d="M 0 350 Q 250 340 500 350 T 800 360"
                stroke="#3D4A5C"
                strokeWidth="3"
                fill="none"
                opacity="0.6"
              />

              {/* Vertical streets */}
              <path
                d="M 200 0 Q 190 200 200 400 T 210 500"
                stroke="#3D4A5C"
                strokeWidth="2"
                fill="none"
                opacity="0.4"
              />
              <path
                d="M 400 0 Q 390 150 400 300 T 410 500"
                stroke="#3D4A5C"
                strokeWidth="2"
                fill="none"
                opacity="0.4"
              />
              <path
                d="M 600 0 Q 590 100 600 200 T 610 500"
                stroke="#3D4A5C"
                strokeWidth="2"
                fill="none"
                opacity="0.4"
              />
            </svg>
          </div>

          {/* Restaurant Markers */}
          {mapRestaurants.map((restaurant, index) => (
            <div
              key={restaurant.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{
                left: `${20 + index * 20}%`,
                top: `${30 + index * 15}%`,
              }}
            >
              <div className="relative">
                <div className="w-8 h-8 bg-orange-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-black/80 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                    <div className="font-medium">{restaurant.name}</div>
                    <div className="text-orange-400">🍔{restaurant.rating}</div>
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black/80"></div>
                </div>
              </div>
            </div>
          ))}

          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2">
            <Button
              size="sm"
              variant="outline"
              className="w-10 h-10 p-0 bg-white/90 border-gray-300 hover:bg-white"
              onClick={handleZoomIn}
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="w-10 h-10 p-0 bg-white/90 border-gray-300 hover:bg-white"
              onClick={handleZoomOut}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="w-10 h-10 p-0 bg-white/90 border-gray-300 hover:bg-white"
              onClick={handleReset}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" className="w-10 h-10 p-0 bg-white/90 border-gray-300 hover:bg-white">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Map Info */}
          <div className="absolute bottom-4 left-4 bg-black/80 text-white rounded-lg px-3 py-2">
            <div className="text-sm font-medium">Chicago Pizza Tour</div>
            <div className="text-xs text-gray-300">{mapRestaurants.length} restaurants</div>
          </div>

          {/* Zoom Level Indicator */}
          <div className="absolute bottom-4 right-4 bg-black/80 text-white rounded px-2 py-1 text-xs">Zoom: {zoom}</div>

          {/* Interactive overlay */}
          <div
            className={`absolute inset-0 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
          />
        </div>
      </CardContent>
    </Card>
  )
}
