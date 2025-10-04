import React, { useState } from "react";
import CustomTable from "@/components/CustomTable";
import { ColumnConfig, FilterConfig } from "@/types/table";

interface PurchaseOrderRow {
  id: string;
  requirementId: string;
  vendorName: string;
  orderValue: string;
  createdDate: string;
  expectedDelivery: string;
  approver: string;
  status: string;
}

const PurchaseOrdersPending = () => {
  const [selectedRows, setSelectedRows] = useState<PurchaseOrderRow[]>([]);

  const mockData: PurchaseOrderRow[] = [
    {
      id: "PO-001",
      requirementId: "REQ-005",
      vendorName: "DigitalPro Agency",
      orderValue: "$78,000",
      createdDate: "2024-01-28",
      expectedDelivery: "2024-03-15",
      approver: "Sarah Johnson",
      status: "Awaiting Approval",
    },
    {
      id: "PO-002",
      requirementId: "REQ-006",
      vendorName: "SystemWorks Ltd.",
      orderValue: "$90,000",
      createdDate: "2024-01-27",
      expectedDelivery: "2024-04-20",
      approver: "Robert Wilson",
      status: "Under Review",
    },
  ];

  const columns: ColumnConfig[] = [
    {
      name: "id",
      label: "PO Number",
      isSortable: true,
      isSearchable: true,
      action: (row) => console.log("View PO:", row.id),
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
      name: "vendorName",
      label: "Vendor",
      isSortable: true,
      isSearchable: true,
    },
    {
      name: "orderValue",
      label: "Order Value",
      isSortable: true,
      align: "right",
    },
    {
      name: "createdDate",
      label: "Created Date",
      isSortable: true,
    },
    {
      name: "expectedDelivery",
      label: "Expected Delivery",
      isSortable: true,
    },
    {
      name: "approver",
      label: "Approver",
      isSortable: true,
      isSearchable: true,
    },
    {
      name: "status",
      label: "Status",
      isSortable: true,
      isFilterable: true,
      filterOptions: [
        {
          key: "Awaiting Approval",
          value: "Awaiting Approval",
          color: "#fef3c7",
        },
        { key: "Under Review", value: "Under Review", color: "#ddd6fe" },
        {
          key: "Pending Signature",
          value: "Pending Signature",
          color: "#fed7aa",
        },
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

  const handleSelectionChange = (selected: PurchaseOrderRow[]) => {
    setSelectedRows(selected);
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Pending Purchase Orders
        </h1>
        <p className="text-muted-foreground">
          Purchase orders awaiting approval before being sent to vendors
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
        globalSearchPlaceholder="Search pending purchase orders..."
        pagination={{
          enabled: true,
          pageSize: 10,
          currentPage: 1,
        }}
      />
    </div>
  );
};

export default PurchaseOrdersPending;
