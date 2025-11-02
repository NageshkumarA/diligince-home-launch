/**
 * Industry Dashboard API Service
 * 
 * Handles all API calls for Industry Dashboard
 * Documentation: docs/api/industry/industry-dashboard-api.md
 * 
 * Endpoints:
 * - Dashboard Statistics (KPIs)
 * - Pending Approvals
 * - Procurement Analytics (Spend by Category, Monthly Trends)
 * - Budget Overview & Utilization
 * - Vendor Performance Rankings
 * - Active Requirements List
 * - Purchase Orders (Active, Pending, Completed)
 */

import apiService from '../../core/api.service';
import { dashboardRoutes } from './dashboard.routes';

// ============ MOCK DATA FALLBACKS ============

const MOCK_DASHBOARD_STATS: DashboardStats = {
  totalProcurementSpend: 2500000,
  activePurchaseOrders: 12,
  budgetUtilization: 68,
  costSavings: 45000,
  period: "Last 30 days"
};

const MOCK_PROCUREMENT_ANALYTICS: ProcurementAnalytics = {
  categories: [
    { name: "Product", amount: 850000, percentage: 34, color: "#8b5cf6" },
    { name: "Service", amount: 620000, percentage: 25, color: "#3b82f6" },
    { name: "Expert", amount: 530000, percentage: 21, color: "#10b981" },
    { name: "Logistics", amount: 500000, percentage: 20, color: "#f59e0b" }
  ],
  monthlyTrend: [
    { month: "Jul", spend: 180000 },
    { month: "Aug", spend: 220000 },
    { month: "Sep", spend: 250000 },
    { month: "Oct", spend: 280000 },
    { month: "Nov", spend: 320000 },
    { month: "Dec", spend: 350000 }
  ],
  totalSpend: 1600000
};

const MOCK_BUDGET_OVERVIEW: BudgetOverview = {
  totalAllocated: 3500000,
  totalSpent: 2380000,
  overallPercentage: 68,
  categories: [
    { category: "Product", allocated: 1200000, spent: 850000, percentage: 71 },
    { category: "Service", allocated: 900000, spent: 620000, percentage: 69 },
    { category: "Expert", allocated: 800000, spent: 530000, percentage: 66 },
    { category: "Logistics", allocated: 600000, spent: 380000, percentage: 63 }
  ]
};

const MOCK_VENDOR_PERFORMANCE: VendorPerformance[] = [
  { rank: 1, vendorId: "VEN-001", name: "TechValve Solutions", initials: "TV", category: "Product", rating: 4.9, orders: 45, onTimeDelivery: 98, color: "#8b5cf6" },
  { rank: 2, vendorId: "VEN-002", name: "EngiConsult Group", initials: "EG", category: "Expert", rating: 4.8, orders: 38, onTimeDelivery: 96, color: "#10b981" },
  { rank: 3, vendorId: "VEN-003", name: "Service Pro Maintenance", initials: "SP", category: "Service", rating: 4.7, orders: 52, onTimeDelivery: 95, color: "#3b82f6" },
  { rank: 4, vendorId: "VEN-004", name: "FastTrack Logistics", initials: "FL", category: "Logistics", rating: 4.6, orders: 67, onTimeDelivery: 94, color: "#f59e0b" },
  { rank: 5, vendorId: "VEN-005", name: "Quality Parts Co", initials: "QP", category: "Product", rating: 4.5, orders: 28, onTimeDelivery: 92, color: "#8b5cf6" }
];

const MOCK_ACTIVE_REQUIREMENTS: ActiveRequirement[] = [
  { id: "REQ-001", title: "Industrial Valve Procurement", category: "Product", status: "Active", date: "2 days ago", budget: 25000, applicants: 8 },
  { id: "REQ-002", title: "Pipeline Inspection Service", category: "Service", status: "Active", date: "1 week ago", budget: 35000, applicants: 12 },
  { id: "REQ-003", title: "Chemical Engineering Consultant", category: "Expert", status: "Active", date: "3 days ago", budget: 15000, applicants: 5 }
];

const MOCK_PURCHASE_ORDERS: ActivePurchaseOrder[] = [
  { id: "PO-2023-042", title: "Industrial Valve Set", vendor: "TechValve Solutions", summary: "3 items", status: "In Progress", progress: 65, amount: 25000, requirementId: "REQ-001" },
  { id: "PO-2023-039", title: "Safety Equipment", vendor: "ProtectWell Inc", summary: "12 items", status: "Delivered", progress: 100, amount: 15000, requirementId: "REQ-004" }
];

const MOCK_PENDING_APPROVALS: PendingApproval[] = [
  { 
    id: "approval-001", 
    requirementId: "REQ-001", 
    requirementTitle: "Industrial Valve Procurement", 
    budget: 25000, 
    priority: "high", 
    description: "Procurement of industrial valves for manufacturing line upgrade",
    category: "Product", 
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), 
    requestedDate: new Date().toISOString(),
    approverRole: "Department Head",
    approvalLevel: 1,
    isUrgent: false
  }
];
import {
  DashboardStats,
  ProcurementAnalytics,
  BudgetOverview,
  VendorPerformance,
  ActiveRequirement,
  ActivePurchaseOrder,
  PendingApproval,
  ApiFilters,
  DateRange,
  DashboardResponse,
  PaginatedResponse
} from '@/types/industry-dashboard';

class IndustryDashboardService {
  /**
   * Get Dashboard Statistics (KPIs)
   * Endpoint: GET /api/industry/dashboard/stats
   */
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      return await apiService.get<DashboardStats>(
        dashboardRoutes.stats
      );
    } catch (error) {
      console.warn('⚠️ Using mock data for dashboard stats - API not available:', error);
      return MOCK_DASHBOARD_STATS;
    }
  }

  /**
   * Get Procurement Analytics
   * Endpoint: GET /api/industry/dashboard/analytics
   * 
   * @param dateRange - Optional date range filter
   */
  async getProcurementAnalytics(dateRange?: DateRange): Promise<ProcurementAnalytics> {
    try {
      const params = dateRange ? {
        startDate: dateRange.startDate,
        endDate: dateRange.endDate
      } : undefined;

      return await apiService.get<ProcurementAnalytics>(
        dashboardRoutes.analytics,
        { params }
      );
    } catch (error) {
      console.warn('⚠️ Using mock data for procurement analytics - API not available:', error);
      return MOCK_PROCUREMENT_ANALYTICS;
    }
  }

  /**
   * Get Budget Overview & Utilization
   * Endpoint: GET /api/industry/dashboard/budget
   */
  async getBudgetOverview(): Promise<BudgetOverview> {
    try {
      return await apiService.get<BudgetOverview>(
        dashboardRoutes.budget
      );
    } catch (error) {
      console.warn('⚠️ Using mock data for budget overview - API not available:', error);
      return MOCK_BUDGET_OVERVIEW;
    }
  }

  /**
   * Get Vendor Performance Rankings
   * Endpoint: GET /api/industry/dashboard/vendors/performance
   * 
   * @param limit - Number of top vendors to return (default: 5)
   */
  async getVendorPerformance(limit: number = 5): Promise<VendorPerformance[]> {
    try {
      return await apiService.get<VendorPerformance[]>(
        dashboardRoutes.vendorPerformance,
        { params: { limit } }
      );
    } catch (error) {
      console.warn('⚠️ Using mock data for vendor performance - API not available:', error);
      return MOCK_VENDOR_PERFORMANCE.slice(0, limit);
    }
  }

  /**
   * Get Active Requirements
   * Endpoint: GET /api/industry/requirements?status=active
   * 
   * @param filters - Optional filters (category, date range, etc.)
   */
  async getActiveRequirements(filters?: ApiFilters): Promise<PaginatedResponse<ActiveRequirement>> {
    try {
      return await apiService.get<PaginatedResponse<ActiveRequirement>>(
        dashboardRoutes.activeRequirements,
        { params: filters }
      );
    } catch (error) {
      console.warn('⚠️ Using mock data for active requirements - API not available:', error);
      return {
        data: MOCK_ACTIVE_REQUIREMENTS,
        total: MOCK_ACTIVE_REQUIREMENTS.length,
        page: 1,
        pageSize: 10,
        hasMore: false
      };
    }
  }

  /**
   * Get Active Purchase Orders
   * Endpoint: GET /api/industry/purchase-orders?status=active,in_progress
   * 
   * @param filters - Optional filters (status, date range, etc.)
   */
  async getActivePurchaseOrders(filters?: ApiFilters): Promise<PaginatedResponse<ActivePurchaseOrder>> {
    try {
      return await apiService.get<PaginatedResponse<ActivePurchaseOrder>>(
        dashboardRoutes.activePurchaseOrders,
        { params: filters }
      );
    } catch (error) {
      console.warn('⚠️ Using mock data for active purchase orders - API not available:', error);
      return {
        data: MOCK_PURCHASE_ORDERS,
        total: MOCK_PURCHASE_ORDERS.length,
        page: 1,
        pageSize: 10,
        hasMore: false
      };
    }
  }

  /**
   * Get Pending Approvals for Current User
   * Endpoint: GET /api/industry/approvals/pending
   * 
   * @param filters - Optional filters (priority, category, etc.)
   */
  async getPendingApprovals(filters?: ApiFilters): Promise<PaginatedResponse<PendingApproval>> {
    try {
      return await apiService.get<PaginatedResponse<PendingApproval>>(
        dashboardRoutes.pendingApprovals,
        { params: filters }
      );
    } catch (error) {
      console.warn('⚠️ Using mock data for pending approvals - API not available:', error);
      return {
        data: MOCK_PENDING_APPROVALS,
        total: MOCK_PENDING_APPROVALS.length,
        page: 1,
        pageSize: 10,
        hasMore: false
      };
    }
  }

  /**
   * Get All Dashboard Data in Single Request
   * Fetches all dashboard sections
   * 
   * NOTE: This is a convenience method that makes multiple API calls
   * Consider creating a dedicated backend endpoint for better performance
   */
  async getAllDashboardData(): Promise<DashboardResponse> {
    const [
      stats,
      analytics,
      budget,
      vendors,
      requirements,
      purchaseOrders,
      pendingApprovals
    ] = await Promise.all([
      this.getDashboardStats(),
      this.getProcurementAnalytics(),
      this.getBudgetOverview(),
      this.getVendorPerformance(5),
      this.getActiveRequirements({ limit: 10 }),
      this.getActivePurchaseOrders({ limit: 10 }),
      this.getPendingApprovals({ limit: 10 })
    ]);

    return {
      stats,
      analytics,
      budget,
      vendors,
      requirements: requirements.data,
      purchaseOrders: purchaseOrders.data,
      pendingApprovals: pendingApprovals.data
    };
  }
}

export default new IndustryDashboardService();
