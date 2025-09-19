"use client";
import { Menu, Sun, MoonStar, Leaf, ShoppingBasket, BookOpen, Users2, Gauge, FileEdit, Wallet, Truck, Home as HomeIcon, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Topbar() {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false); // portal visible
  const [animate, setAnimate] = useState(false); // slide state
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
  const openDrawer = () => {
    setOpen(true);
    // allow next paint so transition can run
    setTimeout(() => setAnimate(true), 20);
  };
  const closeDrawer = () => {
    setAnimate(false);
    setTimeout(() => setOpen(false), 300);
  };
  const modules = [
    { href: "/", label: "Dashboard", icon: HomeIcon },
    { href: "/e-advisory", label: "E-Advisory", icon: Leaf, colorVar: "--mv-green" },
    { href: "/e-marketplace", label: "E-Marketplace", icon: ShoppingBasket, colorVar: "--mv-pink" },
    { href: "/farmer-data-repository", label: "Farmer Data Repository", icon: BookOpen, colorVar: "--mv-cyan" },
    { href: "/member-management", label: "Member Management", icon: Users2, colorVar: "--mv-emerald" },
    { href: "/credit-scoring", label: "Credit Scoring", icon: Gauge, colorVar: "--mv-amber" },
    { href: "/credit-application", label: "Credit Application", icon: FileEdit, colorVar: "--mv-purple" },
    { href: "/loan-management", label: "Loan Management", icon: Wallet, colorVar: "--mv-blue" },
    { href: "/supplier-distribution", label: "Supplier & Distribution", icon: Truck, colorVar: "--mv-red" },
  ];
  return (
    <header className={`sticky top-0 z-50 border-b bg-background/80 backdrop-blur transition-all duration-300 ${scrolled ? "shadow-sm" : "shadow-none"}`}>
      <div className={`flex items-center gap-3 px-4 md:px-6 transition-all duration-300 ${scrolled ? "h-16" : "h-20"}`}>
        <button onClick={openDrawer} className="inline-flex items-center justify-center h-9 w-9 rounded-full border bg-background/70 backdrop-blur" aria-label="Menu">
          <Menu className="h-4 w-4" />
        </button>
        <div className="font-semibold tracking-tight">Market Voice Agri Input Financing System</div>
        <div className="ml-auto flex items-center gap-2">
          <Link href="/about" className="hidden sm:inline-flex items-center gap-2 h-9 rounded-full border px-3 text-sm bg-background/70 backdrop-blur">About</Link>
          <button onClick={toggleTheme} className="inline-flex items-center gap-2 h-9 rounded-full border px-3 text-sm bg-background/70 backdrop-blur">
            {dark ? (<><Sun className="h-4 w-4" /><span>Light</span></>) : (<><MoonStar className="h-4 w-4" /><span>Dark</span></>)}
          </button>
        </div>
      </div>

      {/* Drawer via portal */}
      {open && typeof window !== "undefined" && createPortal(
        <div className="fixed inset-0 z-[100]" aria-modal="true" role="dialog">
          <div className="absolute inset-0 bg-black/40" onClick={closeDrawer} />
          <div className={`absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-background border-r shadow-xl flex flex-col transform transition-transform duration-300 ease-out ${animate ? "translate-x-0" : "-translate-x-full"}`}>
            <div className="h-14 px-2 border-b flex items-center justify-end">
              <button className="h-9 w-9 inline-flex items-center justify-center rounded-md border" onClick={closeDrawer} aria-label="Close menu">
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="p-3 flex-1 overflow-y-auto space-y-1">
              {modules.map((m) => {
                const Icon = m.icon;
                return (
                  <Link
                    key={m.href}
                    href={m.href}
                    className="flex items-center gap-4 px-4 py-3 rounded-md hover:bg-muted text-base font-medium"
                    onClick={closeDrawer}
                    style={m.colorVar ? ({ ["--link-color" as any]: `var(${m.colorVar})` } as React.CSSProperties) : undefined}
                  >
                    <Icon className="h-5 w-5" style={{ color: m.colorVar ? `var(${m.colorVar})` : undefined }} />
                    <span>{m.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
