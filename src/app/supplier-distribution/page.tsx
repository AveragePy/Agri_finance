"use client";
import ModulePage from "@/components/modules/ModulePage";
import { Truck } from "lucide-react";

export default function Page() {
  return (
    <ModulePage
      meta={{
        title: "Supplier & Distribution Management",
        colorVar: "--mv-red",
        sections: [
          { title: "Supplier Registry", points: ["KYC & contracts", "Product catalogs", "Coverage areas"] },
          { title: "Order Fulfillment", points: ["Pick/pack", "Dispatch", "Returns"] },
          { title: "Delivery Tracking", points: ["Driver app", "GPS & ETAs", "POD uploads"] },
          { title: "Stock Monitoring", points: ["Reorder alerts", "Batch & expiry", "Inventory audits"] },
        ],
        Icon: Truck,
      }}
    />
  );
}
