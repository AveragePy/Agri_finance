"use client";

import { useState } from "react";
import {
  DollarSign,
  CreditCard,
  AlertCircle,
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  User,
  Building,
  Shield
} from "lucide-react";
import Modal from "../../components/common/Modal";
import NewFinancialProfileForm from "../../components/forms/NewFinancialProfileForm";

export default function FinancialIdentity() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNewFinancialProfile = (data: Record<string, any>) => {
    console.log("New financial profile data:", data);
    // Here you would typically send the data to your backend
    setIsModalOpen(false);
    // You could also show a success message or refresh the list
  };

  const financialProfiles = [
    {
      id: "FI001",
      farmerName: "John Kamau",
      nationalId: "12345678",
      bankAccount: "KCB - ****5432",
      creditScore: 720,
      monthlyIncome: "UGX 45,000",
      existingLoans: "UGX 120,000",
      collateralValue: "UGX 850,000",
      riskLevel: "Low",
      lastUpdated: "2024-01-15",
      status: "Verified"
    },
    {
      id: "FI002",
      farmerName: "Mary Wanjiku",
      nationalId: "23456789",
      bankAccount: "Equity - ****7890",
      creditScore: 680,
      monthlyIncome: "UGX 32,000",
      existingLoans: "UGX 85,000",
      collateralValue: "UGX 620,000",
      riskLevel: "Medium",
      lastUpdated: "2024-01-14",
      status: "Pending Verification"
    },
    {
      id: "FI003",
      farmerName: "Peter Mwangi",
      nationalId: "34567890",
      bankAccount: "Coop Bank - ****2468",
      creditScore: 750,
      monthlyIncome: "UGX 58,000",
      existingLoans: "UGX 200,000",
      collateralValue: "UGX 1,200,000",
      riskLevel: "Low",
      lastUpdated: "2024-01-13",
      status: "Verified"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financial Identity</h1>
          <p className="text-gray-600 mt-2">Manage farmer financial profiles and creditworthiness</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={20} />
          New Financial Profile
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Profiles</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
            </div>
            <User className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Financial identities</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Credit Score</p>
              <p className="text-2xl font-bold text-gray-900">685</p>
            </div>
            <CreditCard className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Good creditworthiness</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Collateral</p>
              <p className="text-2xl font-bold text-gray-900">UGX 1.2B</p>
            </div>
            <Building className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Secured assets</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Low Risk</p>
              <p className="text-2xl font-bold text-gray-900">892</p>
            </div>
            <Shield className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">71.5% low risk farmers</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name, ID, or bank account..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
              <option>All Risk Levels</option>
              <option>Low Risk</option>
              <option>Medium Risk</option>
              <option>High Risk</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
              <option>All Status</option>
              <option>Verified</option>
              <option>Pending Verification</option>
              <option>Under Review</option>
            </select>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Filter size={20} />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Financial Profiles */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Financial Profiles</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Farmer Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Banking Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Financial Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk Assessment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {financialProfiles.map((profile) => (
                <tr key={profile.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{profile.farmerName}</div>
                      <div className="text-sm text-gray-500">ID: {profile.id}</div>
                      <div className="text-sm text-gray-500">National ID: {profile.nationalId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900 flex items-center gap-1">
                        <Building size={14} className="text-blue-600" />
                        {profile.bankAccount}
                      </div>
                      <div className="text-sm text-gray-500">Credit Score: {profile.creditScore}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900 flex items-center gap-1">
                        <DollarSign size={14} className="text-green-600" />
                        Income: {profile.monthlyIncome}
                      </div>
                      <div className="text-sm text-gray-500">Loans: {profile.existingLoans}</div>
                      <div className="text-sm text-gray-500">Collateral: {profile.collateralValue}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      profile.riskLevel === 'Low'
                        ? 'bg-green-100 text-green-800'
                        : profile.riskLevel === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {profile.riskLevel} Risk
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      profile.status === 'Verified'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {profile.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye size={16} />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Credit Score Distribution</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Excellent (750+)</span>
              <span className="text-sm text-gray-600">287 farmers (23.0%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Good (700-749)</span>
              <span className="text-sm text-gray-600">423 farmers (33.9%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Fair (650-699)</span>
              <span className="text-sm text-gray-600">342 farmers (27.4%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Poor (&lt; 650)</span>
              <span className="text-sm text-gray-600">195 farmers (15.7%)</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Level Analysis</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Low Risk</span>
              </div>
              <span className="text-sm text-gray-600">892 farmers (71.5%)</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium">Medium Risk</span>
              </div>
              <span className="text-sm text-gray-600">267 farmers (21.4%)</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <span className="text-sm font-medium">High Risk</span>
              </div>
              <span className="text-sm text-gray-600">88 farmers (7.1%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* New Financial Profile Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Financial Profile"
        maxWidth="max-w-4xl"
      >
        <NewFinancialProfileForm
          onSubmit={handleNewFinancialProfile}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
