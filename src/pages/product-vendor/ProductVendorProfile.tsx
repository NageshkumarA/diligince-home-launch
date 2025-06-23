
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProductVendorProfile = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Vendor Profile</h1>
            <p className="text-gray-600">Manage your product vendor profile and specifications.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Company Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Update your product vendor information and capabilities.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ProductVendorProfile;
