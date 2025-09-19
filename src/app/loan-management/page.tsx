"use client";
import ModulePage from "@/components/modules/ModulePage";
import { Wallet } from "lucide-react";

export default function Page() {
  return (
    <ModulePage
      meta={{
        title: "Loan Management & Disbursement",
        colorVar: "--mv-blue",
        sections: [
          { title: "Origination", points: ["Sourcing & pipeline", "Eligibility checks", "KYC"] },
          { title: "Approval & Terms", points: ["Term sheets", "Interest & fees", "Grace periods"] },
          { title: "Disbursement Flow", points: ["Mobile money", "Direct-to-supplier", "Tranches"] },
          { title: "Repayment Mechanisms", points: ["Installments", "Auto-deduction", "Rescheduling"] },
        ],
        Icon: Wallet,
      }}
    />
  );
}
