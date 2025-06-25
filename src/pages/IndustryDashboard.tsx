
import React, { Suspense, memo } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import IndustryHeader from "@/components/industry/IndustryHeader";
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
  TableCell
} from "@/components/ui/table";
import {
  FileText,
  MessageSquare,
  ShoppingCart,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Workflow
} from "lucide-react";
import { FastLoadingState } from "@/components/shared/loading/FastLoadingState";
import { SkeletonLoader } from "@/components/shared/loading/SkeletonLoader";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";
import { perfUtils } from "@/utils/performance";

// Mock data for the dashboard - moved to module level for better performance
const metrics = [
  { title: "Active Requirements", count: 12, subtitle: "ongoing jobs", icon: FileText },
  { title: "Pending RFQs", count: 8, subtitle: "awaiting response", icon: Clock },
  { title: "Active POs", count: 5, subtitle: "in progress", icon: ShoppingCart },
  { title: "Completed Jobs", count: 27, subtitle: "this year", icon: CheckCircle }
];

const requirementData = [
  { id: 1, title: "Industrial Valve Procurement", category: "Product", status: "Active", date: "2 days ago" },
  { id: 2, title: "Pipeline Inspection Service", category: "Service", status: "Pending", date: "1 week ago" },
  { id: 3, title: "Chemical Engineering Consultant", category: "Expert", status: "Active", date: "3 days ago" },
  { id: 4, title: "Equipment Transportation", category: "Logistics", status: "Completed", date: "2 weeks ago" },
  { id: 5, title: "Safety Audit Services", category: "Service", status: "Active", date: "5 days ago" }
];

const stakeholderData = [
  { id: 1, name: "TechValve Solutions", initials: "TV", type: "Product Vendor" },
  { id: 2, name: "EngiConsult Group", initials: "EG", type: "Expert" },
  { id: 3, name: "Service Pro Maintenance", initials: "SP", type: "Service Vendor" },
  { id: 4, name: "FastTrack Logistics", initials: "FL", type: "Logistics" }
];

const messageData = [
  { id: 1, sender: "John Smith", initials: "JS", preview: "Regarding your recent valve procurement inquiry, we have...", time: "10 min ago" },
  { id: 2, sender: "TechValve Solutions", initials: "TV", preview: "Thank you for your order. We've processed the shipment and...", time: "2 hours ago" },
  { id: 3, sender: "EngiConsult Group", initials: "EG", preview: "Our engineer will be available for the consultation on...", time: "Yesterday" }
];

const orderData = [
  { id: "PO-2023-042", title: "Industrial Valve Set", vendor: "TechValve Solutions", summary: "3 items", status: "In Progress", progress: 65 },
  { id: "PO-2023-039", title: "Safety Equipment", vendor: "ProtectWell Inc", summary: "12 items", status: "Delivered", progress: 100 },
  { id: "PO-2023-036", title: "Consulting Services", vendor: "EngiConsult Group", summary: "1 service", status: "In Progress", progress: 40 }
];

// Helper functions - memoized for better performance
const getStatusColor = memo((status: string) => {
  switch (status.toLowerCase()) {
    case "active":
    case "in progress":
      return "bg-green-100 text-green-800 hover:bg-green-200 border-green-200";
    case "pending":
      return "bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200";
    case "completed":
    case "delivered":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200";
  }
});

const getCategoryColor = memo((category: string) => {
  switch (category.toLowerCase()) {
    case "product":
    case "product vendor":
      return "bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200";
    case "service":
    case "service vendor":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200";
    case "expert":
      return "bg-green-100 text-green-800 hover:bg-green-200 border-green-200";
    case "logistics":
      return "bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200";
  }
});

// Memoized dashboard container
const DashboardContainer = memo(() => {
  return (
    <main className="flex-1 container mx-auto px-4 py-8 pt-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Industry Dashboard</h1>
        <p className="text-gray-700 text-lg">Welcome back to your procurement dashboard</p>
      </div>
      
      {/* Quick Actions Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Button asChild className="h-16 justify-start text-left bg-blue-600 hover:bg-blue-700 text-white font-medium">
            <Link to="/create-requirement" className="flex items-center gap-3">
              <FileText className="h-6 w-6" />
              <div>
                <div className="font-semibold">Post New Requirement</div>
                <div className="text-sm opacity-90">Find vendors and services</div>
              </div>
            </Link>
          </Button>
          <Button asChild className="h-16 justify-start text-left bg-blue-600 hover:bg-blue-700 text-white font-medium">
            <Link to="/create-purchase-order" className="flex items-center gap-3">
              <ShoppingCart className="h-6 w-6" />
              <div>
                <div className="font-semibold">Create Purchase Order</div>
                <div className="text-sm opacity-90">Generate new PO</div>
              </div>
            </Link>
          </Button>
          <Button asChild className="h-16 justify-start text-left bg-blue-600 hover:bg-blue-700 text-white font-medium">
            <Link to="/industry-project-workflow/demo" className="flex items-center gap-3">
              <Workflow className="h-6 w-6" />
              <div>
                <div className="font-semibold">Project Workflows</div>
                <div className="text-sm opacity-90">Manage project progress</div>
              </div>
            </Link>
          </Button>
          <Button asChild className="h-16 justify-start text-left bg-blue-600 hover:bg-blue-700 text-white font-medium">
            <Link to="/industry-messages" className="flex items-center gap-3">
              <MessageSquare className="h-6 w-6" />
              <div>
                <div className="font-semibold">View Messages</div>
                <div className="text-sm opacity-90">Check communications</div>
              </div>
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Key Metrics Section */}
      <Suspense fallback={
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-lg border border-gray-100">
              <SkeletonLoader lines={2} height="20px" />
            </div>
          ))}
        </div>
      }>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <Card key={index} className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">{metric.title}</p>
                      <p className="text-3xl font-bold text-gray-900 mb-1">{metric.count}</p>
                      <p className="text-sm font-medium text-gray-500">{metric.subtitle}</p>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Suspense>
      
      {/* Recent Requirements Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Recent Requirements</h2>
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
            <Link to="/create-requirement">
              <Plus className="mr-2 h-4 w-4" />
              Post New Requirement
            </Link>
          </Button>
        </div>
        
        <Suspense fallback={
          <div className="bg-white p-6 rounded-lg border border-gray-100">
            <SkeletonLoader lines={8} />
          </div>
        }>
          <Card className="bg-white border border-gray-100 shadow-sm">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-100">
                    <TableHead className="font-semibold text-gray-700">Title</TableHead>
                    <TableHead className="font-semibold text-gray-700">Category</TableHead>
                    <TableHead className="font-semibold text-gray-700">Status</TableHead>
                    <TableHead className="font-semibold text-gray-700">Date</TableHead>
                    <TableHead className="font-semibold text-gray-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requirementData.map((req) => (
                    <TableRow key={req.id} className="border-gray-100 hover:bg-gray-50">
                      <TableCell className="font-medium text-gray-900">
                        <Link to={`/requirement/${req.id.toString()}`} className="text-blue-600 hover:text-blue-700 hover:underline">
                          {req.title}
                        </Link>
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
                      <TableCell className="text-gray-600">
                        {req.date}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50" asChild>
                            <Link to={`/industry-project-workflow/${req.id.toString()}`}>View Workflow</Link>
                          </Button>
                          {req.status === "Completed" && (
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-medium" asChild>
                              <Link to="/create-purchase-order">Create PO</Link>
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
        </Suspense>
        
        <div className="flex justify-center mt-6">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium">View All Requirements</Button>
        </div>
      </div>
      
      {/* Matched Stakeholders Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Matched Stakeholders</h2>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium">Find Stakeholders</Button>
        </div>
        
        <Suspense fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg border border-gray-100">
                <SkeletonLoader lines={4} />
              </div>
            ))}
          </div>
        }>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stakeholderData.map((stakeholder) => (
              <Card key={stakeholder.id} className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Avatar className="h-16 w-16 mb-4 bg-gradient-to-br from-blue-50 to-blue-100">
                    <AvatarFallback className="text-xl font-semibold text-blue-600">{stakeholder.initials}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-gray-900 mb-2">{stakeholder.name}</h3>
                  <Badge className={`mb-4 ${getCategoryColor(stakeholder.type)}`}>
                    {stakeholder.type}
                  </Badge>
                  <div className="flex gap-2 mt-2 w-full">
                    <Button variant="outline" size="sm" className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50" asChild>
                      <Link to={`/vendor-details/${stakeholder.id.toString()}`}>View Profile</Link>
                    </Button>
                    <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium" asChild>
                      <Link to="/create-purchase-order">Create PO</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Suspense>
      </div>
      
      {/* Recent Messages Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Recent Messages</h2>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium">View All Messages</Button>
        </div>
        
        <Suspense fallback={
          <div className="bg-white p-6 rounded-lg border border-gray-100">
            <SkeletonLoader lines={5} />
          </div>
        }>
          <Card className="bg-white border border-gray-100 shadow-sm">
            <CardContent className="p-6">
              <ul className="divide-y divide-gray-100">
                {messageData.map((message) => (
                  <li key={message.id} className="py-4 flex items-start gap-4 hover:bg-gray-50 px-3 rounded-lg cursor-pointer transition-colors">
                    <Avatar className="bg-gradient-to-br from-blue-50 to-blue-100">
                      <AvatarFallback className="text-blue-600 font-semibold">{message.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-semibold text-gray-900">{message.sender}</p>
                        <p className="text-xs text-gray-500">{message.time}</p>
                      </div>
                      <p className="text-sm text-gray-700 truncate mt-1">{message.preview}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Suspense>
      </div>
      
      {/* Active Orders Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
          <div className="flex gap-3">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium">View All Orders</Button>
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
              <Link to="/create-purchase-order">
                <Plus className="mr-2 h-4 w-4" />
                Create New PO
              </Link>
            </Button>
          </div>
        </div>
        
        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg border border-gray-100">
                <SkeletonLoader lines={6} />
              </div>
            ))}
          </div>
        }>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orderData.map((order) => (
              <Card key={order.id} className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-gray-900">{order.id}</h3>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                  <p className="text-gray-900 font-medium mb-2">{order.title}</p>
                  <p className="text-gray-600 text-sm mb-1">Vendor: <span className="font-medium">{order.vendor}</span></p>
                  <p className="text-gray-500 text-sm mb-4">{order.summary}</p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-gray-700">Progress</span>
                      <span className="font-semibold text-gray-900">{order.progress}%</span>
                    </div>
                    <Progress value={order.progress} className="h-2" />
                  </div>
                  
                  <div className="flex justify-between gap-2">
                    <Button size="sm" variant="outline" className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50" asChild>
                      <Link to={`/industry-project-workflow/${order.id}`}>Manage Workflow</Link>
                    </Button>
                    <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium" asChild>
                      <Link to={`/work-completion-payment/${order.id}`}>
                        {order.progress === 100 ? "Review & Pay" : "View Details"}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Suspense>
      </div>
    </main>
  );
});

DashboardContainer.displayName = "DashboardContainer";

const IndustryDashboard = () => {
  console.log("IndustryDashboard rendering - optimized version");
  usePerformanceMonitor("IndustryDashboard");

  // Initialize performance monitoring
  React.useEffect(() => {
    perfUtils.measureCoreWebVitals();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>Industry Dashboard | Diligince.ai</title>
      </Helmet>
      
      <IndustryHeader />
      
      <DashboardContainer />
    </div>
  );
};

export default memo(IndustryDashboard);
