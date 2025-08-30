import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CustomTable, { ColumnConfig, FilterConfig } from '@/components/CustomTable';

const IndustryPurchaseOrders = () => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const mockData = [
    {
      id: 'PO001',
      vendor: 'Industrial Supply Co.',
      orderDate: '2024-01-15',
      deliveryDate: '2024-02-15',
      amount: '$25,450',
      status: 'Pending',
      items: '25 items',
      department: 'Manufacturing',
      approvedBy: 'John Manager',
      priority: 'High'
    },
    {
      id: 'PO002',
      vendor: 'Equipment Solutions Ltd.',
      orderDate: '2024-01-14',
      deliveryDate: '2024-02-10',
      amount: '$18,900',
      status: 'Approved',
      items: '12 items',
      department: 'Maintenance',
      approvedBy: 'Sarah Director',
      priority: 'Medium'
    },
    {
      id: 'PO003',
      vendor: 'Safety First Corp.',
      orderDate: '2024-01-12',
      deliveryDate: '2024-01-25',
      amount: '$8,750',
      status: 'Delivered',
      items: '45 items',
      department: 'Safety',
      approvedBy: 'Mike Supervisor',
      priority: 'Low'
    },
    {
      id: 'PO004',
      vendor: 'Tech Components Inc.',
      orderDate: '2024-01-10',
      deliveryDate: '2024-02-20',
      amount: '$42,300',
      status: 'In Transit',
      items: '8 items',
      department: 'IT',
      approvedBy: 'Lisa Head',
      priority: 'High'
    }
  ];

  const columns: ColumnConfig[] = [
    {
      name: 'id',
      label: 'PO Number',
      isSortable: true,
      isSearchable: true,
      action: (row) => {
        alert(`View PO details for ${row.id}`);
      },
      width: '32',
    },
    {
      name: 'vendor',
      label: 'Vendor',
      isSortable: true,
      isSearchable: true,
    },
    {
      name: 'orderDate',
      label: 'Order Date',
      isSortable: true,
    },
    {
      name: 'deliveryDate',
      label: 'Delivery Date',
      isSortable: true,
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
        { key: 'Pending', value: 'Pending', color: '#fef3c7' },
        { key: 'Approved', value: 'Approved', color: '#ddd6fe' },
        { key: 'Delivered', value: 'Delivered', color: '#dcfce7' },
        { key: 'In Transit', value: 'In Transit', color: '#fed7aa' }
      ],
    },
    {
      name: 'items',
      label: 'Items',
      isSortable: true,
      align: 'center',
    },
    {
      name: 'department',
      label: 'Department',
      isSortable: true,
      isSearchable: true,
      isFilterable: true,
      filterOptions: [
        { key: 'Manufacturing', value: 'Manufacturing' },
        { key: 'Maintenance', value: 'Maintenance' },
        { key: 'Safety', value: 'Safety' },
        { key: 'IT', value: 'IT' }
      ],
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
    console.log('Exporting POs to XLSX...');
  };

  const handleExportCSV = () => {
    console.log('Exporting POs to CSV...');
  };

  const handleAdd = () => {
    console.log('Creating new purchase order...');
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Purchase Orders</h1>
          <p className="text-muted-foreground">Manage and track all purchase orders</p>
        </div>
      </div>

      <CustomTable
        columns={columns}
        data={mockData}
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
        globalSearchPlaceholder="Search purchase orders..."
        pagination={{
          enabled: true,
          pageSize: 10,
          currentPage: 1,
        }}
      />
    </div>
  );
};

export default IndustryPurchaseOrders;