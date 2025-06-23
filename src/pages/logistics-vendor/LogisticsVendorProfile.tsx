
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LogisticsVendorProfile = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Logistics Vendor Profile</h1>
            <p className="text-gray-600">Manage your logistics company profile and fleet information.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Company Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Update your logistics company information and capabilities.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default LogisticsVendorProfile;
