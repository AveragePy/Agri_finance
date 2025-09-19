"use client";
import ModulePage from "@/components/modules/ModulePage";
import { ShoppingBasket, Package, Search, FileSignature, Wallet, Truck } from "lucide-react";

export default function Page() {
  return (
    <ModulePage
      meta={{
        title: "E‑Marketplace & Market Linkages",
        colorVar: "--mv-pink",
        sections: [
          { title: "Produce Listing", icon: Package, badge: "Catalog", badgeColorVar: "--mv-pink", points: ["Create offers", "Photos & grades", "Publish availability"] },
          { title: "Buyer Discovery", icon: Search, badge: "Finder", badgeColorVar: "--mv-emerald", points: ["Search by commodity", "Price comparisons", "Messaging"] },
          { title: "Contracting", icon: FileSignature, badge: "Digital", badgeColorVar: "--mv-purple", points: ["Digital contracts", "Escrow options", "Terms & delivery windows"] },
          { title: "Integrated Payments", icon: Wallet, badge: "Finance", badgeColorVar: "--mv-amber", points: ["Mobile money", "Bank transfer", "Bulk payouts"] },
          { title: "Logistics Linkage", icon: Truck, badge: "3PL", badgeColorVar: "--mv-blue", points: ["3PL partners", "Route planning", "Proof of delivery"] },
        ],
        Icon: ShoppingBasket,
      }}
    />
  );
}
