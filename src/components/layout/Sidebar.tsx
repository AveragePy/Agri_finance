"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Leaf, ShoppingBasket, BookOpen, Users2, Gauge, FileEdit, Wallet, Truck } from "lucide-react";
import clsx from "clsx";

const modules = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/e-advisory", label: "E-Advisory", icon: Leaf, colorVar: "--mv-green" },
  { href: "/e-marketplace", label: "E-Marketplace", icon: ShoppingBasket, colorVar: "--mv-pink" },
  { href: "/farmer-data-repository", label: "Farmer Data Repository", icon: BookOpen, colorVar: "--mv-cyan" },
  { href: "/member-management", label: "Member Management", icon: Users2, colorVar: "--mv-emerald" },
  { href: "/credit-scoring", label: "Credit Scoring", icon: Gauge, colorVar: "--mv-amber" },
  { href: "/credit-application", label: "Credit Application", icon: FileEdit, colorVar: "--mv-purple" },
  { href: "/loan-management", label: "Loan Management", icon: Wallet, colorVar: "--mv-blue" },
  { href: "/supplier-distribution", label: "Supplier & Distribution", icon: Truck, colorVar: "--mv-red" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden md:flex md:flex-col w-64 shrink-0 border-r bg-sidebar text-sidebar-foreground">
      <div className="px-4 py-4 text-sm font-medium">Navigation</div>
      <nav className="flex-1 px-2 pb-4 space-y-1">
        {modules.map((m) => {
          const ActiveIcon = m.icon;
          const isActive = pathname === m.href;
          return (
            <Link
              key={m.href}
              href={m.href}
              className={clsx(
                "group flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent",
                isActive && "bg-sidebar-accent"
              )}
              style={m.colorVar ? ({ ["--link-color" as any]: `var(${m.colorVar})` } as React.CSSProperties) : undefined}
            >
              <ActiveIcon className="h-4 w-4" color={m.colorVar ? undefined : undefined} style={{ color: m.colorVar ? `var(${m.colorVar})` : undefined }} />
              <span className="truncate">{m.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
