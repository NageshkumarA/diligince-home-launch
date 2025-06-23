
import React from "react";
import IndustryHeader from "@/components/industry/IndustryHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  TrendingUp, 
  Package, 
  Users, 
  DollarSign, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Plus,
  Eye,
  MessageSquare,
  FileText
} from "lucide-react";

const IndustryDashboard = () => {
  // Mock data for charts
  const monthlySpending = [
    { month: 'Jan', amount: 1200000 },
    { month: 'Feb', amount: 1500000 },
    { month: 'Mar', amount: 1800000 },
    { month: 'Apr', amount: 2200000 },
    { month: 'May', amount: 2400000 },
  ];

  const vendorDistribution = [
    { name: 'Product Vendors', value: 45, color: '#3b82f6' },
    { name: 'Service Vendors', value: 35, color: '#10b981' },
    { name: 'Logistics', value: 20, color: '#f59e0b' },
  ];

  const recentRequirements = [
    {
      id: 'REQ-001',
      title: 'Industrial Valve Procurement',
      type: 'Product',
      status: 'Active',
      budget: '₹5,50,000',
      responses: 12,
      deadline: '2024-01-25'
    },
    {
      id: 'REQ-002', 
      title: 'Pipeline Inspection Service',
      type: 'Service',
      status: 'In Review',
      budget: '₹2,80,000',
      responses: 8,
      deadline: '2024-01-30'
    },
    {
      id: 'REQ-003',
      title: 'Equipment Transportation',
      type: 'Logistics',
      status: 'Completed',
      budget: '₹1,25,000',
      responses: 15,
      deadline: '2024-01-20'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'In Review': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <IndustryHeader />
      
      <main className="pt-20 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Industry Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your industrial operations.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  +2 from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending RFQs</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">
                  Awaiting responses
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Vendors</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">
                  Working partners
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">This Month</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹24L</div>
                <p className="text-xs text-muted-foreground">
                  Total spending
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Spending Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlySpending}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `₹${(value / 100000).toFixed(1)}L`} />
                    <Bar dataKey="amount" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vendor Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={vendorDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {vendorDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Requirements */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Requirements</CardTitle>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create New
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentRequirements.map((req) => (
                  <div key={req.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{req.title}</h3>
                        <Badge className={getStatusColor(req.status)}>
                          {req.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <span>ID: {req.id}</span>
                        <span>Type: {req.type}</span>
                        <span>Budget: {req.budget}</span>
                        <span>Responses: {req.responses}</span>
                        <span>Deadline: {req.deadline}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center">
              <Plus className="h-6 w-6 mb-2" />
              Create Requirement
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <FileText className="h-6 w-6 mb-2" />
              View Documents
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <MessageSquare className="h-6 w-6 mb-2" />
              Messages
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <TrendingUp className="h-6 w-6 mb-2" />
              Analytics
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IndustryDashboard;
