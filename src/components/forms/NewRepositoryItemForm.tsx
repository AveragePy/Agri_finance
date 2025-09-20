"use client";

import { useState } from "react";
import { Database, Upload, Tag, Info, Plus } from "lucide-react";

interface NewRepositoryItemFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function NewRepositoryItemForm({ onSubmit, onCancel }: NewRepositoryItemFormProps) {
  const [formData, setFormData] = useState({
    itemName: "",
    itemType: "farmer_profile",
    category: "personal_data",
    description: "",
    farmerId: "",
    farmerName: "",
    dataSource: "manual_entry",
    confidentialityLevel: "internal",
    retentionPeriod: "7_years",
    tags: [],
    metadata: {
      region: "",
      farmType: "",
      cropSeason: "",
      verificationStatus: "pending"
    },
    files: [],
    accessPermissions: {
      viewable: ["admin", "analyst"],
      editable: ["admin"],
      downloadable: ["admin"]
    },
    notifications: {
      onUpload: true,
      onUpdate: false,
      onAccess: false
    }
  });

  const itemTypes = [
    { value: "farmer_profile", label: "Farmer Profile", description: "Basic farmer information and demographics" },
    { value: "farm_assessment", label: "Farm Assessment", description: "Detailed farm evaluation and analysis" },
    { value: "financial_records", label: "Financial Records", description: "Income, expenses, and financial statements" },
    { value: "credit_history", label: "Credit History", description: "Previous loans and credit performance" },
    { value: "land_documents", label: "Land Documents", description: "Land ownership and legal documents" },
    { value: "crop_data", label: "Crop Data", description: "Planting, harvesting, and yield information" },
    { value: "market_data", label: "Market Data", description: "Pricing and market access information" },
    { value: "compliance_docs", label: "Compliance Documents", description: "Regulatory and certification documents" }
  ];

  const categories = [
    { value: "personal_data", label: "Personal Data", description: "Individual farmer information" },
    { value: "financial_data", label: "Financial Data", description: "Financial records and transactions" },
    { value: "operational_data", label: "Operational Data", description: "Farm operations and activities" },
    { value: "legal_documents", label: "Legal Documents", description: "Contracts and legal papers" },
    { value: "assessments", label: "Assessments", description: "Evaluations and reports" },
    { value: "media", label: "Media", description: "Photos, videos, and multimedia" }
  ];

  const dataSources = [
    { value: "manual_entry", label: "Manual Entry" },
    { value: "mobile_app", label: "Mobile Application" },
    { value: "field_survey", label: "Field Survey" },
    { value: "third_party_api", label: "Third-party API" },
    { value: "government_records", label: "Government Records" },
    { value: "bank_integration", label: "Bank Integration" },
    { value: "satellite_data", label: "Satellite Data" },
    { value: "iot_sensors", label: "IoT Sensors" }
  ];

  const confidentialityLevels = [
    { value: "public", label: "Public", description: "Accessible to all users", color: "green" },
    { value: "internal", label: "Internal", description: "Accessible to organization members", color: "blue" },
    { value: "restricted", label: "Restricted", description: "Limited access with permissions", color: "yellow" },
    { value: "confidential", label: "Confidential", description: "Highly sensitive information", color: "red" }
  ];

  const retentionPeriods = [
    { value: "1_year", label: "1 Year" },
    { value: "3_years", label: "3 Years" },
    { value: "5_years", label: "5 Years" },
    { value: "7_years", label: "7 Years" },
    { value: "10_years", label: "10 Years" },
    { value: "permanent", label: "Permanent" }
  ];

  const regions = ["Central", "Eastern", "Western", "Northern", "Coastal"];
  const farmTypes = ["Crop Farming", "Livestock", "Mixed Farming", "Horticulture", "Aquaculture"];
  const cropSeasons = ["Long Rains", "Short Rains", "Dry Season", "Year Round"];
  const verificationStatuses = ["pending", "verified", "rejected", "expired"];
  const userRoles = ["admin", "analyst", "field_officer", "viewer"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.farmerId && !formData.farmerName) {
      alert('Please specify either Farmer ID or Farmer Name');
      return;
    }

    onSubmit({
      ...formData,
      id: `RI${Date.now()}`,
      createdDate: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      status: "active",
      fileCount: formData.files.length,
      tagCount: formData.tags.length,
      size: calculateEstimatedSize()
    });
  };

  const calculateEstimatedSize = () => {
    const baseSize = 0.5; // Base size in MB
    const fileSize = formData.files.length * 2; // Estimate 2MB per file
    return `${(baseSize + fileSize).toFixed(1)} MB`;
  };

  const addTag = () => {
    const tag = prompt("Enter a tag:");
    if (tag && tag.trim() && !formData.tags.includes(tag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag.trim()]
      }));
    }
  };

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const addFile = () => {
    const fileName = prompt("Enter file name:");
    if (fileName && fileName.trim()) {
      setFormData(prev => ({
        ...prev,
        files: [...prev.files, {
          name: fileName.trim(),
          type: "document",
          size: "1.2 MB",
          uploadDate: new Date().toISOString()
        }]
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const togglePermission = (permissionType: string, role: string) => {
    setFormData(prev => ({
      ...prev,
      accessPermissions: {
        ...prev.accessPermissions,
        [permissionType]: prev.accessPermissions[permissionType as keyof typeof prev.accessPermissions].includes(role)
          ? prev.accessPermissions[permissionType as keyof typeof prev.accessPermissions].filter((r: string) => r !== role)
          : [...prev.accessPermissions[permissionType as keyof typeof prev.accessPermissions], role]
      }
    }));
  };

  const selectedItemType = itemTypes.find(t => t.value === formData.itemType);
  const selectedCategory = categories.find(c => c.value === formData.category);
  const selectedConfidentiality = confidentialityLevels.find(c => c.value === formData.confidentialityLevel);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Item Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Database className="h-5 w-5 text-blue-600" />
          Item Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Item Name *
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.itemName}
              onChange={(e) => setFormData(prev => ({ ...prev, itemName: e.target.value }))}
              placeholder="e.g., John Doe Farm Assessment 2024"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Item Type *
            </label>
            <select
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.itemType}
              onChange={(e) => setFormData(prev => ({ ...prev, itemType: e.target.value }))}
            >
              {itemTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data Source
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.dataSource}
              onChange={(e) => setFormData(prev => ({ ...prev, dataSource: e.target.value }))}
            >
              {dataSources.map((source) => (
                <option key={source.value} value={source.value}>
                  {source.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe the contents and purpose of this repository item..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedItemType && (
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>{selectedItemType.label}:</strong> {selectedItemType.description}
              </p>
            </div>
          )}

          {selectedCategory && (
            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
              <p className="text-sm text-green-800">
                <strong>{selectedCategory.label}:</strong> {selectedCategory.description}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Farmer Association */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Farmer Association</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Farmer ID
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={formData.farmerId}
              onChange={(e) => setFormData(prev => ({ ...prev, farmerId: e.target.value }))}
              placeholder="F001234"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Farmer Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={formData.farmerName}
              onChange={(e) => setFormData(prev => ({ ...prev, farmerName: e.target.value }))}
              placeholder="John Doe"
            />
          </div>
        </div>

        <p className="text-sm text-gray-600">
          * Specify either Farmer ID or Farmer Name to associate this item with a farmer
        </p>
      </div>

      {/* Metadata */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Info className="h-5 w-5 text-purple-600" />
          Metadata
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Region
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={formData.metadata.region}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                metadata: { ...prev.metadata, region: e.target.value }
              }))}
            >
              <option value="">Select Region</option>
              {regions.map((region) => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Farm Type
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={formData.metadata.farmType}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                metadata: { ...prev.metadata, farmType: e.target.value }
              }))}
            >
              <option value="">Select Farm Type</option>
              {farmTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Crop Season
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={formData.metadata.cropSeason}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                metadata: { ...prev.metadata, cropSeason: e.target.value }
              }))}
            >
              <option value="">Select Season</option>
              {cropSeasons.map((season) => (
                <option key={season} value={season}>{season}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Verification Status
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={formData.metadata.verificationStatus}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                metadata: { ...prev.metadata, verificationStatus: e.target.value }
              }))}
            >
              {verificationStatuses.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Security & Compliance */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Security & Compliance</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confidentiality Level *
            </label>
            <select
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={formData.confidentialityLevel}
              onChange={(e) => setFormData(prev => ({ ...prev, confidentialityLevel: e.target.value }))}
            >
              {confidentialityLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Retention Period
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={formData.retentionPeriod}
              onChange={(e) => setFormData(prev => ({ ...prev, retentionPeriod: e.target.value }))}
            >
              {retentionPeriods.map((period) => (
                <option key={period.value} value={period.value}>
                  {period.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedConfidentiality && (
          <div className={`p-3 rounded-lg border ${
            selectedConfidentiality.color === 'red' ? 'bg-red-50 border-red-200' :
            selectedConfidentiality.color === 'yellow' ? 'bg-yellow-50 border-yellow-200' :
            selectedConfidentiality.color === 'blue' ? 'bg-blue-50 border-blue-200' :
            'bg-green-50 border-green-200'
          }`}>
            <p className={`text-sm ${
              selectedConfidentiality.color === 'red' ? 'text-red-800' :
              selectedConfidentiality.color === 'yellow' ? 'text-yellow-800' :
              selectedConfidentiality.color === 'blue' ? 'text-blue-800' :
              'text-green-800'
            }`}>
              <strong>{selectedConfidentiality.label}:</strong> {selectedConfidentiality.description}
            </p>
          </div>
        )}
      </div>

      {/* Access Permissions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Access Permissions</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Viewable By</label>
            <div className="space-y-2">
              {userRoles.map((role) => (
                <label key={`view-${role}`} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    checked={formData.accessPermissions.viewable.includes(role)}
                    onChange={() => togglePermission('viewable', role)}
                  />
                  <span className="text-sm text-gray-700 capitalize">{role.replace('_', ' ')}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Editable By</label>
            <div className="space-y-2">
              {userRoles.map((role) => (
                <label key={`edit-${role}`} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    checked={formData.accessPermissions.editable.includes(role)}
                    onChange={() => togglePermission('editable', role)}
                  />
                  <span className="text-sm text-gray-700 capitalize">{role.replace('_', ' ')}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Downloadable By</label>
            <div className="space-y-2">
              {userRoles.map((role) => (
                <label key={`download-${role}`} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={formData.accessPermissions.downloadable.includes(role)}
                    onChange={() => togglePermission('downloadable', role)}
                  />
                  <span className="text-sm text-gray-700 capitalize">{role.replace('_', ' ')}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Tag className="h-5 w-5 text-indigo-600" />
          Tags
        </h3>

        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
              <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={addTag}
            className="px-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-indigo-300 hover:text-indigo-600 transition-colors flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Tag
          </button>
        </div>
      </div>

      {/* Files */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Upload className="h-5 w-5 text-green-600" />
          Files
        </h3>

        <div className="space-y-3">
          {formData.files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{file.name}</p>
                <p className="text-sm text-gray-500">{file.size} • {file.type}</p>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="px-3 py-1 text-red-600 hover:bg-red-50 rounded"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addFile}
            className="w-full px-4 py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-green-300 hover:text-green-600 transition-colors flex items-center justify-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Add File
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h4 className="font-medium text-gray-900 mb-3">Repository Item Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Item Name:</span>
            <span className="font-medium">{formData.itemName || 'Not specified'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Type:</span>
            <span>{selectedItemType?.label}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Category:</span>
            <span>{selectedCategory?.label}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Confidentiality:</span>
            <span className={`font-medium ${
              formData.confidentialityLevel === 'confidential' ? 'text-red-600' :
              formData.confidentialityLevel === 'restricted' ? 'text-yellow-600' :
              formData.confidentialityLevel === 'internal' ? 'text-blue-600' :
              'text-green-600'
            }`}>
              {selectedConfidentiality?.label}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Files:</span>
            <span>{formData.files.length} file(s)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tags:</span>
            <span>{formData.tags.length} tag(s)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Estimated Size:</span>
            <span>{calculateEstimatedSize()}</span>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex gap-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add to Repository
        </button>
      </div>
    </form>
  );
}
