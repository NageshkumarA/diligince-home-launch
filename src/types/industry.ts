
// Industry-specific type definitions

export interface IndustryProfile {
  id: string;
  companyName: string;
  industry: IndustryType;
  email: string;
  phone: string;
  location: string;
  establishedYear: number;
  employeeCount: string;
  annualRevenue?: string;
  description?: string;
  requirements: Requirement[];
  vendors: string[];
  status: IndustryStatus;
  createdAt: string;
  updatedAt: string;
}

export type IndustryType = 
  | 'manufacturing'
  | 'automotive'
  | 'chemical'
  | 'pharmaceutical'
  | 'textiles'
  | 'steel'
  | 'electronics'
  | 'food-processing'
  | 'other';

export type IndustryStatus = 'active' | 'inactive' | 'pending-verification';

export interface Requirement {
  id: string;
  title: string;
  description: string;
  category: RequirementCategory;
  priority: Priority;
  deadline: string;
  budget?: string;
  status: RequirementStatus;
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
}

export type RequirementCategory = 'service' | 'product' | 'logistics' | 'professional';

export type RequirementStatus = 'draft' | 'published' | 'in-review' | 'awarded' | 'completed' | 'cancelled';

export type Priority = 'low' | 'medium' | 'high' | 'urgent';
