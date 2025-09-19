"use client";
import ModulePage from "@/components/modules/ModulePage";
import { FileEdit } from "lucide-react";

export default function Page() {
  return (
    <ModulePage
      meta={{
        title: "Input Order & Credit Application",
        colorVar: "--mv-purple",
        sections: [
          { title: "Order Creation", points: ["Select inputs", "Choose suppliers", "Set quantities"] },
          { title: "Basket Management", points: ["Edit items", "Substitutions", "Group basket"] },
          { title: "Group Consolidation", points: ["Aggregate orders", "Volume pricing", "Approval routing"] },
          { title: "Loan Application", points: ["Applicant details", "Purpose & season", "Requested amount"] },
          { title: "Approval Workflow", points: ["Coop review", "Lender decision", "Notifications"] },
        ],
        Icon: FileEdit,
      }}
    />
  );
}
