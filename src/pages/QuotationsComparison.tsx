import React, { useState } from 'react';
import CustomTable from '@/components/CustomTable';
import { ColumnConfig, FilterConfig } from '@/types/table';

const QuotationsComparison = () => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const mockData = [
    {
      requirementId: 'REQ-007',
      requirementTitle: 'Mobile App Development',
      vendor1: 'TechSolutions Inc.',
      amount1: '$115,000',
      vendor2: 'AppDev Pro',
      amount2: '$125,000',
      vendor3: 'MobileCraft',
      amount3: '$108,000',
      savings: '$7,000',
      bestValue: 'MobileCraft',
      comparison: 'Available'
    },
    {
      requirementId: 'REQ-008',
      requirementTitle: 'Supply Chain Optimization',
      vendor1: 'LogiFlow Systems',
      amount1: '$62,000',
      vendor2: 'OptimizeNow',
      amount2: '$68,000',
      vendor3: 'ChainMaster',
      amount3: '$59,000',
      savings: '$3,000',
      bestValue: 'ChainMaster',
      comparison: 'Available'
    }
  ];

  const columns: ColumnConfig[] = [
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
      name: 'vendor1',
      label: 'Vendor 1',
      isSortable: true,
      isSearchable: true
    },
    {
      name: 'amount1',
      label: 'Amount 1',
      isSortable: true,
      align: 'right'
    },
    {
      name: 'vendor2',
      label: 'Vendor 2',
      isSortable: true,
      isSearchable: true
    },
    {
      name: 'amount2',
      label: 'Amount 2',
      isSortable: true,
      align: 'right'
    },
    {
      name: 'vendor3',
      label: 'Vendor 3',
      isSortable: true,
      isSearchable: true
    },
    {
      name: 'amount3',
      label: 'Amount 3',
      isSortable: true,
      align: 'right'
    },
    {
      name: 'bestValue',
      label: 'Best Value',
      isSortable: true,
      isSearchable: true
    },
    {
      name: 'savings',
      label: 'Potential Savings',
      isSortable: true,
      align: 'right'
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
        <h1 className="text-3xl font-bold text-foreground mb-2">Quotation Comparison</h1>
        <p className="text-muted-foreground">
          Compare quotations from multiple vendors to make informed decisions
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
        globalSearchPlaceholder="Search quotation comparisons..."
        pagination={{
          enabled: true,
          pageSize: 10,
          currentPage: 1
        }}
      />
    </div>
  );
};

export default QuotationsComparison;