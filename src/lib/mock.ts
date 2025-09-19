export type Metric = { label: string; value: string; note?: string };
export type Section = {
  key: string;
  title: string;
  bullets: string[];
  image: string; // url or /public path
};
export type ModuleCard = {
  title: string;
  href: string;
  color: string;
  bullets: string[];
};

export const metrics: Metric[] = [
  { label: "Farmers reached", value: "12,500+" },
  { label: "Regions", value: "6", note: "pilots" },
  { label: "Seasonal loans", value: "$1.4M" },
  { label: "Delivery points", value: "120+" },
];

export const sections: Section[] = [
  {
    key: "e-advisory",
    title: "E‑Advisory Module",
    bullets: [
      "Crop, Weather, Pests & Disease advisory",
      "Multi‑channel delivery (USSD, SMS, app)",
      "Data‑driven recommendations",
    ],
    image: "/e-advisory.jpg",
  },
  {
    key: "e-marketplace",
    title: "E‑Marketplace & Market Linkages",
    bullets: [
      "Produce listing & buyer discovery",
      "Contracting and integrated payments",
      "Logistics linkage",
    ],
    image: "https://images.unsplash.com/photo-1498654077810-12f23e2f1d4f?q=80&w=1600&auto=format&fit=crop",
  },
  {
    key: "farmer-data-repository",
    title: "Historical Farmer Data Repository",
    bullets: ["Upload & standardize records", "Behavior & credit trend insights", "Integration with scoring"],
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1600&auto=format&fit=crop",
  },
  {
    key: "member-management",
    title: "Farmer, VSLA & Cooperative Member Management",
    bullets: ["Unified registration & profiling", "Financial identity & roles", "Lifecycle tracking"],
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop",
  },
  {
    key: "credit-scoring",
    title: "Alternative Data‑Driven Credit Scoring",
    bullets: ["Multi‑source data & scoring engine", "Eligibility scorecards & dynamic limits", "Early warning flags"],
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop",
  },
  {
    key: "credit-application",
    title: "Input Order & Credit Application",
    bullets: ["Order creation & basket management", "Group consolidation", "Loan application & approval workflow"],
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1600&auto=format&fit=crop",
  },
  {
    key: "loan-management",
    title: "Loan Management & Disbursement",
    bullets: ["Origination, terms & disbursement", "Repayment mechanisms"],
    image: "/loan-management.jpg",
  },
  {
    key: "supplier-distribution",
    title: "Supplier & Distribution Management",
    bullets: ["Supplier registry & order fulfillment", "Delivery tracking & stock monitoring"],
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1600&auto=format&fit=crop",
  },
];

export const modules: ModuleCard[] = [
  { title: "E‑Advisory", href: "/e-advisory", color: "var(--mv-green)", bullets: ["Crop", "Weather", "Pests"] },
  { title: "E‑Marketplace", href: "/e-marketplace", color: "var(--mv-pink)", bullets: ["Listing", "Buyers", "Payments"] },
  { title: "Farmer Data Repository", href: "/farmer-data-repository", color: "var(--mv-cyan)", bullets: ["Upload", "Standardize", "Insights"] },
  { title: "Member Management", href: "/member-management", color: "var(--mv-emerald)", bullets: ["Register", "Profile", "Roles"] },
  { title: "Credit Scoring", href: "/credit-scoring", color: "var(--mv-amber)", bullets: ["Data", "Engine", "Limits"] },
  { title: "Credit Application", href: "/credit-application", color: "var(--mv-purple)", bullets: ["Orders", "Groups", "Workflow"] },
  { title: "Loan Management", href: "/loan-management", color: "var(--mv-blue)", bullets: ["Originate", "Terms", "Repay"] },
  { title: "Supplier & Distribution", href: "/supplier-distribution", color: "var(--mv-red)", bullets: ["Suppliers", "Fulfill", "Track"] },
];
