import React, { useState } from 'react';
import CustomTable from '@/components/CustomTable';
import { ColumnConfig, FilterConfig } from '@/types/table';

const PurchaseOrdersInProgress = () => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const mockData = [
    {
      id: 'PO-003',
      requirementId: 'REQ-003',
      vendorName: 'CloudTech Solutions',
      orderValue: '$75,000',
      approvedDate: '2024-01-20',
      startDate: '2024-01-25',
      expectedDelivery: '2024-03-10',
      progress: '35%',
      status: 'In Progress'
    },
    {
      id: 'PO-004',
      requirementId: 'REQ-004',
      vendorName: 'BuildRight Construction',
      orderValue: '$120,000',
      approvedDate: '2024-01-18',
      startDate: '2024-01-22',
      expectedDelivery: '2024-04-15',
      progress: '20%',
      status: 'Materials Ordered'
    }
  ];

  const columns: ColumnConfig[] = [
    {
      name: 'id',
      label: 'PO Number',
      isSortable: true,
      isSearchable: true,
      action: (row) => console.log('View PO:', row.id),
      width: '120px'
    },
    {
      name: 'requirementId',
      label: 'Requirement',
      isSortable: true,
      isSearchable: true,
      action: (row) => console.log('View requirement:', row.requirementId),
      width: '120px'
    },
    {
      name: 'vendorName',
      label: 'Vendor',
      isSortable: true,
      isSearchable: true
    },
    {
      name: 'orderValue',
      label: 'Order Value',
      isSortable: true,
      align: 'right'
    },
    {
      name: 'startDate',
      label: 'Start Date',
      isSortable: true
    },
    {
      name: 'expectedDelivery',
      label: 'Expected Delivery',
      isSortable: true
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
        { key: 'In Progress', value: 'In Progress', color: '#bfdbfe' },
        { key: 'Materials Ordered', value: 'Materials Ordered', color: '#fbbf24' },
        { key: 'Development Started', value: 'Development Started', color: '#a78bfa' },
        { key: 'Testing Phase', value: 'Testing Phase', color: '#fb7185' }
      ]
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
        <h1 className="text-3xl font-bold text-foreground mb-2">Purchase Orders In Progress</h1>
        <p className="text-muted-foreground">
          Active purchase orders currently being executed by vendors
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
        globalSearchPlaceholder="Search in-progress purchase orders..."
        pagination={{
          enabled: true,
          pageSize: 10,
          currentPage: 1
        }}
      />
    </div>
  );
};

export default PurchaseOrdersInProgress;