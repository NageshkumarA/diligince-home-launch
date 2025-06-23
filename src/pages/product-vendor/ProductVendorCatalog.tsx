
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProductVendorCatalog = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Catalog</h1>
            <p className="text-gray-600">Manage your product inventory and catalog.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Product Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Organize and manage your product offerings.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ProductVendorCatalog;
