import React, { useState } from 'react';
import CustomTable from '@/components/CustomTable';
import { ColumnConfig, FilterConfig } from '@/types/table';
import { Button } from '@/components/ui/button';
import { Upload, Download, FileText, Image, Archive, Trash2 } from 'lucide-react';
import AISearchBar from '@/components/shared/AISearchBar';

const IndustryDocuments = () => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const mockData = [
    {
      id: 'DOC-001',
      name: 'Mobile App Development RFP.pdf',
      type: 'RFP Document',
      category: 'Requirements',
      size: '2.4 MB',
      uploadedBy: 'Sarah Johnson',
      uploadDate: '2024-01-30',
      lastModified: '2024-01-30',
      status: 'Active',
      relatedTo: 'REQ-007',
      fileType: 'pdf',
      downloads: 12
    },
    {
      id: 'DOC-002',
      name: 'Vendor Evaluation Criteria.xlsx',
      type: 'Evaluation Form',
      category: 'Vendor Management',
      size: '1.8 MB',
      uploadedBy: 'Robert Wilson',
      uploadDate: '2024-01-29',
      lastModified: '2024-01-29',
      status: 'Active',
      relatedTo: 'General',
      fileType: 'excel',
      downloads: 8
    },
    {
      id: 'DOC-003',
      name: 'Contract Template - Service Agreement.docx',
      type: 'Contract Template',
      category: 'Legal',
      size: '856 KB',
      uploadedBy: 'Emily Chen',
      uploadDate: '2024-01-28',
      lastModified: '2024-01-28',
      status: 'Active',
      relatedTo: 'General',
      fileType: 'word',
      downloads: 15
    },
    {
      id: 'DOC-004',
      name: 'Project Specifications - Warehouse System.pdf',
      type: 'Technical Spec',
      category: 'Requirements',
      size: '3.2 MB',
      uploadedBy: 'Michael Brown',
      uploadDate: '2024-01-27',
      lastModified: '2024-01-27',
      status: 'Active',
      relatedTo: 'REQ-006',
      fileType: 'pdf',
      downloads: 6
    },
    {
      id: 'DOC-005',
      name: 'Compliance Checklist.pdf',
      type: 'Compliance Document',
      category: 'Compliance',
      size: '1.2 MB',
      uploadedBy: 'Lisa Davis',
      uploadDate: '2024-01-26',
      lastModified: '2024-01-26',
      status: 'Archived',
      relatedTo: 'General',
      fileType: 'pdf',
      downloads: 3
    }
  ];

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return <FileText className="w-4 h-4 text-red-500" />;
      case 'excel':
        return <FileText className="w-4 h-4 text-green-500" />;
      case 'word':
        return <FileText className="w-4 h-4 text-blue-500" />;
      case 'image':
        return <Image className="w-4 h-4 text-purple-500" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const columns: ColumnConfig[] = [
    {
      name: 'name',
      label: 'Document',
      isSortable: true,
      isSearchable: true,
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          {getFileIcon(row.fileType)}
          <div>
            <div className="font-medium text-foreground">{value}</div>
            <div className="text-sm text-muted-foreground">{row.type}</div>
          </div>
        </div>
      )
    },
    {
      name: 'category',
      label: 'Category',
      isSortable: true,
      isFilterable: true,
      filterOptions: [
        { key: 'Requirements', value: 'Requirements', color: '#dcfce7' },
        { key: 'Vendor Management', value: 'Vendor Management', color: '#ddd6fe' },
        { key: 'Legal', value: 'Legal', color: '#fef3c7' },
        { key: 'Compliance', value: 'Compliance', color: '#fed7aa' },
        { key: 'Contracts', value: 'Contracts', color: '#fee2e2' }
      ]
    },
    {
      name: 'size',
      label: 'Size',
      isSortable: true,
      align: 'right'
    },
    {
      name: 'uploadedBy',
      label: 'Uploaded By',
      isSortable: true,
      isSearchable: true
    },
    {
      name: 'uploadDate',
      label: 'Upload Date',
      isSortable: true
    },
    {
      name: 'downloads',
      label: 'Downloads',
      isSortable: true,
      align: 'center'
    },
    {
      name: 'relatedTo',
      label: 'Related To',
      isSortable: true,
      isSearchable: true,
      render: (value, row) => (
        <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs ${
          value === 'General' ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary'
        }`}>
          {value}
        </span>
      )
    },
    {
      name: 'status',
      label: 'Status',
      isSortable: true,
      isFilterable: true,
      filterOptions: [
        { key: 'Active', value: 'Active', color: '#dcfce7' },
        { key: 'Archived', value: 'Archived', color: '#fef3c7' },
        { key: 'Draft', value: 'Draft', color: '#f3f4f6' }
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

  const handleUpload = () => {
    console.log('Upload document');
  };

  const handleDownloadSelected = () => {
    console.log('Download selected documents');
  };

  const handleArchiveSelected = () => {
    console.log('Archive selected documents');
  };

  const handleDeleteSelected = () => {
    console.log('Delete selected documents');
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Document Management</h1>
          <p className="text-muted-foreground">
            Manage all documents, templates, and files related to your procurement process
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={handleUpload}>
            <Upload className="w-4 h-4 mr-2" />
            Upload Document
          </Button>
          {selectedRows.length > 0 && (
            <>
              <Button onClick={handleDownloadSelected} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download ({selectedRows.length})
              </Button>
              <Button onClick={handleArchiveSelected} variant="outline" size="sm">
                <Archive className="w-4 h-4 mr-2" />
                Archive ({selectedRows.length})
              </Button>
              <Button onClick={handleDeleteSelected} variant="destructive" size="sm">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete ({selectedRows.length})
              </Button>
            </>
          )}
        </div>
      </div>

      {/* AI Search Bar */}
      <AISearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search documents with AI..."
      />

      <CustomTable
        columns={columns}
        data={mockData}
        hideSearch
        filterCallback={handleFilter}
        searchCallback={handleSearch}
        onExport={{
          xlsx: handleExportXLSX,
          csv: handleExportCSV
        }}
        selectable={true}
        onSelectionChange={handleSelectionChange}
        globalSearchPlaceholder="Search documents..."
        pagination={{
          enabled: true,
          pageSize: 15,
          currentPage: 1
        }}
      />
    </div>
  );
};

export default IndustryDocuments;