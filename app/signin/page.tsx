"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff } from "lucide-react"
import Logo from "@/components/logo"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/hooks/use-toast"

export default function SignInPage() {
  const { login, isLoading } = useAuth()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
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
      newErrors.email = "Email, username, or phone is required"
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

    try {
      await login(formData.email, formData.password, formData.rememberMe)

      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      })
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      })

      setErrors({
        auth: "Invalid email or password. Please try again.",
      })
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#171F29]">
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
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-md">
              {errors.auth}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-300">
                Email, username, or phone
              </Label>
              <Input
                id="email"
                name="email"
                type="text"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 bg-[#171F29] border-[#3D4A5C] text-gray-300"
                placeholder="you@example.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
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
                  className="pr-10 bg-[#171F29] border-[#3D4A5C] text-gray-300"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
            </div>

            <div className="flex items-center">
              <Checkbox
                id="remember-me"
                checked={formData.rememberMe}
                onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked as boolean })}
                className="border-[#3D4A5C] data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label htmlFor="remember-me" className="ml-2 text-sm font-normal text-gray-300">
                Remember me
              </Label>
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
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
