import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import RFQBrowseCard from '@/components/vendor/shared/RFQBrowseCard';
import RFQFiltersComponent from '@/components/vendor/shared/RFQFilters';
import RFQStatsCards from '@/components/vendor/shared/RFQStatsCards';
import { useVendorRFQs } from '@/hooks/useVendorRFQs';
import { RFQBrowseItem } from '@/types/rfq-browse';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const VendorRFQsBrowse = () => {
  const navigate = useNavigate();
  const {
    rfqs,
    stats,
    filterOptions,
    pagination,
    isLoading,
    filters,
    setFilters,
    clearFilters,
    toggleSaveRFQ,
    refreshRFQs
  } = useVendorRFQs();

  const handleViewDetails = (rfq: RFQBrowseItem) => {
    navigate(`/dashboard/rfqs/${rfq.id}`);
  };

  const handleSubmitQuote = (rfq: RFQBrowseItem) => {
    if (rfq.hasApplied) {
      toast.info('You have already submitted a quote for this RFQ');
      return;
    }
    navigate(`/dashboard/vendor-submit-quotation?rfqId=${rfq.id}`);
  };

  const handleToggleSave = (rfq: RFQBrowseItem) => {
    toggleSaveRFQ(rfq.id);
    toast.success(rfq.isSaved ? 'RFQ removed from saved' : 'RFQ saved successfully');
  };

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="p-6 bg-background min-h-screen space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Browse RFQs</h1>
          <p className="text-muted-foreground">
            Find and apply to new business opportunities matching your services
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={refreshRFQs}
          className="self-start"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <RFQStatsCards stats={stats} isLoading={isLoading && !rfqs.length} />

      {/* Filters */}
      <RFQFiltersComponent
        filters={filters}
        filterOptions={filterOptions || undefined}
        onFilterChange={setFilters}
        onClearFilters={clearFilters}
      />

      {/* Results count */}
      {pagination && (
        <div className="text-sm text-muted-foreground">
          Showing {rfqs.length} of {pagination.total} RFQs
        </div>
      )}

      {/* RFQ Cards Grid */}
      {isLoading && !rfqs.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4 p-5 border rounded-lg">
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-12" />
              </div>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-16 w-full" />
              <div className="grid grid-cols-2 gap-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
              <Skeleton className="h-12 w-full" />
              <div className="flex gap-2">
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : rfqs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <RefreshCw className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No RFQs Found
          </h3>
          <p className="text-muted-foreground max-w-md mb-4">
            No RFQs match your current filters. Try adjusting your search criteria or clearing filters.
          </p>
          <Button variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rfqs.map((rfq) => (
            <RFQBrowseCard
              key={rfq.id}
              rfq={rfq}
              onViewDetails={handleViewDetails}
              onSubmitQuote={handleSubmitQuote}
              onToggleSave={handleToggleSave}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={!pagination.hasPreviousPage}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>
          <div className="flex items-center gap-1">
            {[...Array(pagination.totalPages)].map((_, i) => (
              <Button
                key={i}
                variant={pagination.page === i + 1 ? 'default' : 'outline'}
                size="sm"
                className="w-8 h-8 p-0"
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={!pagination.hasNextPage}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default VendorRFQsBrowse;
