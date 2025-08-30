import React, { useState } from 'react';
import CustomTable from '@/components/CustomTable';
import { ColumnConfig, FilterConfig } from '@/types/table';

const VendorRFQsBrowse = () => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const mockData = [
    {
      id: 'RFQ-001',
      title: 'Enterprise Software Development',
      company: 'TechCorp Industries',
      category: 'Software Development',
      budget: '$150,000 - $200,000',
      deadline: '2024-02-10',
      postedDate: '2024-01-28',
      proposals: 12,
      status: 'Open'
    },
    {
      id: 'RFQ-002',
      title: 'Marketing Campaign Management',
      company: 'BrandMax Agency',
      category: 'Marketing Services',
      budget: '$75,000 - $100,000',
      deadline: '2024-02-15',
      postedDate: '2024-01-26',
      proposals: 8,
      status: 'Open'
    }
  ];

  const columns: ColumnConfig[] = [
    {
      name: 'id',
      label: 'RFQ ID',
      isSortable: true,
      isSearchable: true,
      action: (row) => console.log('View RFQ:', row.id),
      width: '120px'
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
      name: 'category',
      label: 'Category',
      isSortable: true,
      isFilterable: true,
      filterOptions: [
        { key: 'Software Development', value: 'Software Development' },
        { key: 'Marketing Services', value: 'Marketing Services' },
        { key: 'Consulting', value: 'Consulting' },
        { key: 'Design', value: 'Design' }
      ]
    },
    {
      name: 'budget',
      label: 'Budget Range',
      isSortable: true
    },
    {
      name: 'deadline',
      label: 'Deadline',
      isSortable: true
    },
    {
      name: 'postedDate',
      label: 'Posted',
      isSortable: true
    },
    {
      name: 'proposals',
      label: 'Proposals',
      isSortable: true,
      align: 'center'
    },
    {
      name: 'status',
      label: 'Status',
      isSortable: true,
      isFilterable: true,
      filterOptions: [
        { key: 'Open', value: 'Open', color: '#dcfce7' },
        { key: 'Closing Soon', value: 'Closing Soon', color: '#fef3c7' },
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

  const handleSubmitProposal = () => {
    console.log('Submit proposal for selected RFQs');
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Browse RFQs</h1>
        <p className="text-muted-foreground">
          Find and apply to new business opportunities matching your services
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
        globalSearchPlaceholder="Search RFQs..."
        pagination={{
          enabled: true,
          pageSize: 10,
          currentPage: 1
        }}
      />
    </div>
  );
};

export default VendorRFQsBrowse;