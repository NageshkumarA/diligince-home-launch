import React, { useState } from 'react';
import CustomTable from '@/components/CustomTable';
import { ColumnConfig, FilterConfig } from '@/types/table';
import AISearchBar from '@/components/shared/AISearchBar';

const WorkflowsActive = () => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const mockData = [
    {
      id: 'WF-001',
      projectName: 'Cloud Infrastructure Setup',
      vendor: 'CloudTech Solutions',
      startDate: '2024-01-25',
      expectedCompletion: '2024-03-10',
      currentPhase: 'Infrastructure Setup',
      progress: '35%',
      status: 'On Track',
      nextMilestone: 'Security Configuration'
    },
    {
      id: 'WF-002',
      projectName: 'Office Renovation',
      vendor: 'BuildRight Construction',
      startDate: '2024-01-22',
      expectedCompletion: '2024-04-15',
      currentPhase: 'Planning & Design',
      progress: '20%',
      status: 'Pending Approval',
      nextMilestone: 'Material Procurement'
    }
  ];

  const columns: ColumnConfig[] = [
    {
      name: 'id',
      label: 'Workflow ID',
      isSortable: true,
      isSearchable: true,
      action: (row) => console.log('View workflow:', row.id),
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
        { key: 'Pending Approval', value: 'Pending Approval', color: '#fef3c7' },
        { key: 'Delayed', value: 'Delayed', color: '#fee2e2' },
        { key: 'At Risk', value: 'At Risk', color: '#fed7aa' }
      ]
    },
    {
      name: 'nextMilestone',
      label: 'Next Milestone',
      isSortable: true,
      isSearchable: true
    }
  ];

  const handleFilter = (filters: FilterConfig) => {
    console.log('Applied filters:', filters);
  };

  const handleSearch = (searchTerm: string, selectedColumns: string[]) => {
    console.log('Search:', searchTerm, selectedColumns);
  };

  const handleExportXLSX = () => {
    console.log('Export XLSX');
  };

  const handleExportCSV = () => {
    console.log('Export CSV');
  };

  const handleSelectionChange = (selected: any[]) => {
    setSelectedRows(selected);
  };

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
        data={mockData}
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
          pageSize: 10,
          currentPage: 1
        }}
      />
    </div>
  );
};

export default WorkflowsActive;