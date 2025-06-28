import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IndustryHeader from '@/components/industry/IndustryHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Filter, Eye, Edit, Trash2, FileText, Calendar, DollarSign } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

const IndustryRequirements = () => {
  const navigate = useNavigate();

  // Mock requirements data
  const [requirements] = useState([
    {
      id: 'REQ-2024-001',
      title: 'Industrial Equipment Procurement',
      category: 'Equipment',
      priority: 'High',
      status: 'Active' as const,
      budget: 150000,
      createdDate: '2024-01-15',
      deadline: '2024-03-01',
      description: 'Procurement of industrial valves and pressure control systems'
    },
    {
      id: 'REQ-2024-002',
      title: 'Pipeline Inspection Services',
      category: 'Services',
      priority: 'Medium',
      status: 'Draft' as const,
      budget: 75000,
      createdDate: '2024-01-20',
      deadline: '2024-02-28',
      description: 'Comprehensive pipeline inspection and maintenance services'
    },
    {
      id: 'REQ-2024-003',
      title: 'Safety Compliance Audit',
      category: 'Professional Services',
      priority: 'High',
      status: 'Completed' as const,
      budget: 25000,
      createdDate: '2024-01-10',
      deadline: '2024-01-30',
      description: 'Full safety compliance audit and certification'
    },
    {
      id: 'REQ-2024-004',
      title: 'Equipment Transportation',
      category: 'Logistics',
      priority: 'Low',
      status: 'Pending' as const,
      budget: 30000,
      createdDate: '2024-01-18',
      deadline: '2024-02-15',
      description: 'Transportation of heavy industrial equipment'
    }
  ]);

  const handleViewRequirement = (requirementId: string) => {
    navigate(`/industry-project-workflow/${requirementId}`);
  };

  const handleCreateRequirement = () => {
    // Navigate to the create requirement page
    navigate('/create-industry-requirement');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <IndustryHeader />
      
      <main className="flex-1 container max-w-7xl mx-auto px-4 py-8 pt-20">
        {/* Header Section */}
        <div className="mb-8">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="cursor-pointer text-blue-600 hover:text-blue-700">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage className="text-gray-700">Requirements</BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Industry Requirements
              </h1>
              <p className="text-gray-600 text-lg">
                Manage and track your project requirements.
              </p>
            </div>
            <Button onClick={handleCreateRequirement} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              Create Requirement
            </Button>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search requirements..."
                className="pl-10 pr-4 py-2 border rounded-md w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        {/* Requirements Table */}
        <Card className="bg-white shadow-sm border border-gray-200">
          <CardHeader className="py-4 px-5 border-b border-gray-100">
            <CardTitle className="text-lg font-semibold text-gray-800">
              Requirement List
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold text-gray-700">Title</TableHead>
                  <TableHead className="font-semibold text-gray-700">Category</TableHead>
                  <TableHead className="font-semibold text-gray-700">Priority</TableHead>
                  <TableHead className="font-semibold text-gray-700">Status</TableHead>
                  <TableHead className="font-semibold text-gray-700">Budget</TableHead>
                  <TableHead className="font-semibold text-gray-700">Deadline</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requirements.map((requirement) => (
                  <TableRow key={requirement.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-900">{requirement.title}</TableCell>
                    <TableCell className="text-gray-600">{requirement.category}</TableCell>
                    <TableCell className="text-gray-600">{requirement.priority}</TableCell>
                    <TableCell className="text-gray-600">{requirement.status}</TableCell>
                    <TableCell className="text-gray-600">${requirement.budget.toLocaleString()}</TableCell>
                    <TableCell className="text-gray-600">{requirement.deadline}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-gray-300 text-gray-500 hover:bg-gray-50"
                          onClick={() => handleViewRequirement(requirement.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-gray-300 text-gray-500 hover:bg-gray-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-gray-300 text-gray-500 hover:bg-gray-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default IndustryRequirements;
