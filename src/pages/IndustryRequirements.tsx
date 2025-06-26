
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import IndustryHeader from "@/components/industry/IndustryHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Plus, FileText, Eye, Workflow, ShoppingCart } from "lucide-react";

interface Requirement {
  id: string;
  title: string;
  category: "Product" | "Service" | "Expert" | "Logistics";
  status: "Draft" | "Active" | "Pending" | "Completed" | "Approved";
  priority: "Low" | "Medium" | "High" | "Critical";
  budget: number;
  createdDate: string;
  deadline: string;
  applicants: number;
}

const mockRequirements: Requirement[] = [
  {
    id: "REQ-001",
    title: "Industrial Valve Procurement",
    category: "Product",
    status: "Active",
    priority: "High",
    budget: 25000,
    createdDate: "2024-01-10",
    deadline: "2024-01-25",
    applicants: 8
  },
  {
    id: "REQ-002", 
    title: "Pipeline Inspection Service",
    category: "Service",
    status: "Completed",
    priority: "Critical",
    budget: 35000,
    createdDate: "2024-01-08",
    deadline: "2024-01-20",
    applicants: 12
  },
  {
    id: "REQ-003",
    title: "Chemical Engineering Consultant",
    category: "Expert",
    status: "Active",
    priority: "Medium",
    budget: 15000,
    createdDate: "2024-01-12",
    deadline: "2024-01-28",
    applicants: 5
  },
  {
    id: "REQ-004",
    title: "Equipment Transportation",
    category: "Logistics",
    status: "Approved",
    priority: "High",
    budget: 8000,
    createdDate: "2024-01-05",
    deadline: "2024-01-18",
    applicants: 15
  }
];

const IndustryRequirements = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredRequirements = mockRequirements.filter(req => {
    const matchesSearch = req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         req.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || req.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Completed": return "bg-blue-100 text-blue-800";
      case "Approved": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-100 text-red-800";
      case "High": return "bg-orange-100 text-orange-800";
      case "Medium": return "bg-blue-100 text-blue-800";
      case "Low": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Product": return "bg-purple-100 text-purple-800";
      case "Service": return "bg-blue-100 text-blue-800";
      case "Expert": return "bg-green-100 text-green-800";
      case "Logistics": return "bg-amber-100 text-amber-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>Requirements Management | Diligince.ai</title>
      </Helmet>
      
      <IndustryHeader />
      
      <main className="flex-1 container mx-auto px-4 py-8 pt-20">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Requirements Management</h1>
              <p className="text-gray-600">Manage all your procurement requirements and track their progress</p>
            </div>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link to="/create-requirement" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create New Requirement
              </Link>
            </Button>
          </div>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search requirements by title or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="Draft">Draft</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Approved">Approved</option>
            </select>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              All Requirements ({filteredRequirements.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Requirement</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Applicants</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequirements.map((req) => (
                  <TableRow key={req.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{req.title}</div>
                        <div className="text-sm text-gray-500">{req.id}</div>
                        <div className="text-xs text-gray-400">Created: {new Date(req.createdDate).toLocaleDateString()}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getCategoryColor(req.category)}>
                        {req.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(req.status)}>
                        {req.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(req.priority)}>
                        {req.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      ${req.budget.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {new Date(req.deadline).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{req.applicants}</span> vendors
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <Link to={`/requirement/${req.id}`} className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            View
                          </Link>
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <Link to={`/industry-project-workflow/${req.id}`} className="flex items-center gap-1">
                            <Workflow className="h-3 w-3" />
                            Workflow
                          </Link>
                        </Button>
                        {req.status === "Completed" && (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700" asChild>
                            <Link to={`/create-purchase-order?requirementId=${req.id}`} className="flex items-center gap-1">
                              <ShoppingCart className="h-3 w-3" />
                              Create PO
                            </Link>
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {filteredRequirements.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No requirements found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search criteria or create a new requirement.</p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link to="/create-requirement">
                Create New Requirement
              </Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default IndustryRequirements;
