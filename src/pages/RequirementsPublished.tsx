import React, { useState } from 'react';
import CustomTable from '@/components/CustomTable';
import { ColumnConfig, FilterConfig } from '@/types/table';

const RequirementsPublished = () => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const mockData = [
    {
      id: 'REQ-007',
      title: 'Mobile App Development',
      category: 'Software Development',
      priority: 'High',
      estimatedValue: '$120,000',
      publishedDate: '2024-01-28',
      deadline: '2024-02-15',
      quotesReceived: 8,
      status: 'Active'
    },
    {
      id: 'REQ-008',
      title: 'Supply Chain Optimization',
      category: 'Operations',
      priority: 'Medium',
      estimatedValue: '$65,000',
      publishedDate: '2024-01-26',
      deadline: '2024-02-20',
      quotesReceived: 5,
      status: 'Active'
    }
  ];

  const columns: ColumnConfig[] = [
    {
      name: 'id',
      label: 'Requirement ID',
      isSortable: true,
      isSearchable: true,
      action: (row) => console.log('View requirement:', row.id),
      width: '150px'
    },
    {
      name: 'title',
      label: 'Title',
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
        { key: 'Operations', value: 'Operations' },
        { key: 'Marketing', value: 'Marketing' },
        { key: 'Infrastructure', value: 'Infrastructure' }
      ]
    },
    {
      name: 'priority',
      label: 'Priority',
      isSortable: true,
      isFilterable: true,
      filterOptions: [
        { key: 'High', value: 'High', color: '#fee2e2' },
        { key: 'Medium', value: 'Medium', color: '#fef3c7' },
        { key: 'Low', value: 'Low', color: '#dcfce7' }
      ]
    },
    {
      name: 'estimatedValue',
      label: 'Est. Value',
      isSortable: true,
      align: 'right'
    },
    {
      name: 'publishedDate',
      label: 'Published Date',
      isSortable: true
    },
    {
      name: 'deadline',
      label: 'Quote Deadline',
      isSortable: true
    },
    {
      name: 'quotesReceived',
      label: 'Quotes',
      isSortable: true,
      align: 'center'
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
        <h1 className="text-3xl font-bold text-foreground mb-2">Published Requirements</h1>
        <p className="text-muted-foreground">
          Requirements that are live and accepting quotes from vendors and professionals
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
        globalSearchPlaceholder="Search published requirements..."
        pagination={{
          enabled: true,
          pageSize: 10,
          currentPage: 1
        }}
      />
    </div>
  );
};

export default RequirementsPublished;