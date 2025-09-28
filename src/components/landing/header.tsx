"use client"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, Wallet } from 'lucide-react'
import { useState } from 'react'

export function LandingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-background via-background/95 to-background/90 backdrop-blur-md shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo / Branding */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-3 mr-10">
            <Wallet className="w-10 h-10 text-green-600 hover:text-green-700 transition-colors" />
            <span className="font-extrabold text-2xl bg-gradient-to-r from-green-600 via-emerald-500 to-green-400 bg-clip-text text-transparent">
              Walletize
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
            >
              Features
              <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-primary transition-all group-hover:w-full"></span>
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
            >
              How It Works
              <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-primary transition-all group-hover:w-full"></span>
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
            >
              FAQ
              <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-primary transition-all group-hover:w-full"></span>
            </Link>
          </nav>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" className="rounded-xl" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button
              asChild
              className="rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 hover:opacity-90 transition"
            >
              <Link href="/register">Get Started Free</Link>
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur-md animate-slideDown">
          <nav className="container py-4 space-y-4">
            <Link
              href="#features"
              className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="#faq"
              className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </Link>
            <div className="pt-4 border-t space-y-2">
              <Button variant="ghost" className="w-full justify-start rounded-xl" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button
                className="w-full rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 hover:opacity-90 transition"
                asChild
              >
                <Link href="/register">Get Started Free</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
