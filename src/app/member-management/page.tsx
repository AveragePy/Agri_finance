"use client";
import ModulePage from "@/components/modules/ModulePage";
import { Users2 } from "lucide-react";

export default function Page() {
  return (
    <ModulePage
      meta={{
        title: "Farmer, VSLA & Cooperative Member Management",
        colorVar: "--mv-emerald",
        sections: [
          { title: "Unified Member Registration", points: ["Individual & group", "KYC capture", "Document uploads"] },
          { title: "Farm Profiling", points: ["GPS fields", "Crops & acreage", "Seasons"] },
          { title: "Financial Identity", points: ["Wallets & accounts", "Mobile money linking", "Sub-accounts"] },
          { title: "Role Management", points: ["Farmer", "Lead farmer", "Coop admin"] },
          { title: "Lifecycle Tracking", points: ["Enrollment", "Active season", "Exit & re-entry"] },
        ],
        Icon: Users2,
      }}
    />
  );
}
