"use client";

import { useState } from "react";
import { mockFarmers, mockAdvisories, type Advisory, type Farmer } from "@/lib/mock-data";
import { CloudSun, Bug, Sprout, TrendingUp, Users, Bell, Search, Filter } from "lucide-react";

const priorityColors = {
  high: "text-red-600 bg-red-50 border-red-200",
  medium: "text-amber-600 bg-amber-50 border-amber-200",
  low: "text-green-600 bg-green-50 border-green-200"
};

const typeIcons = {
  weather: CloudSun,
  pest: Bug,
  crop: Sprout,
  market: TrendingUp
};

export default function AdvisoryDashboard() {
  const [selectedType, setSelectedType] = useState<Advisory["type"] | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAdvisories = mockAdvisories.filter(advisory => {
    const matchesType = selectedType === "all" || advisory.type === selectedType;
    const matchesSearch = advisory.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         advisory.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const stats = {
    totalFarmers: mockFarmers.length,
    activeAdvisories: mockAdvisories.length,
    highPriority: mockAdvisories.filter(a => a.priority === "high").length,
    weatherAlerts: mockAdvisories.filter(a => a.type === "weather").length
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-lg border p-4 bg-card">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium">Total Farmers</span>
          </div>
          <div className="text-2xl font-bold mt-1">{stats.totalFarmers}</div>
        </div>
        <div className="rounded-lg border p-4 bg-card">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium">Active Advisories</span>
          </div>
          <div className="text-2xl font-bold mt-1">{stats.activeAdvisories}</div>
        </div>
        <div className="rounded-lg border p-4 bg-card">
          <div className="flex items-center gap-2">
            <Bug className="h-5 w-5 text-red-600" />
            <span className="text-sm font-medium">High Priority</span>
          </div>
          <div className="text-2xl font-bold mt-1">{stats.highPriority}</div>
        </div>
        <div className="rounded-lg border p-4 bg-card">
          <div className="flex items-center gap-2">
            <CloudSun className="h-5 w-5 text-amber-600" />
            <span className="text-sm font-medium">Weather Alerts</span>
          </div>
          <div className="text-2xl font-bold mt-1">{stats.weatherAlerts}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Advisories List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Advisory Messages</h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search advisories..."
                  className="pl-9 pr-4 py-2 border rounded-lg text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-3 py-2 border rounded-lg text-sm"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as Advisory["type"] | "all")}
              >
                <option value="all">All Types</option>
                <option value="weather">Weather</option>
                <option value="pest">Pest</option>
                <option value="crop">Crop</option>
                <option value="market">Market</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            {filteredAdvisories.map((advisory) => {
              const Icon = typeIcons[advisory.type];
              return (
                <div key={advisory.id} className="rounded-lg border p-4 bg-card">
                  <div className="flex items-start gap-3">
                    <Icon className="h-5 w-5 mt-0.5 text-primary" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium">{advisory.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs border ${priorityColors[advisory.priority]}`}>
                          {advisory.priority}
                        </span>
                        <span className="text-xs text-muted-foreground capitalize">
                          {advisory.type}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{advisory.message}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{advisory.date}</span>
                        {advisory.region && <span>Region: {advisory.region}</span>}
                        {advisory.targetCrops && (
                          <span>Crops: {advisory.targetCrops.join(", ")}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Farmers List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Registered Farmers</h2>
          <div className="space-y-3">
            {mockFarmers.map((farmer) => (
              <div key={farmer.id} className="rounded-lg border p-3 bg-card">
                <div className="flex items-center gap-3">
                  {farmer.avatar && (
                    <img
                      src={farmer.avatar}
                      alt={farmer.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{farmer.name}</h3>
                    <p className="text-xs text-muted-foreground">{farmer.location}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                        {farmer.farmSize} acres
                      </span>
                      {farmer.creditScore && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                          Score: {farmer.creditScore}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Crops: {farmer.crops.join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
