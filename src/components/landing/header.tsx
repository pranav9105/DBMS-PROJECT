"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Wallet } from "lucide-react";
import { useEffect, useState } from "react";

type Me = {
  id: string;
  fullName: string;
  email: string;
};

export function LandingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [me, setMe] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        if (!res.ok) {
          if (mounted) setMe(null);
        } else {
          const json = await res.json();
          if (mounted) setMe(json?.user ?? null);
        }
      } catch {
        if (mounted) setMe(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {}
    location.reload();
  };

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
              <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-primary transition-all group-hover:w-full" />
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
            >
              How It Works
              <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-primary transition-all group-hover:w-full" />
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
            >
              FAQ
              <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-primary transition-all group-hover:w-full" />
            </Link>
          </nav>
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          {/* Desktop actions */}
          <div className="hidden md:flex items-center space-x-2">
            {!loading && !me && (
              <>
                <Button variant="ghost" className="rounded-xl" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button
                  asChild
                  className="rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 hover:opacity-90 transition"
                >
                  <Link href="/register">Get Started Free</Link>
                </Button>
              </>
            )}

            {!loading && me && (
              <>
                <Button variant="ghost" className="rounded-xl" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button variant="ghost" className="rounded-xl" asChild>
                  <Link href="/wallet">Wallet</Link>
                </Button>
                <Button variant="ghost" className="rounded-xl" asChild>
                  <Link href="/cards">Cards</Link>
                </Button>
                <Button variant="ghost" className="rounded-xl" asChild>
                  <Link href="/settings">Settings</Link>
                </Button>
                <Button variant="outline" className="rounded-xl" onClick={logout}>
                  Logout
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-xl"
            onClick={() => setIsMenuOpen((v) => !v)}
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

            {/* Auth section */}
            {!loading && !me && (
              <div className="pt-4 border-t space-y-2">
                <Button variant="ghost" className="w-full justify-start rounded-xl" asChild>
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    Sign In
                  </Link>
                </Button>
                <Button
                  className="w-full rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 hover:opacity-90 transition"
                  asChild
                >
                  <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                    Get Started Free
                  </Link>
                </Button>
              </div>
            )}

            {!loading && me && (
              <div className="pt-4 border-t space-y-2">
                <Button variant="ghost" className="w-full justify-start rounded-xl" asChild>
                  <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    Dashboard
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start rounded-xl" asChild>
                  <Link href="/wallet" onClick={() => setIsMenuOpen(false)}>
                    Wallet
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start rounded-xl" asChild>
                  <Link href="/cards" onClick={() => setIsMenuOpen(false)}>
                    Cards
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start rounded-xl" asChild>
                  <Link href="/settings" onClick={() => setIsMenuOpen(false)}>
                    Settings
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full rounded-xl"
                  onClick={() => {
                    setIsMenuOpen(false);
                    logout();
                  }}
                >
                  Logout
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
