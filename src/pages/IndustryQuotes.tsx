import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CustomTable, { ColumnConfig, FilterConfig } from '@/components/CustomTable';

const IndustryQuotes = () => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const mockData = [
    {
      id: 'QT001',
      vendor: 'Premium Tech Solutions',
      requirement: 'Software Development',
      quotedAmount: '$75,000',
      validUntil: '2024-02-15',
      status: 'Under Review',
      submittedDate: '2024-01-10',
      responseTime: '2 days',
      rating: '4.8',
      category: 'Software'
    },
    {
      id: 'QT002',
      vendor: 'Industrial Manufacturing Co.',
      requirement: 'Equipment Purchase',
      quotedAmount: '$45,500',
      validUntil: '2024-02-20',
      status: 'Accepted',
      submittedDate: '2024-01-08',
      responseTime: '1 day',
      rating: '4.6',
      category: 'Equipment'
    },
    {
      id: 'QT003',
      vendor: 'Logistics Express Ltd.',
      requirement: 'Transportation Services',
      quotedAmount: '$12,800',
      validUntil: '2024-01-30',
      status: 'Rejected',
      submittedDate: '2024-01-05',
      responseTime: '3 days',
      rating: '4.2',
      category: 'Logistics'
    },
    {
      id: 'QT004',
      vendor: 'Construction Experts Inc.',
      requirement: 'Building Renovation',
      quotedAmount: '$125,000',
      validUntil: '2024-03-01',
      status: 'Negotiating',
      submittedDate: '2024-01-12',
      responseTime: '1 day',
      rating: '4.9',
      category: 'Construction'
    }
  ];

  const columns: ColumnConfig[] = [
    {
      name: 'id',
      label: 'Quote ID',
      isSortable: true,
      isSearchable: true,
      action: (row) => {
        alert(`View quote details for ${row.id}`);
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
      name: 'requirement',
      label: 'Requirement',
      isSortable: true,
      isSearchable: true,
    },
    {
      name: 'quotedAmount',
      label: 'Quoted Amount',
      isSortable: true,
      align: 'right',
    },
    {
      name: 'validUntil',
      label: 'Valid Until',
      isSortable: true,
    },
    {
      name: 'status',
      label: 'Status',
      isSortable: true,
      isFilterable: true,
      filterOptions: [
        { key: 'Under Review', value: 'Under Review', color: '#fef3c7' },
        { key: 'Accepted', value: 'Accepted', color: '#dcfce7' },
        { key: 'Rejected', value: 'Rejected', color: '#fecaca' },
        { key: 'Negotiating', value: 'Negotiating', color: '#ddd6fe' }
      ],
    },
    {
      name: 'submittedDate',
      label: 'Submitted',
      isSortable: true,
    },
    {
      name: 'responseTime',
      label: 'Response Time',
      isSortable: true,
      align: 'center',
    },
    {
      name: 'rating',
      label: 'Vendor Rating',
      isSortable: true,
      align: 'center',
    },
    {
      name: 'category',
      label: 'Category',
      isSortable: true,
      isFilterable: true,
      filterOptions: [
        { key: 'Software', value: 'Software' },
        { key: 'Equipment', value: 'Equipment' },
        { key: 'Logistics', value: 'Logistics' },
        { key: 'Construction', value: 'Construction' }
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
    console.log('Exporting quotes to XLSX...');
  };

  const handleExportCSV = () => {
    console.log('Exporting quotes to CSV...');
  };

  const handleAdd = () => {
    console.log('Requesting new quote...');
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Quotes</h1>
          <p className="text-muted-foreground">Manage and compare quotes from vendors</p>
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
        globalSearchPlaceholder="Search quotes..."
        pagination={{
          enabled: true,
          pageSize: 10,
          currentPage: 1,
        }}
      />
    </div>
  );
};

export default IndustryQuotes;