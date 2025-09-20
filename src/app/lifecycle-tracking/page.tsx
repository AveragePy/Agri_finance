"use client";

import { useState } from "react";
import {
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  Calendar,
  TrendingUp,
  Users,
  Target,
  ArrowRight,
  Pause,
  Play
} from "lucide-react";
import Modal from "@/components/common/Modal";
import NewLifecycleForm from "@/components/forms/NewLifecycleForm";

export default function LifecycleTracking() {
  const [isNewLifecycleModalOpen, setIsNewLifecycleModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const lifecycleStages = [
    {
      id: "LS001",
      farmerName: "John Kamau",
      farmerId: "F001",
      currentStage: "Credit Assessment",
      progress: 65,
      startDate: "2024-01-10",
      expectedCompletion: "2024-02-15",
      status: "In Progress",
      daysInStage: 5
    },
    {
      id: "LS002",
      farmerName: "Mary Wanjiku",
      farmerId: "F002",
      currentStage: "Farm Profiling",
      progress: 90,
      startDate: "2024-01-08",
      expectedCompletion: "2024-01-20",
      status: "Near Completion",
      daysInStage: 7
    },
    {
      id: "LS003",
      farmerName: "Peter Mwangi",
      farmerId: "F003",
      currentStage: "Documentation",
      progress: 25,
      startDate: "2024-01-12",
      expectedCompletion: "2024-02-10",
      status: "Delayed",
      daysInStage: 3
    }
  ];

  const stageDefinitions = [
    { name: "Registration", duration: "3-5 days", description: "Initial farmer registration and basic information collection" },
    { name: "Farm Profiling", duration: "7-10 days", description: "Detailed farm assessment and data collection" },
    { name: "Documentation", duration: "5-7 days", description: "KYC and required document verification" },
    { name: "Credit Assessment", duration: "10-14 days", description: "Credit scoring and eligibility evaluation" },
    { name: "Approval Process", duration: "3-5 days", description: "Final review and approval decision" },
    { name: "Disbursement", duration: "1-2 days", description: "Credit disbursement and account setup" },
    { name: "Monitoring", duration: "Ongoing", description: "Continuous monitoring and support" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Near Completion':
        return 'bg-yellow-100 text-yellow-800';
      case 'Delayed':
        return 'bg-red-100 text-red-800';
      case 'On Hold':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-yellow-500';
    if (progress >= 40) return 'bg-blue-500';
    return 'bg-red-500';
  };

  const handleNewLifecycleSubmit = (formData: any) => {
    console.log("New Lifecycle:", formData);
    setIsNewLifecycleModalOpen(false);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lifecycle Tracking</h1>
          <p className="text-gray-600 mt-2">Track farmer and credit lifecycle stages</p>
        </div>
        <button
          onClick={() => setIsNewLifecycleModalOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={20} />
          New Lifecycle
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Lifecycles</p>
              <p className="text-2xl font-bold text-gray-900">247</p>
            </div>
            <Activity className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">+12 new this week</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">1,089</p>
            </div>
            <CheckCircle className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">This month: 156</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Duration</p>
              <p className="text-2xl font-bold text-gray-900">28</p>
            </div>
            <Clock className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Days to completion</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">87%</p>
            </div>
            <Target className="h-8 w-8 text-yellow-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Completion success</p>
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
                placeholder="Search by farmer name, ID, or stage..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
              <option>All Stages</option>
              <option>Registration</option>
              <option>Farm Profiling</option>
              <option>Documentation</option>
              <option>Credit Assessment</option>
              <option>Approval Process</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
              <option>All Status</option>
              <option>In Progress</option>
              <option>Near Completion</option>
              <option>Delayed</option>
              <option>On Hold</option>
            </select>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Filter size={20} />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Lifecycle Tracking Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Active Lifecycles</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Farmer Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Stage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timeline
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
              {lifecycleStages.map((lifecycle) => (
                <tr key={lifecycle.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{lifecycle.farmerName}</div>
                      <div className="text-sm text-gray-500">ID: {lifecycle.farmerId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Activity size={16} className="text-blue-600" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{lifecycle.currentStage}</div>
                        <div className="text-sm text-gray-500">{lifecycle.daysInStage} days in stage</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getProgressColor(lifecycle.progress)}`}
                          style={{ width: `${lifecycle.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{lifecycle.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">Started: {lifecycle.startDate}</div>
                      <div className="text-sm text-gray-500">Due: {lifecycle.expectedCompletion}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(lifecycle.status)}`}>
                      {lifecycle.status}
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
                      <button className="text-purple-600 hover:text-purple-900">
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stage Definitions and Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Lifecycle Stages</h3>
          <div className="space-y-4">
            {stageDefinitions.map((stage, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-medium text-blue-600">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900">{stage.name}</h4>
                    <span className="text-xs text-gray-500">{stage.duration}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Stage Distribution</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium">Registration</span>
              </div>
              <span className="text-sm text-gray-600">45 (18%)</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Farm Profiling</span>
              </div>
              <span className="text-sm text-gray-600">62 (25%)</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm font-medium">Documentation</span>
              </div>
              <span className="text-sm text-gray-600">38 (15%)</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm font-medium">Credit Assessment</span>
              </div>
              <span className="text-sm text-gray-600">71 (29%)</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm font-medium">Approval Process</span>
              </div>
              <span className="text-sm text-gray-600">31 (13%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Lifecycle Activities</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Stage completed</p>
              <p className="text-xs text-gray-500">John Kamau moved to Credit Assessment stage</p>
              <p className="text-xs text-gray-400">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Stage delayed</p>
              <p className="text-xs text-gray-500">Mary Wanjiku - Documentation stage extended</p>
              <p className="text-xs text-gray-400">5 hours ago</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Play className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Lifecycle started</p>
              <p className="text-xs text-gray-500">Peter Mwangi - New registration initiated</p>
              <p className="text-xs text-gray-400">1 day ago</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Pause className="h-5 w-5 text-gray-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Lifecycle paused</p>
              <p className="text-xs text-gray-500">Sarah Njeri - Pending additional documents</p>
              <p className="text-xs text-gray-400">2 days ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* New Lifecycle Modal */}
      <Modal
        isOpen={isNewLifecycleModalOpen}
        onClose={() => setIsNewLifecycleModalOpen(false)}
        title="Create New Lifecycle"
        maxWidth="max-w-4xl"
      >
        <NewLifecycleForm
          onSubmit={handleNewLifecycleSubmit}
          onCancel={() => setIsNewLifecycleModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
