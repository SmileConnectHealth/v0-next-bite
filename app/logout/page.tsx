"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function LogoutPage() {
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Simulate logout process
    const handleLogout = async () => {
      // In a real app, this would clear authentication tokens, cookies, etc.

      // Show success message
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      })

      // Redirect to home page
      router.push("/")
    }

    handleLogout()
  }, [router, toast])

  return (
    <div className="min-h-screen bg-[#171F29] flex items-center justify-center">
      <div className="text-white text-center">
        <p className="text-lg">Logging out...</p>
      </div>
    </div>
  )
}
