import React from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, TrendingUp, Eye, Clock } from "lucide-react";
import { RequirementsFeed } from "@/components/shared/requirements/RequirementsFeed";
import { useToast } from "@/hooks/use-toast";

const ProductVendorRFQs = () => {
  const { toast } = useToast();

  const handleViewDetails = (id: string) => {
    toast({
      title: "View Details",
      description: `Opening details for requirement ${id}`,
    });
  };

  const handleQuoteNow = (id: string) => {
    toast({
      title: "Submit Quotation",
      description: `Opening quotation form for requirement ${id}`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>RFQs | Product Vendor Dashboard</title>
      </Helmet>

      {/* <VendorHeader /> */}

      <main className="pt-32 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6 mt-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Product Vendor RFQs
              </h1>
              <p className="text-gray-600">
                Browse AI-matched requirements and submit quotations
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="text-center">
                  <FileText className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">38</p>
                  <p className="text-sm text-gray-600">Total Product RFQs</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="text-center">
                  <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-600">15</p>
                  <p className="text-sm text-gray-600">AI Matched to Your Catalog</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="text-center">
                  <Eye className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-yellow-600">7</p>
                  <p className="text-sm text-gray-600">Your Submitted Quotations</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="text-center">
                  <Clock className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-purple-600">2.3h</p>
                  <p className="text-sm text-gray-600">Average Response Time</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Requirements Feed */}
          <RequirementsFeed
            userType="product-vendor"
            categoryFilter="product"
            showAIRecommendations={true}
            maxRecommendations={5}
            onViewDetails={handleViewDetails}
            onSubmitQuote={handleQuoteNow}
          />
        </div>
      </main>
    </div>
  );
};

export default ProductVendorRFQs;
