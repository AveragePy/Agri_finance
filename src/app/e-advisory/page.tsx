"use client";
import ModulePage from "@/components/modules/ModulePage";
import { Leaf, Sprout, CloudSun, Bug, Smartphone, Lightbulb } from "lucide-react";

export default function Page() {
  return (
    <ModulePage
      meta={{
        title: "E‑Advisory Module",
        colorVar: "--mv-green",
        sections: [
          { title: "Crop Advisory", icon: Sprout, badge: "Core", badgeColorVar: "--mv-green", points: ["Crop calendars", "Soil testing tips", "Input recommendations"] },
          { title: "Weather Advisory", icon: CloudSun, badge: "Live", badgeColorVar: "--mv-amber", points: ["7‑day forecast", "Rainfall alerts", "Drought warnings"] },
          { title: "Pests & Disease Advisory", icon: Bug, badge: "Updated", badgeColorVar: "--mv-red", points: ["Identification guides", "Thresholds & actions", "Approved treatments"] },
          { title: "Multi-Channel Delivery", icon: Smartphone, badge: "USSD/SMS", badgeColorVar: "--mv-blue", points: ["USSD", "SMS", "Android app"] },
          { title: "Data-Driven Advice", icon: Lightbulb, badge: "AI", badgeColorVar: "--mv-purple", content: "Recommendations generated from localized agronomic models and historical outcomes." },
        ],
        Icon: Leaf,
      }}
    />
  );
}
