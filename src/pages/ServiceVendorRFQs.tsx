import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Eye, Clock, DollarSign, TrendingUp } from "lucide-react";
import { RFQDetailsModal } from "@/components/vendor/service/modals/RFQDetailsModal";
import { ProposalCreationModal } from "@/components/vendor/service/modals/ProposalCreationModal";
import { RequirementsFeed } from "@/components/shared/requirements/RequirementsFeed";
import { useToast } from "@/hooks/use-toast";

const ServiceVendorRFQs: React.FC = () => {
  const [selectedRFQ, setSelectedRFQ] = useState<any>(null);
  const [showRFQDetails, setShowRFQDetails] = useState<boolean>(false);
  const [showProposalModal, setShowProposalModal] = useState<boolean>(false);
  const { toast } = useToast();

  const handleViewDetails = (id: string) => {
    toast({
      title: "View Details",
      description: `Opening details for requirement ${id}`,
    });
  };

  const handleCreateProposal = (id: string) => {
    toast({
      title: "Create Proposal",
      description: `Opening proposal form for requirement ${id}`,
    });
    setShowProposalModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <VendorHeader /> */}

      <main className="pt-32 p-6 lg:p-8 mx-0 px-[30px] py-[85px]">
        <div className="max-w-7xl mx-auto space-y-6 mt-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Service Vendor RFQs
              </h1>
              <p className="text-gray-600 mt-1">
                Browse AI-recommended requirements and submit proposals
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <FileText className="h-6 w-6 text-blue-600 bg-blue-50 p-2 rounded-lg" />
                <div>
                  <p className="text-sm text-gray-600">Total Available RFQs</p>
                  <p className="text-2xl font-bold">47</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <TrendingUp className="h-6 w-6 text-green-600 bg-green-50 p-2 rounded-lg" />
                <div>
                  <p className="text-sm text-gray-600">AI Recommended</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <Eye className="h-6 w-6 text-yellow-600 bg-yellow-50 p-2 rounded-lg" />
                <div>
                  <p className="text-sm text-gray-600">Your Submitted Quotations</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <DollarSign className="h-6 w-6 text-purple-600 bg-purple-50 p-2 rounded-lg" />
                <div>
                  <p className="text-sm text-gray-600">Win Rate</p>
                  <p className="text-2xl font-bold">74%</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Requirements Feed */}
          <RequirementsFeed
            userType="service-vendor"
            categoryFilter="service"
            showAIRecommendations={true}
            maxRecommendations={5}
            onViewDetails={handleViewDetails}
            onSubmitQuote={handleCreateProposal}
          />
        </div>
      </main>

      {/* Modals */}
      {selectedRFQ && (
        <RFQDetailsModal
          isOpen={showRFQDetails}
          onClose={() => setShowRFQDetails(false)}
          rfq={selectedRFQ}
        />
      )}

      <ProposalCreationModal
        isOpen={showProposalModal}
        onClose={() => setShowProposalModal(false)}
        rfqTitle=""
      />
    </div>
  );
};

export default ServiceVendorRFQs;
