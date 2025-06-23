
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const IndustryDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Industry Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your industrial operations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Active Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">12</p>
                <p className="text-sm text-gray-600">Currently running</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Pending RFQs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">8</p>
                <p className="text-sm text-gray-600">Awaiting responses</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Active Vendors</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">24</p>
                <p className="text-sm text-gray-600">Working partners</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">₹2.4M</p>
                <p className="text-sm text-gray-600">Total spending</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Track your latest industrial operations and vendor interactions.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Access frequently used features and create new requirements.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IndustryDashboard;
