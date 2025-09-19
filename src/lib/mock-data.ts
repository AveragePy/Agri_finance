// Core Types
export type Farmer = {
  id: string;
  name: string;
  phone: string;
  location: string;
  crops: string[];
  farmSize: number; // acres
  joinDate: string;
  creditScore?: number;
  totalLoans: number;
  avatar?: string;
};

export type Advisory = {
  id: string;
  type: "crop" | "weather" | "pest" | "market";
  title: string;
  message: string;
  date: string;
  priority: "low" | "medium" | "high";
  targetCrops?: string[];
  region?: string;
};

export type ProduceListing = {
  id: string;
  farmerId: string;
  farmerName: string;
  crop: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  quality: "A" | "B" | "C";
  harvestDate: string;
  location: string;
  status: "available" | "sold" | "reserved";
  images?: string[];
};

export type Loan = {
  id: string;
  farmerId: string;
  farmerName: string;
  amount: number;
  purpose: string;
  status: "pending" | "approved" | "disbursed" | "repaid" | "overdue";
  applicationDate: string;
  approvalDate?: string;
  disbursementDate?: string;
  dueDate: string;
  interestRate: number;
  repaidAmount: number;
};

export type Supplier = {
  id: string;
  name: string;
  products: string[];
  location: string;
  rating: number;
  phone: string;
  deliveryAreas: string[];
};

export type Order = {
  id: string;
  farmerId: string;
  farmerName: string;
  supplierId: string;
  supplierName: string;
  items: { product: string; quantity: number; price: number }[];
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered";
  orderDate: string;
  deliveryDate?: string;
};

// Mock Data
export const mockFarmers: Farmer[] = [
  {
    id: "F001",
    name: "John Kamau",
    phone: "+254701234567",
    location: "Kiambu County",
    crops: ["Maize", "Beans", "Coffee"],
    farmSize: 5.2,
    joinDate: "2023-01-15",
    creditScore: 720,
    totalLoans: 2,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "F002",
    name: "Mary Wanjiku",
    phone: "+254702345678",
    location: "Nakuru County",
    crops: ["Tomatoes", "Onions", "Carrots"],
    farmSize: 3.8,
    joinDate: "2023-03-22",
    creditScore: 680,
    totalLoans: 1,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "F003",
    name: "Peter Mwangi",
    phone: "+254703456789",
    location: "Meru County",
    crops: ["Coffee", "Bananas", "Avocado"],
    farmSize: 7.5,
    joinDate: "2022-11-10",
    creditScore: 750,
    totalLoans: 3,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "F004",
    name: "Grace Akinyi",
    phone: "+254704567890",
    location: "Kisumu County",
    crops: ["Rice", "Sugarcane", "Fish"],
    farmSize: 4.2,
    joinDate: "2023-05-08",
    creditScore: 695,
    totalLoans: 1,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "F005",
    name: "Samuel Kipchoge",
    phone: "+254705678901",
    location: "Uasin Gishu County",
    crops: ["Wheat", "Barley", "Potatoes"],
    farmSize: 12.0,
    joinDate: "2022-08-14",
    creditScore: 780,
    totalLoans: 4,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  }
];

export const mockAdvisories: Advisory[] = [
  {
    id: "A001",
    type: "weather",
    title: "Heavy Rains Expected This Week",
    message: "Meteorological department forecasts heavy rains from Tuesday to Friday. Ensure proper drainage in your fields and consider delaying planting if soil becomes waterlogged.",
    date: "2024-01-15",
    priority: "high",
    region: "Central Kenya"
  },
  {
    id: "A002",
    type: "pest",
    title: "Fall Armyworm Alert - Maize Farms",
    message: "Increased fall armyworm activity reported in maize fields. Apply recommended pesticides early morning or evening. Contact extension officer for approved chemicals list.",
    date: "2024-01-14",
    priority: "high",
    targetCrops: ["Maize"]
  },
  {
    id: "A003",
    type: "crop",
    title: "Coffee Berry Disease Prevention",
    message: "Apply copper-based fungicides before flowering season. Ensure proper spacing between coffee trees for air circulation. Remove infected berries immediately.",
    date: "2024-01-13",
    priority: "medium",
    targetCrops: ["Coffee"]
  },
  {
    id: "A004",
    type: "market",
    title: "Tomato Prices Rising",
    message: "Tomato prices have increased by 25% this week due to reduced supply. Good time for tomato farmers to sell their produce.",
    date: "2024-01-12",
    priority: "medium",
    targetCrops: ["Tomatoes"]
  }
];

export const mockProduceListings: ProduceListing[] = [
  {
    id: "P001",
    farmerId: "F001",
    farmerName: "John Kamau",
    crop: "Maize",
    quantity: 500,
    unit: "kg",
    pricePerUnit: 45,
    quality: "A",
    harvestDate: "2024-01-10",
    location: "Kiambu County",
    status: "available"
  },
  {
    id: "P002",
    farmerId: "F002",
    farmerName: "Mary Wanjiku",
    crop: "Tomatoes",
    quantity: 200,
    unit: "kg",
    pricePerUnit: 80,
    quality: "A",
    harvestDate: "2024-01-12",
    location: "Nakuru County",
    status: "available"
  },
  {
    id: "P003",
    farmerId: "F003",
    farmerName: "Peter Mwangi",
    crop: "Coffee",
    quantity: 100,
    unit: "kg",
    pricePerUnit: 250,
    quality: "A",
    harvestDate: "2024-01-08",
    location: "Meru County",
    status: "sold"
  },
  {
    id: "P004",
    farmerId: "F004",
    farmerName: "Grace Akinyi",
    crop: "Rice",
    quantity: 300,
    unit: "kg",
    pricePerUnit: 120,
    quality: "B",
    harvestDate: "2024-01-11",
    location: "Kisumu County",
    status: "reserved"
  }
];

export const mockLoans: Loan[] = [
  {
    id: "L001",
    farmerId: "F001",
    farmerName: "John Kamau",
    amount: 50000,
    purpose: "Seeds and Fertilizer",
    status: "disbursed",
    applicationDate: "2024-01-01",
    approvalDate: "2024-01-03",
    disbursementDate: "2024-01-05",
    dueDate: "2024-06-05",
    interestRate: 12,
    repaidAmount: 15000
  },
  {
    id: "L002",
    farmerId: "F002",
    farmerName: "Mary Wanjiku",
    amount: 30000,
    purpose: "Greenhouse Setup",
    status: "approved",
    applicationDate: "2024-01-10",
    approvalDate: "2024-01-12",
    dueDate: "2024-07-12",
    interestRate: 10,
    repaidAmount: 0
  },
  {
    id: "L003",
    farmerId: "F005",
    farmerName: "Samuel Kipchoge",
    amount: 100000,
    purpose: "Tractor Purchase",
    status: "pending",
    applicationDate: "2024-01-14",
    dueDate: "2024-12-14",
    interestRate: 15,
    repaidAmount: 0
  }
];

export const mockSuppliers: Supplier[] = [
  {
    id: "S001",
    name: "Agro Supplies Ltd",
    products: ["Seeds", "Fertilizers", "Pesticides"],
    location: "Nairobi",
    rating: 4.5,
    phone: "+254711234567",
    deliveryAreas: ["Kiambu", "Nakuru", "Meru"]
  },
  {
    id: "S002",
    name: "Farm Tools Kenya",
    products: ["Tools", "Equipment", "Irrigation"],
    location: "Eldoret",
    rating: 4.2,
    phone: "+254722345678",
    deliveryAreas: ["Uasin Gishu", "Trans Nzoia", "Nakuru"]
  },
  {
    id: "S003",
    name: "Green Valley Inputs",
    products: ["Organic Fertilizers", "Seeds", "Bio-pesticides"],
    location: "Mombasa",
    rating: 4.7,
    phone: "+254733456789",
    deliveryAreas: ["Coast", "Eastern", "Central"]
  }
];

export const mockOrders: Order[] = [
  {
    id: "O001",
    farmerId: "F001",
    farmerName: "John Kamau",
    supplierId: "S001",
    supplierName: "Agro Supplies Ltd",
    items: [
      { product: "Maize Seeds", quantity: 10, price: 500 },
      { product: "DAP Fertilizer", quantity: 2, price: 3500 }
    ],
    total: 12000,
    status: "delivered",
    orderDate: "2024-01-05",
    deliveryDate: "2024-01-08"
  },
  {
    id: "O002",
    farmerId: "F002",
    farmerName: "Mary Wanjiku",
    supplierId: "S003",
    supplierName: "Green Valley Inputs",
    items: [
      { product: "Tomato Seeds", quantity: 5, price: 200 },
      { product: "Organic Compost", quantity: 10, price: 800 }
    ],
    total: 9000,
    status: "shipped",
    orderDate: "2024-01-12"
  }
];

// Utility functions
export const getFarmerById = (id: string) => mockFarmers.find(f => f.id === id);
export const getAdvisoriesByType = (type: Advisory["type"]) => mockAdvisories.filter(a => a.type === type);
export const getListingsByFarmer = (farmerId: string) => mockProduceListings.filter(p => p.farmerId === farmerId);
export const getLoansByFarmer = (farmerId: string) => mockLoans.filter(l => l.farmerId === farmerId);
export const getOrdersByFarmer = (farmerId: string) => mockOrders.filter(o => o.farmerId === farmerId);
