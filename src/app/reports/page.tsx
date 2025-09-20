"use client";
import { BarChart3, FileText, Download, Filter, Calendar, TrendingUp } from "lucide-react";
import Modal from "@/components/common/Modal";
import NewReportForm from "@/components/forms/NewReportForm";
import { useState } from "react";

export default function ReportsPage() {
  const [isNewReportModalOpen, setIsNewReportModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">
            Generate and view comprehensive reports for agricultural finance operations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 h-9 rounded-lg border px-3 text-sm bg-background hover:bg-muted transition-colors">
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <button
            onClick={() => setIsNewReportModalOpen(true)}
            className="inline-flex items-center gap-2 h-9 rounded-lg bg-primary text-primary-foreground px-3 text-sm hover:bg-primary/90 transition-colors"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
          <button
            onClick={() => setIsNewReportModalOpen(true)}
            className="inline-flex items-center gap-2 h-9 rounded-lg bg-primary text-primary-foreground px-3 text-sm hover:bg-primary/90 transition-colors"
          >
            <FileText className="h-4 w-4" />
            New Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium">Total Reports</span>
          </div>
          <div className="text-2xl font-bold">1,247</div>
          <p className="text-xs text-muted-foreground">+12% from last month</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium">Active Farmers</span>
          </div>
          <div className="text-2xl font-bold">8,432</div>
          <p className="text-xs text-muted-foreground">+5% from last month</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-amber-600" />
            <span className="text-sm font-medium">Loan Applications</span>
          </div>
          <div className="text-2xl font-bold">342</div>
          <p className="text-xs text-muted-foreground">+18% from last month</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium">This Month</span>
          </div>
          <div className="text-2xl font-bold">156</div>
          <p className="text-xs text-muted-foreground">New registrations</p>
        </div>
      </div>

      {/* Report Types */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">Financial Reports</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 rounded-lg border hover:bg-muted transition-colors">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <div className="text-left">
                  <div className="font-medium">Loan Performance Report</div>
                  <div className="text-sm text-muted-foreground">Monthly loan disbursement and repayment analysis</div>
                </div>
              </div>
              <Download className="h-4 w-4" />
            </button>
            <button className="w-full flex items-center justify-between p-3 rounded-lg border hover:bg-muted transition-colors">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <div className="text-left">
                  <div className="font-medium">Credit Score Analysis</div>
                  <div className="text-sm text-muted-foreground">Farmer credit scoring trends and insights</div>
                </div>
              </div>
              <Download className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">Operational Reports</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 rounded-lg border hover:bg-muted transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-amber-600" />
                <div className="text-left">
                  <div className="font-medium">Farmer Registration Report</div>
                  <div className="text-sm text-muted-foreground">New farmer onboarding statistics</div>
                </div>
              </div>
              <Download className="h-4 w-4" />
            </button>
            <button className="w-full flex items-center justify-between p-3 rounded-lg border hover:bg-muted transition-colors">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-purple-600" />
                <div className="text-left">
                  <div className="font-medium">Activity Summary</div>
                  <div className="text-sm text-muted-foreground">Platform usage and engagement metrics</div>
                </div>
              </div>
              <Download className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Recent Reports Table */}
      <div className="rounded-lg border bg-card">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Recent Reports</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              { name: "Monthly Loan Performance", date: "2024-01-15", status: "Generated", type: "Financial" },
              { name: "Farmer Registration Summary", date: "2024-01-14", status: "Processing", type: "Operational" },
              { name: "Credit Score Analysis", date: "2024-01-13", status: "Generated", type: "Financial" },
              { name: "Platform Activity Report", date: "2024-01-12", status: "Generated", type: "Operational" },
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{report.name}</div>
                    <div className="text-sm text-muted-foreground">{report.date} • {report.type}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    report.status === 'Generated'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {report.status}
                  </span>
                  <button className="h-8 w-8 inline-flex items-center justify-center rounded-lg border hover:bg-muted">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Report Modal */}
      <Modal
        isOpen={isNewReportModalOpen}
        onClose={() => setIsNewReportModalOpen(false)}
        title="Generate New Report"
        maxWidth="max-w-4xl"
      >
        <NewReportForm
          onSubmit={() => console.log("New Report Submitted")}
          onCancel={() => setIsNewReportModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
