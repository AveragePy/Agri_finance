"use client";

import { useState } from "react";
import { mockSuppliers, mockOrders, type Supplier, type Order } from "@/lib/mock-data";
import { Truck, Package, MapPin, Star, Phone, Clock, CheckCircle, AlertCircle, Plus, Search } from "lucide-react";
import Modal from "@/components/common/Modal";
import NewSupplierForm from "@/components/forms/NewSupplierForm";
import NewOrderForm from "@/components/forms/NewOrderForm";

const statusColors = {
  pending: "text-amber-600 bg-amber-50 border-amber-200",
  confirmed: "text-blue-600 bg-blue-50 border-blue-200",
  shipped: "text-purple-600 bg-purple-50 border-purple-200",
  delivered: "text-green-600 bg-green-50 border-green-200"
};

export default function SupplierDistributionDashboard() {
  const [selectedTab, setSelectedTab] = useState<"suppliers" | "orders">("suppliers");
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const filteredSuppliers = mockSuppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.products.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredOrders = mockOrders.filter(order =>
    order.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.items.some(item => item.product.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const stats = {
    totalSuppliers: mockSuppliers.length,
    activeOrders: mockOrders.filter(o => o.status !== "delivered").length,
    totalOrderValue: mockOrders.reduce((sum, o) => sum + o.total, 0),
    avgRating: mockSuppliers.reduce((sum, s) => sum + s.rating, 0) / mockSuppliers.length
  };

  const handleSupplierSubmit = (data: any) => {
    console.log("New supplier data:", data);
    setIsSupplierModalOpen(false);
    // Here you would typically send the data to your backend
  };

  const handleOrderSubmit = (data: any) => {
    console.log("New order data:", data);
    setIsOrderModalOpen(false);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-lg border p-4 bg-card">
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium">Total Suppliers</span>
          </div>
          <div className="text-2xl font-bold mt-1">{stats.totalSuppliers}</div>
        </div>
        <div className="rounded-lg border p-4 bg-card">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-amber-600" />
            <span className="text-sm font-medium">Active Orders</span>
          </div>
          <div className="text-2xl font-bold mt-1">{stats.activeOrders}</div>
        </div>
        <div className="rounded-lg border p-4 bg-card">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium">Order Value</span>
          </div>
          <div className="text-2xl font-bold mt-1">UGX {stats.totalOrderValue.toLocaleString()}</div>
        </div>
        <div className="rounded-lg border p-4 bg-card">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium">Avg Rating</span>
          </div>
          <div className="text-2xl font-bold mt-1">{stats.avgRating.toFixed(1)}</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSelectedTab("suppliers")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedTab === "suppliers"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Suppliers
          </button>
          <button
            onClick={() => setSelectedTab("orders")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedTab === "orders"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Orders
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={`Search ${selectedTab}...`}
              className="pl-9 pr-4 py-2 border rounded-lg text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => selectedTab === "suppliers" ? setIsSupplierModalOpen(true) : setIsOrderModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm"
          >
            <Plus className="h-4 w-4" />
            {selectedTab === "suppliers" ? "Add Supplier" : "New Order"}
          </button>
        </div>
      </div>

      {/* Suppliers Tab */}
      {selectedTab === "suppliers" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSuppliers.map((supplier) => (
            <div
              key={supplier.id}
              className="rounded-lg border p-4 bg-card hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedSupplier(supplier)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-medium text-lg">{supplier.name}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{supplier.rating}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{supplier.location}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div>
                  <span className="text-sm font-medium">Products:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {supplier.products.slice(0, 3).map((product) => (
                      <span key={product} className="px-2 py-1 bg-muted rounded text-xs">
                        {product}
                      </span>
                    ))}
                    {supplier.products.length > 3 && (
                      <span className="px-2 py-1 bg-muted rounded text-xs">
                        +{supplier.products.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium">Delivery Areas:</span>
                  <p className="text-sm text-muted-foreground">
                    {supplier.deliveryAreas.join(", ")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-3 w-3" />
                <span>{supplier.phone}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Orders Tab */}
      {selectedTab === "orders" && (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="rounded-lg border p-4 bg-card hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedOrder(order)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-medium">{order.farmerName}</h3>
                  <p className="text-sm text-muted-foreground">Order #{order.id}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs border ${statusColors[order.status]}`}>
                  {order.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <span className="text-sm text-muted-foreground">Supplier:</span>
                  <p className="font-medium">{order.supplierName}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Total Value:</span>
                  <p className="font-bold text-primary">UGX {order.total.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Order Date:</span>
                  <p>{order.orderDate}</p>
                </div>
              </div>

              <div className="mb-3">
                <span className="text-sm font-medium">Items:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {order.items.map((item, index) => (
                    <span key={index} className="px-2 py-1 bg-muted rounded text-xs">
                      {item.product} x{item.quantity}
                    </span>
                  ))}
                </div>
              </div>

              {order.deliveryDate && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-3 w-3" />
                  <span>Delivered: {order.deliveryDate}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Supplier Detail Modal */}
      {selectedSupplier && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg p-6 max-w-lg w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Supplier Details</h3>
              <button
                onClick={() => setSelectedSupplier(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-lg">{selectedSupplier.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{selectedSupplier.rating}</span>
                  <span className="text-sm text-muted-foreground">rating</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium">Location:</span>
                  <p>{selectedSupplier.location}</p>
                </div>
                <div>
                  <span className="text-sm font-medium">Phone:</span>
                  <p>{selectedSupplier.phone}</p>
                </div>
              </div>

              <div>
                <span className="text-sm font-medium">Products:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedSupplier.products.map((product) => (
                    <span key={product} className="px-2 py-1 bg-muted rounded text-sm">
                      {product}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-sm font-medium">Delivery Areas:</span>
                <p className="text-sm text-muted-foreground">
                  {selectedSupplier.deliveryAreas.join(", ")}
                </p>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setSelectedSupplier(null)}
                className="flex-1 px-4 py-2 border rounded-lg text-sm"
              >
                Close
              </button>
              <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm">
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg p-6 max-w-lg w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Order Details</h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Order #{selectedOrder.id}</h4>
                  <p className="text-sm text-muted-foreground">{selectedOrder.farmerName}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${statusColors[selectedOrder.status]}`}>
                  {selectedOrder.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium">Supplier:</span>
                  <p>{selectedOrder.supplierName}</p>
                </div>
                <div>
                  <span className="text-sm font-medium">Total:</span>
                  <p className="font-bold text-primary">UGX {selectedOrder.total.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-sm font-medium">Order Date:</span>
                  <p>{selectedOrder.orderDate}</p>
                </div>
                {selectedOrder.deliveryDate && (
                  <div>
                    <span className="text-sm font-medium">Delivery Date:</span>
                    <p>{selectedOrder.deliveryDate}</p>
                  </div>
                )}
              </div>

              <div>
                <span className="text-sm font-medium">Items:</span>
                <div className="space-y-2 mt-2">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-muted rounded">
                      <span className="text-sm">{item.product}</span>
                      <div className="text-sm">
                        <span>Qty: {item.quantity}</span>
                        <span className="ml-2 font-medium">UGX {(item.quantity * item.price).toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setSelectedOrder(null)}
                className="flex-1 px-4 py-2 border rounded-lg text-sm"
              >
                Close
              </button>
              {selectedOrder.status === "pending" && (
                <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm">
                  Confirm Order
                </button>
              )}
              {selectedOrder.status === "confirmed" && (
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
                  Ship Order
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* New Supplier Modal */}
      <Modal
        isOpen={isSupplierModalOpen}
        onClose={() => setIsSupplierModalOpen(false)}
        title="Add New Supplier"
        maxWidth="max-w-4xl"
      >
        <NewSupplierForm
          onSubmit={handleSupplierSubmit}
          onCancel={() => setIsSupplierModalOpen(false)}
        />
      </Modal>

      {/* New Order Modal */}
      <Modal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        title="Create New Order"
        maxWidth="max-w-4xl"
      >
        <NewOrderForm
          onSubmit={handleOrderSubmit}
          onCancel={() => setIsOrderModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
