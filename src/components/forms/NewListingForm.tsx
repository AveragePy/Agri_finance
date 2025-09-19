"use client";

import { useState } from "react";
import {
  Package,
  DollarSign,
  Calendar,
  MapPin,
  User,
  Phone,
  Mail,
  Truck,
  Scale,
  Tag,
  Image,
  FileText,
  Save,
  X
} from "lucide-react";

interface NewListingFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function NewListingForm({ onSubmit, onCancel }: NewListingFormProps) {
  const [formData, setFormData] = useState({
    // Product Information
    productName: "",
    category: "",
    variety: "",
    description: "",

    // Pricing & Quantity
    pricePerUnit: "",
    unit: "",
    minimumQuantity: "",
    totalQuantity: "",

    // Availability
    harvestDate: "",
    availableFrom: "",
    availableTo: "",

    // Quality & Certification
    qualityGrade: "",
    organicCertified: false,
    certificationDetails: "",

    // Location & Delivery
    farmLocation: "",
    county: "",
    deliveryOptions: [],
    deliveryRadius: "",

    // Seller Information
    sellerName: "",
    contactPhone: "",
    contactEmail: "",
    farmSize: "",

    // Additional Details
    storageConditions: "",
    packagingType: "",
    specialRequirements: "",
    images: []
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleDeliveryOptionChange = (option: string) => {
    setFormData(prev => ({
      ...prev,
      deliveryOptions: prev.deliveryOptions.includes(option)
        ? prev.deliveryOptions.filter(opt => opt !== option)
        : [...prev.deliveryOptions, option]
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required fields validation
    if (!formData.productName.trim()) newErrors.productName = "Product name is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.pricePerUnit.trim()) newErrors.pricePerUnit = "Price per unit is required";
    if (!formData.unit) newErrors.unit = "Unit is required";
    if (!formData.totalQuantity.trim()) newErrors.totalQuantity = "Total quantity is required";
    if (!formData.availableFrom) newErrors.availableFrom = "Available from date is required";
    if (!formData.farmLocation.trim()) newErrors.farmLocation = "Farm location is required";
    if (!formData.county) newErrors.county = "County is required";
    if (!formData.sellerName.trim()) newErrors.sellerName = "Seller name is required";
    if (!formData.contactPhone.trim()) newErrors.contactPhone = "Contact phone is required";

    // Format validation
    const phoneRegex = /^\+254\s?\d{9}$/;
    if (formData.contactPhone && !phoneRegex.test(formData.contactPhone)) {
      newErrors.contactPhone = "Please enter a valid Kenyan phone number (+254XXXXXXXXX)";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.contactEmail && !emailRegex.test(formData.contactEmail)) {
      newErrors.contactEmail = "Please enter a valid email address";
    }

    // Numeric validation
    if (formData.pricePerUnit && isNaN(Number(formData.pricePerUnit))) {
      newErrors.pricePerUnit = "Price must be a valid number";
    }

    if (formData.totalQuantity && isNaN(Number(formData.totalQuantity))) {
      newErrors.totalQuantity = "Quantity must be a valid number";
    }

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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Product Information */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Package className="h-5 w-5 text-green-600" />
          Product Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name *
            </label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.productName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Fresh Tomatoes"
            />
            {errors.productName && <p className="text-red-500 text-xs mt-1">{errors.productName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.category ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select Category</option>
              <option value="vegetables">Vegetables</option>
              <option value="fruits">Fruits</option>
              <option value="grains">Grains & Cereals</option>
              <option value="legumes">Legumes</option>
              <option value="dairy">Dairy Products</option>
              <option value="livestock">Livestock</option>
              <option value="other">Other</option>
            </select>
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Variety/Type
            </label>
            <input
              type="text"
              name="variety"
              value={formData.variety}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="e.g., Roma, Cherry, Beefsteak"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quality Grade
            </label>
            <select
              name="qualityGrade"
              value={formData.qualityGrade}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select Grade</option>
              <option value="premium">Premium (Grade A)</option>
              <option value="standard">Standard (Grade B)</option>
              <option value="economy">Economy (Grade C)</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Describe your product, its quality, and any special features..."
          />
        </div>
      </div>

      {/* Pricing & Quantity */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-green-600" />
          Pricing & Quantity
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price per Unit (KES) *
            </label>
            <input
              type="number"
              name="pricePerUnit"
              value={formData.pricePerUnit}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.pricePerUnit ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="0.00"
              min="0"
              step="0.01"
            />
            {errors.pricePerUnit && <p className="text-red-500 text-xs mt-1">{errors.pricePerUnit}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Unit *
            </label>
            <select
              name="unit"
              value={formData.unit}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.unit ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select Unit</option>
              <option value="kg">Kilogram (kg)</option>
              <option value="bag">Bag</option>
              <option value="crate">Crate</option>
              <option value="piece">Piece</option>
              <option value="liter">Liter</option>
              <option value="tonne">Tonne</option>
            </select>
            {errors.unit && <p className="text-red-500 text-xs mt-1">{errors.unit}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Quantity Available *
            </label>
            <input
              type="number"
              name="totalQuantity"
              value={formData.totalQuantity}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.totalQuantity ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="0"
              min="0"
            />
            {errors.totalQuantity && <p className="text-red-500 text-xs mt-1">{errors.totalQuantity}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Minimum Order Quantity
            </label>
            <input
              type="number"
              name="minimumQuantity"
              value={formData.minimumQuantity}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="0"
              min="0"
            />
          </div>
        </div>
      </div>

      {/* Availability */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-green-600" />
          Availability
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Harvest Date
            </label>
            <input
              type="date"
              name="harvestDate"
              value={formData.harvestDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Available From *
            </label>
            <input
              type="date"
              name="availableFrom"
              value={formData.availableFrom}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.availableFrom ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.availableFrom && <p className="text-red-500 text-xs mt-1">{errors.availableFrom}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Available To
            </label>
            <input
              type="date"
              name="availableTo"
              value={formData.availableTo}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Location & Delivery */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-green-600" />
          Location & Delivery
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Farm Location *
            </label>
            <input
              type="text"
              name="farmLocation"
              value={formData.farmLocation}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.farmLocation ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Nakuru Town, Nakuru"
            />
            {errors.farmLocation && <p className="text-red-500 text-xs mt-1">{errors.farmLocation}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              County *
            </label>
            <select
              name="county"
              value={formData.county}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.county ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select County</option>
              <option value="nakuru">Nakuru County</option>
              <option value="kiambu">Kiambu County</option>
              <option value="meru">Meru County</option>
              <option value="nyeri">Nyeri County</option>
              <option value="murang'a">Murang'a County</option>
              <option value="other">Other</option>
            </select>
            {errors.county && <p className="text-red-500 text-xs mt-1">{errors.county}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Delivery Options
            </label>
            <div className="space-y-2">
              {['Farm Pickup', 'Local Delivery', 'Market Delivery', 'Transport Arranged'].map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.deliveryOptions.includes(option)}
                    onChange={() => handleDeliveryOptionChange(option)}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Delivery Radius (km)
            </label>
            <input
              type="number"
              name="deliveryRadius"
              value={formData.deliveryRadius}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="0"
              min="0"
            />
          </div>
        </div>
      </div>

      {/* Seller Information */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <User className="h-5 w-5 text-green-600" />
          Seller Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Seller Name *
            </label>
            <input
              type="text"
              name="sellerName"
              value={formData.sellerName}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.sellerName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Full name"
            />
            {errors.sellerName && <p className="text-red-500 text-xs mt-1">{errors.sellerName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Phone *
            </label>
            <input
              type="tel"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.contactPhone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="+254 700 123 456"
            />
            {errors.contactPhone && <p className="text-red-500 text-xs mt-1">{errors.contactPhone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Email
            </label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.contactEmail ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="email@example.com"
            />
            {errors.contactEmail && <p className="text-red-500 text-xs mt-1">{errors.contactEmail}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Farm Size (acres)
            </label>
            <input
              type="number"
              name="farmSize"
              value={formData.farmSize}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="0"
              min="0"
              step="0.1"
            />
          </div>
        </div>
      </div>

      {/* Additional Details */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5 text-green-600" />
          Additional Details
        </h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="organicCertified"
              checked={formData.organicCertified}
              onChange={handleInputChange}
              className="rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <label className="ml-2 text-sm font-medium text-gray-700">
              Organic Certified
            </label>
          </div>

          {formData.organicCertified && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Certification Details
              </label>
              <input
                type="text"
                name="certificationDetails"
                value={formData.certificationDetails}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Certification body and number"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Storage Conditions
              </label>
              <input
                type="text"
                name="storageConditions"
                value={formData.storageConditions}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., Cool, dry place"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Packaging Type
              </label>
              <input
                type="text"
                name="packagingType"
                value={formData.packagingType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., Wooden crates, plastic bags"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Special Requirements or Notes
            </label>
            <textarea
              name="specialRequirements"
              value={formData.specialRequirements}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Any special handling, payment terms, or other requirements..."
            />
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
        >
          <X size={16} />
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
        >
          <Save size={16} />
          Create Listing
        </button>
      </div>
    </form>
  );
}
