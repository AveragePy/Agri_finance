"use client";

import { useState } from "react";
import {
  Sprout,
  MapPin,
  TrendingUp,
  Users,
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  Droplets,
  Sun
} from "lucide-react";
import Modal from "../../components/common/Modal";
import NewFarmProfileForm from "../../components/forms/NewFarmProfileForm";

export default function FarmProfiling() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNewFarmProfile = (data: Record<string, any>) => {
    console.log("New farm profile data:", data);
    // Here you would typically send the data to your backend
    setIsModalOpen(false);
    // You could also show a success message or refresh the list
  };

  const farmProfiles = [
    {
      id: "FP001",
      farmerName: "John Kamau",
      farmName: "Green Valley Farm",
      location: "Nakuru County",
      farmSize: "5.2 acres",
      primaryCrops: ["Maize", "Beans"],
      soilType: "Loamy",
      irrigationSystem: "Drip Irrigation",
      lastUpdated: "2024-01-15",
      productivity: "High",
      sustainabilityScore: 85
    },
    {
      id: "FP002",
      farmerName: "Mary Wanjiku",
      farmName: "Coffee Hills Estate",
      location: "Kiambu County",
      farmSize: "3.8 acres",
      primaryCrops: ["Coffee", "Bananas"],
      soilType: "Clay Loam",
      irrigationSystem: "Rain-fed",
      lastUpdated: "2024-01-14",
      productivity: "Medium",
      sustainabilityScore: 72
    },
    {
      id: "FP003",
      farmerName: "Peter Mwangi",
      farmName: "Tea Garden Farm",
      location: "Meru County",
      farmSize: "7.1 acres",
      primaryCrops: ["Tea", "Maize"],
      soilType: "Red Soil",
      irrigationSystem: "Sprinkler",
      lastUpdated: "2024-01-13",
      productivity: "High",
      sustainabilityScore: 91
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Farm Profiling</h1>
          <p className="text-gray-600 mt-2">Comprehensive farm data and agricultural insights</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={20} />
          New Farm Profile
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Farms</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
            </div>
            <Sprout className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Registered farms</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Acreage</p>
              <p className="text-2xl font-bold text-gray-900">15,432</p>
            </div>
            <MapPin className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Acres under cultivation</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">High Productivity</p>
              <p className="text-2xl font-bold text-gray-900">892</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">71.5% of farms</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Sustainability</p>
              <p className="text-2xl font-bold text-gray-900">78.5</p>
            </div>
            <Sun className="h-8 w-8 text-yellow-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Sustainability score</p>
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
                placeholder="Search by farm name, farmer, or location..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
              <option>All Crops</option>
              <option>Maize</option>
              <option>Coffee</option>
              <option>Tea</option>
              <option>Beans</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
              <option>All Counties</option>
              <option>Nakuru County</option>
              <option>Kiambu County</option>
              <option>Meru County</option>
            </select>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Filter size={20} />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Farm Profiles */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Farm Profiles</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Farm Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location & Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Crops & Soil
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Infrastructure
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {farmProfiles.map((farm) => (
                <tr key={farm.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{farm.farmName}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Users size={14} className="text-gray-400" />
                        {farm.farmerName}
                      </div>
                      <div className="text-sm text-gray-500">ID: {farm.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900 flex items-center gap-1">
                        <MapPin size={14} className="text-blue-600" />
                        {farm.location}
                      </div>
                      <div className="text-sm text-gray-500">{farm.farmSize}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900 flex items-center gap-1">
                        <Sprout size={14} className="text-green-600" />
                        {farm.primaryCrops.join(", ")}
                      </div>
                      <div className="text-sm text-gray-500">{farm.soilType}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center gap-1">
                      <Droplets size={14} className="text-blue-600" />
                      {farm.irrigationSystem}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        farm.productivity === 'High'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {farm.productivity}
                      </span>
                      <div className="text-sm text-gray-500 mt-1">
                        Sustainability: {farm.sustainabilityScore}%
                      </div>
                    </div>
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Crop Distribution</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sprout className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium">Maize</span>
              </div>
              <span className="text-sm text-gray-600">425 farms (34.1%)</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sprout className="h-4 w-4 text-brown-600" />
                <span className="text-sm font-medium">Coffee</span>
              </div>
              <span className="text-sm text-gray-600">298 farms (23.9%)</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sprout className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Tea</span>
              </div>
              <span className="text-sm text-gray-600">267 farms (21.4%)</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sprout className="h-4 w-4 text-red-600" />
                <span className="text-sm font-medium">Other Crops</span>
              </div>
              <span className="text-sm text-gray-600">257 farms (20.6%)</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Farm Size Distribution</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Small (&lt; 2 acres)</span>
              <span className="text-sm text-gray-600">342 farms (27.4%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Medium (2-10 acres)</span>
              <span className="text-sm text-gray-600">623 farms (49.9%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Large (&gt; 10 acres)</span>
              <span className="text-sm text-gray-600">282 farms (22.7%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* New Farm Profile Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Farm Profile"
        maxWidth="max-w-4xl"
      >
        <NewFarmProfileForm
          onSubmit={handleNewFarmProfile}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
