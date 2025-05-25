"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Camera, Trash2, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ProfileSettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    location: "Chicago, IL",
    bio: "Food enthusiast and restaurant explorer. Always on the hunt for the next great meal.",
    phone: "+1 (555) 123-4567",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData({ ...profileData, [name]: value })
  }

  const handleSave = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-white mb-6">Profile Information</h2>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-32 w-32 border-2 border-[#3D4A5C]">
              <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Profile" />
              <AvatarFallback className="text-3xl bg-[#2A3542] text-white">JD</AvatarFallback>
            </Avatar>

            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="border-[#3D4A5C] text-gray-300 hover:bg-[#2A3542]">
                <Camera className="h-4 w-4 mr-2" />
                Change
              </Button>
              <Button variant="outline" size="sm" className="border-[#3D4A5C] text-red-400 hover:bg-[#2A3542]">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex-1 space-y-4 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-gray-300">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  className="mt-1 bg-[#171F29] border-[#3D4A5C] text-gray-300"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-300">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  className="mt-1 bg-[#171F29] border-[#3D4A5C] text-gray-300"
                />
              </div>

              <div>
                <Label htmlFor="location" className="text-gray-300">
                  Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  value={profileData.location}
                  onChange={handleInputChange}
                  className="mt-1 bg-[#171F29] border-[#3D4A5C] text-gray-300"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-gray-300">
                  Phone Number (Optional)
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  className="mt-1 bg-[#171F29] border-[#3D4A5C] text-gray-300"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bio" className="text-gray-300">
                Bio
              </Label>
              <Textarea
                id="bio"
                name="bio"
                value={profileData.bio}
                onChange={handleInputChange}
                className="mt-1 bg-[#171F29] border-[#3D4A5C] text-gray-300"
                rows={4}
              />
              <p className="text-xs text-gray-500 mt-1">Brief description for your profile.</p>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-[#3D4A5C]" />

      <div>
        <h2 className="text-xl font-semibold text-white mb-6">Social Links</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <Input
              id="facebook"
              name="facebook"
              placeholder="Facebook URL"
              value={profileData.facebook}
              onChange={handleInputChange}
              className="pl-10 bg-[#171F29] border-[#3D4A5C] text-gray-300"
            />
          </div>

          <div className="relative">
            <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <Input
              id="twitter"
              name="twitter"
              placeholder="Twitter URL"
              value={profileData.twitter}
              onChange={handleInputChange}
              className="pl-10 bg-[#171F29] border-[#3D4A5C] text-gray-300"
            />
          </div>

          <div className="relative">
            <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <Input
              id="instagram"
              name="instagram"
              placeholder="Instagram URL"
              value={profileData.instagram}
              onChange={handleInputChange}
              className="pl-10 bg-[#171F29] border-[#3D4A5C] text-gray-300"
            />
          </div>

          <div className="relative">
            <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <Input
              id="linkedin"
              name="linkedin"
              placeholder="LinkedIn URL"
              value={profileData.linkedin}
              onChange={handleInputChange}
              className="pl-10 bg-[#171F29] border-[#3D4A5C] text-gray-300"
            />
          </div>
        </div>
      </div>

      <Separator className="bg-[#3D4A5C]" />

      <div>
        <h2 className="text-xl font-semibold text-white mb-6">Account Actions</h2>

        <div className="space-y-4">
          <div>
            <Button variant="outline" className="border-[#3D4A5C] text-gray-300 hover:bg-[#2A3542]">
              Change Password
            </Button>
          </div>

          <div>
            <Button variant="outline" className="border-red-500/30 text-red-500 hover:bg-red-500/10">
              Delete Account
            </Button>
            <p className="text-xs text-gray-500 mt-1">
              This will permanently delete your account and all your data. This action cannot be undone.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <Button variant="outline" className="border-[#3D4A5C] text-gray-300 hover:bg-[#2A3542]">
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  )
}
