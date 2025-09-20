"use client";
import { Database, Plus, Settings, CheckCircle, AlertTriangle, RefreshCw } from "lucide-react";
import { useState } from "react";
import Modal from "@/components/common/Modal";
import NewDataSourceForm from "@/components/forms/NewDataSourceForm";

export default function DataSourcesPage() {
  const [isNewDataSourceModalOpen, setIsNewDataSourceModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const dataSources = [
    { name: "Bank Transaction History", type: "Financial", status: "Active", quality: 98, lastSync: "1h ago" },
    { name: "Mobile Money Records", type: "Financial", status: "Active", quality: 95, lastSync: "2h ago" },
    { name: "Agricultural Production Data", type: "Operational", status: "Active", quality: 92, lastSync: "3h ago" },
    { name: "Weather & Climate Data", type: "Environmental", status: "Active", quality: 88, lastSync: "1h ago" },
    { name: "Market Price Information", type: "Market", status: "Syncing", quality: 90, lastSync: "5m ago" },
    { name: "Land Registry Records", type: "Legal", status: "Active", quality: 96, lastSync: "4h ago" },
  ];

  const handleNewDataSourceSubmit = (formData: any) => {
    console.log("New Data Source:", formData);
    setIsNewDataSourceModalOpen(false);
    // Here you would typically send the data to your backend
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "Syncing":
        return <RefreshCw className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Syncing":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  const filteredDataSources = dataSources.filter(source => {
    const matchesSearch = source.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         source.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || source.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Data Sources</h1>
          <p className="text-muted-foreground">
            Manage and configure data sources for credit scoring algorithms
          </p>
        </div>
        <button
          onClick={() => setIsNewDataSourceModalOpen(true)}
          className="inline-flex items-center gap-2 h-9 rounded-lg bg-primary text-primary-foreground px-3 text-sm hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Data Source
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium">Active Sources</span>
          </div>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground">Connected and operational</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium">Data Quality</span>
          </div>
          <div className="text-2xl font-bold">94%</div>
          <p className="text-xs text-muted-foreground">Average quality score</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4 text-amber-600" />
            <span className="text-sm font-medium">Last Sync</span>
          </div>
          <div className="text-2xl font-bold">2h ago</div>
          <p className="text-xs text-muted-foreground">All sources updated</p>
        </div>
      </div>

      {/* Data Sources List */}
      <div className="rounded-lg border bg-card">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Configured Data Sources</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {filteredDataSources.map((source, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Database className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{source.name}</div>
                    <div className="text-sm text-muted-foreground">{source.type} • Last sync: {source.lastSync}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">{source.quality}%</div>
                    <div className="text-xs text-muted-foreground">Quality Score</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      source.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {source.status}
                    </span>
                    <button className="h-8 w-8 inline-flex items-center justify-center rounded-lg border hover:bg-muted">
                      <Settings className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Data Source Categories */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">Available Source Types</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded bg-blue-100 flex items-center justify-center">
                  <Database className="h-4 w-4 text-blue-600" />
                </div>
                <span className="font-medium">Financial Data</span>
              </div>
              <span className="text-sm text-muted-foreground">3 sources</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded bg-green-100 flex items-center justify-center">
                  <Database className="h-4 w-4 text-green-600" />
                </div>
                <span className="font-medium">Operational Data</span>
              </div>
              <span className="text-sm text-muted-foreground">2 sources</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded bg-amber-100 flex items-center justify-center">
                  <Database className="h-4 w-4 text-amber-600" />
                </div>
                <span className="font-medium">External APIs</span>
              </div>
              <span className="text-sm text-muted-foreground">4 sources</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">Data Quality Metrics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Completeness</span>
                <span>96%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{width: '96%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Accuracy</span>
                <span>94%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '94%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Timeliness</span>
                <span>91%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-amber-600 h-2 rounded-full" style={{width: '91%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Data Source Modal */}
      <Modal
        isOpen={isNewDataSourceModalOpen}
        onClose={() => setIsNewDataSourceModalOpen(false)}
        title="Add New Data Source"
        maxWidth="max-w-4xl"
      >
        <NewDataSourceForm
          onSubmit={handleNewDataSourceSubmit}
          onCancel={() => setIsNewDataSourceModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
