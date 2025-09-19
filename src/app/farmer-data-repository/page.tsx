"use client";
import ModulePage from "@/components/modules/ModulePage";
import { BookOpen, Upload, TableProperties, LineChart, BarChart3, Cpu, FileBarChart } from "lucide-react";

export default function Page() {
  return (
    <ModulePage
      meta={{
        title: "Historical Farmer Data Repository",
        colorVar: "--mv-cyan",
        sections: [
          { title: "Data Upload", icon: Upload, badge: "ETL", badgeColorVar: "--mv-blue", points: ["CSV/Excel", "API ingestion", "Bulk import"] },
          { title: "Data Standardization", icon: TableProperties, badge: "Schema", badgeColorVar: "--mv-cyan", points: ["Schema mapping", "Validation rules", "Deduplication"] },
          { title: "Historical Credit Analysis", icon: LineChart, badge: "Risk", badgeColorVar: "--mv-amber", points: ["Behavioral features", "Delinquency patterns", "Recovery rates"] },
          { title: "Trend & Behavior Insights", icon: BarChart3, badge: "BI", badgeColorVar: "--mv-emerald", points: ["Season over season", "Region comparisons", "Segment analytics"] },
          { title: "Integration with Credit Scoring", icon: Cpu, badge: "ML", badgeColorVar: "--mv-purple", points: ["Feature store", "Model inputs", "Score monitoring"] },
          { title: "Insight Publishing", icon: FileBarChart, badge: "Reports", badgeColorVar: "--mv-pink", points: ["Dashboards", "PDF exports", "API access"] },
        ],
        Icon: BookOpen,
      }}
    />
  );
}
