"use client";

import { useState } from "react";
import { FileText, Filter, Calendar, Settings, Plus } from "lucide-react";

interface NewReportFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function NewReportForm({ onSubmit, onCancel }: NewReportFormProps) {
  const [formData, setFormData] = useState({
    reportName: "",
    reportType: "credit_summary",
    description: "",
    dateRange: "last_30_days",
    customStartDate: "",
    customEndDate: "",
    filters: {
      regions: [],
      farmTypes: [],
      creditStatus: [],
      scoreRange: { min: "", max: "" }
    },
    groupBy: "region",
    includeCharts: true,
    includeDetails: true,
    format: "pdf",
    schedule: {
      enabled: false,
      frequency: "weekly",
      dayOfWeek: "monday",
      time: "09:00",
      recipients: []
    },
    notifications: {
      onGeneration: true,
      onError: true,
      onSchedule: false
    }
  });

  const reportTypes = [
    { value: "credit_summary", label: "Credit Summary Report", description: "Overview of credit applications and approvals" },
    { value: "farmer_analytics", label: "Farmer Analytics", description: "Detailed farmer demographics and performance" },
    { value: "risk_assessment", label: "Risk Assessment Report", description: "Risk analysis across portfolio" },
    { value: "financial_performance", label: "Financial Performance", description: "Revenue, disbursements, and profitability" },
    { value: "market_trends", label: "Market Trends", description: "Agricultural market analysis and trends" },
    { value: "compliance", label: "Compliance Report", description: "Regulatory compliance and audit trail" },
    { value: "operational", label: "Operational Metrics", description: "System usage and operational statistics" }
  ];

  const dateRanges = [
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
    { value: "last_7_days", label: "Last 7 Days" },
    { value: "last_30_days", label: "Last 30 Days" },
    { value: "last_90_days", label: "Last 90 Days" },
    { value: "last_year", label: "Last Year" },
    { value: "year_to_date", label: "Year to Date" },
    { value: "custom", label: "Custom Range" }
  ];

  const regions = ["Central", "Eastern", "Western", "Northern", "Coastal"];
  const farmTypes = ["Crop Farming", "Livestock", "Mixed Farming", "Horticulture", "Aquaculture"];
  const creditStatuses = ["Pending", "Approved", "Rejected", "Disbursed", "Completed"];
  const groupByOptions = [
    { value: "region", label: "Region" },
    { value: "farm_type", label: "Farm Type" },
    { value: "credit_status", label: "Credit Status" },
    { value: "score_range", label: "Score Range" },
    { value: "month", label: "Month" },
    { value: "none", label: "No Grouping" }
  ];

  const formats = [
    { value: "pdf", label: "PDF", description: "Portable Document Format" },
    { value: "excel", label: "Excel", description: "Microsoft Excel Spreadsheet" },
    { value: "csv", label: "CSV", description: "Comma Separated Values" },
    { value: "json", label: "JSON", description: "JavaScript Object Notation" }
  ];

  const frequencies = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "quarterly", label: "Quarterly" }
  ];

  const daysOfWeek = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.dateRange === 'custom' && (!formData.customStartDate || !formData.customEndDate)) {
      alert('Please specify custom date range');
      return;
    }

    onSubmit({
      ...formData,
      id: `RPT${Date.now()}`,
      createdDate: new Date().toISOString(),
      status: "pending",
      estimatedSize: calculateEstimatedSize(),
      filterCount: Object.values(formData.filters).flat().length
    });
  };

  const calculateEstimatedSize = () => {
    // Simple estimation based on report type and filters
    const baseSize = formData.reportType === 'farmer_analytics' ? 5 : 2;
    const filterMultiplier = Object.values(formData.filters).flat().length || 1;
    return `${Math.round(baseSize * filterMultiplier * 0.8)} MB`;
  };

  const addRecipient = () => {
    const email = prompt("Enter recipient email:");
    if (email && email.includes('@')) {
      setFormData(prev => ({
        ...prev,
        schedule: {
          ...prev.schedule,
          recipients: [...prev.schedule.recipients, email]
        }
      }));
    }
  };

  const removeRecipient = (index: number) => {
    setFormData(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        recipients: prev.schedule.recipients.filter((_, i) => i !== index)
      }
    }));
  };

  const toggleFilter = (filterType: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        [filterType]: prev.filters[filterType as keyof typeof prev.filters].includes(value)
          ? prev.filters[filterType as keyof typeof prev.filters].filter((item: string) => item !== value)
          : [...prev.filters[filterType as keyof typeof prev.filters], value]
      }
    }));
  };

  const selectedReportType = reportTypes.find(t => t.value === formData.reportType);
  const selectedFormat = formats.find(f => f.value === formData.format);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Report Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-600" />
          Report Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Report Name *
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.reportName}
              onChange={(e) => setFormData(prev => ({ ...prev, reportName: e.target.value }))}
              placeholder="e.g., Monthly Credit Summary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Report Type *
            </label>
            <select
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.reportType}
              onChange={(e) => setFormData(prev => ({ ...prev, reportType: e.target.value }))}
            >
              {reportTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
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
            placeholder="Describe the purpose and contents of this report..."
          />
        </div>

        {selectedReportType && (
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>{selectedReportType.label}:</strong> {selectedReportType.description}
            </p>
          </div>
        )}
      </div>

      {/* Date Range */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-green-600" />
          Date Range
        </h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date Range *
          </label>
          <select
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={formData.dateRange}
            onChange={(e) => setFormData(prev => ({ ...prev, dateRange: e.target.value }))}
          >
            {dateRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {formData.dateRange === 'custom' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date *
              </label>
              <input
                type="date"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={formData.customStartDate}
                onChange={(e) => setFormData(prev => ({ ...prev, customStartDate: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date *
              </label>
              <input
                type="date"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={formData.customEndDate}
                onChange={(e) => setFormData(prev => ({ ...prev, customEndDate: e.target.value }))}
              />
            </div>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Filter className="h-5 w-5 text-purple-600" />
          Filters
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Regions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Regions</label>
            <div className="space-y-2">
              {regions.map((region) => (
                <label key={region} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    checked={formData.filters.regions.includes(region)}
                    onChange={() => toggleFilter('regions', region)}
                  />
                  <span className="text-sm text-gray-700">{region}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Farm Types */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Farm Types</label>
            <div className="space-y-2">
              {farmTypes.map((type) => (
                <label key={type} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    checked={formData.filters.farmTypes.includes(type)}
                    onChange={() => toggleFilter('farmTypes', type)}
                  />
                  <span className="text-sm text-gray-700">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Credit Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Credit Status</label>
            <div className="space-y-2">
              {creditStatuses.map((status) => (
                <label key={status} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    checked={formData.filters.creditStatus.includes(status)}
                    onChange={() => toggleFilter('creditStatus', status)}
                  />
                  <span className="text-sm text-gray-700">{status}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Score Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Score Range</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={formData.filters.scoreRange.min}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  filters: {
                    ...prev.filters,
                    scoreRange: { ...prev.filters.scoreRange, min: e.target.value }
                  }
                }))}
              />
              <input
                type="number"
                placeholder="Max"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={formData.filters.scoreRange.max}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  filters: {
                    ...prev.filters,
                    scoreRange: { ...prev.filters.scoreRange, max: e.target.value }
                  }
                }))}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Report Configuration */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Settings className="h-5 w-5 text-orange-600" />
          Report Configuration
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Group By
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={formData.groupBy}
              onChange={(e) => setFormData(prev => ({ ...prev, groupBy: e.target.value }))}
            >
              {groupByOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Output Format
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={formData.format}
              onChange={(e) => setFormData(prev => ({ ...prev, format: e.target.value }))}
            >
              {formats.map((format) => (
                <option key={format.value} value={format.value}>
                  {format.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="includeCharts"
              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              checked={formData.includeCharts}
              onChange={(e) => setFormData(prev => ({ ...prev, includeCharts: e.target.checked }))}
            />
            <label htmlFor="includeCharts" className="text-sm font-medium text-gray-700">
              Include charts and visualizations
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="includeDetails"
              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              checked={formData.includeDetails}
              onChange={(e) => setFormData(prev => ({ ...prev, includeDetails: e.target.checked }))}
            />
            <label htmlFor="includeDetails" className="text-sm font-medium text-gray-700">
              Include detailed data tables
            </label>
          </div>
        </div>

        {selectedFormat && (
          <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
            <p className="text-sm text-orange-800">
              <strong>{selectedFormat.label}:</strong> {selectedFormat.description}
            </p>
            <p className="text-xs text-orange-600 mt-1">
              Estimated size: {calculateEstimatedSize()}
            </p>
          </div>
        )}
      </div>

      {/* Scheduling */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="enableSchedule"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            checked={formData.schedule.enabled}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              schedule: { ...prev.schedule, enabled: e.target.checked }
            }))}
          />
          <label htmlFor="enableSchedule" className="text-lg font-semibold text-gray-900">
            Schedule Automatic Generation
          </label>
        </div>

        {formData.schedule.enabled && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Frequency
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.schedule.frequency}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  schedule: { ...prev.schedule, frequency: e.target.value }
                }))}
              >
                {frequencies.map((freq) => (
                  <option key={freq.value} value={freq.value}>
                    {freq.label}
                  </option>
                ))}
              </select>
            </div>

            {formData.schedule.frequency === 'weekly' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Day of Week
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.schedule.dayOfWeek}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    schedule: { ...prev.schedule, dayOfWeek: e.target.value }
                  }))}
                >
                  {daysOfWeek.map((day) => (
                    <option key={day.value} value={day.value}>
                      {day.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <input
                type="time"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.schedule.time}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  schedule: { ...prev.schedule, time: e.target.value }
                }))}
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Recipients
              </label>
              <div className="space-y-2">
                {formData.schedule.recipients.map((email, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm">
                      {email}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeRecipient(index)}
                      className="px-2 py-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addRecipient}
                  className="px-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-blue-300 hover:text-blue-600 transition-colors flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Recipient
                </button>
              </div>
            </div>
          </div>
        )}
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
          Generate Report
        </button>
      </div>
    </form>
  );
}
