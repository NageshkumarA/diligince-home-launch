/**
 * Industry Dashboard Type Definitions
 * 
 * Based on API Documentation: docs/api/industry/industry-dashboard-api.md
 */

// Dashboard Statistics (KPIs)
export interface DashboardStats {
  totalProcurementSpend: number;
  activePurchaseOrders: number;
  budgetUtilization: number;
  costSavings: number;
  period: string; // e.g., "Q1 2024", "This Quarter"
}

// Procurement Analytics
export interface CategorySpend {
  name: string; // 'Products', 'Services', 'Logistics', 'Expert Consultation'
  amount: number;
  percentage: number;
  color: string;
}

export interface MonthlyTrend {
  month: string;
  spend: number;
}

export interface ProcurementAnalytics {
  totalSpend: number;
  categories: CategorySpend[];
  monthlyTrend: MonthlyTrend[];
}

// Budget Data
export interface BudgetCategory {
  category: string;
  allocated: number;
  spent: number;
  percentage: number;
}

export interface BudgetOverview {
  totalAllocated: number;
  totalSpent: number;
  overallPercentage: number;
  categories: BudgetCategory[];
}

// Vendor Performance
export interface VendorPerformance {
  rank: number;
  vendorId: string;
  name: string;
  initials: string;
  category: 'Product' | 'Service' | 'Logistics' | 'Expert';
  rating: number;
  orders: number;
  onTimeDelivery: number; // percentage
  color: string;
}

// Active Requirements
export interface ActiveRequirement {
  id: string;
  title: string;
  category: 'Product' | 'Service' | 'Expert' | 'Logistics';
  status: 'Active' | 'Completed' | 'Approved' | 'Pending';
  date: string;
  budget: number;
  applicants: number;
}

// Active Purchase Orders
export interface ActivePurchaseOrder {
  id: string;
  title: string;
  vendor: string;
  summary: string;
  status: 'In Progress' | 'Delivered' | 'Pending' | 'Completed';
  progress: number;
  amount: number;
  requirementId: string;
}

// Pending Approvals
export interface PendingApproval {
  id: string;
  requirementId: string;
  requirementTitle: string;
  budget: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  category: 'Product' | 'Service' | 'Expert' | 'Logistics';
  deadline: string;
  requestedDate: string;
  approverRole: string;
  approvalLevel: number;
  isUrgent: boolean;
}

// API Filters
export interface ApiFilters {
  status?: string;
  category?: string;
  dateFrom?: string;
  dateTo?: string;
  limit?: number;
  offset?: number;
}

export interface DateRange {
  startDate: string;
  endDate: string;
}

// API Response Types
export interface DashboardResponse {
  stats: DashboardStats;
  analytics: ProcurementAnalytics;
  budget: BudgetOverview;
  vendors: VendorPerformance[];
  requirements: ActiveRequirement[];
  purchaseOrders: ActivePurchaseOrder[];
  pendingApprovals: PendingApproval[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
