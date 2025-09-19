"use client";

import { useState } from "react";
import {
  BookOpen,
  Upload,
  TableProperties,
  LineChart,
  BarChart3,
  Cpu,
  FileBarChart,
  Database,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Users,
  Calendar,
  MapPin,
  Download,
  Eye,
  Settings
} from "lucide-react";

export default function FarmerDataRepositoryDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedDataset, setSelectedDataset] = useState("");

  // Mock data for the dashboard
  const dataStats = {
    totalRecords: 125847,
    farmerProfiles: 8934,
    creditHistories: 15672,
    yieldData: 23451,
    lastUpdated: "2024-01-15"
  };

  const recentUploads = [
    { id: 1, filename: "farmer_profiles_2024_Q1.csv", status: "completed", records: 2341, date: "2024-01-15" },
    { id: 2, filename: "credit_history_batch_47.xlsx", status: "processing", records: 1876, date: "2024-01-14" },
    { id: 3, filename: "yield_data_northern_region.csv", status: "completed", records: 5432, date: "2024-01-13" },
    { id: 4, filename: "payment_records_december.xlsx", status: "failed", records: 0, date: "2024-01-12" }
  ];

  const dataQualityMetrics = [
    { metric: "Completeness", score: 94, status: "good" },
    { metric: "Accuracy", score: 87, status: "good" },
    { metric: "Consistency", score: 76, status: "warning" },
    { metric: "Timeliness", score: 91, status: "good" }
  ];

  const analyticsInsights = [
    { title: "Seasonal Yield Patterns", description: "Maize yields show 23% increase during optimal rainfall seasons", trend: "up" },
    { title: "Credit Repayment Behavior", description: "85% on-time payment rate for loans under $500", trend: "stable" },
    { title: "Regional Performance", description: "Northern regions outperform by 15% in productivity metrics", trend: "up" },
    { title: "Risk Segmentation", description: "Low-risk farmers comprise 67% of active portfolio", trend: "stable" }
  ];

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-cyan-100 rounded-xl">
              <BookOpen className="h-8 w-8 text-cyan-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Historical Farmer Data Repository</h1>
              <p className="text-gray-600">Centralized data management and analytics platform</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Settings className="h-4 w-4" />
              Configure
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors">
              <Upload className="h-4 w-4" />
              Upload Data
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Records</p>
                <p className="text-2xl font-bold text-gray-900">{dataStats.totalRecords.toLocaleString()}</p>
              </div>
              <Database className="h-8 w-8 text-cyan-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Farmer Profiles</p>
                <p className="text-2xl font-bold text-gray-900">{dataStats.farmerProfiles.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-emerald-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Credit Histories</p>
                <p className="text-2xl font-bold text-gray-900">{dataStats.creditHistories.toLocaleString()}</p>
              </div>
              <LineChart className="h-8 w-8 text-amber-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Yield Records</p>
                <p className="text-2xl font-bold text-gray-900">{dataStats.yieldData.toLocaleString()}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "overview", label: "Overview" },
                { id: "upload", label: "Data Upload" },
                { id: "quality", label: "Data Quality" },
                { id: "analytics", label: "Analytics" },
                { id: "integration", label: "Integration" },
                { id: "reports", label: "Reports" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-cyan-500 text-cyan-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Uploads */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Upload className="h-5 w-5 text-gray-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Recent Data Uploads</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">Latest data ingestion activities</p>
                    <div className="space-y-4">
                      {recentUploads.map((upload) => (
                        <div key={upload.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{upload.filename}</p>
                            <p className="text-xs text-gray-600">{upload.records.toLocaleString()} records • {upload.date}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusBadgeClass(upload.status)}`}>
                            {upload.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Data Quality Overview */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle className="h-5 w-5 text-gray-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Data Quality Metrics</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">Overall data health indicators</p>
                    <div className="space-y-4">
                      {dataQualityMetrics.map((metric, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{metric.metric}</span>
                            <span className="text-sm text-gray-600">{metric.score}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-cyan-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${metric.score}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Analytics Insights */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="h-5 w-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Key Analytics Insights</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Latest trends and patterns from the data</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {analyticsInsights.map((insight, index) => (
                      <div key={index} className="p-4 bg-white border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm mb-1">{insight.title}</h4>
                            <p className="text-xs text-gray-600">{insight.description}</p>
                          </div>
                          <TrendingUp className={`h-4 w-4 ${insight.trend === 'up' ? 'text-emerald-600' : 'text-gray-400'}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "upload" && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Upload className="h-5 w-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Data Upload Center</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-6">Upload and process farmer data files</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Dataset Type</label>
                        <select
                          value={selectedDataset}
                          onChange={(e) => setSelectedDataset(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        >
                          <option value="">Select dataset type</option>
                          <option value="farmer-profiles">Farmer Profiles</option>
                          <option value="credit-history">Credit History</option>
                          <option value="yield-data">Yield Data</option>
                          <option value="payment-records">Payment Records</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
                        <input
                          type="file"
                          accept=".csv,.xlsx,.json"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        />
                      </div>
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors">
                        <Upload className="h-4 w-4" />
                        Upload Dataset
                      </button>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium">Supported Formats</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-medium">CSV</span>
                          <span>Comma-separated values</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-medium">XLSX</span>
                          <span>Excel spreadsheet</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-medium">JSON</span>
                          <span>JavaScript Object Notation</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {uploadProgress > 0 && (
                    <div className="mt-6 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Upload Progress</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-cyan-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "quality" && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <TableProperties className="h-5 w-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Data Quality Management</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-6">Monitor and improve data quality standards</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg border p-4">
                      <h4 className="text-lg font-medium mb-3">Validation Rules</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Required Fields</span>
                          <CheckCircle className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Data Types</span>
                          <CheckCircle className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Range Validation</span>
                          <AlertCircle className="h-4 w-4 text-amber-600" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg border p-4">
                      <h4 className="text-lg font-medium mb-3">Deduplication</h4>
                      <div className="space-y-3">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-emerald-600">98.5%</p>
                          <p className="text-sm text-gray-600">Unique Records</p>
                        </div>
                        <button className="w-full px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                          Run Deduplication
                        </button>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg border p-4">
                      <h4 className="text-lg font-medium mb-3">Schema Mapping</h4>
                      <div className="space-y-3">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-cyan-600">15</p>
                          <p className="text-sm text-gray-600">Active Schemas</p>
                        </div>
                        <button className="w-full px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                          Manage Schemas
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "analytics" && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart3 className="h-5 w-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Advanced Analytics</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-6">Historical trends and behavioral insights</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg border p-4">
                      <h4 className="text-lg font-medium mb-3">Credit Analysis</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Default Rate</span>
                          <span className="font-medium">12.3%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Avg Recovery Time</span>
                          <span className="font-medium">45 days</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Risk Score Accuracy</span>
                          <span className="font-medium">87.5%</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg border p-4">
                      <h4 className="text-lg font-medium mb-3">Yield Patterns</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Seasonal Variance</span>
                          <span className="font-medium">±23%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Top Performing Region</span>
                          <span className="font-medium">Northern</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Avg Yield/Hectare</span>
                          <span className="font-medium">2.4 tons</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "integration" && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Cpu className="h-5 w-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">ML Integration</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-6">Credit scoring model integration and feature store</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg border p-4">
                      <h4 className="text-lg font-medium mb-3">Feature Store</h4>
                      <div className="space-y-3">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-purple-600">247</p>
                          <p className="text-sm text-gray-600">Active Features</p>
                        </div>
                        <button className="w-full px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                          Manage Features
                        </button>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg border p-4">
                      <h4 className="text-lg font-medium mb-3">Model Inputs</h4>
                      <div className="space-y-3">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-emerald-600">Real-time</p>
                          <p className="text-sm text-gray-600">Data Pipeline</p>
                        </div>
                        <button className="w-full px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                          View Pipeline
                        </button>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg border p-4">
                      <h4 className="text-lg font-medium mb-3">Score Monitoring</h4>
                      <div className="space-y-3">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-cyan-600">99.2%</p>
                          <p className="text-sm text-gray-600">Uptime</p>
                        </div>
                        <button className="w-full px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                          View Metrics
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reports" && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <FileBarChart className="h-5 w-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Reports & Insights</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-6">Generate and export analytical reports</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Available Reports</h4>
                      <div className="space-y-3">
                        {[
                          "Monthly Credit Performance",
                          "Regional Yield Analysis",
                          "Farmer Risk Assessment",
                          "Data Quality Summary"
                        ].map((report, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-white border rounded-lg">
                            <span className="text-sm font-medium">{report}</span>
                            <div className="flex gap-2">
                              <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                                <Download className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium">Custom Report Builder</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500">
                            <option value="">Select report type</option>
                            <option value="credit">Credit Analysis</option>
                            <option value="yield">Yield Performance</option>
                            <option value="risk">Risk Assessment</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500">
                            <option value="">Select date range</option>
                            <option value="last-month">Last Month</option>
                            <option value="last-quarter">Last Quarter</option>
                            <option value="last-year">Last Year</option>
                          </select>
                        </div>
                        <button className="w-full px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors">
                          Generate Report
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
