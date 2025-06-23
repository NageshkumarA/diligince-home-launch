
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ServiceVendorDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Service Vendor Dashboard</h1>
            <p className="text-gray-600">Manage your service offerings and client projects.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Service Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Track your services, projects, and client relationships.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ServiceVendorDashboard;
