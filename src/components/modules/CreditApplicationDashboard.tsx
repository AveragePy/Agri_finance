"use client";

import { useState } from "react";
import { mockFarmers, mockSuppliers, mockLoans, type Farmer, type Supplier } from "@/lib/mock-data";
import { FileEdit, ShoppingCart, Users, CheckCircle, Clock, AlertCircle, Plus, Search, Calculator } from "lucide-react";

const applicationStatuses = ["draft", "submitted", "under_review", "approved", "rejected"] as const;
type ApplicationStatus = typeof applicationStatuses[number];

const statusColors = {
  draft: "text-gray-600 bg-gray-50 border-gray-200",
  submitted: "text-blue-600 bg-blue-50 border-blue-200",
  under_review: "text-amber-600 bg-amber-50 border-amber-200",
  approved: "text-green-600 bg-green-50 border-green-200",
  rejected: "text-red-600 bg-red-50 border-red-200"
};

type CreditApplication = {
  id: string;
  farmerId: string;
  farmerName: string;
  status: ApplicationStatus;
  requestedAmount: number;
  purpose: string;
  applicationDate: string;
  items: { product: string; quantity: number; unitPrice: number }[];
  isGroupApplication: boolean;
  groupMembers?: string[];
};

// Mock credit applications
const mockApplications: CreditApplication[] = [
  {
    id: "CA001",
    farmerId: "F001",
    farmerName: "John Kamau",
    status: "submitted",
    requestedAmount: 45000,
    purpose: "Seeds and Fertilizer for Maize Season",
    applicationDate: "2024-01-15",
    items: [
      { product: "Maize Seeds (Hybrid)", quantity: 10, unitPrice: 500 },
      { product: "DAP Fertilizer", quantity: 4, unitPrice: 3500 },
      { product: "CAN Fertilizer", quantity: 6, unitPrice: 2500 }
    ],
    isGroupApplication: false
  },
  {
    id: "CA002",
    farmerId: "F002",
    farmerName: "Mary Wanjiku",
    status: "under_review",
    requestedAmount: 75000,
    purpose: "Greenhouse Setup and Inputs",
    applicationDate: "2024-01-12",
    items: [
      { product: "Greenhouse Kit", quantity: 1, unitPrice: 50000 },
      { product: "Tomato Seeds", quantity: 20, unitPrice: 200 },
      { product: "Drip Irrigation", quantity: 1, unitPrice: 15000 }
    ],
    isGroupApplication: false
  },
  {
    id: "CA003",
    farmerId: "F003",
    farmerName: "Peter Mwangi",
    status: "approved",
    requestedAmount: 120000,
    purpose: "Group Coffee Processing Equipment",
    applicationDate: "2024-01-10",
    items: [
      { product: "Coffee Pulping Machine", quantity: 1, unitPrice: 80000 },
      { product: "Drying Tables", quantity: 10, unitPrice: 2000 },
      { product: "Storage Bags", quantity: 100, unitPrice: 200 }
    ],
    isGroupApplication: true,
    groupMembers: ["F003", "F004", "F005"]
  }
];

export default function CreditApplicationDashboard() {
  const [selectedApplication, setSelectedApplication] = useState<CreditApplication | null>(null);
  const [showNewApplicationForm, setShowNewApplicationForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "all">("all");

  const filteredApplications = mockApplications.filter(app => {
    const matchesSearch = app.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalApplications: mockApplications.length,
    pendingReview: mockApplications.filter(a => a.status === "under_review").length,
    approvedApplications: mockApplications.filter(a => a.status === "approved").length,
    totalRequestedAmount: mockApplications.reduce((sum, a) => sum + a.requestedAmount, 0)
  };

  const calculateTotal = (items: CreditApplication["items"]) => {
    return items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-lg border p-4 bg-card">
          <div className="flex items-center gap-2">
            <FileEdit className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium">Total Applications</span>
          </div>
          <div className="text-2xl font-bold mt-1">{stats.totalApplications}</div>
        </div>
        <div className="rounded-lg border p-4 bg-card">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-amber-600" />
            <span className="text-sm font-medium">Pending Review</span>
          </div>
          <div className="text-2xl font-bold mt-1">{stats.pendingReview}</div>
        </div>
        <div className="rounded-lg border p-4 bg-card">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium">Approved</span>
          </div>
          <div className="text-2xl font-bold mt-1">{stats.approvedApplications}</div>
        </div>
        <div className="rounded-lg border p-4 bg-card">
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium">Requested Amount</span>
          </div>
          <div className="text-2xl font-bold mt-1">UGX {stats.totalRequestedAmount.toLocaleString()}</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Credit Applications</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search applications..."
              className="pl-9 pr-4 py-2 border rounded-lg text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-3 py-2 border rounded-lg text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as ApplicationStatus | "all")}
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="submitted">Submitted</option>
            <option value="under_review">Under Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <button
            onClick={() => setShowNewApplicationForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm"
          >
            <Plus className="h-4 w-4" />
            New Application
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredApplications.map((application) => (
          <div
            key={application.id}
            className="rounded-lg border p-4 bg-card hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedApplication(application)}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{application.farmerName}</h3>
                  {application.isGroupApplication && (
                    <span className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                      <Users className="h-3 w-3" />
                      Group
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">Application #{application.id}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs border ${statusColors[application.status]}`}>
                {application.status.replace("_", " ")}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <span className="text-sm text-muted-foreground">Purpose:</span>
                <p className="font-medium">{application.purpose}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Requested Amount:</span>
                <p className="font-bold text-primary">UGX {application.requestedAmount.toLocaleString()}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Application Date:</span>
                <p>{application.applicationDate}</p>
              </div>
            </div>

            <div className="mb-3">
              <span className="text-sm font-medium">Items ({application.items.length}):</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {application.items.slice(0, 3).map((item, index) => (
                  <span key={index} className="px-2 py-1 bg-muted rounded text-xs">
                    {item.product} x{item.quantity}
                  </span>
                ))}
                {application.items.length > 3 && (
                  <span className="px-2 py-1 bg-muted rounded text-xs">
                    +{application.items.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {application.isGroupApplication && application.groupMembers && (
              <div className="text-sm text-muted-foreground">
                Group members: {application.groupMembers.length} farmers
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Application Detail Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Application Details</h3>
              <button
                onClick={() => setSelectedApplication(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-lg">{selectedApplication.farmerName}</h4>
                  <p className="text-sm text-muted-foreground">Application #{selectedApplication.id}</p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded text-sm ${statusColors[selectedApplication.status]}`}>
                    {selectedApplication.status.replace("_", " ")}
                  </span>
                  {selectedApplication.isGroupApplication && (
                    <div className="flex items-center gap-1 mt-1 text-sm text-blue-600">
                      <Users className="h-4 w-4" />
                      Group Application
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium">Purpose:</span>
                  <p>{selectedApplication.purpose}</p>
                </div>
                <div>
                  <span className="text-sm font-medium">Requested Amount:</span>
                  <p className="text-lg font-bold text-primary">UGX {selectedApplication.requestedAmount.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-sm font-medium">Application Date:</span>
                  <p>{selectedApplication.applicationDate}</p>
                </div>
                <div>
                  <span className="text-sm font-medium">Total Items:</span>
                  <p>{selectedApplication.items.length}</p>
                </div>
              </div>

              <div>
                <span className="text-sm font-medium">Item Breakdown:</span>
                <div className="space-y-2 mt-2">
                  {selectedApplication.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-muted rounded">
                      <div>
                        <span className="font-medium">{item.product}</span>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity} @ UGX {item.unitPrice.toLocaleString()} each</p>
                      </div>
                      <span className="font-bold">UGX {(item.quantity * item.unitPrice).toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center p-3 bg-primary/10 rounded font-bold">
                    <span>Total:</span>
                    <span>UGX {calculateTotal(selectedApplication.items).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {selectedApplication.isGroupApplication && selectedApplication.groupMembers && (
                <div>
                  <span className="text-sm font-medium">Group Members:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedApplication.groupMembers.map((memberId) => {
                      const member = mockFarmers.find(f => f.id === memberId);
                      return (
                        <span key={memberId} className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                          {member?.name || memberId}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setSelectedApplication(null)}
                className="flex-1 px-4 py-2 border rounded-lg text-sm"
              >
                Close
              </button>
              {selectedApplication.status === "submitted" && (
                <button className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg text-sm">
                  Start Review
                </button>
              )}
              {selectedApplication.status === "under_review" && (
                <>
                  <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg text-sm">
                    Reject
                  </button>
                  <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg text-sm">
                    Approve
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* New Application Form Modal */}
      {showNewApplicationForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">New Credit Application</h3>
              <button
                onClick={() => setShowNewApplicationForm(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ×
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Farmer</label>
                <select className="w-full px-3 py-2 border rounded-lg text-sm">
                  <option value="">Select farmer...</option>
                  {mockFarmers.map(farmer => (
                    <option key={farmer.id} value={farmer.id}>{farmer.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Purpose</label>
                <input type="text" className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="e.g., Seeds and Fertilizer" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Requested Amount (UGX)</label>
                <input type="number" className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="50000" />
              </div>
              <div>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Group Application</span>
                </label>
              </div>
            </form>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setShowNewApplicationForm(false)}
                className="flex-1 px-4 py-2 border rounded-lg text-sm"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm">
                Create Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
