import React, { useState } from "react";
import CustomTable from "@/components/CustomTable";
import { ColumnConfig, FilterConfig } from "@/types/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Award, AlertTriangle, Upload, Edit, Trash2 } from "lucide-react";

// ✅ Certification type (only once)
interface Certification {
  id: string;
  name: string;
  issuingOrganization: string;
  issueDate: string;
  expiryDate: string;
  credentialId: string;
  status: "Active" | "Expiring Soon" | "Expired";
  verificationUrl: string;
  category: string;
  level: "Foundation" | "Intermediate" | "Advanced" | "Professional";
  daysUntilExpiry: number;
}

const ProfessionalCertifications = () => {
  const [selectedRows, setSelectedRows] = useState<Certification[]>([]);

  // ✅ Mock data
  const mockData: Certification[] = [
    {
      id: "CERT-001",
      name: "AWS Certified Solutions Architect",
      issuingOrganization: "Amazon Web Services",
      issueDate: "2023-08-15",
      expiryDate: "2026-08-15",
      credentialId: "AWS-SA-2023-001234",
      status: "Active",
      verificationUrl: "https://aws.amazon.com/verification/12345",
      category: "Cloud Computing",
      level: "Professional",
      daysUntilExpiry: 892,
    },
    {
      id: "CERT-002",
      name: "Certified Scrum Master",
      issuingOrganization: "Scrum Alliance",
      issueDate: "2023-06-20",
      expiryDate: "2025-06-20",
      credentialId: "CSM-2023-567890",
      status: "Active",
      verificationUrl: "https://scrumalliance.org/verify/67890",
      category: "Project Management",
      level: "Intermediate",
      daysUntilExpiry: 527,
    },
    {
      id: "CERT-003",
      name: "Google Cloud Professional Developer",
      issuingOrganization: "Google Cloud",
      issueDate: "2023-03-10",
      expiryDate: "2025-03-10",
      credentialId: "GCP-PD-2023-111222",
      status: "Active",
      verificationUrl: "https://cloud.google.com/certification/verify/111222",
      category: "Cloud Computing",
      level: "Professional",
      daysUntilExpiry: 425,
    },
    {
      id: "CERT-004",
      name: "PMP - Project Management Professional",
      issuingOrganization: "Project Management Institute",
      issueDate: "2022-11-15",
      expiryDate: "2025-11-15",
      credentialId: "PMP-2022-333444",
      status: "Active",
      verificationUrl: "https://pmi.org/verify/333444",
      category: "Project Management",
      level: "Professional",
      daysUntilExpiry: 674,
    },
    {
      id: "CERT-005",
      name: "Certified Kubernetes Administrator",
      issuingOrganization: "Cloud Native Computing Foundation",
      issueDate: "2022-09-20",
      expiryDate: "2024-09-20",
      credentialId: "CKA-2022-555666",
      status: "Expiring Soon",
      verificationUrl: "https://cncf.io/verify/555666",
      category: "DevOps",
      level: "Advanced",
      daysUntilExpiry: 45,
    },
    {
      id: "CERT-006",
      name: "Microsoft Azure Fundamentals",
      issuingOrganization: "Microsoft",
      issueDate: "2021-12-10",
      expiryDate: "2023-12-10",
      credentialId: "AZ-900-2021-777888",
      status: "Expired",
      verificationUrl: "https://microsoft.com/verify/777888",
      category: "Cloud Computing",
      level: "Foundation",
      daysUntilExpiry: -45,
    },
  ];

  // ✅ Badge helper
  const getStatusBadge = (status: string, daysUntilExpiry: number) => {
    if (status === "Expired") {
      return <Badge className="bg-red-100 text-red-800">Expired</Badge>;
    }
    if (daysUntilExpiry <= 90) {
      return (
        <Badge className="bg-yellow-100 text-yellow-800">Expiring Soon</Badge>
      );
    }
    return <Badge className="bg-green-100 text-green-800">Active</Badge>;
  };

  // ✅ Table columns
  const columns: ColumnConfig<Certification>[] = [
    {
      name: "name",
      label: "Certification",
      isSortable: true,
      isSearchable: true,
      render: (value, row) => (
        <div className="flex items-start space-x-3">
          <Award className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <div className="font-medium text-foreground">{value}</div>
            <div className="text-sm text-muted-foreground">
              {row.issuingOrganization}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              ID: {row.credentialId}
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "category",
      label: "Category",
      isSortable: true,
      isFilterable: true,
      filterOptions: [
        { key: "Cloud Computing", value: "Cloud Computing", color: "#dcfce7" },
        {
          key: "Project Management",
          value: "Project Management",
          color: "#ddd6fe",
        },
        { key: "DevOps", value: "DevOps", color: "#fef3c7" },
      ],
    },
    {
      name: "level",
      label: "Level",
      isSortable: true,
      isFilterable: true,
      filterOptions: [
        { key: "Foundation", value: "Foundation", color: "#f3f4f6" },
        { key: "Intermediate", value: "Intermediate", color: "#fef3c7" },
        { key: "Advanced", value: "Advanced", color: "#ddd6fe" },
        { key: "Professional", value: "Professional", color: "#dcfce7" },
      ],
    },
    { name: "issueDate", label: "Issue Date", isSortable: true },
    {
      name: "expiryDate",
      label: "Expiry Date",
      isSortable: true,
      render: (value, row) => (
        <div className="flex items-center gap-2">
          <span>{value}</span>
          {row.daysUntilExpiry <= 90 && row.daysUntilExpiry > 0 && (
            <AlertTriangle className="w-4 h-4 text-yellow-500" />
          )}
          {row.daysUntilExpiry <= 0 && (
            <AlertTriangle className="w-4 h-4 text-red-500" />
          )}
        </div>
      ),
    },
    {
      name: "daysUntilExpiry",
      label: "Days Until Expiry",
      isSortable: true,
      align: "center",
      render: (value) => (
        <span
          className={`text-sm ${
            value <= 0
              ? "text-red-600"
              : value <= 90
              ? "text-yellow-600"
              : "text-green-600"
          }`}
        >
          {value <= 0 ? "Expired" : `${value} days`}
        </span>
      ),
    },
    {
      name: "status",
      label: "Status",
      isSortable: true,
      isFilterable: true,
      render: (value, row) => getStatusBadge(value, row.daysUntilExpiry),
      filterOptions: [
        { key: "Active", value: "Active", color: "#dcfce7" },
        { key: "Expiring Soon", value: "Expiring Soon", color: "#fef3c7" },
        { key: "Expired", value: "Expired", color: "#fee2e2" },
      ],
    },
  ];

  // ✅ Handlers
  const handleFilter = (filters: FilterConfig) =>
    console.log("Applied filters:", filters);
  const handleSearch = (term: string, columns: string[]) =>
    console.log("Search:", term, columns);
  const handleExportXLSX = () => console.log("Export XLSX");
  const handleExportCSV = () => console.log("Export CSV");
  const handleSelectionChange = (selected: Certification[]) =>
    setSelectedRows(selected);

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Certifications Management
          </h1>
          <p className="text-muted-foreground">
            Track and manage your professional certifications and credentials
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => console.log("Upload certificate")}
            variant="outline"
          >
            <Upload className="w-4 h-4 mr-2" /> Upload Certificate
          </Button>
          <Button onClick={() => console.log("Add certification")}>
            <Plus className="w-4 h-4 mr-2" /> Add Certification
          </Button>
          {selectedRows.length > 0 && (
            <>
              <Button
                onClick={() => console.log("Edit")}
                variant="outline"
                size="sm"
              >
                <Edit className="w-4 h-4 mr-2" /> Edit ({selectedRows.length})
              </Button>
              <Button
                onClick={() => console.log("Delete")}
                variant="destructive"
                size="sm"
              >
                <Trash2 className="w-4 h-4 mr-2" /> Delete (
                {selectedRows.length})
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
        onExport={{ xlsx: handleExportXLSX, csv: handleExportCSV }}
        selectable
        onSelectionChange={handleSelectionChange}
        globalSearchPlaceholder="Search certifications..."
        pagination={{ enabled: true, pageSize: 10, currentPage: 1 }}
      />
    </div>
  );
};

export default ProfessionalCertifications;
