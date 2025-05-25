"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import Logo from "@/components/logo"
import { Menu, X, User, Settings, LogOut, ChevronDown, Plus, BookmarkPlus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/context/auth-context"

// Mock collections
const userCollections = [
  { id: "favorites", name: "Favorites", count: 12 },
  { id: "want-to-try", name: "Want to Try", count: 24 },
  { id: "visited", name: "Visited", count: 8 },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()

  // Signed Out Navigation
  if (!isAuthenticated) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-[#2A3542] bg-[#171F29]">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="hidden md:inline-block text-xl font-bold text-white">Next Bite</span>
          </div>

          {/* Desktop Navigation - Signed Out */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-white hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/trending" className="text-sm font-medium text-white hover:text-primary transition-colors">
              Trending
            </Link>
            <Link href="/discover" className="text-sm font-medium text-white hover:text-primary transition-colors">
              Discover
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <ModeToggle />
            <Link href="/signin">
              <Button variant="outline" size="sm" className="border-[#3D4A5C] text-white hover:bg-[#2A3542]">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>

          {/* Mobile Navigation - Signed Out */}
          <div className="flex md:hidden items-center gap-4">
            <ModeToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu - Signed Out */}
        {isMenuOpen && (
          <div className="md:hidden container py-4 border-t border-[#2A3542]">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-sm font-medium text-white hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/trending"
                className="text-sm font-medium text-white hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Trending
              </Link>
              <Link
                href="/discover"
                className="text-sm font-medium text-white hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Discover
              </Link>
              <div className="flex flex-col space-y-2 pt-2">
                <Link href="/signin" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-[#3D4A5C] text-white hover:bg-[#2A3542]">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    )
  }

  // Signed In Navigation
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#2A3542] bg-[#171F29]">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="hidden md:inline-block text-xl font-bold text-white">Next Bite</span>
        </div>

        {/* Desktop Navigation - Signed In */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/trending" className="text-sm font-medium text-white hover:text-primary transition-colors">
            Trending
          </Link>
          <Link href="/discover" className="text-sm font-medium text-white hover:text-primary transition-colors">
            Discover
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-sm font-medium text-white hover:text-primary transition-colors flex items-center">
                Collections
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-[#1D2733] border-[#3D4A5C] text-gray-300">
              <DropdownMenuLabel className="text-white">Your Collections</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[#3D4A5C]" />
              {userCollections.map((collection) => (
                <DropdownMenuItem key={collection.id} className="hover:bg-[#2A3542] hover:text-white cursor-pointer">
                  <Link href={`/collections/${collection.id}`} className="flex items-center justify-between w-full">
                    <span>{collection.name}</span>
                    <span className="text-xs text-gray-500">{collection.count}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator className="bg-[#3D4A5C]" />
              <DropdownMenuItem className="hover:bg-[#2A3542] hover:text-white cursor-pointer">
                <Link href="/collections" className="flex items-center w-full">
                  <BookmarkPlus className="mr-2 h-4 w-4" />
                  <span>All Collections</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#2A3542] hover:text-white cursor-pointer">
                <Link href="/collections/new" className="flex items-center w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  <span>Create New Collection</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full hover:ring-2 hover:ring-primary/50 transition-all duration-200"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "User"} />
                  <AvatarFallback className="bg-[#2A3542] text-white">{user?.name?.[0] || "U"}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-[#1D2733] border-[#3D4A5C] text-gray-300" align="end">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium text-white">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[#3D4A5C]" />
              <DropdownMenuItem className="hover:bg-[#2A3542] hover:text-white cursor-pointer">
                <Link href="/profile" className="flex items-center w-full">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#2A3542] hover:text-white cursor-pointer">
                <Link href="/settings" className="flex items-center w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#3D4A5C]" />
              <DropdownMenuItem className="hover:bg-[#2A3542] hover:text-white cursor-pointer" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Navigation - Signed In */}
        <div className="flex md:hidden items-center gap-4">
          <ModeToggle />
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "User"} />
            <AvatarFallback className="bg-[#2A3542] text-white">{user?.name?.[0] || "U"}</AvatarFallback>
          </Avatar>
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu - Signed In */}
      {isMenuOpen && (
        <div className="md:hidden container py-4 border-t border-[#2A3542]">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/trending"
              className="text-sm font-medium text-white hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Trending
            </Link>
            <Link
              href="/discover"
              className="text-sm font-medium text-white hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Discover
            </Link>
            <Link
              href="/collections"
              className="text-sm font-medium text-white hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Collections
            </Link>
            <div className="pl-4 space-y-2">
              {userCollections.map((collection) => (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.id}`}
                  className="text-sm text-gray-400 hover:text-white transition-colors flex justify-between"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>{collection.name}</span>
                  <span className="text-xs text-gray-500">{collection.count}</span>
                </Link>
              ))}
              <Link
                href="/collections/new"
                className="text-sm text-gray-400 hover:text-white transition-colors flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Plus className="mr-2 h-3 w-3" />
                <span>Create New Collection</span>
              </Link>
            </div>
            <div className="pt-2 border-t border-[#2A3542] space-y-2">
              <Link
                href="/profile"
                className="text-sm font-medium text-white hover:text-primary transition-colors flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
              <Link
                href="/settings"
                className="text-sm font-medium text-white hover:text-primary transition-colors flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
              <button
                onClick={() => {
                  setIsMenuOpen(false)
                  logout()
                }}
                className="text-sm font-medium text-white hover:text-primary transition-colors flex items-center w-full text-left"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
