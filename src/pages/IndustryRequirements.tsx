import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import IndustryHeader from "@/components/industry/IndustryHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Filter, Plus, FileText, Eye, Workflow, ShoppingCart, Edit, Calendar, DollarSign, Users, CheckCircle, Clock, XCircle, AlertTriangle } from "lucide-react";
import { useModal } from "@/hooks/useModal";
import { BaseModal } from "@/components/shared/modals/BaseModal";
import { toast } from "sonner";

interface Requirement {
  id: string;
  title: string;
  category: "Product" | "Service" | "Expert" | "Logistics";
  status: "Draft" | "Active" | "Pending" | "Completed" | "Approved" | "Published";
  priority: "Low" | "Medium" | "High" | "Critical";
  budget: number;
  createdDate: string;
  deadline: string;
  applicants: number;
  complianceRequired: boolean;
  riskLevel: "Low" | "Medium" | "High" | "Critical";
  approvalStatus: "pending" | "approved" | "rejected";
  approvalTrail: {
    approverName: string;
    approverRole: string;
    status: "approved" | "rejected" | "pending";
    comments: string;
    timestamp: string;
    level: number;
  }[];
}

const mockRequirements: Requirement[] = [
  {
    id: "REQ-001",
    title: "Industrial Valve Procurement",
    category: "Product",
    status: "Pending",
    priority: "High",
    budget: 25000,
    createdDate: "2024-01-10",
    deadline: "2024-01-25",
    applicants: 8,
    complianceRequired: true,
    riskLevel: "Medium",
    approvalStatus: "pending",
    approvalTrail: [
      {
        approverName: "John Smith",
        approverRole: "Department Head",
        status: "approved",
        comments: "Budget approved for Q1 procurement",
        timestamp: "2024-01-12T10:30:00Z",
        level: 1
      },
      {
        approverName: "Sarah Johnson", 
        approverRole: "Procurement Manager",
        status: "pending",
        comments: "",
        timestamp: "",
        level: 2
      }
    ]
  },
  {
    id: "REQ-002", 
    title: "Pipeline Inspection Service",
    category: "Service",
    status: "Approved",
    priority: "Critical",
    budget: 35000,
    createdDate: "2024-01-08",
    deadline: "2024-01-20",
    applicants: 12,
    complianceRequired: true,
    riskLevel: "High",
    approvalStatus: "approved",
    approvalTrail: [
      {
        approverName: "John Smith",
        approverRole: "Department Head", 
        status: "approved",
        comments: "Critical safety requirement approved",
        timestamp: "2024-01-09T08:15:00Z",
        level: 1
      },
      {
        approverName: "Michael Brown",
        approverRole: "Finance Director",
        status: "approved", 
        comments: "Emergency budget allocation approved",
        timestamp: "2024-01-09T14:20:00Z",
        level: 2
      }
    ]
  },
  {
    id: "REQ-003",
    title: "Chemical Engineering Consultant",
    category: "Expert",
    status: "Published",
    priority: "Medium",
    budget: 15000,
    createdDate: "2024-01-12",
    deadline: "2024-01-28",
    applicants: 5,
    complianceRequired: false,
    riskLevel: "Low",
    approvalStatus: "approved",
    approvalTrail: [
      {
        approverName: "John Smith",
        approverRole: "Department Head",
        status: "approved",
        comments: "Consulting services approved for project enhancement",
        timestamp: "2024-01-13T16:45:00Z",
        level: 1
      }
    ]
  },
  {
    id: "REQ-004",
    title: "Equipment Transportation",
    category: "Logistics",
    status: "Rejected",
    priority: "High", 
    budget: 8000,
    createdDate: "2024-01-05",
    deadline: "2024-01-18",
    applicants: 15,
    complianceRequired: true,
    riskLevel: "Medium",
    approvalStatus: "rejected",
    approvalTrail: [
      {
        approverName: "Sarah Johnson",
        approverRole: "Procurement Manager",
        status: "rejected",
        comments: "Budget allocation not available for this quarter. Please resubmit with reduced scope.",
        timestamp: "2024-01-07T11:30:00Z",
        level: 1
      }
    ]
  }
];

const ApprovalTrailModal = ({ requirement, isOpen, onClose }: { requirement: any, isOpen: boolean, onClose: () => void }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Approval Trail - ${requirement?.title}`}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6">
        <div className="border-b pb-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Requirement ID</p>
              <p className="font-medium">{requirement?.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Overall Status</p>
              {getStatusBadge(requirement?.approvalStatus)}
            </div>
            <div>
              <p className="text-sm text-gray-500">Budget</p>
              <p className="font-medium">${requirement?.budget.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Priority</p>
              <Badge className={
                requirement?.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                requirement?.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                requirement?.priority === 'Medium' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }>
                {requirement?.priority}
              </Badge>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Approval Timeline</h3>
          <div className="space-y-3">
            {requirement?.approvalTrail?.map((step: any, index: number) => (
              <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                  {getStatusIcon(step.status)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium text-gray-900">{step.approverName}</p>
                      <p className="text-sm text-gray-500">{step.approverRole} • Level {step.level}</p>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(step.status)}
                      {step.timestamp && (
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(step.timestamp).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                  {step.comments && (
                    <div className="p-2 bg-gray-50 rounded text-sm text-gray-700">
                      <strong>Comments:</strong> {step.comments}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

const IndustryRequirements = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedRequirement, setSelectedRequirement] = useState<any>(null);
  const { isOpen: isTrailModalOpen, openModal: openTrailModal, closeModal: closeTrailModal } = useModal();

  const handleViewApprovalTrail = (requirement: any) => {
    setSelectedRequirement(requirement);
    openTrailModal();
  };

  const filteredRequirements = mockRequirements.filter(req => {
    const matchesSearch = req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         req.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || req.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || req.category === categoryFilter;
    const matchesPriority = priorityFilter === "all" || req.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800 border-green-200";
      case "Published": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Completed": return "bg-purple-100 text-purple-800 border-purple-200";
      case "Approved": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Draft": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-100 text-red-800 border-red-200";
      case "High": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Medium": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Low": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Product": return "bg-purple-100 text-purple-800 border-purple-200";
      case "Service": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Expert": return "bg-green-100 text-green-800 border-green-200";
      case "Logistics": return "bg-amber-100 text-amber-800 border-amber-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Critical": return "bg-red-100 text-red-800";
      case "High": return "bg-orange-100 text-orange-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getApprovalStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getApprovalStatusIcon = (status: string) => {
    switch (status) {
      case "approved": return <CheckCircle className="h-3 w-3 mr-1" />;
      case "rejected": return <XCircle className="h-3 w-3 mr-1" />;
      case "pending": return <Clock className="h-3 w-3 mr-1" />;
      default: return null;
    }
  };

  const stats = {
    total: mockRequirements.length,
    active: mockRequirements.filter(r => r.status === "Active" || r.status === "Published").length,
    completed: mockRequirements.filter(r => r.status === "Completed").length,
    totalBudget: mockRequirements.reduce((sum, r) => sum + r.budget, 0),
    avgApplicants: Math.round(mockRequirements.reduce((sum, r) => sum + r.applicants, 0) / mockRequirements.length)
  };

  React.useEffect(() => {
    const recentlyApproved = mockRequirements.find(req => 
      req.approvalStatus === 'approved' && req.id === 'REQ-002'
    );
    const recentlyRejected = mockRequirements.find(req => 
      req.approvalStatus === 'rejected' && req.id === 'REQ-004'
    );

    if (recentlyApproved) {
      setTimeout(() => {
        toast.success(`Your requirement "${recentlyApproved.title}" has been Approved by all approvers`);
      }, 1000);
    }

    if (recentlyRejected) {
      setTimeout(() => {
        toast.error(`Your requirement "${recentlyRejected.title}" was Rejected. Please review the comments.`);
      }, 2000);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>Requirements Management | Diligince.ai</title>
      </Helmet>
      
      <IndustryHeader />
      
      <main className="flex-1 container mx-auto px-4 py-8 pt-20">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
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

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Requirements</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active</p>
                    <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-purple-600">{stats.completed}</p>
                  </div>
                  <ShoppingCart className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Budget</p>
                    <p className="text-2xl font-bold text-orange-600">${stats.totalBudget.toLocaleString()}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg Applicants</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.avgApplicants}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filters */}
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
              <option value="Published">Published</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Approved">Approved</option>
            </select>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="Product">Product</option>
              <option value="Service">Service</option>
              <option value="Expert">Expert</option>
              <option value="Logistics">Logistics</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Priority</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
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
                  <TableHead>Approval Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Risk</TableHead>
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
                        <div className="font-medium text-gray-900 flex items-center gap-2">
                          {req.title}
                          {req.priority === "Critical" && (
                            <Badge className="bg-red-100 text-red-800">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Urgent
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">{req.id}</div>
                        <div className="text-xs text-gray-400">Created: {new Date(req.createdDate).toLocaleDateString()}</div>
                        {req.complianceRequired && (
                          <Badge className="bg-blue-100 text-blue-800 text-xs mt-1">ISO 9001</Badge>
                        )}
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
                      <Badge className={getApprovalStatusColor(req.approvalStatus)}>
                        {getApprovalStatusIcon(req.approvalStatus)}
                        {req.approvalStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(req.priority)}>
                        {req.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRiskColor(req.riskLevel)}>
                        {req.riskLevel}
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
                        {req.status === "Draft" && (
                          <Button size="sm" variant="outline" asChild>
                            <Link to={`/create-requirement?edit=${req.id}`} className="flex items-center gap-1">
                              <Edit className="h-3 w-3" />
                              Edit
                            </Link>
                          </Button>
                        )}
                        <Button size="sm" variant="outline" asChild>
                          <Link to={`/requirement/${req.id}`} className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            View
                          </Link>
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewApprovalTrail(req)}
                          className="flex items-center gap-1"
                        >
                          <Users className="h-3 w-3" />
                          Trail
                        </Button>
                        {(req.status === "Active" || req.status === "Published") && (
                          <Button size="sm" variant="outline" asChild>
                            <Link to={`/industry-project-workflow/${req.id}`} className="flex items-center gap-1">
                              <Workflow className="h-3 w-3" />
                              Workflow
                            </Link>
                          </Button>
                        )}
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
