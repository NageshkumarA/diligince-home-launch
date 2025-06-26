
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, MapPin, Calendar, Clock, Briefcase } from "lucide-react";

const rfqData = [{
  id: 1,
  title: "SCADA System Implementation",
  company: "Steel Plant Ltd.",
  description: "Complete SCADA system setup for steel manufacturing process control",
  location: "Mumbai, Maharashtra",
  budget: "₹750,000",
  deadline: "2024-05-15",
  priority: "urgent",
  skills: ["PLC Programming", "SCADA", "Industrial Automation"]
}, {
  id: 2,
  title: "Electrical Panel Installation",
  company: "Power Gen Co.",
  description: "Design and installation of control panels for power generation facility",
  location: "Pune, Maharashtra",
  budget: "₹450,000",
  deadline: "2024-05-20",
  priority: "medium",
  skills: ["Electrical Design", "Panel Installation", "Testing"]
}];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'urgent':
      return 'bg-red-50 text-red-700 border-red-200';
    case 'high':
      return 'bg-orange-50 text-orange-700 border-orange-200';
    case 'medium':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

export const RFQManagement = () => {
  const navigate = useNavigate();

  const handleViewAllRFQs = () => {
    navigate('/service-vendor-rfqs');
  };

  const handleSubmitProposal = (rfqTitle: string) => {
    console.log(`Submitting proposal for: ${rfqTitle}`);
    // This could open a modal or navigate to a proposal page
    // For now, we'll navigate to the RFQs page where they can submit proposals
    navigate('/service-vendor-rfqs');
  };

  return (
    <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="border-b border-gray-50 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            RFQ Management
          </CardTitle>
          <Button 
            className="text-white font-medium bg-yellow-600 hover:bg-yellow-500"
            onClick={handleViewAllRFQs}
          >
            View All RFQs
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-6 max-h-96 overflow-y-auto">
          {rfqData.map(rfq => (
            <div key={rfq.id} className="bg-gray-50 border border-gray-100 rounded-xl p-6 hover:bg-gray-100 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-lg mb-2">{rfq.title}</h4>
                  <p className="text-base font-semibold text-gray-700">{rfq.company}</p>
                </div>
                <Badge className={`${getPriorityColor(rfq.priority)} font-semibold text-sm px-3 py-1`}>
                  {rfq.priority.toUpperCase()}
                </Badge>
              </div>
              
              <p className="text-base text-gray-700 mb-5 leading-relaxed">{rfq.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-base mb-5">
                <div className="flex items-center gap-3 text-gray-700">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold">{rfq.location}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                  <span className="font-bold text-gray-900">{rfq.budget}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span>Due: {new Date(rfq.deadline).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-3 text-orange-600">
                  <Clock className="h-5 w-5" />
                  <span className="font-semibold">5 days left</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {rfq.skills.slice(0, 2).map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-sm text-blue-700 border-blue-200 py-1 bg-blue-50 px-3">
                      {skill}
                    </Badge>
                  ))}
                  {rfq.skills.length > 2 && (
                    <Badge variant="secondary" className="text-sm bg-gray-100 text-gray-600 px-3 py-1">
                      +{rfq.skills.length - 2} more
                    </Badge>
                  )}
                </div>
                <Button 
                  size="sm" 
                  className="text-white font-semibold px-4 bg-amber-600 hover:bg-amber-500"
                  onClick={() => handleSubmitProposal(rfq.title)}
                >
                  Submit Proposal
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <Button 
          className="w-full mt-6 text-white font-semibold py-3 bg-yellow-600 hover:bg-yellow-500"
          onClick={handleViewAllRFQs}
        >
          View All RFQs
        </Button>
      </CardContent>
    </Card>
  );
};
