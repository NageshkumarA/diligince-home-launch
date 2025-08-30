import React, { useState } from 'react';
import CustomTable from '@/components/CustomTable';
import { ColumnConfig, FilterConfig } from '@/types/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, BellOff, Archive, Trash2 } from 'lucide-react';

const IndustryNotifications = () => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const mockData = [
    {
      id: 'NOT-001',  
      type: 'approval_required',
      title: 'Purchase Order Approval Required',
      message: 'PO-2024-001 for Mobile App Development requires your approval',
      priority: 'High',
      category: 'Approvals',
      sender: 'System',
      timestamp: '2024-01-30 14:30',
      status: 'Unread',
      relatedId: 'PO-2024-001'
    },
    {
      id: 'NOT-002',
      type: 'quote_received',
      title: 'New Quote Received',
      message: 'TechSolutions Inc. submitted a quote for REQ-007',
      priority: 'Medium',
      category: 'Quotations',
      sender: 'TechSolutions Inc.',
      timestamp: '2024-01-30 12:15',
      status: 'Read',
      relatedId: 'QUO-001'
    },
    {
      id: 'NOT-003',
      type: 'requirement_published',
      title: 'Requirement Successfully Published',
      message: 'Your requirement for Supply Chain Optimization is now live',
      priority: 'Low',
      category: 'Requirements',
      sender: 'System',
      timestamp: '2024-01-30 10:45',
      status: 'Read',
      relatedId: 'REQ-008'
    },
    {
      id: 'NOT-004',
      type: 'vendor_message',
      title: 'Message from Vendor',
      message: 'LogiFlow Systems sent you a message regarding project timeline',
      priority: 'Medium',
      category: 'Messages',
      sender: 'LogiFlow Systems',
      timestamp: '2024-01-30 09:20',
      status: 'Unread',
      relatedId: 'MSG-045'
    },
    {
      id: 'NOT-005',
      type: 'deadline_reminder',
      title: 'Quote Deadline Approaching',
      message: 'Quote deadline for Mobile App Development is in 2 days',
      priority: 'High',
      category: 'Reminders',
      sender: 'System',
      timestamp: '2024-01-29 16:00',
      status: 'Read',
      relatedId: 'REQ-007'
    }
  ];

  const columns: ColumnConfig[] = [
    {
      name: 'title',
      label: 'Notification',
      isSortable: true,
      isSearchable: true,
      render: (value, row) => (
        <div className="flex items-start space-x-3">
          <div className={`w-2 h-2 rounded-full mt-2 ${row.status === 'Unread' ? 'bg-primary' : 'bg-muted'}`} />
          <div className="flex-1 min-w-0">
            <div className={`font-medium ${row.status === 'Unread' ? 'text-foreground' : 'text-muted-foreground'}`}>
              {value}
            </div>
            <div className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {row.message}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-muted-foreground">{row.sender}</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{row.timestamp}</span>
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
        { key: 'Approvals', value: 'Approvals', color: '#fee2e2' },
        { key: 'Quotations', value: 'Quotations', color: '#ddd6fe' },
        { key: 'Requirements', value: 'Requirements', color: '#dcfce7' },
        { key: 'Messages', value: 'Messages', color: '#fef3c7' },
        { key: 'Reminders', value: 'Reminders', color: '#fed7aa' }
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
      name: 'timestamp',
      label: 'Time',
      isSortable: true,
      width: '140px'
    },
    {
      name: 'status',
      label: 'Status',
      isSortable: true,
      isFilterable: true,
      filterOptions: [
        { key: 'Unread', value: 'Unread', color: '#dbeafe' },
        { key: 'Read', value: 'Read', color: '#f3f4f6' },
        { key: 'Archived', value: 'Archived', color: '#fef3c7' }
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

  const handleMarkAllRead = () => {
    console.log('Mark all as read');
  };

  const handleArchiveSelected = () => {
    console.log('Archive selected notifications');
  };

  const handleDeleteSelected = () => {
    console.log('Delete selected notifications');
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated with all important activities and alerts
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={handleMarkAllRead} variant="outline" size="sm">
            <Bell className="w-4 h-4 mr-2" />
            Mark All Read
          </Button>
          {selectedRows.length > 0 && (
            <>
              <Button onClick={handleArchiveSelected} variant="outline" size="sm">
                <Archive className="w-4 h-4 mr-2" />
                Archive ({selectedRows.length})
              </Button>
              <Button onClick={handleDeleteSelected} variant="destructive" size="sm">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete ({selectedRows.length})
              </Button>
            </>
          )}
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
        globalSearchPlaceholder="Search notifications..."
        pagination={{
          enabled: true,
          pageSize: 20,
          currentPage: 1
        }}
      />
    </div>
  );
};

export default IndustryNotifications;