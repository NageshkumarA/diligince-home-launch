import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, MapPin, Calendar, Package, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { QuotationModal } from "./QuotationModal";
import { getPriorityColor, getDaysRemaining } from "@/utils/shared";

const rfqData = [
  {
    id: 1,
    title: "Boiler Spare Parts Package",
    company: "Steel Plant Ltd.",
    items: 12,
    delivery: "Urgent (7 days)",
    budget: "₹450,000",
    deadline: "2024-05-15",
    postedDate: "2024-05-01",
    priority: "urgent",
    status: "open",
    description: "Complete spare parts package for boiler maintenance",
    location: "Mumbai, Maharashtra",
    clientRating: 4.8,
    paymentTerms: "30 days"
  },
  {
    id: 2,
    title: "Control Panel Components",
    company: "Power Gen Co.",
    items: 8,
    delivery: "Standard (15 days)",
    budget: "₹320,000",
    deadline: "2024-05-20",
    postedDate: "2024-04-28",
    priority: "medium",
    status: "open",
    description: "Various components for control panel assembly",
    location: "Pune, Maharashtra",
    clientRating: 4.6,
    paymentTerms: "45 days"
  }
];

export const RFQManagement = () => {
  const [selectedRFQ, setSelectedRFQ] = useState<any>(null);
  const [isQuotationModalOpen, setIsQuotationModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleQuoteNow = (rfq: any) => {
    setSelectedRFQ(rfq);
    setIsQuotationModalOpen(true);
  };

  const handleViewAllRFQs = () => {
    navigate('/product-vendor-rfqs');
  };

  return (
    <>
      <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <FileText className="h-4 w-4 text-orange-600" />
              </div>
              RFQ Management
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              className="border-orange-200 text-orange-600 hover:bg-orange-50"
              onClick={handleViewAllRFQs}
            >
              View All RFQs
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {rfqData.map((rfq) => (
              <div key={rfq.id} className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1 text-sm">{rfq.title}</h4>
                    <p className="text-sm text-gray-600">{rfq.company}</p>
                  </div>
                  <Badge className={getPriorityColor(rfq.priority)}>
                    {rfq.priority}
                  </Badge>
                </div>
                
                <p className="text-sm text-gray-700 mb-3 line-clamp-2">{rfq.description}</p>
                
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {rfq.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Package className="h-3 w-3" />
                    {rfq.items} items
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {rfq.delivery}
                  </div>
                  <div className="font-medium text-gray-900">
                    {rfq.budget}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Deadline: {new Date(rfq.deadline).toLocaleDateString()} 
                    <span className="text-orange-600 ml-1">
                      ({getDaysRemaining(rfq.deadline)} days left)
                    </span>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => handleQuoteNow(rfq)}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Quote Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <Button 
            className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white"
            onClick={handleViewAllRFQs}
          >
            View All RFQs
          </Button>
        </CardContent>
      </Card>

      <QuotationModal
        isOpen={isQuotationModalOpen}
        onClose={() => setIsQuotationModalOpen(false)}
        rfq={selectedRFQ}
      />
    </>
  );
};
