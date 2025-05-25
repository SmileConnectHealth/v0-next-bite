"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Mail, Eye, EyeOff } from "lucide-react"
import Logo from "@/components/logo"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)

      // Simulate successful login
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      })
      router.push("/profile")

      // Uncomment to simulate failed login
      /*
      setErrors({
        auth: "Invalid email or password. Please try again.",
      })
      */
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#171F29] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-[#1D2733] p-8 rounded-lg border border-[#3D4A5C] shadow-lg">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <Logo />
            <span className="text-xl font-bold text-white">Next Bite</span>
          </div>
          <h2 className="mt-2 text-2xl font-bold text-white">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-400">Sign in to your account</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {errors.auth && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-md">
              {errors.auth}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-300">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 bg-[#171F29] border-[#3D4A5C] text-gray-300 placeholder:text-gray-500"
                placeholder="you@example.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative mt-1">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="bg-[#171F29] border-[#3D4A5C] text-gray-300 pr-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
            </div>

            <div className="flex items-center">
              <Checkbox
                id="remember-me"
                checked={formData.rememberMe}
                onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked as boolean })}
                className="border-[#3D4A5C] data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label htmlFor="remember-me" className="ml-2 text-sm text-gray-300 font-normal">
                Remember me
              </Label>
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#1D2733] px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <Button variant="outline" className="w-full border-[#3D4A5C] text-gray-300 hover:bg-[#2A3542]">
              <Mail className="mr-2 h-4 w-4" />
              Sign in with Google
            </Button>
          </div>

          <div className="text-center text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
