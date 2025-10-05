/**
 * Industry Dashboard Data Hook
 * 
 * Custom hook for fetching and managing Industry Dashboard data
 * Handles loading states, errors, and data refresh
 */

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import industryDashboardService from '@/services/industry-dashboard.service';
import {
  DashboardStats,
  ProcurementAnalytics,
  BudgetOverview,
  VendorPerformance,
  ActiveRequirement,
  ActivePurchaseOrder,
  PendingApproval,
  DashboardResponse
} from '@/types/industry-dashboard';

interface UseDashboardState {
  stats: DashboardStats | null;
  analytics: ProcurementAnalytics | null;
  budget: BudgetOverview | null;
  vendors: VendorPerformance[];
  requirements: ActiveRequirement[];
  purchaseOrders: ActivePurchaseOrder[];
  pendingApprovals: PendingApproval[];
  isLoading: boolean;
  error: Error | null;
}

export const useIndustryDashboard = () => {
  const [state, setState] = useState<UseDashboardState>({
    stats: null,
    analytics: null,
    budget: null,
    vendors: [],
    requirements: [],
    purchaseOrders: [],
    pendingApprovals: [],
    isLoading: true,
    error: null,
  });

  const [isRefreshing, setIsRefreshing] = useState(false);

  /**
   * Fetch all dashboard data
   */
  const fetchDashboardData = useCallback(async (showToast = false) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      const data = await industryDashboardService.getAllDashboardData();

      setState({
        stats: data.stats,
        analytics: data.analytics,
        budget: data.budget,
        vendors: data.vendors,
        requirements: data.requirements,
        purchaseOrders: data.purchaseOrders,
        pendingApprovals: data.pendingApprovals,
        isLoading: false,
        error: null,
      });

      if (showToast) {
        toast.success('Dashboard updated successfully');
      }
    } catch (error: any) {
      console.error('Failed to fetch dashboard data:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error,
      }));

      toast.error('Failed to load dashboard data', {
        description: error.message || 'Please try again later',
      });
    }
  }, []);

  /**
   * Refresh dashboard data
   */
  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchDashboardData(true);
    setIsRefreshing(false);
  }, [fetchDashboardData]);

  /**
   * Fetch individual sections
   */
  const fetchStats = useCallback(async () => {
    try {
      const stats = await industryDashboardService.getDashboardStats();
      setState(prev => ({ ...prev, stats }));
    } catch (error: any) {
      console.error('Failed to fetch stats:', error);
      toast.error('Failed to load statistics');
    }
  }, []);

  const fetchAnalytics = useCallback(async () => {
    try {
      const analytics = await industryDashboardService.getProcurementAnalytics();
      setState(prev => ({ ...prev, analytics }));
    } catch (error: any) {
      console.error('Failed to fetch analytics:', error);
      toast.error('Failed to load analytics');
    }
  }, []);

  const fetchBudget = useCallback(async () => {
    try {
      const budget = await industryDashboardService.getBudgetOverview();
      setState(prev => ({ ...prev, budget }));
    } catch (error: any) {
      console.error('Failed to fetch budget:', error);
      toast.error('Failed to load budget data');
    }
  }, []);

  const fetchVendors = useCallback(async () => {
    try {
      const vendors = await industryDashboardService.getVendorPerformance();
      setState(prev => ({ ...prev, vendors }));
    } catch (error: any) {
      console.error('Failed to fetch vendors:', error);
      toast.error('Failed to load vendor performance');
    }
  }, []);

  // Initial data fetch on mount
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return {
    // Data
    stats: state.stats,
    analytics: state.analytics,
    budget: state.budget,
    vendors: state.vendors,
    requirements: state.requirements,
    purchaseOrders: state.purchaseOrders,
    pendingApprovals: state.pendingApprovals,
    
    // States
    isLoading: state.isLoading,
    isRefreshing,
    error: state.error,
    
    // Actions
    refresh,
    fetchStats,
    fetchAnalytics,
    fetchBudget,
    fetchVendors,
  };
};
