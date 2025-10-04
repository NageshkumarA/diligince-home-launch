import React, { useState } from "react";
import CustomTable from "@/components/CustomTable";
import { ColumnConfig, FilterConfig } from "@/types/table";

// Define the row type for pending requirements
type RequirementRow = {
  id: string;
  title: string;
  category: string;
  priority: string;
  estimatedValue: string;
  submittedDate: string;
  submittedBy: string;
  approver: string;
  status: string;
};

const RequirementsPending = () => {
  const [selectedRows, setSelectedRows] = useState<RequirementRow[]>([]);

  const mockData: RequirementRow[] = [
    {
      id: "REQ-003",
      title: "Cloud Infrastructure Setup",
      category: "IT Infrastructure",
      priority: "High",
      estimatedValue: "$75,000",
      submittedDate: "2024-01-22",
      submittedBy: "John Smith",
      approver: "Sarah Johnson",
      status: "Pending Approval",
    },
    {
      id: "REQ-004",
      title: "Office Renovation Project",
      category: "Construction",
      priority: "Medium",
      estimatedValue: "$120,000",
      submittedDate: "2024-01-20",
      submittedBy: "Mike Davis",
      approver: "Robert Wilson",
      status: "Under Review",
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
        { key: "Construction", value: "Construction" },
        { key: "Marketing", value: "Marketing" },
        { key: "Logistics", value: "Logistics" },
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
      name: "submittedBy",
      label: "Submitted By",
      isSortable: true,
      isSearchable: true,
    },
    {
      name: "approver",
      label: "Approver",
      isSortable: true,
      isSearchable: true,
    },
    {
      name: "submittedDate",
      label: "Submitted Date",
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

  const handleSelectionChange = (selected: RequirementRow[]) => {
    setSelectedRows(selected);
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Pending Approval Requirements
        </h1>
        <p className="text-muted-foreground">
          Requirements awaiting approval from designated approvers
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
        globalSearchPlaceholder="Search pending requirements..."
        pagination={{
          enabled: true,
          pageSize: 10,
          currentPage: 1,
        }}
      />
    </div>
  );
};

export default RequirementsPending;
