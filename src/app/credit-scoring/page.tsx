"use client";
import ModulePage from "@/components/modules/ModulePage";
import { Gauge } from "lucide-react";

export default function Page() {
  return (
    <ModulePage
      meta={{
        title: "Alternative Data‑Driven Credit Scoring",
        colorVar: "--mv-amber",
        sections: [
          { title: "Data Sources", points: ["Mobile money", "Market transactions", "Weather & agronomy"] },
          { title: "Scoring Engine", points: ["Feature engineering", "Model registry", "A/B testing"] },
          { title: "Eligibility Score Card", points: ["Cutoffs", "Risk tiers", "Policy rules"] },
          { title: "Dynamic Limits", points: ["Performance adjustments", "Seasonal factors", "Group effects"] },
          { title: "Early Warning Flags", points: ["Late payment signals", "Yield anomalies", "Behavioral changes"] },
        ],
        Icon: Gauge,
      }}
    />
  );
}
