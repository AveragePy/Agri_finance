"use client";

import { useState } from "react";
import { mockProduceListings, mockFarmers, type ProduceListing } from "@/lib/mock-data";
import { Package, MapPin, Calendar, Star, Filter, Search, Plus, Eye } from "lucide-react";
import Modal from "../common/Modal";
import NewListingForm from "../forms/NewListingForm";

const statusColors = {
  available: "text-green-600 bg-green-50 border-green-200",
  sold: "text-gray-600 bg-gray-50 border-gray-200",
  reserved: "text-amber-600 bg-amber-50 border-amber-200"
};

const qualityColors = {
  A: "text-green-600 bg-green-50",
  B: "text-amber-600 bg-amber-50",
  C: "text-red-600 bg-red-50"
};

export default function MarketplaceDashboard() {
  const [selectedStatus, setSelectedStatus] = useState<ProduceListing["status"] | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedListing, setSelectedListing] = useState<ProduceListing | null>(null);
  const [isNewListingModalOpen, setIsNewListingModalOpen] = useState(false);

  const filteredListings = mockProduceListings.filter(listing => {
    const matchesStatus = selectedStatus === "all" || listing.status === selectedStatus;
    const matchesSearch = listing.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    totalListings: mockProduceListings.length,
    availableListings: mockProduceListings.filter(l => l.status === "available").length,
    totalValue: mockProduceListings.reduce((sum, l) => sum + (l.quantity * l.pricePerUnit), 0),
    activeFarmers: new Set(mockProduceListings.map(l => l.farmerId)).size
  };

  const handleNewListing = (data: Record<string, any>) => {
    console.log("New listing data:", data);
    // Here you would typically send the data to your backend
    setIsNewListingModalOpen(false);
    // You could also show a success message or refresh the listings
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-lg border p-4 bg-card">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium">Total Listings</span>
          </div>
          <div className="text-2xl font-bold mt-1">{stats.totalListings}</div>
        </div>
        <div className="rounded-lg border p-4 bg-card">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium">Available</span>
          </div>
          <div className="text-2xl font-bold mt-1">{stats.availableListings}</div>
        </div>
        <div className="rounded-lg border p-4 bg-card">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-amber-600" />
            <span className="text-sm font-medium">Total Value</span>
          </div>
          <div className="text-2xl font-bold mt-1">UGX {stats.totalValue.toLocaleString()}</div>
        </div>
        <div className="rounded-lg border p-4 bg-card">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium">Active Farmers</span>
          </div>
          <div className="text-2xl font-bold mt-1">{stats.activeFarmers}</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Marketplace Listings</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search produce..."
              className="pl-9 pr-4 py-2 border rounded-lg text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-3 py-2 border rounded-lg text-sm"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as ProduceListing["status"] | "all")}
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="reserved">Reserved</option>
            <option value="sold">Sold</option>
          </select>
          <button
            onClick={() => setIsNewListingModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm"
          >
            <Plus className="h-4 w-4" />
            New Listing
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredListings.map((listing) => (
          <div key={listing.id} className="rounded-lg border p-4 bg-card hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-lg">{listing.crop}</h3>
                <p className="text-sm text-muted-foreground">by {listing.farmerName}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs border ${statusColors[listing.status]}`}>
                {listing.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Quantity:</span>
                <span className="font-medium">{listing.quantity} {listing.unit}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Price:</span>
                <span className="font-medium">UGX {listing.pricePerUnit}/{listing.unit}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Quality:</span>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${qualityColors[listing.quality]}`}>
                  Grade {listing.quality}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Value:</span>
                <span className="font-bold text-primary">
                  UGX {(listing.quantity * listing.pricePerUnit).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
              <MapPin className="h-3 w-3" />
              <span>{listing.location}</span>
              <Calendar className="h-3 w-3 ml-2" />
              <span>Harvested: {listing.harvestDate}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedListing(listing)}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 border rounded-lg text-sm hover:bg-muted"
              >
                <Eye className="h-4 w-4" />
                View Details
              </button>
              {listing.status === "available" && (
                <button className="flex-1 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm">
                  Contact Seller
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Listing Detail Modal */}
      {selectedListing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{selectedListing.crop} Details</h3>
              <button
                onClick={() => setSelectedListing(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ×
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium">Farmer:</span>
                <p className="text-sm text-muted-foreground">{selectedListing.farmerName}</p>
              </div>
              <div>
                <span className="text-sm font-medium">Location:</span>
                <p className="text-sm text-muted-foreground">{selectedListing.location}</p>
              </div>
              <div>
                <span className="text-sm font-medium">Harvest Date:</span>
                <p className="text-sm text-muted-foreground">{selectedListing.harvestDate}</p>
              </div>
              <div>
                <span className="text-sm font-medium">Quality Grade:</span>
                <p className="text-sm text-muted-foreground">Grade {selectedListing.quality}</p>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Value:</span>
                  <span className="text-lg font-bold text-primary">
                    UGX {(selectedListing.quantity * selectedListing.pricePerUnit).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setSelectedListing(null)}
                className="flex-1 px-4 py-2 border rounded-lg text-sm"
              >
                Close
              </button>
              {selectedListing.status === "available" && (
                <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm">
                  Make Offer
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* New Listing Modal */}
      <Modal
        isOpen={isNewListingModalOpen}
        onClose={() => setIsNewListingModalOpen(false)}
        title="Create New Listing"
        maxWidth="max-w-4xl"
      >
        <NewListingForm
          onSubmit={handleNewListing}
          onCancel={() => setIsNewListingModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
