
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, MapPin, Calendar, Clock, Briefcase } from "lucide-react";

const rfqData = [
  {
    id: 1,
    title: "SCADA System Implementation",
    company: "Steel Plant Ltd.",
    description: "Complete SCADA system setup for steel manufacturing process control",
    location: "Mumbai, Maharashtra",
    budget: "₹750,000",
    deadline: "2024-05-15",
    priority: "urgent",
    skills: ["PLC Programming", "SCADA", "Industrial Automation"]
  },
  {
    id: 2,
    title: "Electrical Panel Installation",
    company: "Power Gen Co.",
    description: "Design and installation of control panels for power generation facility",
    location: "Pune, Maharashtra",
    budget: "₹450,000",
    deadline: "2024-05-20",
    priority: "medium",
    skills: ["Electrical Design", "Panel Installation", "Testing"]
  }
];

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
  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardHeader className="border-b border-gray-100 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            RFQ Management
          </CardTitle>
          <Button variant="outline" size="sm" className="text-gray-700 border-gray-300 hover:bg-gray-50">
            View All RFQs
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-6 max-h-96 overflow-y-auto">
          {rfqData.map((rfq) => (
            <div key={rfq.id} className="bg-gray-50 border border-gray-200 rounded-lg p-5 hover:bg-gray-100 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-base mb-1">{rfq.title}</h4>
                  <p className="text-sm font-medium text-gray-600">{rfq.company}</p>
                </div>
                <Badge className={`${getPriorityColor(rfq.priority)} font-medium`}>
                  {rfq.priority.toUpperCase()}
                </Badge>
              </div>
              
              <p className="text-sm text-gray-700 mb-4 leading-relaxed">{rfq.description}</p>
              
              <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{rfq.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Briefcase className="h-4 w-4 text-gray-500" />
                  <span className="font-semibold text-gray-900">{rfq.budget}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>Due: {new Date(rfq.deadline).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-orange-600">
                  <Clock className="h-4 w-4" />
                  <span className="font-medium">5 days left</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {rfq.skills.slice(0, 2).map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                      {skill}
                    </Badge>
                  ))}
                  {rfq.skills.length > 2 && (
                    <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                      +{rfq.skills.length - 2} more
                    </Badge>
                  )}
                </div>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
                  Submit Proposal
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium">
          View All RFQs
        </Button>
      </CardContent>
    </Card>
  );
};
