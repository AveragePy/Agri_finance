"use client";

import { useState } from "react";
import { Activity, User, Calendar, Target, Plus } from "lucide-react";

interface NewLifecycleFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function NewLifecycleForm({ onSubmit, onCancel }: NewLifecycleFormProps) {
  const [formData, setFormData] = useState({
    farmerName: "",
    farmerId: "",
    farmerEmail: "",
    farmerPhone: "",
    startingStage: "registration",
    priority: "normal",
    expectedDuration: "30",
    notes: "",
    autoProgress: true
  });

  const lifecycleStages = [
    { value: "registration", label: "Registration", duration: "3-5 days", description: "Initial farmer registration and basic information collection" },
    { value: "farm_profiling", label: "Farm Profiling", duration: "7-10 days", description: "Detailed farm assessment and data collection" },
    { value: "documentation", label: "Documentation", duration: "5-7 days", description: "KYC and required document verification" },
    { value: "credit_assessment", label: "Credit Assessment", duration: "10-14 days", description: "Credit scoring and eligibility evaluation" },
    { value: "approval_process", label: "Approval Process", duration: "3-5 days", description: "Final review and approval decision" },
    { value: "disbursement", label: "Disbursement", duration: "1-2 days", description: "Credit disbursement and account setup" },
    { value: "monitoring", label: "Monitoring", duration: "Ongoing", description: "Continuous monitoring and support" }
  ];

  const priorityLevels = [
    { value: "low", label: "Low Priority", description: "Standard processing timeline" },
    { value: "normal", label: "Normal Priority", description: "Regular processing priority" },
    { value: "high", label: "High Priority", description: "Expedited processing" },
    { value: "urgent", label: "Urgent", description: "Immediate attention required" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedStage = lifecycleStages.find(s => s.value === formData.startingStage);
    onSubmit({
      ...formData,
      id: `LS${Date.now()}`,
      currentStage: selectedStage?.label || "Registration",
      progress: 0,
      startDate: new Date().toISOString().split('T')[0],
      expectedCompletion: calculateExpectedCompletion(),
      status: "In Progress",
      daysInStage: 0,
      createdDate: new Date().toISOString()
    });
  };

  const calculateExpectedCompletion = () => {
    const startDate = new Date();
    const durationDays = parseInt(formData.expectedDuration) || 30;
    const completionDate = new Date(startDate.getTime() + (durationDays * 24 * 60 * 60 * 1000));
    return completionDate.toISOString().split('T')[0];
  };

  const selectedStage = lifecycleStages.find(s => s.value === formData.startingStage);
  const selectedPriority = priorityLevels.find(p => p.value === formData.priority);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Farmer Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <User className="h-5 w-5 text-blue-600" />
          Farmer Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Farmer Name *
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.farmerName}
              onChange={(e) => setFormData(prev => ({ ...prev, farmerName: e.target.value }))}
              placeholder="Enter farmer's full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Farmer ID
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.farmerId}
              onChange={(e) => setFormData(prev => ({ ...prev, farmerId: e.target.value }))}
              placeholder="F001234 (auto-generated if empty)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.farmerEmail}
              onChange={(e) => setFormData(prev => ({ ...prev, farmerEmail: e.target.value }))}
              placeholder="farmer@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.farmerPhone}
              onChange={(e) => setFormData(prev => ({ ...prev, farmerPhone: e.target.value }))}
              placeholder="+254 700 000 000"
            />
          </div>
        </div>
      </div>

      {/* Lifecycle Configuration */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Activity className="h-5 w-5 text-green-600" />
          Lifecycle Configuration
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Starting Stage *
            </label>
            <select
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={formData.startingStage}
              onChange={(e) => setFormData(prev => ({ ...prev, startingStage: e.target.value }))}
            >
              {lifecycleStages.map((stage) => (
                <option key={stage.value} value={stage.value}>
                  {stage.label} ({stage.duration})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority Level
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={formData.priority}
              onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
            >
              {priorityLevels.map((priority) => (
                <option key={priority.value} value={priority.value}>
                  {priority.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedStage && (
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <p className="text-sm text-green-800">
              <strong>{selectedStage.label}:</strong> {selectedStage.description}
            </p>
            <p className="text-xs text-green-600 mt-1">
              Typical duration: {selectedStage.duration}
            </p>
          </div>
        )}

        {selectedPriority && (
          <div className={`p-3 rounded-lg border ${
            formData.priority === 'urgent' ? 'bg-red-50 border-red-200' :
            formData.priority === 'high' ? 'bg-orange-50 border-orange-200' :
            'bg-blue-50 border-blue-200'
          }`}>
            <p className={`text-sm ${
              formData.priority === 'urgent' ? 'text-red-800' :
              formData.priority === 'high' ? 'text-orange-800' :
              'text-blue-800'
            }`}>
              <strong>{selectedPriority.label}:</strong> {selectedPriority.description}
            </p>
          </div>
        )}
      </div>

      {/* Timeline Configuration */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-purple-600" />
          Timeline Configuration
        </h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expected Total Duration (Days)
          </label>
          <input
            type="number"
            min="1"
            max="365"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={formData.expectedDuration}
            onChange={(e) => setFormData(prev => ({ ...prev, expectedDuration: e.target.value }))}
            placeholder="30"
          />
          <p className="text-xs text-gray-500 mt-1">
            Expected completion: {calculateExpectedCompletion()}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="autoProgress"
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            checked={formData.autoProgress}
            onChange={(e) => setFormData(prev => ({ ...prev, autoProgress: e.target.checked }))}
          />
          <label htmlFor="autoProgress" className="text-sm font-medium text-gray-700">
            Enable automatic stage progression based on completion criteria
          </label>
        </div>
      </div>

      {/* Additional Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Target className="h-5 w-5 text-orange-600" />
          Additional Information
        </h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes & Special Instructions
          </label>
          <textarea
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            placeholder="Any special requirements, notes, or instructions for this lifecycle..."
          />
        </div>
      </div>

      {/* Lifecycle Summary */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h4 className="font-medium text-gray-900 mb-3">Lifecycle Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Farmer:</span>
            <span className="font-medium">{formData.farmerName || 'Not specified'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Starting Stage:</span>
            <span>{selectedStage?.label}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Priority:</span>
            <span className={`font-medium ${
              formData.priority === 'urgent' ? 'text-red-600' :
              formData.priority === 'high' ? 'text-orange-600' :
              formData.priority === 'low' ? 'text-gray-600' :
              'text-blue-600'
            }`}>
              {selectedPriority?.label}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Expected Duration:</span>
            <span>{formData.expectedDuration} days</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Expected Completion:</span>
            <span>{calculateExpectedCompletion()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Auto Progression:</span>
            <span className={formData.autoProgress ? 'text-green-600' : 'text-red-600'}>
              {formData.autoProgress ? 'Enabled' : 'Disabled'}
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
          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Lifecycle
        </button>
      </div>
    </form>
  );
}
