"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Receipt,
  Settings,
  LogOut,
  Wallet,
  Target,
  BarChart3,
  CreditCard,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";

type Me = {
  id: string;
  fullName: string;
  email: string;
  createdAt?: string;
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [me, setMe] = useState<Me | null>(null);
  const [loadingMe, setLoadingMe] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        if (!res.ok) {
          if (mounted) setMe(null);
          return;
        }
        const json = await res.json();
        if (mounted) setMe(json?.user ?? null);
      } catch {
        if (mounted) setMe(null);
      } finally {
        if (mounted) setLoadingMe(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const onLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {}
    router.replace("/login");
  };

  const initials =
    me?.fullName
      ?.split(" ")
      .map((s) => s[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Receipt, label: "All Receipts", href: "/receipts" },
    { icon: BarChart3, label: "Analytics", href: "/analytics" },
    { icon: Target, label: "Goals", href: "/goals" },
    { icon: Wallet, label: "Wallet", href: "/wallet" },
    { icon: CreditCard, label: "Cards", href: "/cards" },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-emerald-50">
      {/* Sidebar */}
      <div className="w-64 bg-white/90 backdrop-blur-xl border-r border-slate-200/50 shadow-xl relative">
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-slate-200/50">
          <Link href="/" className="flex items-center space-x-2 cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent">
              Walletize
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <div className="p-4 space-y-2">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={index}
                href={item.href}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg transform scale-105"
                    : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 hover:scale-105"
                }`}
              >
                <item.icon
                  className={`h-5 w-5 transition-transform duration-300 ${
                    isActive
                      ? "text-white scale-110"
                      : "text-slate-500 group-hover:text-emerald-600 group-hover:scale-110"
                  }`}
                />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
                )}
              </Link>
            );
          })}
        </div>

        {/* User Profile */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {loadingMe ? "…" : initials}
                </span>
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-slate-900">
                  {loadingMe ? "Loading..." : me?.fullName || "Unknown"}
                </div>
                <div className="text-xs text-slate-500">
                  {loadingMe ? "" : me?.email || ""}
                </div>
              </div>
            </div>
            <Link
              href="/settings"
              className={`w-full mt-3 flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
                pathname === "/settings"
                  ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white"
                  : "text-slate-600 hover:bg-white hover:text-emerald-700"
              }`}
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
            <button
              onClick={onLogout}
              className="w-full mt-2 flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-white hover:text-red-600 transition-all duration-300"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
