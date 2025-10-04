import React, { useState } from "react";
import CustomTable from "@/components/CustomTable";
import { ColumnConfig, FilterConfig } from "@/types/table";

interface Vendor {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  specialization: string;
  rating: string;
  projectsCompleted: number;
  status: string;
}

const StakeholdersVendors: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<Vendor[]>([]);

  // Mock Data (replace with API data later)
  const mockData: Vendor[] = [
    {
      id: "VEN-001",
      companyName: "TechSolutions Inc.",
      contactPerson: "John Smith",
      email: "john@techsolutions.com",
      phone: "+1-555-0123",
      specialization: "Software Development",
      rating: "4.8/5",
      projectsCompleted: 12,
      status: "Active",
    },
    {
      id: "VEN-002",
      companyName: "BuildRight Construction",
      contactPerson: "Sarah Johnson",
      email: "sarah@buildright.com",
      phone: "+1-555-0456",
      specialization: "Construction",
      rating: "4.6/5",
      projectsCompleted: 8,
      status: "Active",
    },
  ];

  const columns: ColumnConfig[] = [
    {
      name: "id",
      label: "Vendor ID",
      isSortable: true,
      isSearchable: true,
      action: (row) => console.log("View vendor:", row.id),
      width: "120px",
    },
    {
      name: "companyName",
      label: "Company Name",
      isSortable: true,
      isSearchable: true,
    },
    {
      name: "contactPerson",
      label: "Contact Person",
      isSortable: true,
      isSearchable: true,
    },
    { name: "email", label: "Email", isSortable: true, isSearchable: true },
    { name: "phone", label: "Phone", isSortable: true, isSearchable: true },
    {
      name: "specialization",
      label: "Specialization",
      isSortable: true,
      isFilterable: true,
      filterOptions: [
        { key: "Software Development", value: "Software Development" },
        { key: "Construction", value: "Construction" },
        { key: "Marketing", value: "Marketing" },
        { key: "Logistics", value: "Logistics" },
      ],
    },
    { name: "rating", label: "Rating", isSortable: true, align: "center" },
    {
      name: "projectsCompleted",
      label: "Projects",
      isSortable: true,
      align: "center",
    },
    {
      name: "status",
      label: "Status",
      isSortable: true,
      isFilterable: true,
      filterOptions: [
        { key: "Active", value: "Active", color: "#dcfce7" },
        { key: "Inactive", value: "Inactive", color: "#f3f4f6" },
        { key: "Suspended", value: "Suspended", color: "#fee2e2" },
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

  const handleSelectionChange = (selected: Vendor[]) => {
    setSelectedRows(selected);
  };

  const handleAdd = () => {
    console.log("Add new vendor");
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Vendor Partners
        </h1>
        <p className="text-muted-foreground">
          Manage your network of vendor partners and their information
        </p>
      </div>

      <CustomTable
        columns={columns}
        data={mockData}
        filterCallback={handleFilter}
        searchCallback={handleSearch}
        onExport={{ xlsx: handleExportXLSX, csv: handleExportCSV }}
        onAdd={handleAdd}
        selectable={true}
        onSelectionChange={handleSelectionChange}
        globalSearchPlaceholder="Search vendors..."
        pagination={{ enabled: true, pageSize: 10, currentPage: 1 }}
      />
    </div>
  );
};

export default StakeholdersVendors;
