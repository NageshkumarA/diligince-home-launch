import React, { useState } from "react";
import CustomTable from "@/components/CustomTable";
import { ColumnConfig, FilterConfig } from "@/types/table";

const RequirementsArchived = () => {
  // ✅ Explicit type for rows instead of any[]
  const [selectedRows, setSelectedRows] = useState<Record<string, unknown>[]>(
    []
  );

  const mockData = [
    {
      id: "REQ-009",
      title: "Legacy System Migration",
      category: "IT Infrastructure",
      priority: "High",
      estimatedValue: "$200,000",
      archivedDate: "2024-01-15",
      reason: "Project Completed",
      finalValue: "$185,000",
      status: "Completed",
    },
    {
      id: "REQ-010",
      title: "Office Equipment Purchase",
      category: "Procurement",
      priority: "Low",
      estimatedValue: "$15,000",
      archivedDate: "2024-01-10",
      reason: "Cancelled",
      finalValue: "$0",
      status: "Cancelled",
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
        { key: "IT Infrastructure", value: "IT Infrastructure" },
        { key: "Procurement", value: "Procurement" },
        { key: "Construction", value: "Construction" },
        { key: "Services", value: "Services" },
      ],
    },
    {
      name: "status",
      label: "Status",
      isSortable: true,
      isFilterable: true,
      filterOptions: [
        { key: "Completed", value: "Completed", color: "#dcfce7" },
        { key: "Cancelled", value: "Cancelled", color: "#fee2e2" },
        { key: "Expired", value: "Expired", color: "#f3f4f6" },
      ],
    },
    {
      name: "estimatedValue",
      label: "Est. Value",
      isSortable: true,
      align: "right",
    },
    {
      name: "finalValue",
      label: "Final Value",
      isSortable: true,
      align: "right",
    },
    {
      name: "reason",
      label: "Archive Reason",
      isSortable: true,
      isSearchable: true,
    },
    {
      name: "archivedDate",
      label: "Archived Date",
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

  // ✅ Fix: use explicit type for selected rows
  const handleSelectionChange = (selected: Record<string, unknown>[]) => {
    setSelectedRows(selected);
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Archived Requirements
        </h1>
        <p className="text-muted-foreground">
          Completed, cancelled, or expired requirements for historical reference
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
        globalSearchPlaceholder="Search archived requirements..."
        pagination={{
          enabled: true,
          pageSize: 10,
          currentPage: 1,
        }}
      />
    </div>
  );
};

export default RequirementsArchived;
