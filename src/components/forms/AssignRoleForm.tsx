"use client";

import { useState } from "react";
import { UserCheck, User, Shield, Calendar, Mail } from "lucide-react";

interface AssignRoleFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function AssignRoleForm({ onSubmit, onCancel }: AssignRoleFormProps) {
  const [formData, setFormData] = useState({
    userId: "",
    userName: "",
    userEmail: "",
    roleId: "",
    roleName: "",
    effectiveDate: new Date().toISOString().split('T')[0],
    expiryDate: "",
    notes: "",
    notifyUser: true
  });

  // Mock users for demo
  const users = [
    { id: "U001", name: "John Admin", email: "john@agrifinance.com", currentRole: "Super Admin" },
    { id: "U002", name: "Sarah Manager", email: "sarah@agrifinance.com", currentRole: "Credit Manager" },
    { id: "U003", name: "Mike Advisor", email: "mike@agrifinance.com", currentRole: "Farm Advisor" },
    { id: "U004", name: "Lisa Analyst", email: "lisa@agrifinance.com", currentRole: "Data Analyst" },
    { id: "U005", name: "David Officer", email: "david@agrifinance.com", currentRole: "None" }
  ];

  // Mock roles for demo
  const roles = [
    { id: "R001", name: "Super Admin", description: "Full system access and control" },
    { id: "R002", name: "Credit Manager", description: "Manage credit applications and scoring" },
    { id: "R003", name: "Farm Advisor", description: "Provide agricultural advisory services" },
    { id: "R004", name: "Data Analyst", description: "Access to reports and analytics" },
    { id: "R005", name: "Field Officer", description: "Field operations and farmer support" },
    { id: "R006", name: "Auditor", description: "System auditing and compliance" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleUserChange = (userId: string) => {
    const selectedUser = users.find(u => u.id === userId);
    if (selectedUser) {
      setFormData(prev => ({
        ...prev,
        userId,
        userName: selectedUser.name,
        userEmail: selectedUser.email
      }));
    }
  };

  const handleRoleChange = (roleId: string) => {
    const selectedRole = roles.find(r => r.id === roleId);
    if (selectedRole) {
      setFormData(prev => ({
        ...prev,
        roleId,
        roleName: selectedRole.name
      }));
    }
  };

  const selectedUser = users.find(u => u.id === formData.userId);
  const selectedRole = roles.find(r => r.id === formData.roleId);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* User Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <User className="h-5 w-5 text-blue-600" />
          Select User
        </h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            User *
          </label>
          <select
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.userId}
            onChange={(e) => handleUserChange(e.target.value)}
          >
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.email}) - Current: {user.currentRole}
              </option>
            ))}
          </select>
        </div>

        {selectedUser && (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">Selected User Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="font-medium text-blue-800">Name:</span>
                <span className="ml-2 text-blue-700">{selectedUser.name}</span>
              </div>
              <div>
                <span className="font-medium text-blue-800">Email:</span>
                <span className="ml-2 text-blue-700">{selectedUser.email}</span>
              </div>
              <div>
                <span className="font-medium text-blue-800">User ID:</span>
                <span className="ml-2 text-blue-700">{selectedUser.id}</span>
              </div>
              <div>
                <span className="font-medium text-blue-800">Current Role:</span>
                <span className="ml-2 text-blue-700">{selectedUser.currentRole}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Role Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Shield className="h-5 w-5 text-green-600" />
          Select Role
        </h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role *
          </label>
          <select
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={formData.roleId}
            onChange={(e) => handleRoleChange(e.target.value)}
          >
            <option value="">Select a role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name} - {role.description}
              </option>
            ))}
          </select>
        </div>

        {selectedRole && (
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-medium text-green-900 mb-2">Selected Role Details</h4>
            <div className="text-sm">
              <div className="mb-2">
                <span className="font-medium text-green-800">Role:</span>
                <span className="ml-2 text-green-700">{selectedRole.name}</span>
              </div>
              <div>
                <span className="font-medium text-green-800">Description:</span>
                <span className="ml-2 text-green-700">{selectedRole.description}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Assignment Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-purple-600" />
          Assignment Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Effective Date *
            </label>
            <input
              type="date"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={formData.effectiveDate}
              onChange={(e) => setFormData(prev => ({ ...prev, effectiveDate: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date (Optional)
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={formData.expiryDate}
              onChange={(e) => setFormData(prev => ({ ...prev, expiryDate: e.target.value }))}
              min={formData.effectiveDate}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Assignment Notes
          </label>
          <textarea
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            placeholder="Any additional notes about this role assignment"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="notifyUser"
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            checked={formData.notifyUser}
            onChange={(e) => setFormData(prev => ({ ...prev, notifyUser: e.target.checked }))}
          />
          <label htmlFor="notifyUser" className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <Mail className="h-4 w-4" />
            Send email notification to user
          </label>
        </div>
      </div>

      {/* Assignment Summary */}
      {selectedUser && selectedRole && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Assignment Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">User:</span>
              <span className="font-medium">{selectedUser.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Current Role:</span>
              <span>{selectedUser.currentRole}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">New Role:</span>
              <span className="font-medium text-green-600">{selectedRole.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Effective From:</span>
              <span>{formData.effectiveDate}</span>
            </div>
            {formData.expiryDate && (
              <div className="flex justify-between">
                <span className="text-gray-600">Expires On:</span>
                <span>{formData.expiryDate}</span>
              </div>
            )}
          </div>
        </div>
      )}

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
          <UserCheck className="h-4 w-4" />
          Assign Role
        </button>
      </div>
    </form>
  );
}
