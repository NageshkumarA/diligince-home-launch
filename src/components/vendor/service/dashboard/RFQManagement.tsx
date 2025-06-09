
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, MapPin, Calendar, Users, Star } from "lucide-react";
import { ProposalCreationModal } from "./ProposalCreationModal";

const mockRFQData = [
  {
    id: 1,
    title: "Control System Upgrade",
    company: "Steel Plant Ltd.",
    duration: "4 weeks",
    engineersRequired: 2,
    budget: "₹350,000",
    deadline: "2024-05-15",
    postedDate: "2024-05-01",
    priority: "high",
    status: "open",
    description: "Upgrade legacy control systems with modern PLC technology",
    requirements: [
      "PLC Programming expertise",
      "Experience with Siemens systems",
      "On-site work capability",
      "Safety certifications required"
    ],
    location: "Mumbai, Maharashtra",
    clientRating: 4.8,
    estimatedValue: "₹300,000 - ₹400,000"
  },
  {
    id: 2,
    title: "Safety Audit & Certification",
    company: "Chem Industries",
    duration: "2 weeks",
    engineersRequired: 1,
    budget: "₹250,000",
    deadline: "2024-05-12",
    postedDate: "2024-04-28",
    priority: "medium",
    status: "open",
    description: "Comprehensive safety audit and certification for chemical processing facility",
    requirements: [
      "Safety system expertise",
      "Chemical industry experience",
      "Certification authority approval",
      "Documentation skills"
    ],
    location: "Pune, Maharashtra",
    clientRating: 4.6,
    estimatedValue: "₹200,000 - ₹300,000"
  }
];

export const RFQManagement = () => {
  const [selectedRFQ, setSelectedRFQ] = useState<any>(null);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);

  const handleCreateProposal = (rfq: any) => {
    setSelectedRFQ(rfq);
    setIsProposalModalOpen(true);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-orange-100 text-orange-800";
      case "low":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDaysRemaining = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <>
      <Card className="h-fit">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5" />
              RFQ Management
            </CardTitle>
            <Button variant="outline" size="sm">
              View All RFQs
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {mockRFQData.map((rfq) => (
              <div key={rfq.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{rfq.title}</h4>
                    <p className="text-sm text-gray-600">{rfq.company}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-gray-500">{rfq.clientRating}</span>
                    </div>
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
                    <Calendar className="h-3 w-3" />
                    {rfq.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {rfq.engineersRequired} engineers
                  </div>
                  <div className="font-medium text-gray-900">
                    {rfq.budget}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    Deadline: {new Date(rfq.deadline).toLocaleDateString()} 
                    <span className="text-orange-600 ml-1">
                      ({getDaysRemaining(rfq.deadline)} days left)
                    </span>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => handleCreateProposal(rfq)}
                    className="bg-[#fa8c16] hover:bg-[#fa8c16]/90"
                  >
                    Create Proposal
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <Button className="w-full mt-4 bg-[#fa8c16] hover:bg-[#fa8c16]/90">
            View All RFQs
          </Button>
        </CardContent>
      </Card>

      <ProposalCreationModal
        isOpen={isProposalModalOpen}
        onClose={() => setIsProposalModalOpen(false)}
        rfq={selectedRFQ}
      />
    </>
  );
};
