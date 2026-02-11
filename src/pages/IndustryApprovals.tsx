import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CustomTable, { ColumnConfig, FilterConfig } from '@/components/CustomTable';
import AISearchBar from '@/components/shared/AISearchBar';

const IndustryApprovals = () => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const mockData = [
    {
      id: 'APR001',
      type: 'Purchase Order',
      requestedBy: 'John Smith',
      department: 'Procurement',
      amount: '$45,000',
      status: 'Pending Review',
      submittedDate: '2024-01-15',
      priority: 'High',
      description: 'Industrial equipment purchase for manufacturing unit'
    },
    {
      id: 'APR002',
      type: 'Vendor Approval',
      requestedBy: 'Sarah Johnson',
      department: 'Vendor Management',
      amount: '$12,500',
      status: 'Approved',
      submittedDate: '2024-01-14',
      priority: 'Medium',
      description: 'New vendor registration for logistics services'
    },
    {
      id: 'APR003',
      type: 'Contract Renewal',
      requestedBy: 'Mike Wilson',
      department: 'Operations',
      amount: '$85,000',
      status: 'Rejected',
      submittedDate: '2024-01-12',
      priority: 'Low',
      description: 'Annual maintenance contract renewal'
    },
    {
      id: 'APR004',
      type: 'Budget Approval',
      requestedBy: 'Emily Davis',
      department: 'Finance',
      amount: '$120,000',
      status: 'In Progress',
      submittedDate: '2024-01-10',
      priority: 'High',
      description: 'Q2 budget allocation for new project'
    }
  ];

  const columns: ColumnConfig[] = [
    {
      name: 'id',
      label: 'Approval ID',
      isSortable: true,
      isSearchable: true,
      action: (row) => {
        alert(`View approval details for ${row.id}`);
      },
      width: '32',
    },
    {
      name: 'type',
      label: 'Type',
      isSortable: true,
      isSearchable: true,
      isFilterable: true,
      filterOptions: [
        { key: 'Purchase Order', value: 'Purchase Order' },
        { key: 'Vendor Approval', value: 'Vendor Approval' },
        { key: 'Contract Renewal', value: 'Contract Renewal' },
        { key: 'Budget Approval', value: 'Budget Approval' }
      ],
    },
    {
      name: 'requestedBy',
      label: 'Requested By',
      isSortable: true,
      isSearchable: true,
    },
    {
      name: 'department',
      label: 'Department',
      isSortable: true,
      isSearchable: true,
      isFilterable: true,
      filterOptions: [
        { key: 'Procurement', value: 'Procurement' },
        { key: 'Vendor Management', value: 'Vendor Management' },
        { key: 'Operations', value: 'Operations' },
        { key: 'Finance', value: 'Finance' }
      ],
    },
    {
      name: 'amount',
      label: 'Amount',
      isSortable: true,
      align: 'right',
    },
    {
      name: 'status',
      label: 'Status',
      isSortable: true,
      isFilterable: true,
      filterOptions: [
        { key: 'Pending Review', value: 'Pending Review', color: '#fef3c7' },
        { key: 'Approved', value: 'Approved', color: '#dcfce7' },
        { key: 'Rejected', value: 'Rejected', color: '#fecaca' },
        { key: 'In Progress', value: 'In Progress', color: '#ddd6fe' }
      ],
    },
    {
      name: 'submittedDate',
      label: 'Submitted Date',
      isSortable: true,
    },
    {
      name: 'priority',
      label: 'Priority',
      isSortable: true,
      isFilterable: true,
      filterOptions: [
        { key: 'High', value: 'High', color: '#fecaca' },
        { key: 'Medium', value: 'Medium', color: '#fef3c7' },
        { key: 'Low', value: 'Low', color: '#dcfce7' }
      ],
    }
  ];

  const handleFilterCallback = (filters: FilterConfig) => {
    console.log('Applied filters:', filters);
  };

  const handleSearchCallback = (searchTerm: string, selectedColumns: string[]) => {
    console.log('Search term:', searchTerm, 'Selected columns:', selectedColumns);
  };

  const handleExportXLSX = () => {
    console.log('Exporting approvals to XLSX...');
  };

  const handleExportCSV = () => {
    console.log('Exporting approvals to CSV...');
  };

  const handleAdd = () => {
    console.log('Creating new approval request...');
  };

  const handleRowClick = (row: any) => {
    console.log('Row clicked:', row);
  };

  const handleSelectionChange = (selected: any[]) => {
    setSelectedRows(selected);
    console.log('Selection changed:', selected);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Approvals</h1>
          <p className="text-muted-foreground">Manage approval requests and workflow processes</p>
        </div>
      </div>

      {/* AI Search Bar */}
      <AISearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search approvals with AI..."
      />

      <CustomTable
        columns={columns}
        data={mockData}
        hideSearch
        filterCallback={handleFilterCallback}
        searchCallback={handleSearchCallback}
        onRowClick={handleRowClick}
        onExport={{
          xlsx: handleExportXLSX,
          csv: handleExportCSV,
        }}
        onAdd={handleAdd}
        selectable={true}
        onSelectionChange={handleSelectionChange}
        globalSearchPlaceholder="Search approvals..."
        pagination={{
          enabled: true,
          pageSize: 10,
          currentPage: 1,
        }}
      />
    </div>
  );
};

export default IndustryApprovals;