"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function NotificationsSettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [notificationSettings, setNotificationSettings] = useState({
    push: {
      newReviews: true,
      friendActivity: true,
      nearbyRecommendations: true,
      specialOffers: false,
    },
    email: {
      weeklyDigest: true,
      friendRequests: true,
      newFollowers: true,
      marketingEmails: false,
    },
    sms: {
      enabled: false,
      phoneNumber: "",
      verificationStatus: "unverified",
      reservationReminders: true,
      specialOffers: false,
    },
  })

  const handlePushToggle = (key: keyof typeof notificationSettings.push) => {
    setNotificationSettings({
      ...notificationSettings,
      push: {
        ...notificationSettings.push,
        [key]: !notificationSettings.push[key],
      },
    })
  }

  const handleEmailToggle = (key: keyof typeof notificationSettings.email) => {
    setNotificationSettings({
      ...notificationSettings,
      email: {
        ...notificationSettings.email,
        [key]: !notificationSettings.email[key],
      },
    })
  }

  const handleSmsToggle = (key: keyof typeof notificationSettings.sms) => {
    if (key === "enabled") {
      setNotificationSettings({
        ...notificationSettings,
        sms: {
          ...notificationSettings.sms,
          enabled: !notificationSettings.sms.enabled,
        },
      })
    } else {
      setNotificationSettings({
        ...notificationSettings,
        sms: {
          ...notificationSettings.sms,
          [key]: !notificationSettings.sms[key as "reservationReminders" | "specialOffers"],
        },
      })
    }
  }

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotificationSettings({
      ...notificationSettings,
      sms: {
        ...notificationSettings.sms,
        phoneNumber: e.target.value,
      },
    })
  }

  const handleVerifyPhone = () => {
    toast({
      title: "Verification code sent",
      description: "A verification code has been sent to your phone number.",
    })
  }

  const handleSave = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Notification settings updated",
        description: "Your notification settings have been updated successfully.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-white mb-6">Push Notifications</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="new-reviews" className="text-gray-300">
                New Reviews
              </Label>
              <p className="text-sm text-gray-500">Get notified when friends post new reviews</p>
            </div>
            <Switch
              id="new-reviews"
              checked={notificationSettings.push.newReviews}
              onCheckedChange={() => handlePushToggle("newReviews")}
              className="data-[state=checked]:bg-primary"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="friend-activity" className="text-gray-300">
                Friend Activity
              </Label>
              <p className="text-sm text-gray-500">Get notified about your friends&apos; activity</p>
            </div>
            <Switch
              id="friend-activity"
              checked={notificationSettings.push.friendActivity}
              onCheckedChange={() => handlePushToggle("friendActivity")}
              className="data-[state=checked]:bg-primary"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="nearby-recommendations" className="text-gray-300">
                Nearby Recommendations
              </Label>
              <p className="text-sm text-gray-500">Get notified about restaurants near you</p>
            </div>
            <Switch
              id="nearby-recommendations"
              checked={notificationSettings.push.nearbyRecommendations}
              onCheckedChange={() => handlePushToggle("nearbyRecommendations")}
              className="data-[state=checked]:bg-primary"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="special-offers-push" className="text-gray-300">
                Special Offers
              </Label>
              <p className="text-sm text-gray-500">Get notified about special offers and promotions</p>
            </div>
            <Switch
              id="special-offers-push"
              checked={notificationSettings.push.specialOffers}
              onCheckedChange={() => handlePushToggle("specialOffers")}
              className="data-[state=checked]:bg-primary"
            />
          </div>
        </div>
      </div>

      <Separator className="bg-[#3D4A5C]" />

      <div>
        <h2 className="text-xl font-semibold text-white mb-6">Email Notifications</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="weekly-digest" className="text-gray-300">
                Weekly Digest
              </Label>
              <p className="text-sm text-gray-500">Receive a weekly summary of activity</p>
            </div>
            <Switch
              id="weekly-digest"
              checked={notificationSettings.email.weeklyDigest}
              onCheckedChange={() => handleEmailToggle("weeklyDigest")}
              className="data-[state=checked]:bg-primary"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="friend-requests" className="text-gray-300">
                Friend Requests
              </Label>
              <p className="text-sm text-gray-500">Receive emails about new friend requests</p>
            </div>
            <Switch
              id="friend-requests"
              checked={notificationSettings.email.friendRequests}
              onCheckedChange={() => handleEmailToggle("friendRequests")}
              className="data-[state=checked]:bg-primary"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="new-followers" className="text-gray-300">
                New Followers
              </Label>
              <p className="text-sm text-gray-500">Receive emails when someone follows you</p>
            </div>
            <Switch
              id="new-followers"
              checked={notificationSettings.email.newFollowers}
              onCheckedChange={() => handleEmailToggle("newFollowers")}
              className="data-[state=checked]:bg-primary"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="marketing-emails" className="text-gray-300">
                Marketing Emails
              </Label>
              <p className="text-sm text-gray-500">Receive promotional emails and newsletters</p>
            </div>
            <Switch
              id="marketing-emails"
              checked={notificationSettings.email.marketingEmails}
              onCheckedChange={() => handleEmailToggle("marketingEmails")}
              className="data-[state=checked]:bg-primary"
            />
          </div>
        </div>
      </div>

      <Separator className="bg-[#3D4A5C]" />

      <div>
        <h2 className="text-xl font-semibold text-white mb-6">SMS Notifications</h2>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="sms-enabled" className="text-gray-300">
                Enable SMS Notifications
              </Label>
              <p className="text-sm text-gray-500">Receive text messages for important notifications</p>
            </div>
            <Switch
              id="sms-enabled"
              checked={notificationSettings.sms.enabled}
              onCheckedChange={() => handleSmsToggle("enabled")}
              className="data-[state=checked]:bg-primary"
            />
          </div>

          {notificationSettings.sms.enabled && (
            <>
              <div className="space-y-2">
                <Label htmlFor="phone-number" className="text-gray-300">
                  Phone Number
                </Label>
                <div className="flex space-x-2">
                  <div className="w-24">
                    <Select defaultValue="+1">
                      <SelectTrigger className="bg-[#171F29] border-[#3D4A5C] text-gray-300">
                        <SelectValue placeholder="+1" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1D2733] border-[#3D4A5C]">
                        <SelectItem value="+1">+1</SelectItem>
                        <SelectItem value="+44">+44</SelectItem>
                        <SelectItem value="+33">+33</SelectItem>
                        <SelectItem value="+49">+49</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Input
                    id="phone-number"
                    value={notificationSettings.sms.phoneNumber}
                    onChange={handlePhoneNumberChange}
                    className="flex-1 bg-[#171F29] border-[#3D4A5C] text-gray-300"
                    placeholder="(555) 123-4567"
                  />
                  <Button
                    onClick={handleVerifyPhone}
                    disabled={!notificationSettings.sms.phoneNumber}
                    className="whitespace-nowrap"
                  >
                    Verify
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  Status:{" "}
                  <span
                    className={
                      notificationSettings.sms.verificationStatus === "verified" ? "text-green-500" : "text-yellow-500"
                    }
                  >
                    {notificationSettings.sms.verificationStatus === "verified" ? "Verified" : "Unverified"}
                  </span>
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="reservation-reminders" className="text-gray-300">
                      Reservation Reminders
                    </Label>
                    <p className="text-sm text-gray-500">Receive text reminders about your reservations</p>
                  </div>
                  <Switch
                    id="reservation-reminders"
                    checked={notificationSettings.sms.reservationReminders}
                    onCheckedChange={() => handleSmsToggle("reservationReminders")}
                    className="data-[state=checked]:bg-primary"
                    disabled={!notificationSettings.sms.enabled}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="special-offers-sms" className="text-gray-300">
                      Special Offers
                    </Label>
                    <p className="text-sm text-gray-500">Receive text messages about special offers</p>
                  </div>
                  <Switch
                    id="special-offers-sms"
                    checked={notificationSettings.sms.specialOffers}
                    onCheckedChange={() => handleSmsToggle("specialOffers")}
                    className="data-[state=checked]:bg-primary"
                    disabled={!notificationSettings.sms.enabled}
                  />
                </div>
              </div>
            </>
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
