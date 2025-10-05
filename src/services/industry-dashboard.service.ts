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

import apiService from './api.service';
import { apiRoutes } from './api.routes';
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
    return apiService.get<DashboardStats>(
      apiRoutes.industry.dashboard.stats
    );
  }

  /**
   * Get Procurement Analytics
   * Endpoint: GET /api/industry/dashboard/analytics
   * 
   * @param dateRange - Optional date range filter
   */
  async getProcurementAnalytics(dateRange?: DateRange): Promise<ProcurementAnalytics> {
    const params = dateRange ? {
      startDate: dateRange.startDate,
      endDate: dateRange.endDate
    } : undefined;

    return apiService.get<ProcurementAnalytics>(
      apiRoutes.industry.dashboard.analytics,
      { params }
    );
  }

  /**
   * Get Budget Overview & Utilization
   * Endpoint: GET /api/industry/dashboard/budget
   */
  async getBudgetOverview(): Promise<BudgetOverview> {
    return apiService.get<BudgetOverview>(
      apiRoutes.industry.dashboard.budget
    );
  }

  /**
   * Get Vendor Performance Rankings
   * Endpoint: GET /api/industry/dashboard/vendors/performance
   * 
   * @param limit - Number of top vendors to return (default: 5)
   */
  async getVendorPerformance(limit: number = 5): Promise<VendorPerformance[]> {
    return apiService.get<VendorPerformance[]>(
      apiRoutes.industry.dashboard.vendorPerformance,
      { params: { limit } }
    );
  }

  /**
   * Get Active Requirements
   * Endpoint: GET /api/industry/requirements?status=active
   * 
   * @param filters - Optional filters (category, date range, etc.)
   */
  async getActiveRequirements(filters?: ApiFilters): Promise<PaginatedResponse<ActiveRequirement>> {
    return apiService.get<PaginatedResponse<ActiveRequirement>>(
      apiRoutes.industry.dashboard.activeRequirements,
      { params: filters }
    );
  }

  /**
   * Get Active Purchase Orders
   * Endpoint: GET /api/industry/purchase-orders?status=active,in_progress
   * 
   * @param filters - Optional filters (status, date range, etc.)
   */
  async getActivePurchaseOrders(filters?: ApiFilters): Promise<PaginatedResponse<ActivePurchaseOrder>> {
    return apiService.get<PaginatedResponse<ActivePurchaseOrder>>(
      apiRoutes.industry.dashboard.activePurchaseOrders,
      { params: filters }
    );
  }

  /**
   * Get Pending Approvals for Current User
   * Endpoint: GET /api/industry/approvals/pending
   * 
   * @param filters - Optional filters (priority, category, etc.)
   */
  async getPendingApprovals(filters?: ApiFilters): Promise<PaginatedResponse<PendingApproval>> {
    return apiService.get<PaginatedResponse<PendingApproval>>(
      apiRoutes.industry.dashboard.pendingApprovals,
      { params: filters }
    );
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
