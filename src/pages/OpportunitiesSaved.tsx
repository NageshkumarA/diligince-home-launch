import React, { useState } from 'react';
import CustomTable from '@/components/CustomTable';
import { ColumnConfig, FilterConfig } from '@/types/table';

const OpportunitiesSaved = () => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const mockData = [
    {
      id: 'REQ-007',
      title: 'Mobile App Development',
      company: 'TechCorp Industries',
      category: 'Software Development',
      location: 'San Francisco, CA',
      budget: '$120,000',
      deadline: '2024-02-15',
      savedDate: '2024-01-25',
      status: 'Active'
    },
    {
      id: 'REQ-008',
      title: 'Supply Chain Optimization',
      company: 'LogiMax Solutions',
      category: 'Operations Consulting',
      location: 'Chicago, IL',
      budget: '$65,000',
      deadline: '2024-02-20',
      savedDate: '2024-01-23',
      status: 'Active'
    }
  ];

  const columns: ColumnConfig[] = [
    {
      name: 'id',
      label: 'Opportunity ID',
      isSortable: true,
      isSearchable: true,
      action: (row) => console.log('View opportunity:', row.id),
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
      name: 'category',
      label: 'Category',
      isSortable: true,
      isFilterable: true,
      filterOptions: [
        { key: 'Software Development', value: 'Software Development' },
        { key: 'Operations Consulting', value: 'Operations Consulting' },
        { key: 'Marketing', value: 'Marketing' },
        { key: 'Design', value: 'Design' }
      ]
    },
    {
      name: 'location',
      label: 'Location',
      isSortable: true,
      isSearchable: true
    },
    {
      name: 'budget',
      label: 'Budget',
      isSortable: true,
      align: 'right'
    },
    {
      name: 'deadline',
      label: 'Deadline',
      isSortable: true
    },
    {
      name: 'savedDate',
      label: 'Saved On',
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
        <h1 className="text-3xl font-bold text-foreground mb-2">Saved Opportunities</h1>
        <p className="text-muted-foreground">
          Opportunities you've bookmarked for future reference
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
        globalSearchPlaceholder="Search saved opportunities..."
        pagination={{
          enabled: true,
          pageSize: 10,
          currentPage: 1
        }}
      />
    </div>
  );
};

export default OpportunitiesSaved;