import React, { useState } from 'react';
import CustomTable from '@/components/CustomTable';
import { ColumnConfig, FilterConfig } from '@/types/table';

const ProjectsActive = () => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const mockData = [
    {
      id: 'PROJ-001',
      title: 'Cloud Infrastructure Setup',
      client: 'TechCorp Industries',
      startDate: '2024-01-15',
      deadline: '2024-04-15',
      progress: '65%',
      value: '$75,000',
      status: 'In Progress',
      nextMilestone: 'System Testing'
    },
    {
      id: 'PROJ-002',
      title: 'Mobile App Development',
      client: 'StartupXYZ',
      startDate: '2024-01-20',
      deadline: '2024-05-20',
      progress: '40%',
      value: '$120,000',
      status: 'Design Phase',
      nextMilestone: 'UI Review'
    }
  ];

  const columns: ColumnConfig[] = [
    {
      name: 'id',
      label: 'Project ID',
      isSortable: true,
      isSearchable: true,
      action: (row) => console.log('View project:', row.id),
      width: '130px'
    },
    {
      name: 'title',
      label: 'Project Title',
      isSortable: true,
      isSearchable: true
    },
    {
      name: 'client',
      label: 'Client',
      isSortable: true,
      isSearchable: true
    },
    {
      name: 'startDate',
      label: 'Start Date',
      isSortable: true
    },
    {
      name: 'deadline',
      label: 'Deadline',
      isSortable: true
    },
    {
      name: 'progress',
      label: 'Progress',
      isSortable: true,
      align: 'center'
    },
    {
      name: 'value',
      label: 'Value',
      isSortable: true,
      align: 'right'
    },
    {
      name: 'status',
      label: 'Status',
      isSortable: true,
      isFilterable: true,
      filterOptions: [
        { key: 'In Progress', value: 'In Progress', color: '#bfdbfe' },
        { key: 'Design Phase', value: 'Design Phase', color: '#ddd6fe' },
        { key: 'Development', value: 'Development', color: '#fbbf24' },
        { key: 'Testing', value: 'Testing', color: '#fb7185' }
      ]
    },
    {
      name: 'nextMilestone',
      label: 'Next Milestone',
      isSortable: true,
      isSearchable: true
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
        <h1 className="text-3xl font-bold text-foreground mb-2">Active Projects</h1>
        <p className="text-muted-foreground">
          Currently ongoing projects and their progress status
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
        globalSearchPlaceholder="Search active projects..."
        pagination={{
          enabled: true,
          pageSize: 10,
          currentPage: 1
        }}
      />
    </div>
  );
};

export default ProjectsActive;