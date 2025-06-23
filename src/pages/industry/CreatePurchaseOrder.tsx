
import IndustryHeader from "@/components/industry/IndustryHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CreatePurchaseOrder = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <IndustryHeader />
      
      <main className="pt-32 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6 mt-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Purchase Order</h1>
            <p className="text-gray-600">Generate a new purchase order for your selected vendor.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Purchase Order Creation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Create purchase orders efficiently with our streamlined process.
              </p>
              <Button>Get Started</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CreatePurchaseOrder;
