import React, { useState } from 'react';
import CustomTable from '@/components/CustomTable';
import { ColumnConfig, FilterConfig } from '@/types/table';

const PurchaseOrdersCompleted = () => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const mockData = [
    {
      id: 'PO-005',
      requirementId: 'REQ-001',
      vendorName: 'TechnovaSoft',
      orderValue: '$50,000',
      startDate: '2023-12-01',
      completedDate: '2024-01-15',
      deliveryTime: '45 days',
      rating: '4.8/5',
      status: 'Completed'
    },
    {
      id: 'PO-006',
      requirementId: 'REQ-002',
      vendorName: 'MarketMax Agency',
      orderValue: '$25,000',
      startDate: '2023-12-10',
      completedDate: '2024-01-20',
      deliveryTime: '41 days',
      rating: '4.5/5',
      status: 'Delivered'
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
      name: 'completedDate',
      label: 'Completed Date',
      isSortable: true
    },
    {
      name: 'deliveryTime',
      label: 'Delivery Time',
      isSortable: true,
      align: 'center'
    },
    {
      name: 'rating',
      label: 'Rating',
      isSortable: true,
      align: 'center'
    },
    {
      name: 'status',
      label: 'Status',
      isSortable: true,
      isFilterable: true,
      filterOptions: [
        { key: 'Completed', value: 'Completed', color: '#dcfce7' },
        { key: 'Delivered', value: 'Delivered', color: '#d1fae5' },
        { key: 'Closed', value: 'Closed', color: '#f3f4f6' }
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
        <h1 className="text-3xl font-bold text-foreground mb-2">Completed Purchase Orders</h1>
        <p className="text-muted-foreground">
          Successfully completed purchase orders and their performance metrics
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
        globalSearchPlaceholder="Search completed purchase orders..."
        pagination={{
          enabled: true,
          pageSize: 10,
          currentPage: 1
        }}
      />
    </div>
  );
};

export default PurchaseOrdersCompleted;