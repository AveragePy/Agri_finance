"use client";

import { useState } from "react";
import { CreditCard, Shield, DollarSign, Save, X } from "lucide-react";

interface NewFinancialProfileFormProps {
  onSubmit: (data: Record<string, any>) => void;
  onCancel: () => void;
}

export default function NewFinancialProfileForm({ onSubmit, onCancel }: NewFinancialProfileFormProps) {
  const [formData, setFormData] = useState({
    farmerName: "",
    nationalId: "",
    phoneNumber: "",
    email: "",
    bankName: "",
    accountNumber: "",
    accountType: "",
    monthlyIncome: "",
    incomeSource: "",
    existingLoans: "",
    loanAmount: "",
    collateral: "",
    collateralValue: "",
    creditHistory: "",
    employmentStatus: "",
    businessRegistration: "",
    taxPin: "",
    nextOfKin: "",
    nextOfKinPhone: "",
    relationship: "",
    kycDocuments: "",
    riskAssessment: "Medium"
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.farmerName.trim()) newErrors.farmerName = "Farmer name is required";
    if (!formData.nationalId.trim()) newErrors.nationalId = "National ID is required";
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    if (!formData.bankName.trim()) newErrors.bankName = "Bank name is required";
    if (!formData.accountNumber.trim()) newErrors.accountNumber = "Account number is required";
    if (!formData.monthlyIncome.trim()) newErrors.monthlyIncome = "Monthly income is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Personal Information */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Farmer Name *
          </label>
          <input
            type="text"
            name="farmerName"
            value={formData.farmerName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="John Kamau"
          />
          {errors.farmerName && <p className="text-red-500 text-xs mt-1">{errors.farmerName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            National ID *
          </label>
          <input
            type="text"
            name="nationalId"
            value={formData.nationalId}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="12345678"
          />
          {errors.nationalId && <p className="text-red-500 text-xs mt-1">{errors.nationalId}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="+254 700 000 000"
          />
          {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="john@example.com"
          />
        </div>
      </div>

      {/* Banking Information */}
      <div className="border-t pt-4">
        <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
          <CreditCard className="mr-2" size={16} />
          Banking Information
        </h4>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bank Name *
            </label>
            <select
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select Bank</option>
              <option value="Equity Bank">Equity Bank</option>
              <option value="KCB Bank">KCB Bank</option>
              <option value="Cooperative Bank">Cooperative Bank</option>
              <option value="NCBA Bank">NCBA Bank</option>
              <option value="Absa Bank">Absa Bank</option>
              <option value="Standard Chartered">Standard Chartered</option>
            </select>
            {errors.bankName && <p className="text-red-500 text-xs mt-1">{errors.bankName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Number *
            </label>
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="1234567890"
            />
            {errors.accountNumber && <p className="text-red-500 text-xs mt-1">{errors.accountNumber}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 mt-4">
            Account Type
          </label>
          <select
            name="accountType"
            value={formData.accountType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Select Account Type</option>
            <option value="Savings">Savings Account</option>
            <option value="Current">Current Account</option>
            <option value="Fixed Deposit">Fixed Deposit</option>
          </select>
        </div>
      </div>

      {/* Financial Information */}
      <div className="border-t pt-4">
        <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
          <DollarSign className="mr-2" size={16} />
          Financial Information
        </h4>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monthly Income (KES) *
            </label>
            <input
              type="number"
              name="monthlyIncome"
              value={formData.monthlyIncome}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="50000"
              min="0"
            />
            {errors.monthlyIncome && <p className="text-red-500 text-xs mt-1">{errors.monthlyIncome}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Primary Income Source
            </label>
            <select
              name="incomeSource"
              value={formData.incomeSource}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select Source</option>
              <option value="Farming">Farming</option>
              <option value="Business">Business</option>
              <option value="Employment">Employment</option>
              <option value="Mixed">Mixed Sources</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Existing Loans
            </label>
            <select
              name="existingLoans"
              value={formData.existingLoans}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select Status</option>
              <option value="None">No Existing Loans</option>
              <option value="Active">Active Loans</option>
              <option value="Cleared">Previously Cleared</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loan Amount Requested (KES)
            </label>
            <input
              type="number"
              name="loanAmount"
              value={formData.loanAmount}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="100000"
              min="0"
            />
          </div>
        </div>
      </div>

      {/* Collateral Information */}
      <div className="border-t pt-4">
        <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
          <Shield className="mr-2" size={16} />
          Collateral Information
        </h4>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Collateral Type
            </label>
            <select
              name="collateral"
              value={formData.collateral}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select Collateral</option>
              <option value="Land Title">Land Title</option>
              <option value="Vehicle">Vehicle</option>
              <option value="Equipment">Farm Equipment</option>
              <option value="Livestock">Livestock</option>
              <option value="Savings">Savings Account</option>
              <option value="None">No Collateral</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estimated Value (KES)
            </label>
            <input
              type="number"
              name="collateralValue"
              value={formData.collateralValue}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="200000"
              min="0"
            />
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="border-t pt-4">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Additional Information</h4>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Employment Status
            </label>
            <select
              name="employmentStatus"
              value={formData.employmentStatus}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select Status</option>
              <option value="Self Employed">Self Employed</option>
              <option value="Employed">Employed</option>
              <option value="Farmer">Farmer</option>
              <option value="Business Owner">Business Owner</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Credit History
            </label>
            <select
              name="creditHistory"
              value={formData.creditHistory}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select History</option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
              <option value="No History">No Credit History</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business Registration Number
            </label>
            <input
              type="text"
              name="businessRegistration"
              value={formData.businessRegistration}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="BIZ123456"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tax PIN
            </label>
            <input
              type="text"
              name="taxPin"
              value={formData.taxPin}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="P051234567M"
            />
          </div>
        </div>
      </div>

      {/* Next of Kin */}
      <div className="border-t pt-4">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Next of Kin Information</h4>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Next of Kin Name
            </label>
            <input
              type="text"
              name="nextOfKin"
              value={formData.nextOfKin}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Jane Kamau"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="nextOfKinPhone"
              value={formData.nextOfKinPhone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="+254 700 000 001"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Relationship
            </label>
            <select
              name="relationship"
              value={formData.relationship}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select Relationship</option>
              <option value="Spouse">Spouse</option>
              <option value="Parent">Parent</option>
              <option value="Child">Child</option>
              <option value="Sibling">Sibling</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Risk Assessment */}
      <div className="border-t pt-4">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Risk Assessment</h4>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Initial Risk Level
            </label>
            <select
              name="riskAssessment"
              value={formData.riskAssessment}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="Low">Low Risk</option>
              <option value="Medium">Medium Risk</option>
              <option value="High">High Risk</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              KYC Documents Status
            </label>
            <select
              name="kycDocuments"
              value={formData.kycDocuments}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select Status</option>
              <option value="Complete">Complete</option>
              <option value="Pending">Pending</option>
              <option value="Incomplete">Incomplete</option>
            </select>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-6 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center"
        >
          <Save className="mr-2" size={16} />
          Create Financial Profile
        </button>
      </div>
    </form>
  );
}
