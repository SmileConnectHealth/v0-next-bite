"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Minus, Plus, MapPin, Layers, Navigation, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MapSection() {
  const [zoom, setZoom] = useState(14)
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })
  const mapRef = useRef<HTMLDivElement>(null)

  const restaurants = [
    { id: 1, name: "Alinea", lat: 30, lng: 25, rating: 4.9 },
    { id: 2, name: "Girl & The Goat", lat: 45, lng: 50, rating: 4.7 },
    { id: 3, name: "Au Cheval", lat: 65, lng: 30, rating: 4.6 },
    { id: 4, name: "Bavette's", lat: 20, lng: 70, rating: 4.8 },
    { id: 5, name: "The Purple Pig", lat: 75, lng: 65, rating: 4.5 },
  ]

  const increaseZoom = () => {
    if (zoom < 20) setZoom(zoom + 1)
  }

  const decreaseZoom = () => {
    if (zoom > 1) setZoom(zoom - 1)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    setPosition({
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y,
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    const handleMouseUpGlobal = () => {
      setIsDragging(false)
    }

    window.addEventListener("mouseup", handleMouseUpGlobal)
    return () => {
      window.removeEventListener("mouseup", handleMouseUpGlobal)
    }
  }, [])

  return (
    <div className="relative w-full h-[500px] bg-[#242F3E] overflow-hidden">
      {/* Map Container */}
      <div
        ref={mapRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        style={{
          backgroundSize: `${40 * (zoom / 10)}px ${40 * (zoom / 10)}px`,
          backgroundImage:
            "linear-gradient(to right, #2A3542 1px, transparent 1px), linear-gradient(to bottom, #2A3542 1px, transparent 1px)",
          transform: `translate(${position.x}px, ${position.y}px) scale(${zoom / 10})`,
          transition: isDragging ? "none" : "transform 0.3s ease-out",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Major Roads */}
        <div className="absolute left-0 right-0 top-1/2 h-[3px] bg-[#3D4A5C]"></div>
        <div className="absolute left-0 right-0 top-1/4 h-[2px] bg-[#3D4A5C]"></div>
        <div className="absolute left-0 right-0 top-3/4 h-[2px] bg-[#3D4A5C]"></div>
        <div className="absolute top-0 bottom-0 left-1/3 w-[3px] bg-[#3D4A5C]"></div>
        <div className="absolute top-0 bottom-0 left-2/3 w-[2px] bg-[#3D4A5C]"></div>

        {/* Water Features */}
        <div className="absolute right-0 top-0 bottom-0 w-1/5 bg-[#1A2632] opacity-70"></div>

        {/* Parks/Green Areas */}
        <div className="absolute left-1/4 top-1/4 w-[100px] h-[80px] bg-[#2D3F34] rounded-sm opacity-60"></div>
        <div className="absolute right-1/3 bottom-1/4 w-[120px] h-[60px] bg-[#2D3F34] rounded-sm opacity-60"></div>

        {/* Street names */}
        <div className="absolute left-1/2 top-[48%] transform -translate-x-1/2 text-[#8596AB] text-xs whitespace-nowrap">
          W Cornelia Ave
        </div>
        <div className="absolute left-[31%] top-1/2 transform -translate-y-1/2 -rotate-90 text-[#8596AB] text-xs whitespace-nowrap">
          N Western Ave
        </div>
      </div>

      {/* Restaurant Markers - These stay fixed relative to the viewport */}
      <div className="absolute inset-0 pointer-events-none">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="absolute flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2 z-10"
            style={{
              left: `${restaurant.lat}%`,
              top: `${restaurant.lng}%`,
              transform: `translate(${position.x / (zoom / 10)}px, ${position.y / (zoom / 10)}px)`,
            }}
          >
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
              {restaurant.name.charAt(0)}
            </div>
            <div className="w-2 h-2 bg-primary rounded-full mt-[-2px]"></div>
            <div className="absolute top-full mt-1 bg-black/70 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
              {restaurant.name} ({restaurant.rating})
            </div>
          </div>
        ))}

        {/* Current location indicator */}
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
          style={{
            left: `50%`,
            top: `50%`,
            transform: `translate(${position.x / (zoom / 10)}px, ${position.y / (zoom / 10)}px)`,
          }}
        >
          <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
          <div className="w-12 h-12 bg-blue-500 rounded-full absolute -top-4 -left-4 opacity-20 animate-pulse"></div>
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute right-4 top-4 flex flex-col bg-[#1D2733] rounded-md shadow-md">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-b-none border-b border-[#3D4A5C] text-gray-300 hover:text-white hover:bg-[#2A3542]"
          onClick={increaseZoom}
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-t-none text-gray-300 hover:text-white hover:bg-[#2A3542]"
          onClick={decreaseZoom}
        >
          <Minus className="h-4 w-4" />
        </Button>
      </div>

      {/* Additional Map Controls */}
      <div className="absolute left-4 top-4 flex flex-col gap-2">
        <Button
          variant="outline"
          size="icon"
          className="bg-[#1D2733]/90 border-[#3D4A5C] text-gray-300 hover:bg-[#2A3542]"
        >
          <Layers className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-[#1D2733]/90 border-[#3D4A5C] text-gray-300 hover:bg-[#2A3542]"
        >
          <Navigation className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-[#1D2733]/90 border-[#3D4A5C] text-gray-300 hover:bg-[#2A3542]"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {/* Map UI Elements */}
      <div className="absolute left-4 bottom-4 bg-[#1D2733] rounded-md p-2 text-[#8596AB] text-xs">
        Map data ©2025 Google
      </div>

      <div className="absolute right-4 bottom-4 flex space-x-2">
        <div className="bg-[#1D2733] rounded-md p-2 text-[#8596AB] text-xs flex items-center">
          <MapPin className="h-3 w-3 mr-1" />
          Your location
        </div>
      </div>

      {/* Dragging Instructions */}
      {!isDragging && (
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/50 text-white text-sm py-2 px-4 rounded-full pointer-events-none opacity-70">
          Click and drag to explore the map
        </div>
      )}
    </div>
  )
}
