"use client";

import { useState } from "react";
import { mockLoans, mockFarmers, type Loan } from "@/lib/mock-data";
import { Wallet, TrendingUp, AlertCircle, CheckCircle, Clock, DollarSign, Calendar, User } from "lucide-react";

const statusColors = {
  pending: "text-amber-600 bg-amber-50 border-amber-200",
  approved: "text-blue-600 bg-blue-50 border-blue-200",
  disbursed: "text-green-600 bg-green-50 border-green-200",
  repaid: "text-gray-600 bg-gray-50 border-gray-200",
  overdue: "text-red-600 bg-red-50 border-red-200"
};

const getRepaymentProgress = (loan: Loan) => {
  const progress = (loan.repaidAmount / loan.amount) * 100;
  return Math.min(progress, 100);
};

const getDaysUntilDue = (dueDate: string) => {
  const due = new Date(dueDate);
  const today = new Date();
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export default function LoanManagementDashboard() {
  const [selectedStatus, setSelectedStatus] = useState<Loan["status"] | "all">("all");
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLoans = mockLoans.filter(loan => {
    const matchesStatus = selectedStatus === "all" || loan.status === selectedStatus;
    const matchesSearch = loan.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    totalLoans: mockLoans.length,
    totalDisbursed: mockLoans.reduce((sum, l) => sum + (l.status === "disbursed" ? l.amount : 0), 0),
    totalRepaid: mockLoans.reduce((sum, l) => sum + l.repaidAmount, 0),
    overdueLoans: mockLoans.filter(l => l.status === "overdue" || (l.status === "disbursed" && getDaysUntilDue(l.dueDate) < 0)).length
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-lg border p-4 bg-card">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium">Total Loans</span>
          </div>
          <div className="text-2xl font-bold mt-1">{stats.totalLoans}</div>
        </div>
        <div className="rounded-lg border p-4 bg-card">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium">Disbursed</span>
          </div>
          <div className="text-2xl font-bold mt-1">UGX {stats.totalDisbursed.toLocaleString()}</div>
        </div>
        <div className="rounded-lg border p-4 bg-card">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium">Repaid</span>
          </div>
          <div className="text-2xl font-bold mt-1">UGX {stats.totalRepaid.toLocaleString()}</div>
        </div>
        <div className="rounded-lg border p-4 bg-card">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <span className="text-sm font-medium">Overdue</span>
          </div>
          <div className="text-2xl font-bold mt-1">{stats.overdueLoans}</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Loan Portfolio</h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search loans..."
            className="px-3 py-2 border rounded-lg text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="px-3 py-2 border rounded-lg text-sm"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as Loan["status"] | "all")}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="disbursed">Disbursed</option>
            <option value="repaid">Repaid</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredLoans.map((loan) => {
          const progress = getRepaymentProgress(loan);
          const daysUntilDue = getDaysUntilDue(loan.dueDate);
          const isOverdue = daysUntilDue < 0 && loan.status === "disbursed";

          return (
            <div
              key={loan.id}
              className="rounded-lg border p-4 bg-card hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedLoan(loan)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-medium text-lg">{loan.farmerName}</h3>
                  <p className="text-sm text-muted-foreground">{loan.purpose}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs border ${statusColors[isOverdue ? "overdue" : loan.status]}`}>
                  {isOverdue ? "overdue" : loan.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-sm text-muted-foreground">Loan Amount:</span>
                  <p className="font-bold text-lg">UGX {loan.amount.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Interest Rate:</span>
                  <p className="font-medium">{loan.interestRate}% p.a.</p>
                </div>
              </div>

              {loan.status === "disbursed" && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>Repayment Progress</span>
                    <span>{progress.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${progress >= 100 ? "bg-green-500" : isOverdue ? "bg-red-500" : "bg-blue-500"}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                    <span>Paid: UGX {loan.repaidAmount.toLocaleString()}</span>
                    <span>Remaining: UGX {(loan.amount - loan.repaidAmount).toLocaleString()}</span>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>Applied: {loan.applicationDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>Due: {loan.dueDate}</span>
                </div>
                {daysUntilDue >= 0 ? (
                  <span className="text-green-600">{daysUntilDue} days left</span>
                ) : (
                  <span className="text-red-600">{Math.abs(daysUntilDue)} days overdue</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Loan Detail Modal */}
      {selectedLoan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg p-6 max-w-lg w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Loan Details</h3>
              <button
                onClick={() => setSelectedLoan(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-8 w-8 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">{selectedLoan.farmerName}</h4>
                  <p className="text-sm text-muted-foreground">Loan ID: {selectedLoan.id}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium">Amount:</span>
                  <p className="text-lg font-bold">UGX {selectedLoan.amount.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-sm font-medium">Purpose:</span>
                  <p>{selectedLoan.purpose}</p>
                </div>
                <div>
                  <span className="text-sm font-medium">Interest Rate:</span>
                  <p>{selectedLoan.interestRate}% per annum</p>
                </div>
                <div>
                  <span className="text-sm font-medium">Status:</span>
                  <span className={`px-2 py-1 rounded text-xs ${statusColors[selectedLoan.status]}`}>
                    {selectedLoan.status}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Application Date:</span>
                  <span className="text-sm">{selectedLoan.applicationDate}</span>
                </div>
                {selectedLoan.approvalDate && (
                  <div className="flex justify-between">
                    <span className="text-sm">Approval Date:</span>
                    <span className="text-sm">{selectedLoan.approvalDate}</span>
                  </div>
                )}
                {selectedLoan.disbursementDate && (
                  <div className="flex justify-between">
                    <span className="text-sm">Disbursement Date:</span>
                    <span className="text-sm">{selectedLoan.disbursementDate}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-sm">Due Date:</span>
                  <span className="text-sm">{selectedLoan.dueDate}</span>
                </div>
              </div>

              {selectedLoan.status === "disbursed" && (
                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Repayment Status</span>
                    <span className="text-sm">{getRepaymentProgress(selectedLoan).toFixed(1)}%</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Amount Repaid:</span>
                      <span className="font-medium">UGX {selectedLoan.repaidAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Outstanding:</span>
                      <span className="font-medium">UGX {(selectedLoan.amount - selectedLoan.repaidAmount).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setSelectedLoan(null)}
                className="flex-1 px-4 py-2 border rounded-lg text-sm"
              >
                Close
              </button>
              {selectedLoan.status === "pending" && (
                <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm">
                  Approve Loan
                </button>
              )}
              {selectedLoan.status === "approved" && (
                <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg text-sm">
                  Disburse Loan
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
