import React, { useState } from 'react';
import CustomTable from '@/components/CustomTable';
import { ColumnConfig, FilterConfig } from '@/types/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Star, Eye, Download, Edit, Trash2 } from 'lucide-react';

const ProfessionalPortfolio = () => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const portfolioStats = [
    { label: 'Total Projects', value: '24', change: '+3 this month' },
    { label: 'Avg. Rating', value: '4.8', change: '⭐ Excellent' },
    { label: 'Profile Views', value: '156', change: '+12% this week' },
    { label: 'Success Rate', value: '96%', change: 'Top 5% performers' }
  ];

  const mockData = [
    {
      id: 'PORT-001',
      title: 'E-commerce Platform Development',
      client: 'RetailTech Solutions',
      category: 'Web Development',
      duration: '6 months',
      completedDate: '2024-01-15',
      budget: '$85,000',
      rating: 5,
      status: 'Completed',
      technologies: ['React', 'Node.js', 'MongoDB'],
      views: 48,
      featured: true
    },
    {
      id: 'PORT-002',
      title: 'Mobile Banking App UI/UX',
      client: 'FinanceFirst Bank',
      category: 'Mobile App Design',
      duration: '4 months',
      completedDate: '2023-12-20',
      budget: '$62,000',
      rating: 5,
      status: 'Completed',
      technologies: ['Figma', 'React Native', 'Design System'],
      views: 72,
      featured: true
    },
    {
      id: 'PORT-003',
      title: 'Supply Chain Analytics Dashboard',
      client: 'LogiFlow Systems',
      category: 'Data Analytics',
      duration: '3 months',
      completedDate: '2023-11-30',
      budget: '$45,000',
      rating: 4,
      status: 'Completed',
      technologies: ['Python', 'D3.js', 'PostgreSQL'],
      views: 35,
      featured: false
    },
    {
      id: 'PORT-004',
      title: 'Marketing Automation System',
      client: 'GrowthHack Agency',
      category: 'Marketing Technology',
      duration: '5 months',
      completedDate: '2023-10-15',
      budget: '$78,000',
      rating: 5,
      status: 'Completed',
      technologies: ['JavaScript', 'Python', 'APIs'],
      views: 29,
      featured: false
    },
    {
      id: 'PORT-005',
      title: 'Healthcare Management Platform',
      client: 'MedCare Solutions',
      category: 'Healthcare Technology',
      duration: '8 months',
      completedDate: '2023-09-20',
      budget: '$125,000',
      rating: 5,
      status: 'Completed',
      technologies: ['React', 'Node.js', 'HIPAA Compliance'],
      views: 91,
      featured: true
    }
  ];

  const columns: ColumnConfig[] = [
    {
      name: 'title',
      label: 'Project',
      isSortable: true,
      isSearchable: true,
      render: (value, row) => (
        <div className="flex items-start space-x-3">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground">{value}</span>
              {row.featured && (
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
              )}
            </div>
            <div className="text-sm text-muted-foreground mt-1">{row.client}</div>
            <div className="flex flex-wrap gap-1 mt-2">
              {row.technologies.slice(0, 3).map((tech: string, index: number) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-primary/10 text-primary"
                >
                  {tech}
                </span>
              ))}
              {row.technologies.length > 3 && (
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-muted text-muted-foreground">
                  +{row.technologies.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      )
    },
    {
      name: 'category',
      label: 'Category',
      isSortable: true,
      isFilterable: true,
      filterOptions: [
        { key: 'Web Development', value: 'Web Development', color: '#dcfce7' },
        { key: 'Mobile App Design', value: 'Mobile App Design', color: '#ddd6fe' },
        { key: 'Data Analytics', value: 'Data Analytics', color: '#fef3c7' },
        { key: 'Marketing Technology', value: 'Marketing Technology', color: '#fed7aa' },
        { key: 'Healthcare Technology', value: 'Healthcare Technology', color: '#fee2e2' }
      ]
    },
    {
      name: 'budget',
      label: 'Budget',
      isSortable: true,
      align: 'right'
    },
    {
      name: 'duration',
      label: 'Duration',
      isSortable: true,
      align: 'center'
    },
    {
      name: 'rating',
      label: 'Rating',
      isSortable: true,
      render: (value) => (
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < value ? 'text-yellow-500 fill-current' : 'text-gray-300'
              }`}
            />
          ))}
          <span className="ml-1 text-sm text-muted-foreground">({value})</span>
        </div>
      )
    },
    {
      name: 'views',
      label: 'Views',
      isSortable: true,
      align: 'center',
      render: (value) => (
        <div className="flex items-center justify-center gap-1">
          <Eye className="w-4 h-4 text-muted-foreground" />
          <span>{value}</span>
        </div>
      )
    },
    {
      name: 'completedDate',
      label: 'Completed',
      isSortable: true
    },
    {
      name: 'status',
      label: 'Status',
      isSortable: true,
      isFilterable: true,
      filterOptions: [
        { key: 'Completed', value: 'Completed', color: '#dcfce7' },
        { key: 'In Progress', value: 'In Progress', color: '#ddd6fe' },
        { key: 'Draft', value: 'Draft', color: '#fef3c7' }
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

  const handleAddProject = () => {
    console.log('Add new project');
  };

  const handleEditSelected = () => {
    console.log('Edit selected projects');
  };

  const handleDeleteSelected = () => {
    console.log('Delete selected projects');
  };

  return (
    <div className="p-6 bg-background min-h-screen space-y-6">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Portfolio Management</h1>
          <p className="text-muted-foreground">
            Showcase your best work and track portfolio performance
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={handleAddProject}>
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
          {selectedRows.length > 0 && (
            <>
              <Button onClick={handleEditSelected} variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit ({selectedRows.length})
              </Button>
              <Button onClick={handleDeleteSelected} variant="destructive" size="sm">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete ({selectedRows.length})
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Portfolio Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {portfolioStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.change}</div>
            </CardContent>
          </Card>
        ))}
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
        globalSearchPlaceholder="Search portfolio projects..."
        pagination={{
          enabled: true,
          pageSize: 10,
          currentPage: 1
        }}
      />
    </div>
  );
};

export default ProfessionalPortfolio;