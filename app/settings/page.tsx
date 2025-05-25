"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import ProfileSettings from "@/components/settings/profile-settings"
import PreferencesSettings from "@/components/settings/preferences-settings"
import PrivacySettings from "@/components/settings/privacy-settings"
import NotificationsSettings from "@/components/settings/notifications-settings"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="min-h-screen bg-[#171F29] py-8">
      <div className="container max-w-6xl">
        <h1 className="text-3xl font-bold text-white mb-8">Account Settings</h1>

        <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-[#1D2733] border border-[#3D4A5C] p-1 w-full flex justify-start overflow-x-auto">
            <TabsTrigger
              value="profile"
              className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="preferences"
              className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Preferences
            </TabsTrigger>
            <TabsTrigger
              value="privacy"
              className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Privacy
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Notifications
            </TabsTrigger>
          </TabsList>

          <Card className="bg-[#1D2733] border-[#3D4A5C]">
            <CardContent className="p-6">
              <TabsContent value="profile">
                <ProfileSettings />
              </TabsContent>

              <TabsContent value="preferences">
                <PreferencesSettings />
              </TabsContent>

              <TabsContent value="privacy">
                <PrivacySettings />
              </TabsContent>

              <TabsContent value="notifications">
                <NotificationsSettings />
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </div>
  )
}
