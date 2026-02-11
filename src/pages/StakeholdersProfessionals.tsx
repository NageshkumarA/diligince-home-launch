import React, { useState } from "react";
import CustomTable from "@/components/CustomTable";
import { ColumnConfig, FilterConfig } from "@/types/table";
import AISearchBar from "@/components/shared/AISearchBar";

// Define the professional type
interface Professional {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  expertise: string;
  experience: string;
  rating: string;
  projectsCompleted: number;
  status: string;
}

const StakeholdersProfessionals: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<Professional[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const mockData: Professional[] = [
    {
      id: "PRO-001",
      name: "Alice Johnson",
      title: "Senior Software Engineer",
      email: "alice@email.com",
      phone: "+1-555-0789",
      expertise: "Full Stack Development",
      experience: "8 years",
      rating: "4.9/5",
      projectsCompleted: 15,
      status: "Available",
    },
    {
      id: "PRO-002",
      name: "Michael Chen",
      title: "Project Manager",
      email: "michael@email.com",
      phone: "+1-555-0987",
      expertise: "Agile Project Management",
      experience: "12 years",
      rating: "4.7/5",
      projectsCompleted: 25,
      status: "Busy",
    },
  ];

  const columns: ColumnConfig[] = [
    {
      name: "id",
      label: "Professional ID",
      isSortable: true,
      isSearchable: true,
      action: (row) => console.log("View professional:", row.id),
      width: "140px",
    },
    { name: "name", label: "Name", isSortable: true, isSearchable: true },
    { name: "title", label: "Title", isSortable: true, isSearchable: true },
    { name: "email", label: "Email", isSortable: true, isSearchable: true },
    { name: "phone", label: "Phone", isSortable: true, isSearchable: true },
    {
      name: "expertise",
      label: "Expertise",
      isSortable: true,
      isFilterable: true,
      filterOptions: [
        { key: "Full Stack Development", value: "Full Stack Development" },
        { key: "Agile Project Management", value: "Agile Project Management" },
        { key: "UI/UX Design", value: "UI/UX Design" },
        { key: "Data Analytics", value: "Data Analytics" },
      ],
    },
    {
      name: "experience",
      label: "Experience",
      isSortable: true,
      align: "center",
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
        { key: "Available", value: "Available", color: "#dcfce7" },
        { key: "Busy", value: "Busy", color: "#fef3c7" },
        { key: "On Leave", value: "On Leave", color: "#f3f4f6" },
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

  const handleSelectionChange = (selected: Professional[]) => {
    setSelectedRows(selected);
  };

  const handleAdd = () => {
    console.log("Invite new professional");
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Professional Network
        </h1>
        <p className="text-muted-foreground">
          Manage your network of professional consultants and freelancers
        </p>
      </div>

      {/* AI Search Bar */}
      <AISearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search professionals with AI..."
      />

      <CustomTable
        columns={columns}
        data={mockData}
        hideSearch
        filterCallback={handleFilter}
        searchCallback={handleSearch}
        onExport={{ xlsx: handleExportXLSX, csv: handleExportCSV }}
        onAdd={handleAdd}
        selectable={true}
        onSelectionChange={handleSelectionChange}
        globalSearchPlaceholder="Search professionals..."
        pagination={{ enabled: true, pageSize: 10, currentPage: 1 }}
      />
    </div>
  );
};

export default StakeholdersProfessionals;
