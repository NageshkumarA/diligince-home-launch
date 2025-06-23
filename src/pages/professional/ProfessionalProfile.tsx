
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProfessionalProfile = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Professional Profile</h1>
            <p className="text-gray-600">Manage your professional profile and expertise.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Profile Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Update your professional information and showcase your expertise.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ProfessionalProfile;
