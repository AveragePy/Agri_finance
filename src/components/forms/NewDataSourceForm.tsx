"use client";

import { useState } from "react";
import { Database, Plus, Settings, Key, Globe, Shield } from "lucide-react";

interface NewDataSourceFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function NewDataSourceForm({ onSubmit, onCancel }: NewDataSourceFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    type: "financial",
    description: "",
    connectionUrl: "",
    authMethod: "api_key",
    apiKey: "",
    username: "",
    password: "",
    syncFrequency: "daily",
    isActive: true,
    notes: ""
  });

  const dataSourceTypes = [
    { value: "financial", label: "Financial Data", description: "Bank transactions, mobile money records" },
    { value: "operational", label: "Operational Data", description: "Farm operations, production data" },
    { value: "environmental", label: "Environmental Data", description: "Weather, climate, soil data" },
    { value: "market", label: "Market Data", description: "Commodity prices, market information" },
    { value: "legal", label: "Legal Data", description: "Land registry, legal documents" },
    { value: "external_api", label: "External API", description: "Third-party API services" }
  ];

  const authMethods = [
    { value: "api_key", label: "API Key", description: "Simple API key authentication" },
    { value: "oauth", label: "OAuth 2.0", description: "OAuth 2.0 authentication flow" },
    { value: "basic_auth", label: "Basic Auth", description: "Username and password authentication" },
    { value: "token", label: "Bearer Token", description: "JWT or bearer token authentication" },
    { value: "none", label: "No Authentication", description: "Public data source" }
  ];

  const syncFrequencies = [
    { value: "real_time", label: "Real-time", description: "Continuous synchronization" },
    { value: "hourly", label: "Hourly", description: "Every hour" },
    { value: "daily", label: "Daily", description: "Once per day" },
    { value: "weekly", label: "Weekly", description: "Once per week" },
    { value: "monthly", label: "Monthly", description: "Once per month" },
    { value: "manual", label: "Manual", description: "Manual synchronization only" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      createdDate: new Date().toISOString().split('T')[0],
      lastSync: null,
      status: "pending_connection"
    });
  };

  const selectedType = dataSourceTypes.find(t => t.value === formData.type);
  const selectedAuth = authMethods.find(a => a.value === formData.authMethod);
  const selectedFreq = syncFrequencies.find(f => f.value === formData.syncFrequency);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Database className="h-5 w-5 text-blue-600" />
          Data Source Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data Source Name *
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter data source name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data Source Type *
            </label>
            <select
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
            >
              {dataSourceTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedType && (
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>{selectedType.label}:</strong> {selectedType.description}
            </p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            required
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe what data this source provides"
          />
        </div>
      </div>

      {/* Connection Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Globe className="h-5 w-5 text-green-600" />
          Connection Details
        </h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Connection URL/Endpoint *
          </label>
          <input
            type="url"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={formData.connectionUrl}
            onChange={(e) => setFormData(prev => ({ ...prev, connectionUrl: e.target.value }))}
            placeholder="https://api.example.com/v1/"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Synchronization Frequency
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={formData.syncFrequency}
            onChange={(e) => setFormData(prev => ({ ...prev, syncFrequency: e.target.value }))}
          >
            {syncFrequencies.map((freq) => (
              <option key={freq.value} value={freq.value}>
                {freq.label} - {freq.description}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Authentication */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Shield className="h-5 w-5 text-purple-600" />
          Authentication
        </h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Authentication Method
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={formData.authMethod}
            onChange={(e) => setFormData(prev => ({ ...prev, authMethod: e.target.value }))}
          >
            {authMethods.map((method) => (
              <option key={method.value} value={method.value}>
                {method.label} - {method.description}
              </option>
            ))}
          </select>
        </div>

        {formData.authMethod === 'api_key' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Key className="inline h-4 w-4 mr-1" />
              API Key *
            </label>
            <input
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={formData.apiKey}
              onChange={(e) => setFormData(prev => ({ ...prev, apiKey: e.target.value }))}
              placeholder="Enter API key"
            />
          </div>
        )}

        {(formData.authMethod === 'basic_auth' || formData.authMethod === 'oauth') && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username *
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={formData.username}
                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password *
              </label>
              <input
                type="password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Enter password"
              />
            </div>
          </div>
        )}
      </div>

      {/* Configuration */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Settings className="h-5 w-5 text-orange-600" />
          Configuration
        </h3>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isActive"
            className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
            checked={formData.isActive}
            onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
          />
          <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
            Enable data source immediately after creation
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional Notes
          </label>
          <textarea
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            placeholder="Any additional configuration notes or requirements"
          />
        </div>
      </div>

      {/* Configuration Summary */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h4 className="font-medium text-gray-900 mb-3">Configuration Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Data Source:</span>
            <span className="font-medium">{formData.name || 'Not specified'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Type:</span>
            <span>{selectedType?.label}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Authentication:</span>
            <span>{selectedAuth?.label}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Sync Frequency:</span>
            <span>{selectedFreq?.label}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Status:</span>
            <span className={formData.isActive ? 'text-green-600' : 'text-red-600'}>
              {formData.isActive ? 'Active' : 'Inactive'}
            </span>
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
          Add Data Source
        </button>
      </div>
    </form>
  );
}
