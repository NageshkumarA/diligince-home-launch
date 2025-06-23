import React from "react";
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
  Plus
} from "lucide-react";

// Mock data for the dashboard
const metrics = [
  { title: "Active Requirements", count: 12, subtitle: "ongoing jobs", icon: <FileText className="w-8 h-8 text-blue-500" /> },
  { title: "Pending RFQs", count: 8, subtitle: "awaiting response", icon: <Clock className="w-8 h-8 text-amber-500" /> },
  { title: "Active POs", count: 5, subtitle: "in progress", icon: <ShoppingCart className="w-8 h-8 text-green-500" /> },
  { title: "Completed Jobs", count: 27, subtitle: "this year", icon: <CheckCircle className="w-8 h-8 text-purple-500" /> }
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

// Helper function for status badge color
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
    case "in progress":
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case "pending":
      return "bg-amber-100 text-amber-800 hover:bg-amber-200";
    case "completed":
    case "delivered":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
};

// Helper function for category badge color
const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case "product":
    case "product vendor":
      return "bg-purple-100 text-purple-800 hover:bg-purple-200";
    case "service":
    case "service vendor":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    case "expert":
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case "logistics":
      return "bg-amber-100 text-amber-800 hover:bg-amber-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
};

const IndustryDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>Industry Dashboard | Diligince.ai</title>
      </Helmet>
      
      <IndustryHeader />
      
      <main className="flex-1 container mx-auto px-4 py-8 pt-20">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Industry Dashboard</h1>
          <p className="text-gray-600">Welcome back to your procurement dashboard</p>
        </div>
        
        {/* Quick Actions Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button asChild className="h-16 justify-start text-left">
              <Link to="/create-requirement" className="flex items-center gap-3">
                <FileText className="h-6 w-6" />
                <div>
                  <div className="font-semibold">Post New Requirement</div>
                  <div className="text-sm opacity-90">Find vendors and services</div>
                </div>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-16 justify-start text-left">
              <Link to="/create-purchase-order" className="flex items-center gap-3">
                <ShoppingCart className="h-6 w-6" />
                <div>
                  <div className="font-semibold">Create Purchase Order</div>
                  <div className="text-sm text-gray-600">Generate new PO</div>
                </div>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-16 justify-start text-left">
              <Link to="/industry-messages" className="flex items-center gap-3">
                <MessageSquare className="h-6 w-6" />
                <div>
                  <div className="font-semibold">View Messages</div>
                  <div className="text-sm text-gray-600">Check communications</div>
                </div>
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Key Metrics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{metric.count}</div>
                  <div className="text-gray-600 font-medium">{metric.title}</div>
                  <div className="text-sm text-gray-500">{metric.subtitle}</div>
                </div>
                <div>
                  {metric.icon}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Recent Requirements Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Recent Requirements</h2>
            <Button asChild>
              <Link to="/create-requirement">
                <Plus className="mr-1 h-4 w-4" />
                Post New Requirement
              </Link>
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requirementData.map((req) => (
                    <TableRow key={req.id}>
                      <TableCell className="font-medium">
                        <Link to={`/requirement/${req.id}`} className="text-blue-600 hover:underline">
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
                      <TableCell className="text-muted-foreground">
                        {req.date}
                      </TableCell>
                      <TableCell>
                        {req.status === "Completed" && (
                          <Button size="sm" variant="outline" asChild>
                            <Link to="/create-purchase-order">Create PO</Link>
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <div className="flex justify-center mt-4">
            <Button variant="outline">View All Requirements</Button>
          </div>
        </div>
        
        {/* Matched Stakeholders Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Matched Stakeholders</h2>
            <Button variant="outline">Find Stakeholders</Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stakeholderData.map((stakeholder) => (
              <Card key={stakeholder.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-5 flex flex-col items-center text-center">
                  <Avatar className="h-16 w-16 mb-3">
                    <AvatarFallback className="text-xl">{stakeholder.initials}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-medium mb-1">{stakeholder.name}</h3>
                  <Badge className={`mb-3 ${getCategoryColor(stakeholder.type)}`}>
                    {stakeholder.type}
                  </Badge>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/vendor-details/${stakeholder.id}`}>View Profile</Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link to="/create-purchase-order">Create PO</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Recent Messages Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Recent Messages</h2>
            <Button variant="outline">View All Messages</Button>
          </div>
          
          <Card>
            <CardContent className="p-4">
              <ul className="divide-y divide-gray-100">
                {messageData.map((message) => (
                  <li key={message.id} className="py-3 flex items-start gap-4 hover:bg-gray-50 px-2 rounded cursor-pointer">
                    <Avatar>
                      <AvatarFallback>{message.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-gray-900">{message.sender}</p>
                        <p className="text-xs text-gray-500">{message.time}</p>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{message.preview}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        
        {/* Active Orders Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
            <div className="flex gap-2">
              <Button variant="outline">View All Orders</Button>
              <Button asChild>
                <Link to="/create-purchase-order">
                  <Plus className="mr-1 h-4 w-4" />
                  Create New PO
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orderData.map((order) => (
              <Card key={order.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium">{order.id}</h3>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                  <p className="text-gray-800 font-medium mb-1">{order.title}</p>
                  <p className="text-gray-600 text-sm mb-1">Vendor: {order.vendor}</p>
                  <p className="text-gray-500 text-sm mb-3">{order.summary}</p>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{order.progress}%</span>
                    </div>
                    <Progress value={order.progress} className="h-2" />
                  </div>
                  
                  <div className="flex justify-between gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link to={`/work-completion-payment/${order.id}`}>
                        {order.progress === 100 ? "Review & Pay" : "View Details"}
                      </Link>
                    </Button>
                    {order.progress < 100 && (
                      <Button size="sm" variant="ghost" asChild>
                        <Link to="/create-purchase-order">Duplicate PO</Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default IndustryDashboard;
