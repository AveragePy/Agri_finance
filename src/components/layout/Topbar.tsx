"use client";
import { Menu, Sun, MoonStar, Leaf, ShoppingBasket, BookOpen, Users2, Gauge, FileEdit, Wallet, Truck, Home as HomeIcon, X, LogIn, UserPlus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Logo from "./Logo"; // Assuming Logo component is in the same directory

export default function Topbar() {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false); // portal visible
  const [animate, setAnimate] = useState(false); // slide state
  const [scrolled, setScrolled] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

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

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Simple simulation - accept any email/password combination
    if (email && password) {
      setUser({ name: email.split('@')[0], email });
      setIsAuthenticated(true);
      setShowSignIn(false);
      // Show success message
      alert(`Welcome back, ${email.split('@')[0]}!`);
    }
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Simple simulation - accept any valid inputs
    if (name && email && password) {
      setUser({ name, email });
      setIsAuthenticated(true);
      setShowRegister(false);
      // Show success message
      alert(`Account created successfully! Welcome, ${name}!`);
    }
  };

  const handleSignOut = () => {
    setUser(null);
    setIsAuthenticated(false);
    alert('You have been signed out successfully!');
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
    <>
      <header className={`sticky top-0 z-50 border-b bg-background/80 backdrop-blur transition-all duration-300 ${scrolled ? "shadow-sm" : "shadow-none"}`}>
        <div className={`flex items-center gap-3 px-4 md:px-6 transition-all duration-300 ${scrolled ? "h-16" : "h-20"}`}>
          <button onClick={openDrawer} className="inline-flex items-center justify-center h-9 w-9 rounded-full border bg-background/70 backdrop-blur" aria-label="Menu">
            <Menu className="h-4 w-4" />
          </button>
          <Logo />
          <div className="ml-auto flex items-center gap-2">
            {!isAuthenticated ? (
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={() => setShowSignIn(true)}
                  className="inline-flex items-center gap-2 h-9 rounded-full border px-3 text-sm bg-background/70 backdrop-blur hover:bg-muted transition-colors"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Sign In</span>
                </button>
                <button
                  onClick={() => setShowRegister(true)}
                  className="inline-flex items-center gap-2 h-9 rounded-full bg-primary text-primary-foreground px-3 text-sm hover:bg-primary/90 transition-colors"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Register</span>
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Welcome, {user?.name}</span>
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center gap-2 h-9 rounded-full border px-3 text-sm bg-background/70 backdrop-blur hover:bg-muted transition-colors"
                >
                  Sign Out
                </button>
              </div>
            )}
            <Link href="/about" className="hidden sm:inline-flex items-center gap-2 h-9 rounded-full border px-3 text-sm bg-background/70 backdrop-blur">About</Link>
            <button onClick={toggleTheme} className="inline-flex items-center gap-2 h-9 rounded-full border px-3 text-sm bg-background/70 backdrop-blur">
              {dark ? (<><Sun className="h-4 w-4" /><span className="hidden sm:inline">Light</span></>) : (<><MoonStar className="h-4 w-4" /><span className="hidden sm:inline">Dark</span></>)}
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
                <div className="border-t pt-3 mt-3 space-y-1">
                  {!isAuthenticated ? (
                    <>
                      <button
                        onClick={() => { setShowSignIn(true); closeDrawer(); }}
                        className="flex items-center gap-4 px-4 py-3 rounded-md hover:bg-muted text-base font-medium w-full text-left"
                      >
                        <LogIn className="h-5 w-5" />
                        <span>Sign In</span>
                      </button>
                      <button
                        onClick={() => { setShowRegister(true); closeDrawer(); }}
                        className="flex items-center gap-4 px-4 py-3 rounded-md hover:bg-muted text-base font-medium w-full text-left"
                      >
                        <UserPlus className="h-5 w-5" />
                        <span>Register</span>
                      </button>
                    </>
                  ) : (
                    <div className="px-4 py-3">
                      <p className="text-sm text-muted-foreground mb-2">Welcome, {user?.name}</p>
                      <button
                        onClick={() => { handleSignOut(); closeDrawer(); }}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          </div>,
          document.body
        )}
      </header>

      {/* Sign In Modal */}
      {showSignIn && typeof window !== "undefined" && createPortal(
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowSignIn(false)} />
          <div className="relative bg-background rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Sign In</h2>
              <button
                onClick={() => setShowSignIn(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowSignIn(false)}
                  className="flex-1 px-4 py-2 border rounded-lg hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Sign In
                </button>
              </div>
            </form>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Don't have an account?{" "}
              <button
                onClick={() => { setShowSignIn(false); setShowRegister(true); }}
                className="text-primary hover:underline"
              >
                Register here
              </button>
            </p>
          </div>
        </div>,
        document.body
      )}

      {/* Register Modal */}
      {showRegister && typeof window !== "undefined" && createPortal(
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowRegister(false)} />
          <div className="relative bg-background rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Create Account</h2>
              <button
                onClick={() => setShowRegister(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Create a password"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowRegister(false)}
                  className="flex-1 px-4 py-2 border rounded-lg hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Create Account
                </button>
              </div>
            </form>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Already have an account?{" "}
              <button
                onClick={() => { setShowRegister(false); setShowSignIn(true); }}
                className="text-primary hover:underline"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
