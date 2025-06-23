
import React from "react";
import { LogisticsVendorHeader } from "@/components/vendor/LogisticsVendorHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Truck, 
  Package, 
  MapPin, 
  DollarSign, 
  Clock, 
  TrendingUp,
  Users,
  Calendar,
  CheckCircle,
  AlertCircle,
  Navigation
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";

const LogisticsVendorDashboard = () => {
  // Mock data for charts
  const monthlyDeliveries = [
    { month: 'Jan', deliveries: 45 },
    { month: 'Feb', deliveries: 52 },
    { month: 'Mar', deliveries: 38 },
    { month: 'Apr', deliveries: 61 },
    { month: 'May', deliveries: 55 },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 125000 },
    { month: 'Feb', revenue: 135000 },
    { month: 'Mar', revenue: 145000 },
    { month: 'Apr', revenue: 155000 },
    { month: 'May', revenue: 165000 },
  ];

  const activeDeliveries = [
    {
      id: 'DEL-001',
      client: 'Steel Industries Ltd.',
      cargo: 'Industrial Machinery',
      route: 'Mumbai → Chennai',
      status: 'In Transit',
      progress: 65,
      eta: '2024-01-25 14:30',
      driver: 'Rajesh Kumar'
    },
    {
      id: 'DEL-002',
      client: 'Chemical Corp',
      cargo: 'Chemical Tanks',
      route: 'Gujarat → Bangalore',
      status: 'Loading',
      progress: 15,
      eta: '2024-01-26 09:00',
      driver: 'Suresh Patel'
    },
    {
      id: 'DEL-003',
      client: 'Power Generation Co.',
      cargo: 'Turbine Components',
      route: 'Pune → Rajasthan',
      status: 'Scheduled',
      progress: 0,
      eta: '2024-01-27 11:00',
      driver: 'Amit Singh'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Loading': return 'bg-yellow-100 text-yellow-800';
      case 'Scheduled': return 'bg-green-100 text-green-800';
      case 'Delivered': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <LogisticsVendorHeader />
      
      <main className="pt-32 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6 mt-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Logistics Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's your logistics operations overview.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Deliveries</CardTitle>
                <Truck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">
                  +2 from yesterday
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fleet Status</CardTitle>
                <Navigation className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15/18</div>
                <p className="text-xs text-muted-foreground">
                  Vehicles operational
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹16.5L</div>
                <p className="text-xs text-muted-foreground">
                  +8% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">On-Time Rate</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94%</div>
                <p className="text-xs text-muted-foreground">
                  Above target
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Deliveries</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyDeliveries}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="deliveries" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `₹${(Number(value) / 1000).toFixed(0)}K`} />
                    <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Active Deliveries */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Active Deliveries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeDeliveries.map((delivery) => (
                  <div key={delivery.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{delivery.id}</h3>
                        <Badge className={getStatusColor(delivery.status)}>
                          {delivery.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        ETA: {delivery.eta}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-600">Client</p>
                        <p className="font-medium">{delivery.client}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Cargo</p>
                        <p className="font-medium">{delivery.cargo}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Route</p>
                        <p className="font-medium flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {delivery.route}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Progress:</span>
                        <Progress value={delivery.progress} className="w-32" />
                        <span className="text-sm font-medium">{delivery.progress}%</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Driver: {delivery.driver}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="h-16 flex flex-col items-center justify-center bg-[#eb2f96] hover:bg-[#eb2f96]/90">
              <Package className="h-6 w-6 mb-1" />
              New Request
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
              <Truck className="h-6 w-6 mb-1" />
              Fleet Status
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
              <MapPin className="h-6 w-6 mb-1" />
              Track Delivery
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
              <TrendingUp className="h-6 w-6 mb-1" />
              Analytics
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LogisticsVendorDashboard;
