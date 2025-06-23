
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const IndustryMessages = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
            <p className="text-gray-600">Communicate with vendors, professionals, and logistics partners.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Message Center</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Manage your communications with all partners and vendors.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default IndustryMessages;
