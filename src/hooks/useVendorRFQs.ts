import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { vendorRFQsService } from '@/services/modules/vendors/rfqs.service';
import { 
  RFQBrowseFilters, 
  RFQBrowseItem, 
  RFQDetailItem,
  RFQStats,
  RFQBrowseFiltersResponse,
  RFQBrowsePagination
} from '@/types/rfq-browse';

interface UseVendorRFQsReturn {
  rfqs: RFQBrowseItem[];
  stats: RFQStats | null;
  filterOptions: RFQBrowseFiltersResponse | null;
  pagination: RFQBrowsePagination | null;
  isLoading: boolean;
  error: string | null;
  filters: RFQBrowseFilters;
  setFilters: (filters: RFQBrowseFilters) => void;
  clearFilters: () => void;
  toggleSaveRFQ: (rfqId: string, isSaved: boolean) => void;
  refreshRFQs: () => void;
}

const defaultFilters: RFQBrowseFilters = {
  page: 1,
  limit: 12,
  sortBy: 'postedDate',
  sortOrder: 'desc'
};

export const useVendorRFQs = (): UseVendorRFQsReturn => {
  const [filters, setFiltersState] = useState<RFQBrowseFilters>(defaultFilters);
  const queryClient = useQueryClient();

  // Fetch RFQs with React Query
  const { 
    data: browseData, 
    isLoading: isLoadingRFQs, 
    error: rfqsError,
    refetch 
  } = useQuery({
    queryKey: ['vendor-rfqs', 'browse', filters],
    queryFn: () => vendorRFQsService.getBrowseRFQs(filters),
  });

  // Fetch stats
  const { 
    data: statsData, 
    isLoading: isLoadingStats 
  } = useQuery({
    queryKey: ['vendor-rfqs', 'stats'],
    queryFn: () => vendorRFQsService.getRFQStats(),
  });

  // Save mutation
  const saveMutation = useMutation({
    mutationFn: vendorRFQsService.saveRFQ,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendor-rfqs'] });
    },
  });

  // Unsave mutation
  const unsaveMutation = useMutation({
    mutationFn: vendorRFQsService.unsaveRFQ,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendor-rfqs'] });
    },
  });

  const setFilters = useCallback((newFilters: RFQBrowseFilters) => {
    setFiltersState(newFilters);
  }, []);

  const clearFilters = useCallback(() => {
    setFiltersState(defaultFilters);
  }, []);

  const toggleSaveRFQ = useCallback((rfqId: string, isSaved: boolean) => {
    if (isSaved) {
      unsaveMutation.mutate(rfqId);
    } else {
      saveMutation.mutate(rfqId);
    }
  }, [saveMutation, unsaveMutation]);

  const refreshRFQs = useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    rfqs: browseData?.data?.rfqs || [],
    stats: statsData?.data || null,
    filterOptions: browseData?.data?.filters || null,
    pagination: browseData?.data?.pagination || null,
    isLoading: isLoadingRFQs || isLoadingStats,
    error: rfqsError?.message || null,
    filters,
    setFilters,
    clearFilters,
    toggleSaveRFQ,
    refreshRFQs
  };
};

// Hook for single RFQ detail
export const useVendorRFQDetail = (rfqId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['vendor-rfqs', rfqId],
    queryFn: () => vendorRFQsService.getRFQDetails(rfqId),
    enabled: !!rfqId,
  });

  return { 
    rfq: data || null, 
    isLoading, 
    error: error?.message || null 
  };
};
