"use client";
import {
  Sun,
  MoonStar,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "./Logo";

export default function Topbar() {
  const { user, isAuthenticated, signOut } = useAuth();
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const isDark = root.classList.contains("dark");
    setDark(isDark);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const isDark = root.classList.toggle("dark");
    setDark(isDark);
  };

  const handleSignOut = () => {
    signOut();
  };

  // Don't render topbar if not authenticated (after all hooks)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <header className={`sticky top-0 z-50 border-b bg-background/80 backdrop-blur transition-all duration-300 ${scrolled ? "shadow-sm" : "shadow-none"}`}>
      <div className={`flex items-center gap-3 px-4 md:px-6 transition-all duration-300 ${scrolled ? "h-16" : "h-20"}`}>
        <Logo />
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Welcome, {user?.name}</span>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 h-9 rounded-full border px-3 text-sm bg-background/70 backdrop-blur hover:bg-muted transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
          <Link href="/about" className="hidden sm:inline-flex items-center gap-2 h-9 rounded-full border px-3 text-sm bg-background/70 backdrop-blur">About</Link>
          <button onClick={toggleTheme} className="inline-flex items-center gap-2 h-9 rounded-full border px-3 text-sm bg-background/70 backdrop-blur">
            {dark ? (<><Sun className="h-4 w-4" /><span className="hidden sm:inline">Light</span></>) : (<><MoonStar className="h-4 w-4" /><span className="hidden sm:inline">Dark</span></>)}
          </button>
        </div>
      </div>
    </header>
  );
}
