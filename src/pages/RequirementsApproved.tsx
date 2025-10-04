import React, { useState } from "react";
import CustomTable from "@/components/CustomTable";
import { ColumnConfig, FilterConfig } from "@/types/table";

const RequirementsApproved = () => {
  // ✅ Explicit type instead of any[]
  const [selectedRows, setSelectedRows] = useState<Record<string, unknown>[]>(
    []
  );

  const mockData = [
    {
      id: "REQ-005",
      title: "Digital Marketing Platform",
      category: "Marketing Technology",
      priority: "High",
      estimatedValue: "$80,000",
      approvedDate: "2024-01-25",
      approvedBy: "Sarah Johnson",
      publishDate: "2024-01-26",
      status: "Approved",
    },
    {
      id: "REQ-006",
      title: "Warehouse Management System",
      category: "Logistics",
      priority: "Medium",
      estimatedValue: "$95,000",
      approvedDate: "2024-01-24",
      approvedBy: "Robert Wilson",
      publishDate: "2024-01-25",
      status: "Approved",
    },
  ];

  const columns: ColumnConfig[] = [
    {
      name: "id",
      label: "Requirement ID",
      isSortable: true,
      isSearchable: true,
      action: (row) => console.log("View requirement:", row.id),
      width: "150px",
    },
    {
      name: "title",
      label: "Title",
      isSortable: true,
      isSearchable: true,
    },
    {
      name: "category",
      label: "Category",
      isSortable: true,
      isFilterable: true,
      filterOptions: [
        { key: "Marketing Technology", value: "Marketing Technology" },
        { key: "Logistics", value: "Logistics" },
        { key: "IT Infrastructure", value: "IT Infrastructure" },
        { key: "Construction", value: "Construction" },
      ],
    },
    {
      name: "priority",
      label: "Priority",
      isSortable: true,
      isFilterable: true,
      filterOptions: [
        { key: "High", value: "High", color: "#fee2e2" },
        { key: "Medium", value: "Medium", color: "#fef3c7" },
        { key: "Low", value: "Low", color: "#dcfce7" },
      ],
    },
    {
      name: "estimatedValue",
      label: "Est. Value",
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
      name: "publishDate",
      label: "Publish Date",
      isSortable: true,
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

  // ✅ Fix: explicit typing for selection
  const handleSelectionChange = (selected: Record<string, unknown>[]) => {
    setSelectedRows(selected);
  };

  const handlePublish = () => {
    console.log("Publish selected requirements:", selectedRows);
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Approved Requirements
        </h1>
        <p className="text-muted-foreground">
          Requirements that have been approved and are ready for publishing
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
        globalSearchPlaceholder="Search approved requirements..."
        pagination={{
          enabled: true,
          pageSize: 10,
          currentPage: 1,
        }}
      />

      {/* Example button for publishing selected */}
      {selectedRows.length > 0 && (
        <div className="mt-4">
          <button
            onClick={handlePublish}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Publish Selected
          </button>
        </div>
      )}
    </div>
  );
};

export default RequirementsApproved;
