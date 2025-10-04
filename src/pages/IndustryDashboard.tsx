// src/pages/industry/IndustryDashboard.tsx

import React, { Suspense, memo, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  FileText,
  MessageSquare,
  ShoppingCart,
  CheckCircle,
  Clock,
  AlertTriangle,
  Plus,
  Workflow,
  Eye,
} from "lucide-react";
import { SkeletonLoader } from "@/components/shared/loading/SkeletonLoader";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";
import { perfUtils } from "@/utils/performance";
import { useApproval } from "@/contexts/ApprovalContext";
import { ApprovalModal } from "@/components/approval/ApprovalModal";
import { useModal } from "@/hooks/useModal";
import { toast } from "sonner";

// ---------------- Mock Data ----------------
const metrics = [
  {
    title: "Active Requirements",
    count: 12,
    subtitle: "ongoing projects",
    icon: FileText,
  },
  {
    title: "Pending Reviews",
    count: 8,
    subtitle: "awaiting approval",
    icon: Clock,
  },
  {
    title: "Active Purchase Orders",
    count: 5,
    subtitle: "in progress",
    icon: ShoppingCart,
  },
  {
    title: "Completed Projects",
    count: 27,
    subtitle: "this year",
    icon: CheckCircle,
  },
];

const requirementData = [
  {
    id: 1,
    title: "Industrial Valve Procurement",
    category: "Product",
    status: "Active",
    date: "2 days ago",
    budget: 25000,
    applicants: 8,
  },
  {
    id: 2,
    title: "Pipeline Inspection Service",
    category: "Service",
    status: "Completed",
    date: "1 week ago",
    budget: 35000,
    applicants: 12,
  },
  {
    id: 3,
    title: "Chemical Engineering Consultant",
    category: "Expert",
    status: "Active",
    date: "3 days ago",
    budget: 15000,
    applicants: 5,
  },
  {
    id: 4,
    title: "Equipment Transportation",
    category: "Logistics",
    status: "Approved",
    date: "2 weeks ago",
    budget: 8000,
    applicants: 15,
  },
  {
    id: 5,
    title: "Safety Audit Services",
    category: "Service",
    status: "Active",
    date: "5 days ago",
    budget: 12000,
    applicants: 7,
  },
];

const stakeholderData = [
  {
    id: 1,
    name: "TechValve Solutions",
    initials: "TV",
    type: "Product Vendor",
    rating: 4.8,
    projects: 28,
  },
  {
    id: 2,
    name: "EngiConsult Group",
    initials: "EG",
    type: "Expert",
    rating: 4.9,
    projects: 45,
  },
  {
    id: 3,
    name: "Service Pro Maintenance",
    initials: "SP",
    type: "Service Vendor",
    rating: 4.7,
    projects: 32,
  },
  {
    id: 4,
    name: "FastTrack Logistics",
    initials: "FL",
    type: "Logistics",
    rating: 4.6,
    projects: 67,
  },
];

const messageData = [
  {
    id: 1,
    sender: "John Smith",
    initials: "JS",
    preview: "Updated proposal for the valve procurement project...",
    time: "10 min ago",
    requirementId: "REQ-001",
  },
  {
    id: 2,
    sender: "TechValve Solutions",
    initials: "TV",
    preview: "Thank you for your order. Shipment tracking details...",
    time: "2 hours ago",
    requirementId: "REQ-002",
  },
  {
    id: 3,
    sender: "EngiConsult Group",
    initials: "EG",
    preview: "Our engineer is available for consultation on...",
    time: "Yesterday",
    requirementId: "REQ-003",
  },
];

const orderData = [
  {
    id: "PO-2023-042",
    title: "Industrial Valve Set",
    vendor: "TechValve Solutions",
    summary: "3 items",
    status: "In Progress",
    progress: 65,
    amount: 25000,
    requirementId: "REQ-001",
  },
  {
    id: "PO-2023-039",
    title: "Safety Equipment",
    vendor: "ProtectWell Inc",
    summary: "12 items",
    status: "Delivered",
    progress: 100,
    amount: 15000,
    requirementId: "REQ-004",
  },
  {
    id: "PO-2023-036",
    title: "Consulting Services",
    vendor: "EngiConsult Group",
    summary: "1 service",
    status: "In Progress",
    progress: 40,
    amount: 35000,
    requirementId: "REQ-002",
  },
];

const mockPendingApprovals = [
  {
    id: "approval-001",
    requirementId: "REQ-001",
    requirementTitle: "Industrial Valve Procurement",
    budget: 25000,
    priority: "high",
    description:
      "Procurement of industrial valves for manufacturing line upgrade",
    category: "Product",
    deadline: "2024-01-25",
    requestedDate: "2024-01-10",
    approverRole: "Department Head",
    approvalLevel: 1,
    isUrgent: false,
  },
  {
    id: "approval-002",
    requirementId: "REQ-005",
    requirementTitle: "Emergency Chemical Transport",
    budget: 150000,
    priority: "critical",
    description:
      "Urgent chemical transportation services for production continuity",
    category: "Logistics",
    deadline: "2024-01-18",
    requestedDate: "2024-01-15",
    approverRole: "Department Head",
    approvalLevel: 1,
    isUrgent: true,
  },
];

// ---------------- Helpers ----------------
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
    case "in progress":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-amber-100 text-amber-800";
    case "completed":
    case "delivered":
      return "bg-blue-100 text-blue-800";
    case "approved":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case "product":
    case "product vendor":
      return "bg-purple-100 text-purple-800";
    case "service":
    case "service vendor":
      return "bg-blue-100 text-blue-800";
    case "expert":
      return "bg-green-100 text-green-800";
    case "logistics":
      return "bg-amber-100 text-amber-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// ---------------- Dashboard ----------------
const DashboardContainer = memo(() => {
  const navigate = useNavigate();
  const { submitApproval } = useApproval();
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedApproval, setSelectedApproval] = useState<any>(null);

  const handleManageMilestones = (orderId: string) => {
    navigate(`/dashboard/industry-workflows/${orderId}`);
  };

  const handleReviewApproval = (approval: any) => {
    setSelectedApproval(approval);
    openModal();
  };

  const handleApprove = (comments: string) => {
    if (selectedApproval) {
      submitApproval(selectedApproval.id, "approved", comments);
      toast.success(
        `Requirement "${selectedApproval.requirementTitle}" approved successfully`
      );
      setSelectedApproval(null);
    }
  };

  const handleReject = (comments: string) => {
    if (selectedApproval) {
      submitApproval(selectedApproval.id, "rejected", comments);
      toast.error(
        `Requirement "${selectedApproval.requirementTitle}" rejected`
      );
      setSelectedApproval(null);
    }
  };

  const currentUserRole = "Department Head";
  const userPendingApprovals = mockPendingApprovals.filter(
    (a) => a.approverRole === currentUserRole
  );

  return (
    <main className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Industry Dashboard</h1>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Button asChild>
            <Link to="/dashboard/create-requirement">
              <FileText /> Create Requirement
            </Link>
          </Button>
          <Button asChild>
            <Link to="/dashboard/industry-workflows">
              <Workflow /> Manage Workflows
            </Link>
          </Button>
          <Button asChild>
            <Link to="/dashboard/industry-stakeholders">
              <ShoppingCart /> Find Stakeholders
            </Link>
          </Button>
          <Button asChild>
            <Link to="/dashboard/industry-messages">
              <MessageSquare /> View Messages
            </Link>
          </Button>
        </div>

        {/* Pending Approvals */}
        {userPendingApprovals.length > 0 && (
          <Card className="mb-8">
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Requirement</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userPendingApprovals.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell>{a.requirementTitle}</TableCell>
                      <TableCell>
                        <Badge className={getCategoryColor(a.category)}>
                          {a.category}
                        </Badge>
                      </TableCell>
                      <TableCell>{a.priority}</TableCell>
                      <TableCell>${a.budget}</TableCell>
                      <TableCell>{a.deadline}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleReviewApproval(a)}>
                          Review
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {metrics.map((m, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <p>{m.title}</p>
                <h2>{m.count}</h2>
                <p>{m.subtitle}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Requirements */}
        <Card className="mb-8">
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Requirement</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requirementData.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>{r.title}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(r.status)}>
                        {r.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button asChild>
                        <Link to={`/dashboard/industry-workflows/${r.id}`}>
                          <Workflow /> Workflow
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Messages */}
        <Card className="mb-8">
          <CardContent>
            {messageData.map((m) => (
              <div
                key={m.id}
                onClick={() =>
                  navigate(`/dashboard/industry-messages?message=${m.id}`)
                }
              >
                {m.sender}: {m.preview}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Orders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {orderData.map((o) => (
            <Card key={o.id}>
              <CardContent>
                <h3>{o.id}</h3>
                <p>{o.title}</p>
                <Progress value={o.progress} />
                <Button onClick={() => handleManageMilestones(o.id)}>
                  Manage
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Approval Modal */}
        {selectedApproval && (
          <ApprovalModal
            isOpen={isOpen}
            onClose={closeModal}
            requirement={selectedApproval}
            approvalLevel={selectedApproval.approvalLevel}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        )}
      </div>
    </main>
  );
});

const IndustryDashboard = () => {
  usePerformanceMonitor("IndustryDashboard");
  React.useEffect(() => {
    perfUtils.measureCoreWebVitals();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Industry Dashboard | Diligence.ai</title>
      </Helmet>
      <DashboardContainer />
    </div>
  );
};

export default memo(IndustryDashboard);
