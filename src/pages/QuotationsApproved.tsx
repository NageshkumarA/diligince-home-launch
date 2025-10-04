import React, { useState } from "react";
import CustomTable from "@/components/CustomTable";
import { ColumnConfig, FilterConfig } from "@/types/table";

interface ApprovedQuotationRow {
  id: string;
  requirementId: string;
  requirementTitle: string;
  vendorName: string;
  quotedAmount: string;
  approvedDate: string;
  approvedBy: string;
  contractValue: string;
  status: string;
}

const QuotationsApproved = () => {
  const [selectedRows, setSelectedRows] = useState<ApprovedQuotationRow[]>([]);

  const mockData: ApprovedQuotationRow[] = [
    {
      id: "QUO-003",
      requirementId: "REQ-005",
      requirementTitle: "Digital Marketing Platform",
      vendorName: "DigitalPro Agency",
      quotedAmount: "$78,000",
      approvedDate: "2024-01-26",
      approvedBy: "Sarah Johnson",
      contractValue: "$78,000",
      status: "Approved",
    },
    {
      id: "QUO-004",
      requirementId: "REQ-006",
      requirementTitle: "Warehouse Management System",
      vendorName: "SystemWorks Ltd.",
      quotedAmount: "$92,000",
      approvedDate: "2024-01-25",
      approvedBy: "Robert Wilson",
      contractValue: "$90,000",
      status: "Contract Signed",
    },
  ];

  const columns: ColumnConfig[] = [
    {
      name: "id",
      label: "Quote ID",
      isSortable: true,
      isSearchable: true,
      action: (row) => console.log("View quote:", row.id),
      width: "120px",
    },
    {
      name: "requirementId",
      label: "Requirement",
      isSortable: true,
      isSearchable: true,
      action: (row) => console.log("View requirement:", row.requirementId),
      width: "120px",
    },
    {
      name: "requirementTitle",
      label: "Title",
      isSortable: true,
      isSearchable: true,
    },
    {
      name: "vendorName",
      label: "Vendor",
      isSortable: true,
      isSearchable: true,
    },
    {
      name: "quotedAmount",
      label: "Quoted Amount",
      isSortable: true,
      align: "right",
    },
    {
      name: "contractValue",
      label: "Contract Value",
      isSortable: true,
      align: "right",
    },
    {
      name: "approvedBy",
      label: "Approved By",
      isSortable: true,
      isSearchable: true,
    },
    {
      name: "approvedDate",
      label: "Approved Date",
      isSortable: true,
    },
    {
      name: "status",
      label: "Status",
      isSortable: true,
      isFilterable: true,
      filterOptions: [
        { key: "Approved", value: "Approved", color: "#dcfce7" },
        { key: "Contract Signed", value: "Contract Signed", color: "#d1fae5" },
        { key: "Project Started", value: "Project Started", color: "#bfdbfe" },
      ],
    },
  ];

  const handleFilter = (filters: FilterConfig) => {
    console.log("Applied filters:", filters);
  };

  const handleSearch = (searchTerm: string, selectedColumns: string[]) => {
    console.log("Search:", searchTerm, selectedColumns);
  };

  const handleExportXLSX = () => {
    console.log("Export XLSX");
  };

  const handleExportCSV = () => {
    console.log("Export CSV");
  };

  const handleSelectionChange = (selected: ApprovedQuotationRow[]) => {
    setSelectedRows(selected);
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Approved Quotations
        </h1>
        <p className="text-muted-foreground">
          Quotations that have been approved and are ready for contract
          execution
        </p>
      </div>

      <CustomTable
        columns={columns}
        data={mockData}
        filterCallback={handleFilter}
        searchCallback={handleSearch}
        onExport={{
          xlsx: handleExportXLSX,
          csv: handleExportCSV,
        }}
        selectable={true}
        onSelectionChange={handleSelectionChange}
        globalSearchPlaceholder="Search approved quotations..."
        pagination={{
          enabled: true,
          pageSize: 10,
          currentPage: 1,
        }}
      />
    </div>
  );
};

export default QuotationsApproved;
