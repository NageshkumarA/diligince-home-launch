import React, { useState } from 'react';
import CustomTable from '@/components/CustomTable';
import { ColumnConfig, FilterConfig } from '@/types/table';

const OpportunitiesApplications = () => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const mockData = [
    {
      id: 'REQ-005',
      title: 'Digital Marketing Platform',
      company: 'MarketPro Inc.',
      appliedDate: '2024-01-22',
      proposalAmount: '$78,000',
      estimatedDuration: '3 months',
      status: 'Under Review',
      lastUpdate: '2024-01-26'
    },
    {
      id: 'REQ-006',
      title: 'Warehouse Management System',
      company: 'LogisticsCorp',
      appliedDate: '2024-01-20',
      proposalAmount: '$92,000',
      estimatedDuration: '4 months',
      status: 'Shortlisted',
      lastUpdate: '2024-01-25'
    }
  ];

  const columns: ColumnConfig[] = [
    {
      name: 'id',
      label: 'Opportunity ID',
      isSortable: true,
      isSearchable: true,
      action: (row) => console.log('View application:', row.id),
      width: '150px'
    },
    {
      name: 'title',
      label: 'Title',
      isSortable: true,
      isSearchable: true
    },
    {
      name: 'company',
      label: 'Company',
      isSortable: true,
      isSearchable: true
    },
    {
      name: 'appliedDate',
      label: 'Applied Date',
      isSortable: true
    },
    {
      name: 'proposalAmount',
      label: 'Proposal Amount',
      isSortable: true,
      align: 'right'
    },
    {
      name: 'estimatedDuration',
      label: 'Duration',
      isSortable: true,
      align: 'center'
    },
    {
      name: 'status',
      label: 'Status',
      isSortable: true,
      isFilterable: true,
      filterOptions: [
        { key: 'Under Review', value: 'Under Review', color: '#fef3c7' },
        { key: 'Shortlisted', value: 'Shortlisted', color: '#bfdbfe' },
        { key: 'Interview Scheduled', value: 'Interview Scheduled', color: '#ddd6fe' },
        { key: 'Rejected', value: 'Rejected', color: '#fee2e2' }
      ]
    },
    {
      name: 'lastUpdate',
      label: 'Last Update',
      isSortable: true
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
        <h1 className="text-3xl font-bold text-foreground mb-2">My Applications</h1>
        <p className="text-muted-foreground">
          Track the status of your job applications and proposals
        </p>
      </div>

      <CustomTable
        columns={columns}
        data={mockData}
        filterCallback={handleFilter}
        searchCallback={handleSearch}
        onExport={{
          xlsx: handleExportXLSX,
          csv: handleExportCSV
        }}
        selectable={true}
        onSelectionChange={handleSelectionChange}
        globalSearchPlaceholder="Search applications..."
        pagination={{
          enabled: true,
          pageSize: 10,
          currentPage: 1
        }}
      />
    </div>
  );
};

export default OpportunitiesApplications;