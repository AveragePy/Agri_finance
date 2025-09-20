"use client";

import { useState } from "react";
import {
  Building2,
  MapPin,
  Sprout,
  Droplets,
  UserPlus,
  X,
  Tractor,
  Sun,
  TreePine,
  Gauge
} from "lucide-react";

interface NewFarmProfileFormProps {
  onSubmit: (data: Record<string, any>) => void;
  onCancel: () => void;
}

export default function NewFarmProfileForm({ onSubmit, onCancel }: NewFarmProfileFormProps) {
  const [formData, setFormData] = useState({
    // Farmer Details
    farmerName: "",
    farmName: "",
    farmerPhone: "",
    farmerEmail: "",

    // Farm Location
    county: "",
    subCounty: "",
    ward: "",
    village: "",
    gpsCoordinates: "",

    // Farm Attributes
    farmSize: "",
    soilType: "",
    topography: "",
    climateZone: "",

    // Crops & Production
    primaryCrops: [] as string[],
    croppingPattern: "",

    // Infrastructure
    irrigationSystem: "",
    waterSource: "",
    storageCapacity: "",
    buildingsStructures: "",

    // Sustainability
    organicCertified: false,
    sustainabilityPractices: [] as string[]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleMultiSelect = (name: string, value: string) => {
    setFormData(prev => {
      const currentValues = prev[name] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return { ...prev, [name]: newValues };
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.farmerName.trim()) newErrors.farmerName = "Farmer name is required";
    if (!formData.farmName.trim()) newErrors.farmName = "Farm name is required";
    if (!formData.county.trim()) newErrors.county = "County is required";
    if (!formData.farmSize.trim()) newErrors.farmSize = "Farm size is required";
    if (formData.farmerPhone && !/^(\+254|0)[17]\d{8}$/.test(formData.farmerPhone)) {
      newErrors.farmerPhone = "Invalid Kenyan phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Farm profile submitted:", formData);
      onSubmit(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Farmer Details Section */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-green-600" />
            Farmer & Farm Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Farmer Name *
              </label>
              <input
                type="text"
                name="farmerName"
                value={formData.farmerName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder="John Kamau"
              />
              {errors.farmerName && <p className="text-red-500 text-xs mt-1">{errors.farmerName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Farm Name *
              </label>
              <input
                type="text"
                name="farmName"
                value={formData.farmName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder="Green Valley Farm"
              />
              {errors.farmName && <p className="text-red-500 text-xs mt-1">{errors.farmName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="farmerPhone"
                value={formData.farmerPhone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder="+254712345678"
              />
              {errors.farmerPhone && <p className="text-red-500 text-xs mt-1">{errors.farmerPhone}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="farmerEmail"
                value={formData.farmerEmail}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder="farmer@example.com"
              />
            </div>
          </div>
        </div>

        {/* Farm Location Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            Farm Location
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                County *
              </label>
              <select
                name="county"
                value={formData.county}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Select County</option>
                <option value="nairobi">Nairobi County</option>
                <option value="kiambu">Kiambu County</option>
                <option value="meru">Meru County</option>
                <option value="nyeri">Nyeri County</option>
                <option value="nakuru">Nakuru County</option>
                <option value="other">Other</option>
              </select>
              {errors.county && <p className="text-red-500 text-xs mt-1">{errors.county}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sub-County
              </label>
              <input
                type="text"
                name="subCounty"
                value={formData.subCounty}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter sub-county"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ward
              </label>
              <input
                type="text"
                name="ward"
                value={formData.ward}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter ward"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Village
              </label>
              <input
                type="text"
                name="village"
                value={formData.village}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter village"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GPS Coordinates (Optional)
              </label>
              <input
                type="text"
                name="gpsCoordinates"
                value={formData.gpsCoordinates}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="-1.2921, 36.8219"
              />
            </div>
          </div>
        </div>

        {/* Farm Attributes Section */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Gauge className="h-5 w-5 text-amber-600" />
            Farm Attributes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Farm Size (Acres) *
              </label>
              <input
                type="number"
                name="farmSize"
                value={formData.farmSize}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                placeholder="5.2"
                min="0"
                step="0.1"
              />
              {errors.farmSize && <p className="text-red-500 text-xs mt-1">{errors.farmSize}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Soil Type
              </label>
              <select
                name="soilType"
                value={formData.soilType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Select Soil Type</option>
                <option value="clay">Clay</option>
                <option value="loamy">Loamy</option>
                <option value="sandy">Sandy</option>
                <option value="silt">Silt</option>
                <option value="rocky">Rocky</option>
                <option value="volcanic">Volcanic</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Topography
              </label>
              <select
                name="topography"
                value={formData.topography}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Select Topography</option>
                <option value="flat">Flat</option>
                <option value="gently-sloping">Gently Sloping</option>
                <option value="moderately-sloping">Moderately Sloping</option>
                <option value="steep">Steep</option>
                <option value="hilly">Hilly</option>
                <option value="mountainous">Mountainous</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Climate Zone
              </label>
              <select
                name="climateZone"
                value={formData.climateZone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Select Climate Zone</option>
                <option value="arid">Arid</option>
                <option value="semi-arid">Semi-Arid</option>
                <option value="sub-humid">Sub-Humid</option>
                <option value="humid">Humid</option>
                <option value="highland">Highland</option>
              </select>
            </div>
          </div>
        </div>

        {/* Crops & Production Section */}
        <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-xl border border-green-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Sprout className="h-5 w-5 text-green-600" />
            Crops & Production
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Crops
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {['Maize', 'Beans', 'Coffee', 'Tea', 'Wheat', 'Rice', 'Potatoes', 'Tomatoes'].map((crop) => (
                  <label key={crop} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.primaryCrops.includes(crop)}
                      onChange={() => handleMultiSelect('primaryCrops', crop)}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">{crop}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cropping Pattern
              </label>
              <select
                name="croppingPattern"
                value={formData.croppingPattern}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Select Cropping Pattern</option>
                <option value="monocropping">Monocropping</option>
                <option value="intercropping">Intercropping</option>
                <option value="crop-rotation">Crop Rotation</option>
                <option value="mixed-farming">Mixed Farming</option>
              </select>
            </div>
          </div>
        </div>

        {/* Infrastructure Section */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Tractor className="h-5 w-5 text-purple-600" />
            Infrastructure
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Droplets className="inline h-4 w-4 mr-1" />
                Irrigation System
              </label>
              <select
                name="irrigationSystem"
                value={formData.irrigationSystem}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Select Irrigation System</option>
                <option value="rain-fed">Rain-fed</option>
                <option value="drip-irrigation">Drip Irrigation</option>
                <option value="sprinkler">Sprinkler System</option>
                <option value="furrow">Furrow Irrigation</option>
                <option value="flood">Flood Irrigation</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Water Source
              </label>
              <select
                name="waterSource"
                value={formData.waterSource}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Select Water Source</option>
                <option value="borehole">Borehole</option>
                <option value="river">River</option>
                <option value="dam">Dam</option>
                <option value="rainwater">Rainwater Harvesting</option>
                <option value="municipal">Municipal Supply</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Storage Capacity (Tons)
              </label>
              <input
                type="number"
                name="storageCapacity"
                value={formData.storageCapacity}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="10"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buildings & Structures
              </label>
              <input
                type="text"
                name="buildingsStructures"
                value={formData.buildingsStructures}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Barn, Greenhouse, Storage shed"
              />
            </div>
          </div>
        </div>

        {/* Sustainability Section */}
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-xl border border-emerald-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TreePine className="h-5 w-5 text-emerald-600" />
            Sustainability & Practices
          </h3>
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="organicCertified"
                  checked={formData.organicCertified}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm font-medium text-gray-700">Organic Certified Farm</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sustainability Practices
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {['Composting', 'Crop Rotation', 'Cover Cropping', 'Integrated Pest Management', 'Water Conservation', 'Soil Conservation'].map((practice) => (
                  <label key={practice} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.sustainabilityPractices.includes(practice)}
                      onChange={() => handleMultiSelect('sustainabilityPractices', practice)}
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-sm text-gray-700">{practice}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 border border-transparent rounded-lg hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            <UserPlus className="h-4 w-4" />
            {isSubmitting ? "Creating Profile..." : "Create Farm Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}
