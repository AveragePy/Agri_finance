"use client";
import { useState } from "react";
import {
  Users,
  UserPlus,
  CheckCircle,
  Clock,
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  Calendar,
  MapPin,
  Phone
} from "lucide-react";
import Modal from "../../components/common/Modal";
import NewMemberForm from "../../components/forms/NewMemberForm";

export default function MemberRegistrationPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNewMember = (data: any) => {
    console.log("New member data:", data);
    // Here you would typically send the data to your backend
    setIsModalOpen(false);
    // You could also show a success message or refresh the list
  };

  const recentRegistrations = [
    {
      id: "MR001",
      name: "John Kamau",
      email: "john.kamau@example.com",
      phone: "+254 700 123 456",
      location: "Nakuru County",
      registrationDate: "2024-01-15",
      status: "Active",
      farmSize: "5.2 acres",
      primaryCrop: "Maize"
    },
    {
      id: "MR002",
      name: "Mary Wanjiku",
      email: "mary.wanjiku@example.com",
      phone: "+254 700 234 567",
      location: "Kiambu County",
      registrationDate: "2024-01-14",
      status: "Pending Verification",
      farmSize: "3.8 acres",
      primaryCrop: "Coffee"
    },
    {
      id: "MR003",
      name: "Peter Mwangi",
      email: "peter.mwangi@example.com",
      phone: "+254 700 345 678",
      location: "Meru County",
      registrationDate: "2024-01-13",
      status: "Active",
      farmSize: "7.1 acres",
      primaryCrop: "Tea"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Member Registration</h1>
          <p className="text-muted-foreground">
            Manage farmer registrations and memberships
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors"
        >
          <Plus size={20} />
          New Member
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium">Total Members</span>
          </div>
          <div className="text-2xl font-bold">1,247</div>
          <p className="text-xs text-muted-foreground">Registered farmers</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-2">
            <UserPlus className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium">New This Month</span>
          </div>
          <div className="text-2xl font-bold">89</div>
          <p className="text-xs text-muted-foreground">New registrations</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium">Active Members</span>
          </div>
          <div className="text-2xl font-bold">1,089</div>
          <p className="text-xs text-muted-foreground">Active farmers</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-yellow-600" />
            <span className="text-sm font-medium">Pending Verification</span>
          </div>
          <div className="text-2xl font-bold">158</div>
          <p className="text-xs text-muted-foreground">Awaiting documents</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, email, or location..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="inline-flex items-center gap-2 h-9 rounded-lg border px-3 text-sm bg-background hover:bg-muted transition-colors">
          <Filter className="h-4 w-4" />
          More Filters
        </button>
      </div>

      {/* Recent Registrations */}
      <div className="rounded-lg border bg-card">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Recent Registrations</h3>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Member
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Farm Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registration Date
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
                {recentRegistrations.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-500">ID: {member.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900 flex items-center gap-1">
                          <Phone size={14} className="text-gray-400" />
                          {member.phone}
                        </div>
                        <div className="text-sm text-gray-500">{member.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900 flex items-center gap-1">
                          <MapPin size={14} className="text-blue-600" />
                          {member.location}
                        </div>
                        <div className="text-sm text-gray-500">{member.farmSize} • {member.primaryCrop}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center gap-1">
                        <Calendar size={14} className="text-gray-400" />
                        {member.registrationDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        member.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {member.status}
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
      </div>

      {/* New Member Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Register New Member"
        maxWidth="max-w-4xl"
      >
        <NewMemberForm
          onSubmit={handleNewMember}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
