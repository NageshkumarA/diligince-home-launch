import React, { useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import RequirementCard from '../components/RequirementCard';
import { Plus, Filter, Search } from 'lucide-react';
import CustomTable, { ColumnConfig, FilterConfig } from '../components/CustomTable';
import { SteppedForm } from '../components/form';

const Requirements: React.FC = () => {
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Sample data matching the reference image
  const sampleData = [
    {
      ticketId: '627',
      machineType: 'Negative',
      serialNumber: '17CX7991',
      status: 'Awaiting Spare Parts',
      centerCode: '346-MH-NGP-DHP-C',
      breakdownType: 'Blood pump problem',
      centerName: 'Dharampeth, Nagpur',
      issueType: 'Pump assembly',
    },
    {
      ticketId: '624',
      machineType: 'Hep C Positive',
      serialNumber: '17CX8005',
      status: 'Awaiting Spare Parts',
      centerCode: '346-MH-NGP-DHP-C',
      breakdownType: 'Blood leak alarm',
      centerName: 'Dharampeth, Nagpur',
      issueType: 'Filter blockage',
    },
    {
      ticketId: '623',
      machineType: 'Negative',
      serialNumber: '17CX7991',
      status: 'Condemn Initiated',
      centerCode: '346-MH-NGP-DHP-C',
      breakdownType: 'Blood pump problem',
      centerName: 'Dharampeth, Nagpur',
      issueType: 'Mishandling',
    },
    {
      ticketId: '622',
      machineType: 'Hep C Positive',
      serialNumber: '17CX8005',
      status: 'Todo',
      centerCode: '346-MH-NGP-DHP-C',
      breakdownType: 'Blood leak alarm',
      centerName: 'Dharampeth, Nagpur',
      issueType: 'Filter blockage',
    },
    {
      ticketId: '614',
      machineType: 'Negative',
      serialNumber: '17CX8006',
      status: 'Todo',
      centerCode: '346-MH-NGP-DHP-C',
      breakdownType: 'Blood leak alarm',
      centerName: 'Dharampeth, Nagpur',
      issueType: 'Filter blockage',
    },
    {
      ticketId: '613',
      machineType: 'Negative',
      serialNumber: '17CX8006',
      status: 'Todo',
      centerCode: '346-MH-NGP-DHP-C',
      breakdownType: 'Blood leak alarm',
      centerName: 'Dharampeth, Nagpur',
      issueType: 'Filter blockage',
    },
    {
      ticketId: '600',
      machineType: 'Hep C Positive',
      serialNumber: '17CX8005',
      status: 'Awaiting Spare Parts',
      centerCode: '346-MH-NGP-DHP-C',
      breakdownType: 'Blood pump problem',
      centerName: 'Dharampeth, Nagpur',
      issueType: 'Pump assembly',
    },
    {
      ticketId: '571',
      machineType: 'Hep C Positive',
      serialNumber: '17CX8005',
      status: 'Request to Condemn',
      centerCode: '346-MH-NGP-DHP-C',
      breakdownType: 'Blood pump problem',
      centerName: 'Dharampeth, Nagpur',
      issueType: 'Age factor',
    },
    {
      ticketId: '564',
      machineType: 'Hep C Positive',
      serialNumber: '17CX8005',
      status: 'Awaiting Inspection',
      centerCode: '346-MH-NGP-DHP-C',
      breakdownType: 'Blood pump problem',
      centerName: 'Dharampeth, Nagpur',
      issueType: 'Mishandling',
    },
    {
      ticketId: '560',
      machineType: 'Hep C Positive',
      serialNumber: '17CX8005',
      status: 'Awaiting Spare Parts',
      centerCode: '346-MH-NGP-DHP-C',
      breakdownType: 'Blood leak alarm',
      centerName: 'Dharampeth, Nagpur',
      issueType: 'Filter blockage',
    },
  ];


  const handleShowInterest = () => {
    alert('Interest shown! Chat will be enabled with the industry.');
  };

  const handleSendQuotation = () => {
    alert('Quotation form opened! After sending, chat will be enabled.');
  };

  const handleViewChats = () => {
    alert('Opening chat list with interested professionals and vendors.');
  };

  const getPageTitle = () => {
    if (user?.role === 'industry') return 'My Requirements';
    if (user?.role === 'professional') return 'Available Opportunities';
    if (user?.role === 'vendor') return 'Business Requirements';
    return 'Requirements';
  };

  const getPageDescription = () => {
    if (user?.role === 'industry') return 'Manage your posted requirements and view proposals from professionals and vendors.';
    if (user?.role === 'professional') return 'Browse available opportunities and show interest to connect with industries.';
    if (user?.role === 'vendor') return 'Find business requirements and submit quotations to potential clients.';
    return 'Browse requirements and opportunities.';
  };

  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const columns: ColumnConfig[] = [
    {
      name: 'ticketId',
      label: 'Ticket ID',
      isSortable: true,
      isSearchable: true,
      action: (row) => {
        alert(`Clicked on ticket #${row.ticketId}`);
      },
      width: '32',
    },
    {
      name: 'machineType',
      label: 'Machine Type',
      isSortable: true,
      isSearchable: true,
      isFilterable: true,
      filterOptions: [
        { key: 'Negative', value: 'Negative' },
        { key: 'Hep C Positive', value: 'Hep C Positive' },
      ],
    },
    {
      name: 'serialNumber',
      label: 'Machine Serial No',
      isSortable: true,
      isSearchable: true,
    },
    {
      name: 'status',
      label: 'Status',
      isSortable: true,
      isFilterable: true,
      filterOptions: [
        { key: 'Awaiting Spare Parts', value: 'Awaiting Spare Parts', color: '#ddd6fe' },
        { key: 'Todo', value: 'Todo', color: '#e9d5ff' },
        { key: 'Condemn Initiated', value: 'Condemn Initiated', color: '#dcfce7' },
        { key: 'Request to Condemn', value: 'Request to Condemn', color: '#fef3c7' },
        { key: 'Awaiting Inspection', value: 'Awaiting Inspection', color: '#fed7aa' },
      ],
    },
    {
      name: 'centerCode',
      label: 'Center Code',
      isSortable: true,
      isSearchable: true,
      align: 'center',
    },
    {
      name: 'breakdownType',
      label: 'BreakDown Type',
      isSortable: true,
      isSearchable: true,
      isFilterable: true,
      filterOptions: [
        { key: 'Blood pump problem', value: 'Blood pump problem' },
        { key: 'Blood leak alarm', value: 'Blood leak alarm' },
      ],
    },
    {
      name: 'centerName',
      label: 'Center Name',
      isSortable: true,
      isSearchable: true,
    },
    {
      name: 'issueType',
      label: 'Issue Type',
      isSortable: true,
      isSearchable: true,
      isFilterable: true,
      filterOptions: [
        { key: 'Pump assembly', value: 'Pump assembly' },
        { key: 'Filter blockage', value: 'Filter blockage' },
        { key: 'Mishandling', value: 'Mishandling' },
        { key: 'Age factor', value: 'Age factor' },
      ],
    },
  ];

  const handleFilterCallback = (filters: FilterConfig) => {
    console.log('Applied filters:', filters);
  };

  const handleSearchCallback = (searchTerm: string, selectedColumns: string[]) => {
    console.log('Search term:', searchTerm);
    console.log('Selected columns:', selectedColumns);

    // Here you would typically call your API
    // Example: searchAPI(searchTerm, selectedColumns).then(results => setData(results));

    // For demo purposes, we'll filter the existing data
    if (!searchTerm.trim()) {
      // If no search term, show all data
      return;
    }

    const filteredResults = sampleData.filter((row: any) =>
      selectedColumns.some((columnName: any) => {
        const value = row[columnName];
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      })
    );

    console.log('Filtered results:', filteredResults);
    // In a real app, you would update your data state here
  };
  const handleExportXLSX = () => {
    console.log('Exporting to XLSX...');
    alert('XLSX Export functionality triggered!');
    // Here you would call your API to generate XLSX file
    // Example: exportAPI('xlsx', selectedRows.length > 0 ? selectedRows : sampleData);
  };

  const handleExportCSV = () => {
    console.log('Exporting to CSV...');
    alert('CSV Export functionality triggered!');
    // Here you would call your API to generate CSV file
    // Example: exportAPI('csv', selectedRows.length > 0 ? selectedRows : sampleData);
  };

  const handleAdd = () => {
    console.log('Adding new item...');
    setIsOpen(true)
    // alert('Add functionality triggered!');
  };

  const handleRowClick = (row: any) => {
    console.log('Row clicked:', row);
  };

  const handleSelectionChange = (selected: any[]) => {
    setSelectedRows(selected);
    console.log('Selection changed:', selected);
  };
  const [isOpen, setIsOpen] = useState(false);
  const handleComplete = (data: any) => {
    console.log("Form completed with data:", data)
  }


  return (
    <div className="p-6 m-6 bg-white rounded-lg">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#333333] mb-2">{getPageTitle()}</h1>
          <p className="text-[#828282]">{getPageDescription()}</p>
        </div>
      </div>

      <CustomTable
        columns={columns}
        data={sampleData}
        filterCallback={handleFilterCallback}
        searchCallback={handleSearchCallback}
        onRowClick={handleRowClick}
        onExport={{
          xlsx: handleExportXLSX,
          csv: handleExportCSV,
        }}
        onAdd={handleAdd}
        selectable={true}
        onSelectionChange={handleSelectionChange}
        globalSearchPlaceholder="Search tickets..."
        pagination={{
          enabled: true,
          pageSize: 10,
          currentPage: 1,
        }}
      />
      {/* Overlay */}
      <div
        className={`fixed top-0 right-0 h-full w-full bg-black bg-opacity-40 z-40 transition-opacity duration-300 hover:cursor-not-allowed ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      // onClick={() => setIsOpen(false)}
      />
      {/* Slide-In Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[95%] bg-white shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold">Create Procurement Requirement</h2>
          <button onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-black text-xl">
            &times;
          </button>
        </div>

        {/* Form or content goes here */}
        <div className="p-4 scrollable h-[100%]">
          <SteppedForm onComplete={handleComplete} />
        </div>
      </div>
    </div>
  );
};

export default Requirements;