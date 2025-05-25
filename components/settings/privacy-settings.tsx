"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function PrivacySettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    dataSharing: {
      locationHistory: true,
      searchHistory: true,
      usageAnalytics: true,
      personalizedAds: false,
    },
  })

  // Mock blocked users
  const [blockedUsers, setBlockedUsers] = useState([
    {
      id: 1,
      name: "Jane Smith",
      username: "janesmith",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Robert Johnson",
      username: "rjohnson",
      image: "/placeholder.svg?height=40&width=40",
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")

  const handleSave = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Privacy settings updated",
        description: "Your privacy settings have been updated successfully.",
      })
    }, 1000)
  }

  const handleUnblockUser = (userId: number) => {
    setBlockedUsers(blockedUsers.filter((user) => user.id !== userId))
    toast({
      title: "User unblocked",
      description: "The user has been unblocked successfully.",
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-white mb-6">Profile Visibility</h2>

        <RadioGroup
          value={privacySettings.profileVisibility}
          onValueChange={(value) => setPrivacySettings({ ...privacySettings, profileVisibility: value })}
        >
          <div className="flex items-start space-x-3 p-4 rounded-md bg-[#2A3542]">
            <RadioGroupItem value="public" id="visibility-public" className="border-[#3D4A5C] text-primary mt-1" />
            <div>
              <Label htmlFor="visibility-public" className="text-white font-medium">
                Public
              </Label>
              <p className="text-sm text-gray-400 mt-1">
                Anyone can view your profile, reviews, and collections. Your activity will appear in public feeds.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 rounded-md bg-[#2A3542] mt-3">
            <RadioGroupItem
              value="friends-only"
              id="visibility-friends"
              className="border-[#3D4A5C] text-primary mt-1"
            />
            <div>
              <Label htmlFor="visibility-friends" className="text-white font-medium">
                Friends Only
              </Label>
              <p className="text-sm text-gray-400 mt-1">
                Only your friends can view your profile, reviews, and collections. Your activity will only appear in
                your friends&apos; feeds.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 rounded-md bg-[#2A3542] mt-3">
            <RadioGroupItem value="private" id="visibility-private" className="border-[#3D4A5C] text-primary mt-1" />
            <div>
              <Label htmlFor="visibility-private" className="text-white font-medium">
                Private
              </Label>
              <p className="text-sm text-gray-400 mt-1">
                Your profile, reviews, and collections are private. Your activity will not appear in any feeds.
              </p>
            </div>
          </div>
        </RadioGroup>
      </div>

      <Separator className="bg-[#3D4A5C]" />

      <div>
        <h2 className="text-xl font-semibold text-white mb-6">Data Sharing</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="location-history" className="text-gray-300">
                Location History
              </Label>
              <p className="text-sm text-gray-500">Store your location history to improve recommendations</p>
            </div>
            <Switch
              id="location-history"
              checked={privacySettings.dataSharing.locationHistory}
              onCheckedChange={(checked) =>
                setPrivacySettings({
                  ...privacySettings,
                  dataSharing: { ...privacySettings.dataSharing, locationHistory: checked },
                })
              }
              className="data-[state=checked]:bg-primary"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="search-history" className="text-gray-300">
                Search History
              </Label>
              <p className="text-sm text-gray-500">Store your search history to improve search results</p>
            </div>
            <Switch
              id="search-history"
              checked={privacySettings.dataSharing.searchHistory}
              onCheckedChange={(checked) =>
                setPrivacySettings({
                  ...privacySettings,
                  dataSharing: { ...privacySettings.dataSharing, searchHistory: checked },
                })
              }
              className="data-[state=checked]:bg-primary"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="usage-analytics" className="text-gray-300">
                Usage Analytics
              </Label>
              <p className="text-sm text-gray-500">Share anonymous usage data to help improve the app</p>
            </div>
            <Switch
              id="usage-analytics"
              checked={privacySettings.dataSharing.usageAnalytics}
              onCheckedChange={(checked) =>
                setPrivacySettings({
                  ...privacySettings,
                  dataSharing: { ...privacySettings.dataSharing, usageAnalytics: checked },
                })
              }
              className="data-[state=checked]:bg-primary"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="personalized-ads" className="text-gray-300">
                Personalized Ads
              </Label>
              <p className="text-sm text-gray-500">Allow personalized ads based on your activity</p>
            </div>
            <Switch
              id="personalized-ads"
              checked={privacySettings.dataSharing.personalizedAds}
              onCheckedChange={(checked) =>
                setPrivacySettings({
                  ...privacySettings,
                  dataSharing: { ...privacySettings.dataSharing, personalizedAds: checked },
                })
              }
              className="data-[state=checked]:bg-primary"
            />
          </div>
        </div>
      </div>

      <Separator className="bg-[#3D4A5C]" />

      <div>
        <h2 className="text-xl font-semibold text-white mb-6">Blocked Users</h2>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search users to block..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#171F29] border-[#3D4A5C] text-gray-300"
            />
          </div>

          {blockedUsers.length > 0 ? (
            <div className="space-y-3">
              {blockedUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 bg-[#2A3542] rounded-md border border-[#3D4A5C]"
                >
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback className="bg-[#3D4A5C] text-white">{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-white">{user.name}</div>
                      <div className="text-sm text-gray-400">@{user.username}</div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleUnblockUser(user.id)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Unblock
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">You haven&apos;t blocked any users yet.</div>
          )}
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
