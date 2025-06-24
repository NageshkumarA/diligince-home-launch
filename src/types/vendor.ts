
// Vendor-specific type definitions

export interface VendorProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  companyName: string;
  vendorType: VendorType;
  specialization?: string[];
  location: string;
  rating: number;
  completedProjects: number;
  status: VendorStatus;
  createdAt: string;
  updatedAt: string;
}

export type VendorType = 'service' | 'product' | 'logistics';

export type VendorStatus = 'active' | 'inactive' | 'pending' | 'suspended';

export interface VendorStats {
  totalRevenue: string;
  activeProjects: number;
  completedProjects: number;
  pendingRFQs: number;
  monthlyGrowth?: number;
}

export interface VendorService {
  id: string;
  name: string;
  description: string;
  category: string;
  price?: string;
  duration?: string;
  availability: 'available' | 'busy' | 'unavailable';
}

export interface VendorProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  price: string;
  stock: number;
  images?: string[];
  specifications?: Record<string, any>;
}
