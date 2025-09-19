"use client";

import { useState } from "react";
import { mockFarmers, mockLoans, type Farmer } from "@/lib/mock-data";
import { Gauge, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Users, Calculator, BarChart3 } from "lucide-react";

const getScoreColor = (score: number) => {
  if (score >= 750) return "text-green-600 bg-green-50";
  if (score >= 650) return "text-amber-600 bg-amber-50";
  return "text-red-600 bg-red-50";
};

const getRiskLevel = (score: number) => {
  if (score >= 750) return { level: "Low Risk", color: "text-green-600" };
  if (score >= 650) return { level: "Medium Risk", color: "text-amber-600" };
  return { level: "High Risk", color: "text-red-600" };
};

const getEligibilityLimit = (score: number, farmSize: number) => {
  const baseLimit = farmSize * 10000; // UGX 10,000 per acre
  const scoreMultiplier = score >= 750 ? 1.5 : score >= 650 ? 1.2 : 0.8;
  return Math.round(baseLimit * scoreMultiplier);
};

export default function CreditScoringDashboard() {
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const farmersWithScores = mockFarmers.filter(f => f.creditScore);
  const filteredFarmers = farmersWithScores.filter(farmer =>
    farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farmer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    totalScored: farmersWithScores.length,
    avgScore: Math.round(farmersWithScores.reduce((sum, f) => sum + (f.creditScore || 0), 0) / farmersWithScores.length),
    lowRisk: farmersWithScores.filter(f => (f.creditScore || 0) >= 750).length,
    highRisk: farmersWithScores.filter(f => (f.creditScore || 0) < 650).length
  };

  const scoreDistribution = [
    { range: "750+", count: farmersWithScores.filter(f => (f.creditScore || 0) >= 750).length, color: "bg-green-500" },
    { range: "650-749", count: farmersWithScores.filter(f => (f.creditScore || 0) >= 650 && (f.creditScore || 0) < 750).length, color: "bg-amber-500" },
    { range: "550-649", count: farmersWithScores.filter(f => (f.creditScore || 0) >= 550 && (f.creditScore || 0) < 650).length, color: "bg-orange-500" },
    { range: "<550", count: farmersWithScores.filter(f => (f.creditScore || 0) < 550).length, color: "bg-red-500" }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-lg border p-4 bg-card">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium">Farmers Scored</span>
          </div>
          <div className="text-2xl font-bold mt-1">{stats.totalScored}</div>
        </div>
        <div className="rounded-lg border p-4 bg-card">
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium">Average Score</span>
          </div>
          <div className="text-2xl font-bold mt-1">{stats.avgScore}</div>
        </div>
        <div className="rounded-lg border p-4 bg-card">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium">Low Risk</span>
          </div>
          <div className="text-2xl font-bold mt-1">{stats.lowRisk}</div>
        </div>
        <div className="rounded-lg border p-4 bg-card">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <span className="text-sm font-medium">High Risk</span>
          </div>
          <div className="text-2xl font-bold mt-1">{stats.highRisk}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Farmers List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Credit Scores</h2>
            <input
              type="text"
              placeholder="Search farmers..."
              className="px-3 py-2 border rounded-lg text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            {filteredFarmers.map((farmer) => {
              const risk = getRiskLevel(farmer.creditScore || 0);
              const eligibilityLimit = getEligibilityLimit(farmer.creditScore || 0, farmer.farmSize);

              return (
                <div
                  key={farmer.id}
                  className="rounded-lg border p-4 bg-card hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedFarmer(farmer)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {farmer.avatar && (
                        <img
                          src={farmer.avatar}
                          alt={farmer.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <h3 className="font-medium">{farmer.name}</h3>
                        <p className="text-sm text-muted-foreground">{farmer.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getScoreColor(farmer.creditScore || 0)}`}>
                        {farmer.creditScore}
                      </div>
                      <div className={`text-xs ${risk.color}`}>
                        {risk.level}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Farm Size:</span>
                      <p className="font-medium">{farmer.farmSize} acres</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Total Loans:</span>
                      <p className="font-medium">{farmer.totalLoans}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Eligibility Limit:</span>
                      <p className="font-medium text-primary">UGX {eligibilityLimit.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <span className="text-xs text-muted-foreground">Crops: </span>
                    <span className="text-xs">{farmer.crops.join(", ")}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Score Distribution */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Score Distribution</h2>

          <div className="rounded-lg border p-4 bg-card">
            <div className="space-y-4">
              {scoreDistribution.map((dist) => (
                <div key={dist.range} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{dist.range}</span>
                    <span className="font-medium">{dist.count} farmers</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${dist.color}`}
                      style={{ width: `${(dist.count / farmersWithScores.length) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border p-4 bg-card">
            <h3 className="font-medium mb-3">Scoring Factors</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Payment History</span>
                <span className="text-muted-foreground">35%</span>
              </div>
              <div className="flex justify-between">
                <span>Farm Performance</span>
                <span className="text-muted-foreground">30%</span>
              </div>
              <div className="flex justify-between">
                <span>Financial Stability</span>
                <span className="text-muted-foreground">20%</span>
              </div>
              <div className="flex justify-between">
                <span>Market Activity</span>
                <span className="text-muted-foreground">10%</span>
              </div>
              <div className="flex justify-between">
                <span>Other Factors</span>
                <span className="text-muted-foreground">5%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Farmer Detail Modal */}
      {selectedFarmer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg p-6 max-w-lg w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Credit Score Details</h3>
              <button
                onClick={() => setSelectedFarmer(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                {selectedFarmer.avatar && (
                  <img
                    src={selectedFarmer.avatar}
                    alt={selectedFarmer.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}
                <div>
                  <h4 className="font-medium text-lg">{selectedFarmer.name}</h4>
                  <p className="text-muted-foreground">{selectedFarmer.location}</p>
                  <div className={`text-3xl font-bold ${getScoreColor(selectedFarmer.creditScore || 0)}`}>
                    {selectedFarmer.creditScore}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium">Risk Level:</span>
                  <p className={`${getRiskLevel(selectedFarmer.creditScore || 0).color}`}>
                    {getRiskLevel(selectedFarmer.creditScore || 0).level}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium">Eligibility Limit:</span>
                  <p className="font-medium text-primary">
                    UGX {getEligibilityLimit(selectedFarmer.creditScore || 0, selectedFarmer.farmSize).toLocaleString()}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium">Farm Size:</span>
                  <p>{selectedFarmer.farmSize} acres</p>
                </div>
                <div>
                  <span className="text-sm font-medium">Total Loans:</span>
                  <p>{selectedFarmer.totalLoans}</p>
                </div>
              </div>

              <div>
                <span className="text-sm font-medium">Crops:</span>
                <p className="text-sm text-muted-foreground">{selectedFarmer.crops.join(", ")}</p>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setSelectedFarmer(null)}
                className="flex-1 px-4 py-2 border rounded-lg text-sm"
              >
                Close
              </button>
              <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm">
                Update Score
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
