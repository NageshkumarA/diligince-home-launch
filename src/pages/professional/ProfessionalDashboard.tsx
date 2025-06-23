
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProfessionalDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Professional Dashboard</h1>
            <p className="text-gray-600">Welcome to your professional dashboard.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Professional Services</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Manage your professional services and opportunities.
              </p>
              <Button>Get Started</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ProfessionalDashboard;
