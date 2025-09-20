"use client";

import { useState } from "react";
import { Brain, Settings, Target, Plus, Minus } from "lucide-react";

interface NewScoringModelFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function NewScoringModelForm({ onSubmit, onCancel }: NewScoringModelFormProps) {
  const [formData, setFormData] = useState({
    modelName: "",
    modelType: "credit_scoring",
    description: "",
    version: "1.0",
    status: "draft",
    baseScore: "500",
    maxScore: "850",
    minScore: "300",
    factors: [
      { name: "Credit History", weight: 25, minValue: 0, maxValue: 100 },
      { name: "Income Stability", weight: 20, minValue: 0, maxValue: 100 },
      { name: "Farm Assets", weight: 15, minValue: 0, maxValue: 100 },
      { name: "Debt-to-Income Ratio", weight: 15, minValue: 0, maxValue: 100 },
      { name: "Agricultural Experience", weight: 10, minValue: 0, maxValue: 100 },
      { name: "Market Access", weight: 10, minValue: 0, maxValue: 100 },
      { name: "Weather Risk", weight: 5, minValue: 0, maxValue: 100 }
    ],
    validationRules: [
      { field: "age", operator: ">=", value: "18", message: "Applicant must be at least 18 years old" },
      { field: "income", operator: ">", value: "0", message: "Income must be greater than 0" }
    ],
    autoApprovalThreshold: "700",
    autoRejectThreshold: "400",
    manualReviewRange: true,
    notifications: {
      onScoreCalculated: true,
      onThresholdReached: true,
      onModelUpdated: false
    }
  });

  const modelTypes = [
    { value: "credit_scoring", label: "Credit Scoring", description: "Evaluate creditworthiness of farmers" },
    { value: "risk_assessment", label: "Risk Assessment", description: "Assess agricultural and financial risks" },
    { value: "profitability", label: "Profitability Analysis", description: "Analyze farm profitability potential" },
    { value: "sustainability", label: "Sustainability Score", description: "Evaluate sustainable farming practices" },
    { value: "market_readiness", label: "Market Readiness", description: "Assess readiness for market participation" }
  ];

  const operators = [
    { value: "=", label: "Equals (=)" },
    { value: "!=", label: "Not Equals (≠)" },
    { value: ">", label: "Greater Than (>)" },
    { value: ">=", label: "Greater Than or Equal (≥)" },
    { value: "<", label: "Less Than (<)" },
    { value: "<=", label: "Less Than or Equal (≤)" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalWeight = formData.factors.reduce((sum, factor) => sum + factor.weight, 0);

    if (totalWeight !== 100) {
      alert(`Total weight must equal 100%. Current total: ${totalWeight}%`);
      return;
    }

    onSubmit({
      ...formData,
      id: `SM${Date.now()}`,
      createdDate: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      totalFactors: formData.factors.length,
      totalRules: formData.validationRules.length,
      scoreRange: `${formData.minScore} - ${formData.maxScore}`,
      isActive: formData.status === 'active'
    });
  };

  const addFactor = () => {
    setFormData(prev => ({
      ...prev,
      factors: [...prev.factors, { name: "", weight: 0, minValue: 0, maxValue: 100 }]
    }));
  };

  const removeFactor = (index: number) => {
    setFormData(prev => ({
      ...prev,
      factors: prev.factors.filter((_, i) => i !== index)
    }));
  };

  const updateFactor = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      factors: prev.factors.map((factor, i) =>
        i === index ? { ...factor, [field]: value } : factor
      )
    }));
  };

  const addValidationRule = () => {
    setFormData(prev => ({
      ...prev,
      validationRules: [...prev.validationRules, { field: "", operator: ">=", value: "", message: "" }]
    }));
  };

  const removeValidationRule = (index: number) => {
    setFormData(prev => ({
      ...prev,
      validationRules: prev.validationRules.filter((_, i) => i !== index)
    }));
  };

  const updateValidationRule = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      validationRules: prev.validationRules.map((rule, i) =>
        i === index ? { ...rule, [field]: value } : rule
      )
    }));
  };

  const totalWeight = formData.factors.reduce((sum, factor) => sum + factor.weight, 0);
  const selectedModelType = modelTypes.find(t => t.value === formData.modelType);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Model Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Brain className="h-5 w-5 text-blue-600" />
          Model Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Model Name *
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.modelName}
              onChange={(e) => setFormData(prev => ({ ...prev, modelName: e.target.value }))}
              placeholder="e.g., Agricultural Credit Score v2.0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Model Type *
            </label>
            <select
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.modelType}
              onChange={(e) => setFormData(prev => ({ ...prev, modelType: e.target.value }))}
            >
              {modelTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Version
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.version}
              onChange={(e) => setFormData(prev => ({ ...prev, version: e.target.value }))}
              placeholder="1.0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
            >
              <option value="draft">Draft</option>
              <option value="testing">Testing</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
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
            placeholder="Describe the purpose and methodology of this scoring model..."
          />
        </div>

        {selectedModelType && (
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>{selectedModelType.label}:</strong> {selectedModelType.description}
            </p>
          </div>
        )}
      </div>

      {/* Score Configuration */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Target className="h-5 w-5 text-green-600" />
          Score Configuration
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Minimum Score
            </label>
            <input
              type="number"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={formData.minScore}
              onChange={(e) => setFormData(prev => ({ ...prev, minScore: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Base Score
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={formData.baseScore}
              onChange={(e) => setFormData(prev => ({ ...prev, baseScore: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Maximum Score
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={formData.maxScore}
              onChange={(e) => setFormData(prev => ({ ...prev, maxScore: e.target.value }))}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Auto-Approval Threshold
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={formData.autoApprovalThreshold}
              onChange={(e) => setFormData(prev => ({ ...prev, autoApprovalThreshold: e.target.value }))}
            />
            <p className="text-xs text-gray-500 mt-1">Scores above this threshold are automatically approved</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Auto-Reject Threshold
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={formData.autoRejectThreshold}
              onChange={(e) => setFormData(prev => ({ ...prev, autoRejectThreshold: e.target.value }))}
            />
            <p className="text-xs text-gray-500 mt-1">Scores below this threshold are automatically rejected</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="manualReviewRange"
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            checked={formData.manualReviewRange}
            onChange={(e) => setFormData(prev => ({ ...prev, manualReviewRange: e.target.checked }))}
          />
          <label htmlFor="manualReviewRange" className="text-sm font-medium text-gray-700">
            Require manual review for scores between thresholds
          </label>
        </div>
      </div>

      {/* Scoring Factors */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Settings className="h-5 w-5 text-purple-600" />
            Scoring Factors
          </h3>
          <div className="text-sm">
            Total Weight: <span className={`font-bold ${totalWeight === 100 ? 'text-green-600' : 'text-red-600'}`}>
              {totalWeight}%
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {formData.factors.map((factor, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Factor Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={factor.name}
                    onChange={(e) => updateFactor(index, 'name', e.target.value)}
                    placeholder="Factor name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Weight (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={factor.weight}
                    onChange={(e) => updateFactor(index, 'weight', parseInt(e.target.value) || 0)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Min Value
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={factor.minValue}
                    onChange={(e) => updateFactor(index, 'minValue', parseInt(e.target.value) || 0)}
                  />
                </div>

                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Max Value
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={factor.maxValue}
                      onChange={(e) => updateFactor(index, 'maxValue', parseInt(e.target.value) || 100)}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFactor(index)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addFactor}
          className="w-full px-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-purple-300 hover:text-purple-600 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Scoring Factor
        </button>
      </div>

      {/* Validation Rules */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Validation Rules</h3>

        <div className="space-y-3">
          {formData.validationRules.map((rule, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Field</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={rule.field}
                    onChange={(e) => updateValidationRule(index, 'field', e.target.value)}
                    placeholder="e.g., age, income"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Operator</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={rule.operator}
                    onChange={(e) => updateValidationRule(index, 'operator', e.target.value)}
                  >
                    {operators.map((op) => (
                      <option key={op.value} value={op.value}>{op.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={rule.value}
                    onChange={(e) => updateValidationRule(index, 'value', e.target.value)}
                    placeholder="e.g., 18, 1000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Error Message</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={rule.message}
                    onChange={(e) => updateValidationRule(index, 'message', e.target.value)}
                    placeholder="Validation error message"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => removeValidationRule(index)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addValidationRule}
          className="w-full px-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-blue-300 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Validation Rule
        </button>
      </div>

      {/* Notifications */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="onScoreCalculated"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={formData.notifications.onScoreCalculated}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                notifications: { ...prev.notifications, onScoreCalculated: e.target.checked }
              }))}
            />
            <label htmlFor="onScoreCalculated" className="text-sm font-medium text-gray-700">
              Notify when score is calculated
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="onThresholdReached"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={formData.notifications.onThresholdReached}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                notifications: { ...prev.notifications, onThresholdReached: e.target.checked }
              }))}
            />
            <label htmlFor="onThresholdReached" className="text-sm font-medium text-gray-700">
              Notify when approval/rejection thresholds are reached
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="onModelUpdated"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={formData.notifications.onModelUpdated}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                notifications: { ...prev.notifications, onModelUpdated: e.target.checked }
              }))}
            />
            <label htmlFor="onModelUpdated" className="text-sm font-medium text-gray-700">
              Notify when model is updated
            </label>
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
          Create Scoring Model
        </button>
      </div>
    </form>
  );
}
