import React, { useState, useEffect } from 'react';
import CustomTable from '@/components/CustomTable';
import { ColumnConfig, FilterConfig } from '@/types/table';
import AISearchBar from '@/components/shared/AISearchBar';
import { getIndustryWorkflows } from '@/services/modules/workflows/workflow.service';
import { toast } from 'sonner';

const WorkflowsActive = () => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [workflows, setWorkflows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });
  const [filters, setFilters] = useState<any>({});

  // Fetch workflows on mount and when pagination/filters change
  useEffect(() => {
    fetchWorkflows();
  }, [pagination.page, filters]);

  const fetchWorkflows = async () => {
    try {
      setLoading(true);
      const response = await getIndustryWorkflows({
        status: filters.status,
        page: pagination.page,
        limit: pagination.limit
      });

      if (response.success) {
        // Map API response to table format
        const mappedData = response.data.workflows.map((wf: any) => ({
          id: wf.workflowId,
          projectName: wf.projectTitle,
          vendor: wf.stakeholder?.name || 'N/A',
          startDate: new Date(wf.startDate).toLocaleDateString(),
          expectedCompletion: new Date(wf.endDate).toLocaleDateString(),
          currentPhase: wf.milestones?.completed > 0
            ? `Milestone ${wf.milestones.completed}/${wf.milestones.total}`
            : 'Not Started',
          progress: `${wf.progress}%`,
          status: wf.isOverdue ? 'Delayed' : wf.status === 'active' ? 'On Track' : wf.status,
          nextMilestone: 'View Details',
          _raw: wf // Keep raw data for navigation
        }));

        setWorkflows(mappedData);
        setPagination(prev => ({
          ...prev,
          total: response.data.pagination.total,
          totalPages: response.data.pagination.totalPages
        }));
      }
    } catch (error: any) {
      console.error('Error fetching workflows:', error);
      toast.error(error.response?.data?.error?.message || 'Failed to load workflows');
      setWorkflows([]);
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnConfig[] = [
    {
      name: 'id',
      label: 'Workflow ID',
      isSortable: true,
      isSearchable: true,
      action: (row) => {
        // Navigate to workflow details
        window.location.href = `/dashboard/workflows/${row._raw?.id}`;
      },
      width: '130px'
    },
    {
      name: 'projectName',
      label: 'Project Name',
      isSortable: true,
      isSearchable: true
    },
    {
      name: 'vendor',
      label: 'Vendor',
      isSortable: true,
      isSearchable: true
    },
    {
      name: 'startDate',
      label: 'Start Date',
      isSortable: true
    },
    {
      name: 'expectedCompletion',
      label: 'Expected Completion',
      isSortable: true
    },
    {
      name: 'currentPhase',
      label: 'Current Phase',
      isSortable: true,
      isSearchable: true
    },
    {
      name: 'progress',
      label: 'Progress',
      isSortable: true,
      align: 'center'
    },
    {
      name: 'status',
      label: 'Status',
      isSortable: true,
      isFilterable: true,
      filterOptions: [
        { key: 'On Track', value: 'On Track', color: '#dcfce7' },
        { key: 'active', value: 'active', color: '#dcfce7' },
        { key: 'Pending Approval', value: 'Pending Approval', color: '#fef3c7' },
        { key: 'Delayed', value: 'Delayed', color: '#fee2e2' },
        { key: 'paused', value: 'paused', color: '#fed7aa' },
        { key: 'completed', value: 'completed', color: '#d1fae5' }
      ]
    },
    {
      name: 'nextMilestone',
      label: 'Next Milestone',
      isSortable: true,
      isSearchable: true
    }
  ];

  const handleFilter = (filterConfig: FilterConfig) => {
    console.log('Applied filters:', filterConfig);
    setFilters(filterConfig);
  };

  const handleSearch = (searchTerm: string, selectedColumns: string[]) => {
    console.log('Search:', searchTerm, selectedColumns);
    // TODO: Implement AI search using the new search endpoint
  };

  const handleExportXLSX = () => {
    console.log('Export XLSX');
    toast.info('Export feature coming soon');
  };

  const handleExportCSV = () => {
    console.log('Export CSV');
    toast.info('Export feature coming soon');
  };

  const handleSelectionChange = (selected: any[]) => {
    setSelectedRows(selected);
  };

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  if (loading && workflows.length === 0) {
    return (
      <div className="p-6 bg-background min-h-screen">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Active Project Workflows</h1>
          <p className="text-muted-foreground">
            Monitor and manage ongoing project workflows and their progress
          </p>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading workflows...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Active Project Workflows</h1>
        <p className="text-muted-foreground">
          Monitor and manage ongoing project workflows and their progress
        </p>
      </div>

      {/* AI Search Bar */}
      <AISearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search active workflows with AI..."
      />

      <CustomTable
        columns={columns}
        data={workflows}
        hideSearch
        filterCallback={handleFilter}
        searchCallback={handleSearch}
        onExport={{
          xlsx: handleExportXLSX,
          csv: handleExportCSV
        }}
        selectable={true}
        onSelectionChange={handleSelectionChange}
        globalSearchPlaceholder="Search active workflows..."
        pagination={{
          enabled: true,
          pageSize: pagination.limit,
          currentPage: pagination.page,
          totalItems: pagination.total,
          serverSide: true,
          onPageChange: handlePageChange
        }}
      />

      {workflows.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No active workflows found</p>
          <p className="text-sm text-muted-foreground mt-2">
            Workflows will appear here once a vendor accepts a purchase order
          </p>
        </div>
      )}
    </div>
  );
};

export default WorkflowsActive;