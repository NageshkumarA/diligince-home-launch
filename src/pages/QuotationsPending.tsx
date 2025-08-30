import React, { useState } from 'react';
import CustomTable from '@/components/CustomTable';
import { ColumnConfig, FilterConfig } from '@/types/table';

const QuotationsPending = () => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const mockData = [
    {
      id: 'QUO-001',
      requirementId: 'REQ-007',
      requirementTitle: 'Mobile App Development',
      vendorName: 'TechSolutions Inc.',
      quotedAmount: '$115,000',
      submittedDate: '2024-01-29',
      validUntil: '2024-02-15',
      responseTime: '2 days',
      status: 'Pending Review'
    },
    {
      id: 'QUO-002',
      requirementId: 'REQ-008',
      requirementTitle: 'Supply Chain Optimization',
      vendorName: 'LogiFlow Systems',
      quotedAmount: '$62,000',
      submittedDate: '2024-01-28',
      validUntil: '2024-02-20',
      responseTime: '1 day',
      status: 'Under Evaluation'
    }
  ];

  const columns: ColumnConfig[] = [
    {
      name: 'id',
      label: 'Quote ID',
      isSortable: true,
      isSearchable: true,
      action: (row) => console.log('View quote:', row.id),
      width: '120px'
    },
    {
      name: 'requirementId',
      label: 'Requirement',
      isSortable: true,
      isSearchable: true,
      action: (row) => console.log('View requirement:', row.requirementId),
      width: '120px'
    },
    {
      name: 'requirementTitle',
      label: 'Title',
      isSortable: true,
      isSearchable: true
    },
    {
      name: 'vendorName',
      label: 'Vendor',
      isSortable: true,
      isSearchable: true
    },
    {
      name: 'quotedAmount',
      label: 'Quoted Amount',
      isSortable: true,
      align: 'right'
    },
    {
      name: 'submittedDate',
      label: 'Submitted',
      isSortable: true
    },
    {
      name: 'validUntil',
      label: 'Valid Until',
      isSortable: true
    },
    {
      name: 'responseTime',
      label: 'Response Time',
      isSortable: true,
      align: 'center'
    },
    {
      name: 'status',
      label: 'Status',
      isSortable: true,
      isFilterable: true,
      filterOptions: [
        { key: 'Pending Review', value: 'Pending Review', color: '#fef3c7' },
        { key: 'Under Evaluation', value: 'Under Evaluation', color: '#ddd6fe' },
        { key: 'Awaiting Clarification', value: 'Awaiting Clarification', color: '#fed7aa' }
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

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Pending Quotations</h1>
        <p className="text-muted-foreground">
          Quotations received from vendors awaiting your review and decision
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
        globalSearchPlaceholder="Search pending quotations..."
        pagination={{
          enabled: true,
          pageSize: 10,
          currentPage: 1
        }}
      />
    </div>
  );
};

export default QuotationsPending;