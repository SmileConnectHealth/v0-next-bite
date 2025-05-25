"use client"

import { useState } from "react"
import { Search, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DiscoverHeader() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="bg-[#1D2733] border-b border-[#3D4A5C]">
      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white text-center mb-2">Discover Restaurants</h1>
          <p className="text-gray-400 text-center mb-8">Find your next favorite dining spot</p>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search restaurants, cuisines, or dishes..."
                className="pl-12 pr-4 py-6 text-lg bg-[#171F29] border-[#3D4A5C] text-gray-300 placeholder:text-gray-500 focus:border-primary"
              />
            </div>

            <Select defaultValue="chicago">
              <SelectTrigger className="bg-[#171F29] border-[#3D4A5C] text-gray-300 sm:w-[200px]">
                <MapPin className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent className="bg-[#1D2733] border-[#3D4A5C]">
                <SelectItem value="chicago">Chicago, IL</SelectItem>
                <SelectItem value="newyork">New York, NY</SelectItem>
                <SelectItem value="losangeles">Los Angeles, CA</SelectItem>
                <SelectItem value="sanfrancisco">San Francisco, CA</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}
