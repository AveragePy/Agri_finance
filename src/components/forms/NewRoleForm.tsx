"use client";

import { useState } from "react";
import { Shield, Plus, Minus, Lock, Key, Settings } from "lucide-react";

interface NewRoleFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function NewRoleForm({ onSubmit, onCancel }: NewRoleFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "operational",
    isActive: true,
    maxUsers: "",
    notes: ""
  });

  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  // Mock permission categories for demo
  const permissionCategories = [
    {
      name: "System Administration",
      icon: Lock,
      color: "text-red-600",
      permissions: [
        { id: "sys_admin_full", name: "Full System Access", description: "Complete system administration" },
        { id: "sys_user_mgmt", name: "User Management", description: "Create, edit, delete users" },
        { id: "sys_role_mgmt", name: "Role Management", description: "Manage roles and permissions" },
        { id: "sys_settings", name: "System Settings", description: "Configure system settings" }
      ]
    },
    {
      name: "Credit Management",
      icon: Key,
      color: "text-blue-600",
      permissions: [
        { id: "credit_view", name: "View Applications", description: "View credit applications" },
        { id: "credit_create", name: "Create Applications", description: "Create new credit applications" },
        { id: "credit_approve", name: "Approve Credits", description: "Approve or reject credit applications" },
        { id: "credit_scoring", name: "Credit Scoring", description: "Access credit scoring engine" },
        { id: "credit_disbursement", name: "Disbursement", description: "Process credit disbursements" }
      ]
    },
    {
      name: "Farm Operations",
      icon: Shield,
      color: "text-green-600",
      permissions: [
        { id: "farm_profile", name: "Farm Profiling", description: "Create and manage farm profiles" },
        { id: "farm_advisory", name: "Advisory Services", description: "Provide agricultural advisory" },
        { id: "farm_monitoring", name: "Farm Monitoring", description: "Monitor farm activities" },
        { id: "farm_data", name: "Farm Data Access", description: "Access farm data repository" }
      ]
    },
    {
      name: "Reports & Analytics",
      icon: Settings,
      color: "text-purple-600",
      permissions: [
        { id: "reports_view", name: "View Reports", description: "Access standard reports" },
        { id: "reports_create", name: "Create Reports", description: "Generate custom reports" },
        { id: "reports_export", name: "Export Data", description: "Export reports and data" },
        { id: "analytics_dashboard", name: "Analytics Dashboard", description: "Access analytics dashboard" }
      ]
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      permissions: selectedPermissions,
      createdDate: new Date().toISOString().split('T')[0]
    });
  };

  const togglePermission = (permissionId: string) => {
    setSelectedPermissions(prev =>
      prev.includes(permissionId)
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const selectAllInCategory = (categoryPermissions: any[]) => {
    const categoryIds = categoryPermissions.map(p => p.id);
    const allSelected = categoryIds.every(id => selectedPermissions.includes(id));

    if (allSelected) {
      setSelectedPermissions(prev => prev.filter(id => !categoryIds.includes(id)));
    } else {
      setSelectedPermissions(prev => [...new Set([...prev, ...categoryIds])]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Role Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-600" />
          Role Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role Name *
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter role name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role Category
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            >
              <option value="administrative">Administrative</option>
              <option value="operational">Operational</option>
              <option value="analytical">Analytical</option>
              <option value="field">Field Operations</option>
              <option value="support">Support</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role Description *
          </label>
          <textarea
            required
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe the role's purpose and responsibilities"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Maximum Users (Optional)
            </label>
            <input
              type="number"
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.maxUsers}
              onChange={(e) => setFormData(prev => ({ ...prev, maxUsers: e.target.value }))}
              placeholder="Leave empty for unlimited"
            />
          </div>

          <div className="flex items-center gap-2 pt-6">
            <input
              type="checkbox"
              id="isActive"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={formData.isActive}
              onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
            />
            <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
              Role is active
            </label>
          </div>
        </div>
      </div>

      {/* Permissions Management */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Permissions</h3>
          <div className="text-sm text-gray-600">
            {selectedPermissions.length} permissions selected
          </div>
        </div>

        <div className="space-y-4">
          {permissionCategories.map((category) => {
            const categoryPermissions = category.permissions;
            const selectedInCategory = categoryPermissions.filter(p => selectedPermissions.includes(p.id)).length;
            const allSelected = selectedInCategory === categoryPermissions.length;
            const someSelected = selectedInCategory > 0 && selectedInCategory < categoryPermissions.length;

            return (
              <div key={category.name} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <category.icon className={`h-5 w-5 ${category.color}`} />
                    <h4 className="font-medium text-gray-900">{category.name}</h4>
                    <span className="text-sm text-gray-500">
                      ({selectedInCategory}/{categoryPermissions.length})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => selectAllInCategory(categoryPermissions)}
                    className={`text-sm px-3 py-1 rounded-lg border transition-colors ${
                      allSelected
                        ? 'bg-blue-100 text-blue-700 border-blue-300'
                        : someSelected
                        ? 'bg-yellow-100 text-yellow-700 border-yellow-300'
                        : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    {allSelected ? 'Deselect All' : 'Select All'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {categoryPermissions.map((permission) => (
                    <div
                      key={permission.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedPermissions.includes(permission.id)
                          ? 'border-blue-300 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => togglePermission(permission.id)}
                    >
                      <div className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          checked={selectedPermissions.includes(permission.id)}
                          onChange={() => togglePermission(permission.id)}
                          className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-sm text-gray-900">
                            {permission.name}
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            {permission.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Additional Notes */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Additional Information</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            placeholder="Any additional notes about this role"
          />
        </div>
      </div>

      {/* Role Summary */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h4 className="font-medium text-gray-900 mb-3">Role Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Role Name:</span>
            <span className="font-medium">{formData.name || 'Not specified'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Category:</span>
            <span className="capitalize">{formData.category}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Permissions:</span>
            <span className="font-medium text-blue-600">{selectedPermissions.length} selected</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Status:</span>
            <span className={formData.isActive ? 'text-green-600' : 'text-red-600'}>
              {formData.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
          {formData.maxUsers && (
            <div className="flex justify-between">
              <span className="text-gray-600">Max Users:</span>
              <span>{formData.maxUsers}</span>
            </div>
          )}
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
          Create Role
        </button>
      </div>
    </form>
  );
}
