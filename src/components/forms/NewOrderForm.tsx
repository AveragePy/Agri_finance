"use client";

import { useState } from "react";
import { Package, User, Calendar, MapPin, Plus, Minus } from "lucide-react";

interface OrderItem {
  product: string;
  quantity: number;
  price: number;
}

interface NewOrderFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function NewOrderForm({ onSubmit, onCancel }: NewOrderFormProps) {
  const [formData, setFormData] = useState({
    farmerName: "",
    farmerId: "",
    supplierName: "",
    deliveryAddress: "",
    deliveryDate: "",
    notes: "",
    paymentMethod: "cash_on_delivery"
  });

  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    { product: "", quantity: 1, price: 0 }
  ]);

  // Mock suppliers for demo
  const suppliers = [
    "AgriSupply Kenya Ltd",
    "Farm Inputs Co.",
    "Green Valley Supplies",
    "Harvest Solutions",
    "Rural Agro Services"
  ];

  // Mock products for demo
  const products = [
    "Maize Seeds (1kg)",
    "Bean Seeds (1kg)",
    "NPK Fertilizer (50kg)",
    "DAP Fertilizer (50kg)",
    "Pesticide (1L)",
    "Herbicide (1L)",
    "Farm Tools Set",
    "Irrigation Pipes (10m)"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const total = orderItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    onSubmit({
      ...formData,
      items: orderItems.filter(item => item.product && item.quantity > 0),
      total,
      orderDate: new Date().toISOString().split('T')[0],
      status: "pending"
    });
  };

  const addOrderItem = () => {
    setOrderItems([...orderItems, { product: "", quantity: 1, price: 0 }]);
  };

  const removeOrderItem = (index: number) => {
    if (orderItems.length > 1) {
      setOrderItems(orderItems.filter((_, i) => i !== index));
    }
  };

  const updateOrderItem = (index: number, field: keyof OrderItem, value: string | number) => {
    const updatedItems = [...orderItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setOrderItems(updatedItems);
  };

  const getTotalAmount = () => {
    return orderItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Order Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Package className="h-5 w-5 text-blue-600" />
          Order Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <User className="inline h-4 w-4 mr-1" />
              Farmer Name *
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.farmerName}
              onChange={(e) => setFormData(prev => ({ ...prev, farmerName: e.target.value }))}
              placeholder="Enter farmer name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Farmer ID
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.farmerId}
              onChange={(e) => setFormData(prev => ({ ...prev, farmerId: e.target.value }))}
              placeholder="F001234"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Supplier *
            </label>
            <select
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.supplierName}
              onChange={(e) => setFormData(prev => ({ ...prev, supplierName: e.target.value }))}
            >
              <option value="">Select a supplier</option>
              {suppliers.map((supplier) => (
                <option key={supplier} value={supplier}>
                  {supplier}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Calendar className="inline h-4 w-4 mr-1" />
              Delivery Date *
            </label>
            <input
              type="date"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.deliveryDate}
              onChange={(e) => setFormData(prev => ({ ...prev, deliveryDate: e.target.value }))}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <MapPin className="inline h-4 w-4 mr-1" />
            Delivery Address *
          </label>
          <textarea
            required
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.deliveryAddress}
            onChange={(e) => setFormData(prev => ({ ...prev, deliveryAddress: e.target.value }))}
            placeholder="Enter complete delivery address"
          />
        </div>
      </div>

      {/* Order Items */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Order Items</h3>
          <button
            type="button"
            onClick={addOrderItem}
            className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Add Item
          </button>
        </div>

        <div className="space-y-3">
          {orderItems.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-3 p-3 border border-gray-200 rounded-lg">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product *
                </label>
                <select
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  value={item.product}
                  onChange={(e) => updateOrderItem(index, 'product', e.target.value)}
                >
                  <option value="">Select product</option>
                  {products.map((product) => (
                    <option key={product} value={product}>
                      {product}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  value={item.quantity}
                  onChange={(e) => updateOrderItem(index, 'quantity', parseInt(e.target.value) || 1)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit Price (UGX) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  value={item.price}
                  onChange={(e) => updateOrderItem(index, 'price', parseFloat(e.target.value) || 0)}
                />
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => removeOrderItem(index)}
                  disabled={orderItems.length === 1}
                  className="w-full px-3 py-2 text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="h-4 w-4 mx-auto" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
            <span className="text-xl font-bold text-blue-600">
              UGX {getTotalAmount().toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Payment and Additional Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Payment & Notes</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Payment Method
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.paymentMethod}
            onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value }))}
          >
            <option value="cash_on_delivery">Cash on Delivery</option>
            <option value="mobile_money">Mobile Money</option>
            <option value="bank_transfer">Bank Transfer</option>
            <option value="credit_terms">Credit Terms</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Special Instructions / Notes
          </label>
          <textarea
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            placeholder="Any special delivery instructions or notes"
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex gap-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Place Order
        </button>
      </div>
    </form>
  );
}
