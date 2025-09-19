"use client";
import {
  Leaf,
  ShoppingBasket,
  BookOpen,
  Users2,
  Gauge,
  FileEdit,
  Wallet,
  Truck,
  Home as HomeIcon,
  LogOut,
  ChevronDown,
  ChevronRight,
  BarChart3,
  UserCheck,
  Building,
  Shield,
  Activity,
  Database,
  Target,
  CreditCard,
  AlertTriangle,
  FileText,
  CheckCircle,
  Send,
  RefreshCw,
  Package,
  ShoppingCart,
  Users,
  Zap,
  MapPin,
  Eye,
  Cloud,
  Bug,
  Radio,
  TrendingUp,
  Store,
  Search,
  FileSignature,
  DollarSign,
  Upload,
  Settings,
  TrendingDown,
  Lightbulb,
  FileBarChart
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function Sidebar() {
  const { user, isAuthenticated, signOut } = useAuth();
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["Dashboard"]);

  const toggleCategory = (label: string) => {
    if (expandedCategories.includes(label)) {
      setExpandedCategories(expandedCategories.filter((category) => category !== label));
    } else {
      setExpandedCategories([...expandedCategories, label]);
    }
  };

  const handleSignOut = () => {
    signOut();
  };

  const categories = [
    {
      label: "Dashboard",
      icon: HomeIcon,
      modules: [
        { href: "/", label: "Overview", icon: HomeIcon },
        { href: "/e-advisory", label: "E-Advisory", icon: Leaf },
        { href: "/e-marketplace", label: "E-Marketplace", icon: ShoppingBasket },
      ]
    },
    {
      label: "Member Management",
      icon: Users2,
      modules: [
        { href: "/member-registration", label: "Member Registration", icon: UserCheck },
        { href: "/farm-profiling", label: "Farm Profiling", icon: Building },
        { href: "/financial-identity", label: "Financial Identity", icon: Shield },
        { href: "/role-management", label: "Role Management", icon: Users },
        { href: "/lifecycle-tracking", label: "Lifecycle Tracking", icon: Activity },
      ]
    },
    {
      label: "Credit Scoring",
      icon: Gauge,
      modules: [
        { href: "/data-sources", label: "Data Sources", icon: Database },
        { href: "/scoring-engine", label: "Scoring Engine", icon: Target },
        { href: "/eligibility-scorecard", label: "Eligibility Score Card", icon: CreditCard },
      ]
    },
    {
      label: "Farmer Data",
      icon: BookOpen,
      modules: [
        { href: "/farmer-data-repository", label: "Farmer Data Repository", icon: BookOpen },
        { href: "/reports", label: "Reports", icon: BarChart3 },
      ]
    },
    {
      label: "Credit & Loans",
      icon: Wallet,
      modules: [
        { href: "/credit-application", label: "Credit Application", icon: FileEdit },
        { href: "/loan-management", label: "Loan Management", icon: Wallet },
      ]
    },
    {
      label: "Supplier & Distribution",
      icon: Truck,
      modules: [
        { href: "/supplier-distribution", label: "Supplier & Distribution", icon: Truck },
      ]
    },
  ];

  // Don't render sidebar if not authenticated (after all hooks)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-background border-r border-border flex flex-col z-40">
      {/* Sidebar Header */}
      <div className="h-16 px-4 border-b border-border flex items-center bg-primary/5">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Leaf className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="text-sm font-semibold">Market-Voice Agri Finance</div>
          </div>
        </div>
      </div>

      {/* Navigation Content */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {categories.map((category) => {
          const isExpanded = expandedCategories.includes(category.label);
          return (
            <div key={category.label} className="space-y-1">
              <button
                onClick={() => toggleCategory(category.label)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/50 text-sm font-medium text-left transition-colors group"
              >
                <category.icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                <span className="flex-1 group-hover:text-foreground transition-colors text-left">{category.label}</span>
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform" />
                )}
              </button>

              {isExpanded && (
                <div className="ml-6 space-y-1 animate-in slide-in-from-top-2 duration-200">
                  {category.modules.map((module) => (
                    <Link
                      key={module.href}
                      href={module.href}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10 text-sm text-muted-foreground hover:text-primary transition-all duration-200 group"
                    >
                      <module.icon className="h-4 w-4 group-hover:scale-105 transition-transform" />
                      <span className="group-hover:translate-x-1 transition-transform">{module.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="border-t border-border p-4 bg-muted/20">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-xs font-medium text-primary">
              {user?.name?.charAt(0)?.toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">{user?.name}</div>
            <div className="text-xs text-muted-foreground truncate">{user?.email}</div>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
