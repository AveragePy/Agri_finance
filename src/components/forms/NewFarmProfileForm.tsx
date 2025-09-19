"use client";

import { useState } from "react";
import { Tractor, MapPin, Wheat, Droplets, Save, Calendar } from "lucide-react";

interface NewFarmProfileFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function NewFarmProfileForm({ onSubmit, onCancel }: NewFarmProfileFormProps) {
  const [formData, setFormData] = useState({
    farmerName: "",
    farmName: "",
    location: "",
    county: "",
    subCounty: "",
    gpsCoordinates: "",
    farmSize: "",
    soilType: "",
    primaryCrop: "",
    secondaryCrops: "",
    irrigationSystem: "",
    farmingMethod: "",
    seasonalPattern: "",
    lastHarvestDate: "",
    expectedNextPlanting: "",
    livestockCount: "",
    livestockType: "",
    farmEquipment: "",
    waterSource: "",
    electricityAccess: "",
    roadAccess: "",
    nearestMarket: "",
    marketDistance: ""
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
    if (!formData.farmName.trim()) newErrors.farmName = "Farm name is required";
    if (!formData.county.trim()) newErrors.county = "County is required";
    if (!formData.farmSize.trim()) newErrors.farmSize = "Farm size is required";
    if (!formData.primaryCrop.trim()) newErrors.primaryCrop = "Primary crop is required";

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
      {/* Basic Information */}
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
            Farm Name *
          </label>
          <input
            type="text"
            name="farmName"
            value={formData.farmName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Green Valley Farm"
          />
          {errors.farmName && <p className="text-red-500 text-xs mt-1">{errors.farmName}</p>}
        </div>
      </div>

      {/* Location Information */}
      <div className="border-t pt-4">
        <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
          <MapPin className="mr-2" size={16} />
          Location Details
        </h4>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              County *
            </label>
            <select
              name="county"
              value={formData.county}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select County</option>
              <option value="Nakuru">Nakuru</option>
              <option value="Kiambu">Kiambu</option>
              <option value="Meru">Meru</option>
              <option value="Uasin Gishu">Uasin Gishu</option>
              <option value="Trans Nzoia">Trans Nzoia</option>
            </select>
            {errors.county && <p className="text-red-500 text-xs mt-1">{errors.county}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sub County
            </label>
            <input
              type="text"
              name="subCounty"
              value={formData.subCounty}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter sub county"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Specific Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Village/Area name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              GPS Coordinates
            </label>
            <input
              type="text"
              name="gpsCoordinates"
              value={formData.gpsCoordinates}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="-0.3031, 36.0800"
            />
          </div>
        </div>
      </div>

      {/* Farm Details */}
      <div className="border-t pt-4">
        <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
          <Tractor className="mr-2" size={16} />
          Farm Details
        </h4>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Farm Size (Acres) *
            </label>
            <input
              type="number"
              name="farmSize"
              value={formData.farmSize}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="5.2"
              step="0.1"
              min="0"
            />
            {errors.farmSize && <p className="text-red-500 text-xs mt-1">{errors.farmSize}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Soil Type
            </label>
            <select
              name="soilType"
              value={formData.soilType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select Soil Type</option>
              <option value="Clay">Clay</option>
              <option value="Loam">Loam</option>
              <option value="Sandy">Sandy</option>
              <option value="Silt">Silt</option>
              <option value="Rocky">Rocky</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Farming Method
            </label>
            <select
              name="farmingMethod"
              value={formData.farmingMethod}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select Method</option>
              <option value="Organic">Organic</option>
              <option value="Conventional">Conventional</option>
              <option value="Mixed">Mixed</option>
              <option value="Sustainable">Sustainable</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Seasonal Pattern
            </label>
            <select
              name="seasonalPattern"
              value={formData.seasonalPattern}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select Pattern</option>
              <option value="Single Season">Single Season</option>
              <option value="Double Season">Double Season</option>
              <option value="Year Round">Year Round</option>
            </select>
          </div>
        </div>
      </div>

      {/* Crop Information */}
      <div className="border-t pt-4">
        <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
          <Wheat className="mr-2" size={16} />
          Crop Information
        </h4>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Primary Crop *
            </label>
            <select
              name="primaryCrop"
              value={formData.primaryCrop}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select Primary Crop</option>
              <option value="Maize">Maize</option>
              <option value="Coffee">Coffee</option>
              <option value="Tea">Tea</option>
              <option value="Beans">Beans</option>
              <option value="Potatoes">Potatoes</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Wheat">Wheat</option>
              <option value="Rice">Rice</option>
            </select>
            {errors.primaryCrop && <p className="text-red-500 text-xs mt-1">{errors.primaryCrop}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Secondary Crops
            </label>
            <input
              type="text"
              name="secondaryCrops"
              value={formData.secondaryCrops}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Beans, Vegetables"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Harvest Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="date"
                name="lastHarvestDate"
                value={formData.lastHarvestDate}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expected Next Planting
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="date"
                name="expectedNextPlanting"
                value={formData.expectedNextPlanting}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Infrastructure */}
      <div className="border-t pt-4">
        <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
          <Droplets className="mr-2" size={16} />
          Infrastructure & Resources
        </h4>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Irrigation System
            </label>
            <select
              name="irrigationSystem"
              value={formData.irrigationSystem}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select System</option>
              <option value="Rain-fed">Rain-fed</option>
              <option value="Drip Irrigation">Drip Irrigation</option>
              <option value="Sprinkler">Sprinkler</option>
              <option value="Furrow">Furrow</option>
              <option value="Mixed">Mixed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Water Source
            </label>
            <select
              name="waterSource"
              value={formData.waterSource}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select Source</option>
              <option value="Borehole">Borehole</option>
              <option value="River">River</option>
              <option value="Dam">Dam</option>
              <option value="Well">Well</option>
              <option value="Rainwater">Rainwater</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Electricity Access
            </label>
            <select
              name="electricityAccess"
              value={formData.electricityAccess}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select Access</option>
              <option value="Grid Connected">Grid Connected</option>
              <option value="Solar">Solar</option>
              <option value="Generator">Generator</option>
              <option value="No Access">No Access</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Road Access
            </label>
            <select
              name="roadAccess"
              value={formData.roadAccess}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select Access</option>
              <option value="Tarmac Road">Tarmac Road</option>
              <option value="Murram Road">Murram Road</option>
              <option value="Footpath">Footpath</option>
              <option value="Seasonal Access">Seasonal Access</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 mt-4">
            Farm Equipment
          </label>
          <textarea
            name="farmEquipment"
            value={formData.farmEquipment}
            onChange={handleChange}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="List available equipment (tractors, ploughs, etc.)"
          />
        </div>
      </div>

      {/* Livestock */}
      <div className="border-t pt-4">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Livestock (Optional)</h4>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Livestock Type
            </label>
            <select
              name="livestockType"
              value={formData.livestockType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select Type</option>
              <option value="Cattle">Cattle</option>
              <option value="Goats">Goats</option>
              <option value="Sheep">Sheep</option>
              <option value="Poultry">Poultry</option>
              <option value="Mixed">Mixed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Animals
            </label>
            <input
              type="number"
              name="livestockCount"
              value={formData.livestockCount}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="0"
              min="0"
            />
          </div>
        </div>
      </div>

      {/* Market Access */}
      <div className="border-t pt-4">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Market Access</h4>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nearest Market
            </label>
            <input
              type="text"
              name="nearestMarket"
              value={formData.nearestMarket}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Market name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Distance to Market (KM)
            </label>
            <input
              type="number"
              name="marketDistance"
              value={formData.marketDistance}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="10"
              min="0"
              step="0.1"
            />
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
          Create Farm Profile
        </button>
      </div>
    </form>
  );
}
