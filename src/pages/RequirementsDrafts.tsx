import React, { useState } from 'react';
import CustomTable from '@/components/CustomTable';
import { ColumnConfig, FilterConfig } from '@/types/table';

const RequirementsDrafts = () => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const mockData = [
    {
      id: 'REQ-001',
      title: 'Software Development Services',
      category: 'IT Services',
      priority: 'High',
      estimatedValue: '$50,000',
      createdDate: '2024-01-15',
      lastModified: '2024-01-20',
      status: 'Draft'
    },
    {
      id: 'REQ-002',
      title: 'Marketing Campaign Management',
      category: 'Marketing',
      priority: 'Medium',
      estimatedValue: '$25,000',
      createdDate: '2024-01-10',
      lastModified: '2024-01-18',
      status: 'Draft'
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
        { key: 'IT Services', value: 'IT Services' },
        { key: 'Marketing', value: 'Marketing' },
        { key: 'Construction', value: 'Construction' },
        { key: 'Logistics', value: 'Logistics' }
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
      name: 'lastModified',
      label: 'Last Modified',
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

  const handleAdd = () => {
    console.log('Create new requirement');
  };

  const handleSelectionChange = (selected: any[]) => {
    setSelectedRows(selected);
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Draft Requirements</h1>
        <p className="text-muted-foreground">
          Manage your draft requirements before submitting for approval
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
        onAdd={handleAdd}
        selectable={true}
        onSelectionChange={handleSelectionChange}
        globalSearchPlaceholder="Search draft requirements..."
        pagination={{
          enabled: true,
          pageSize: 10,
          currentPage: 1
        }}
      />
    </div>
  );
};

export default RequirementsDrafts;