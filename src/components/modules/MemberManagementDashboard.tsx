"use client";

import { useState } from "react";
import { mockFarmers, type Farmer } from "@/lib/mock-data";
import { Users, UserPlus, MapPin, Calendar, Phone, Crop, Plus, Search, Filter } from "lucide-react";

const membershipTypes = ["Individual", "VSLA Member", "Cooperative Member"];
const membershipColors = {
  "Individual": "text-blue-600 bg-blue-50",
  "VSLA Member": "text-green-600 bg-green-50",
  "Cooperative Member": "text-purple-600 bg-purple-50"
};

export default function MemberManagementDashboard() {
  const [selectedMember, setSelectedMember] = useState<Farmer | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [selectedMembershipType, setSelectedMembershipType] = useState<string>("all");

  const filteredMembers = mockFarmers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.phone.includes(searchTerm);
    return matchesSearch;
  });

  const stats = {
    totalMembers: mockFarmers.length,
    newThisMonth: 2,
    vslaMembers: Math.floor(mockFarmers.length * 0.6),
    cooperativeMembers: Math.floor(mockFarmers.length * 0.3)
  };

  const getMembershipType = (farmer: Farmer) => {
    // Simple logic to assign membership types
    if (farmer.totalLoans > 2) return "Cooperative Member";
    if (farmer.farmSize > 5) return "VSLA Member";
    return "Individual";
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-lg border p-4 bg-card">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium">Total Members</span>
          </div>
          <div className="text-2xl font-bold mt-1">{stats.totalMembers}</div>
        </div>
        <div className="rounded-lg border p-4 bg-card">
          <div className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium">New This Month</span>
          </div>
          <div className="text-2xl font-bold mt-1">{stats.newThisMonth}</div>
        </div>
        <div className="rounded-lg border p-4 bg-card">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium">VSLA Members</span>
          </div>
          <div className="text-2xl font-bold mt-1">{stats.vslaMembers}</div>
        </div>
        <div className="rounded-lg border p-4 bg-card">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-amber-600" />
            <span className="text-sm font-medium">Cooperative</span>
          </div>
          <div className="text-2xl font-bold mt-1">{stats.cooperativeMembers}</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Member Directory</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search members..."
              className="pl-9 pr-4 py-2 border rounded-lg text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowRegistrationForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm"
          >
            <Plus className="h-4 w-4" />
            Register Member
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMembers.map((member) => {
          const membershipType = getMembershipType(member);
          return (
            <div
              key={member.id}
              className="rounded-lg border p-4 bg-card hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedMember(member)}
            >
              <div className="flex items-start gap-3 mb-3">
                {member.avatar && (
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-medium">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">ID: {member.id}</p>
                  <span className={`inline-block px-2 py-1 rounded text-xs mt-1 ${membershipColors[membershipType as keyof typeof membershipColors]}`}>
                    {membershipType}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3 text-muted-foreground" />
                  <span>{member.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span>{member.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Crop className="h-3 w-3 text-muted-foreground" />
                  <span>{member.farmSize} acres</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  <span>Joined: {member.joinDate}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t">
                <p className="text-xs text-muted-foreground">
                  Crops: {member.crops.join(", ")}
                </p>
                {member.creditScore && (
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-muted-foreground">Credit Score:</span>
                    <span className="text-xs font-medium">{member.creditScore}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Member Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg p-6 max-w-lg w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Member Profile</h3>
              <button
                onClick={() => setSelectedMember(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {selectedMember.avatar && (
                  <img
                    src={selectedMember.avatar}
                    alt={selectedMember.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}
                <div>
                  <h4 className="font-medium text-lg">{selectedMember.name}</h4>
                  <p className="text-muted-foreground">Member ID: {selectedMember.id}</p>
                  <span className={`inline-block px-2 py-1 rounded text-xs mt-1 ${membershipColors[getMembershipType(selectedMember) as keyof typeof membershipColors]}`}>
                    {getMembershipType(selectedMember)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium">Phone:</span>
                  <p>{selectedMember.phone}</p>
                </div>
                <div>
                  <span className="text-sm font-medium">Location:</span>
                  <p>{selectedMember.location}</p>
                </div>
                <div>
                  <span className="text-sm font-medium">Farm Size:</span>
                  <p>{selectedMember.farmSize} acres</p>
                </div>
                <div>
                  <span className="text-sm font-medium">Join Date:</span>
                  <p>{selectedMember.joinDate}</p>
                </div>
                {selectedMember.creditScore && (
                  <>
                    <div>
                      <span className="text-sm font-medium">Credit Score:</span>
                      <p className="font-bold text-primary">{selectedMember.creditScore}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Total Loans:</span>
                      <p>{selectedMember.totalLoans}</p>
                    </div>
                  </>
                )}
              </div>

              <div>
                <span className="text-sm font-medium">Crops:</span>
                <p className="text-sm text-muted-foreground">{selectedMember.crops.join(", ")}</p>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setSelectedMember(null)}
                className="flex-1 px-4 py-2 border rounded-lg text-sm"
              >
                Close
              </button>
              <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Registration Form Modal */}
      {showRegistrationForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Register New Member</h3>
              <button
                onClick={() => setShowRegistrationForm(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ×
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input type="text" className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Enter full name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input type="tel" className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="+254..." />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input type="text" className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="County/Region" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Farm Size (acres)</label>
                <input type="number" className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="0.0" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Membership Type</label>
                <select className="w-full px-3 py-2 border rounded-lg text-sm">
                  <option value="Individual">Individual</option>
                  <option value="VSLA Member">VSLA Member</option>
                  <option value="Cooperative Member">Cooperative Member</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Primary Crops</label>
                <input type="text" className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Maize, Beans, Coffee..." />
              </div>
            </form>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setShowRegistrationForm(false)}
                className="flex-1 px-4 py-2 border rounded-lg text-sm"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm">
                Register Member
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
