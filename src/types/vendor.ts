
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

// Extended vendor sidebar types
export interface StandardizedVendorData {
  companyName: string;
  specialization: string;
  initials: string;
  isVerified?: boolean;
  profileCompletion?: number;
}

export interface StandardizedMenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

// Vendor-specific menu section types
export type ServiceMenuSection = 
  | "company-info" 
  | "team-members" 
  | "services-skills" 
  | "certifications" 
  | "projects-portfolio" 
  | "payment-settings" 
  | "account-settings";

export type ProductMenuSection = 
  | "company-info" 
  | "product-catalog" 
  | "brands-partners" 
  | "certifications" 
  | "shipping-returns" 
  | "payment-settings" 
  | "account-settings";

export type LogisticsMenuSection = 
  | "company-info" 
  | "fleet-equipment" 
  | "service-areas" 
  | "licenses-permits"
  | "drivers-personnel"
  | "payment-settings"
  | "account-settings";
