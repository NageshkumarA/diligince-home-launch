import React, { useState } from 'react';
import CustomTable from '@/components/CustomTable';
import { ColumnConfig, FilterConfig } from '@/types/table';
import { Button } from '@/components/ui/button';
import { Plus, UserPlus } from 'lucide-react';

const IndustryTeam = () => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const mockData = [
    {
      id: 'TM-001',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      role: 'Procurement Manager',
      department: 'Operations',
      joinDate: '2023-03-15',
      status: 'Active',
      permissions: ['Create Requirements', 'Approve Purchases', 'Manage Vendors'],
      lastActive: '2 hours ago'
    },
    {
      id: 'TM-002',
      name: 'Robert Wilson',
      email: 'robert.wilson@company.com',
      role: 'Senior Buyer',
      department: 'Procurement',
      joinDate: '2023-01-20',
      status: 'Active',
      permissions: ['Create Requirements', 'Review Quotes'],
      lastActive: '1 day ago'
    },
    {
      id: 'TM-003',
      name: 'Emily Chen',
      email: 'emily.chen@company.com',
      role: 'Project Coordinator',
      department: 'Operations',
      joinDate: '2023-06-10',
      status: 'Active',
      permissions: ['View Requirements', 'Track Projects'],
      lastActive: '30 minutes ago'
    },
    {
      id: 'TM-004',
      name: 'Michael Brown',
      email: 'michael.brown@company.com',
      role: 'Finance Approver',
      department: 'Finance',
      joinDate: '2022-11-05',
      status: 'Active',
      permissions: ['Approve Budgets', 'Financial Review'],
      lastActive: '4 hours ago'
    },
    {
      id: 'TM-005',
      name: 'Lisa Davis',
      email: 'lisa.davis@company.com',
      role: 'Vendor Manager',
      department: 'Procurement',
      joinDate: '2023-04-18',
      status: 'Inactive',
      permissions: ['Manage Vendors', 'Vendor Evaluation'],
      lastActive: '1 week ago'
    }
  ];

  const columns: ColumnConfig[] = [
    {
      name: 'name',
      label: 'Name',
      isSortable: true,
      isSearchable: true,
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-primary">
              {value.split(' ').map((n: string) => n[0]).join('')}
            </span>
          </div>
          <div>
            <div className="font-medium text-foreground">{value}</div>
            <div className="text-sm text-muted-foreground">{row.email}</div>
          </div>
        </div>
      )
    },
    {
      name: 'role',
      label: 'Role',
      isSortable: true,
      isFilterable: true,
      filterOptions: [
        { key: 'Procurement Manager', value: 'Procurement Manager' },
        { key: 'Senior Buyer', value: 'Senior Buyer' },
        { key: 'Project Coordinator', value: 'Project Coordinator' },
        { key: 'Finance Approver', value: 'Finance Approver' },
        { key: 'Vendor Manager', value: 'Vendor Manager' }
      ]
    },
    {
      name: 'department',
      label: 'Department',
      isSortable: true,
      isFilterable: true,
      filterOptions: [
        { key: 'Operations', value: 'Operations' },
        { key: 'Procurement', value: 'Procurement' },
        { key: 'Finance', value: 'Finance' },
        { key: 'IT', value: 'IT' }
      ]
    },
    {
      name: 'permissions',
      label: 'Key Permissions',
      render: (value) => (
        <div className="flex flex-wrap gap-1">
          {value.slice(0, 2).map((permission: string, index: number) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary"
            >
              {permission}
            </span>
          ))}
          {value.length > 2 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground">
              +{value.length - 2} more
            </span>
          )}
        </div>
      )
    },
    {
      name: 'joinDate',
      label: 'Join Date',
      isSortable: true
    },
    {
      name: 'lastActive',
      label: 'Last Active',
      isSortable: true
    },
    {
      name: 'status',
      label: 'Status',
      isSortable: true,
      isFilterable: true,
      filterOptions: [
        { key: 'Active', value: 'Active', color: '#dcfce7' },
        { key: 'Inactive', value: 'Inactive', color: '#fee2e2' },
        { key: 'Pending', value: 'Pending', color: '#fef3c7' }
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

  const handleAddMember = () => {
    console.log('Add team member');
  };

  const handleInviteUser = () => {
    console.log('Invite user');
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Team Management</h1>
          <p className="text-muted-foreground">
            Manage team members, roles, and permissions for your organization
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={handleInviteUser} variant="outline">
            <UserPlus className="w-4 h-4 mr-2" />
            Invite User
          </Button>
          <Button onClick={handleAddMember}>
            <Plus className="w-4 h-4 mr-2" />
            Add Member
          </Button>
        </div>
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
        globalSearchPlaceholder="Search team members..."
        pagination={{
          enabled: true,
          pageSize: 10,
          currentPage: 1
        }}
      />
    </div>
  );
};

export default IndustryTeam;