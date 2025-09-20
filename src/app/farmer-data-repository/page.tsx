"use client";
import FarmerDataRepositoryDashboard from "@/components/modules/FarmerDataRepositoryDashboard";
import { useState } from "react";
import { Database, Plus, Search, Filter, MoreVertical, FileText, Lock, Eye } from "lucide-react";
import Modal from "@/components/common/Modal";
import NewRepositoryItemForm from "@/components/forms/NewRepositoryItemForm";

export default function FarmerDataRepositoryPage() {
  const [isNewItemModalOpen, setIsNewItemModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const repositoryItems = [
    {
      id: "RI001",
      itemName: "John Kamau Farm Assessment 2024",
      itemType: "farm_assessment",
      category: "assessments",
      farmerName: "John Kamau",
      farmerId: "F001234",
      confidentialityLevel: "internal",
      createdDate: "2024-01-15",
      fileCount: 3,
      size: "2.1 MB",
      lastAccessed: "2024-01-15 14:30"
    },
    {
      id: "RI002",
      itemName: "Mary Wanjiku Financial Records",
      itemType: "financial_records",
      category: "financial_data",
      farmerName: "Mary Wanjiku",
      farmerId: "F001235",
      confidentialityLevel: "confidential",
      createdDate: "2024-01-14",
      fileCount: 5,
      size: "4.3 MB",
      lastAccessed: "2024-01-14 16:45"
    },
    {
      id: "RI003",
      itemName: "Peter Ochieng Land Documents",
      itemType: "land_documents",
      category: "legal_documents",
      farmerName: "Peter Ochieng",
      farmerId: "F001236",
      confidentialityLevel: "restricted",
      createdDate: "2024-01-12",
      fileCount: 2,
      size: "1.8 MB",
      lastAccessed: "2024-01-13 09:20"
    },
    {
      id: "RI004",
      itemName: "Grace Muthoni Crop Data 2023",
      itemType: "crop_data",
      category: "operational_data",
      farmerName: "Grace Muthoni",
      farmerId: "F001237",
      confidentialityLevel: "internal",
      createdDate: "2024-01-10",
      fileCount: 8,
      size: "6.7 MB",
      lastAccessed: "2024-01-12 11:15"
    },
    {
      id: "RI005",
      itemName: "David Kiprop Profile Photos",
      itemType: "farmer_profile",
      category: "media",
      farmerName: "David Kiprop",
      farmerId: "F001238",
      confidentialityLevel: "public",
      createdDate: "2024-01-08",
      fileCount: 12,
      size: "15.2 MB",
      lastAccessed: "2024-01-10 08:30"
    }
  ];

  const handleNewItemSubmit = (formData: any) => {
    console.log("New Repository Item:", formData);
    setIsNewItemModalOpen(false);
    // Here you would typically send the data to your backend
  };

  const getConfidentialityIcon = (level: string) => {
    switch (level) {
      case "public":
        return <Eye className="h-4 w-4 text-green-500" />;
      case "internal":
        return <FileText className="h-4 w-4 text-blue-500" />;
      case "restricted":
        return <Lock className="h-4 w-4 text-yellow-500" />;
      case "confidential":
        return <Lock className="h-4 w-4 text-red-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getConfidentialityColor = (level: string) => {
    switch (level) {
      case "public":
        return "bg-green-100 text-green-800";
      case "internal":
        return "bg-blue-100 text-blue-800";
      case "restricted":
        return "bg-yellow-100 text-yellow-800";
      case "confidential":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const itemTypes = [
    { value: "farmer_profile", label: "Farmer Profile" },
    { value: "farm_assessment", label: "Farm Assessment" },
    { value: "financial_records", label: "Financial Records" },
    { value: "credit_history", label: "Credit History" },
    { value: "land_documents", label: "Land Documents" },
    { value: "crop_data", label: "Crop Data" },
    { value: "market_data", label: "Market Data" },
    { value: "compliance_docs", label: "Compliance Documents" }
  ];

  const categories = [
    { value: "personal_data", label: "Personal Data" },
    { value: "financial_data", label: "Financial Data" },
    { value: "operational_data", label: "Operational Data" },
    { value: "legal_documents", label: "Legal Documents" },
    { value: "assessments", label: "Assessments" },
    { value: "media", label: "Media" }
  ];

  const filteredItems = repositoryItems.filter(item => {
    const matchesSearch = item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.farmerId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterCategory === "all" || item.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Database className="h-8 w-8 text-indigo-600" />
            Farmer Data Repository
          </h1>
          <p className="text-gray-600 mt-1">Centralized storage for farmer information and documents</p>
        </div>
        <button
          onClick={() => setIsNewItemModalOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Item
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Items</p>
              <p className="text-2xl font-bold text-gray-900">{repositoryItems.length}</p>
            </div>
            <Database className="h-8 w-8 text-indigo-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Files</p>
              <p className="text-2xl font-bold text-gray-900">
                {repositoryItems.reduce((sum, item) => sum + item.fileCount, 0)}
              </p>
            </div>
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Storage Used</p>
              <p className="text-2xl font-bold text-gray-900">
                {repositoryItems.reduce((sum, item) => sum + parseFloat(item.size), 0).toFixed(1)} MB
              </p>
            </div>
            <div className="text-purple-600 text-2xl font-bold">MB</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Confidential</p>
              <p className="text-2xl font-bold text-red-600">
                {repositoryItems.filter(item => item.confidentialityLevel === "confidential").length}
              </p>
            </div>
            <Lock className="h-8 w-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search by item name, farmer name, or ID..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.value} value={category.value}>{category.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Repository Items Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Farmer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Confidentiality
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Files
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.itemName}</div>
                      <div className="text-sm text-gray-500">Created {item.createdDate}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.farmerName}</div>
                      <div className="text-sm text-gray-500">{item.farmerId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">
                      {itemTypes.find(t => t.value === item.itemType)?.label || item.itemType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getConfidentialityIcon(item.confidentialityLevel)}
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getConfidentialityColor(item.confidentialityLevel)}`}>
                        {item.confidentialityLevel.charAt(0).toUpperCase() + item.confidentialityLevel.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.fileCount} files
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Database className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No repository items found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || filterCategory !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Get started by adding your first repository item."
              }
            </p>
          </div>
        )}
      </div>

      {/* Category Distribution */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Distribution</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.slice(0, 6).map((category) => {
            const count = repositoryItems.filter(item => item.category === category.value).length;
            const percentage = repositoryItems.length > 0 ? Math.round((count / repositoryItems.length) * 100) : 0;

            return (
              <div key={category.value} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{count}</div>
                <div className="text-sm text-gray-600">{category.label}</div>
                <div className="text-xs text-gray-500">{percentage}%</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* New Repository Item Modal */}
      <Modal
        isOpen={isNewItemModalOpen}
        onClose={() => setIsNewItemModalOpen(false)}
        title="Add New Repository Item"
        maxWidth="max-w-4xl"
      >
        <NewRepositoryItemForm
          onSubmit={handleNewItemSubmit}
          onCancel={() => setIsNewItemModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
