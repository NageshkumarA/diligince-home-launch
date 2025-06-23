
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, MapPin, Eye } from "lucide-react";

const mockRFQData = [
  {
    id: 1,
    title: "Industrial Valves Bulk Order",
    company: "Steel Plant Ltd.",
    quantity: "50 units",
    budget: "₹25,00,000",
    deadline: "2024-05-20",
    postedDate: "2024-05-05",
    priority: "high",
    status: "open",
    description: "Requirement for 50 high-pressure industrial valves for steam lines",
    location: "Mumbai, Maharashtra"
  },
  {
    id: 2,
    title: "Pressure Sensors Package",
    company: "Chem Industries",
    quantity: "25 units",
    budget: "₹3,50,000",
    deadline: "2024-05-18",
    postedDate: "2024-05-03",
    priority: "medium",
    status: "quoted",
    description: "Digital pressure sensors with 4-20mA output for chemical processing",
    location: "Pune, Maharashtra"
  }
];

export const RFQManagement = () => {
  const [selectedRFQ, setSelectedRFQ] = useState<any>(null);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800";
      case "quoted":
        return "bg-blue-100 text-blue-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
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
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {mockRFQData.map((rfq) => (
            <div key={rfq.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">{rfq.title}</h4>
                  <p className="text-sm text-gray-600">{rfq.company}</p>
                </div>
                <div className="flex gap-2">
                  <Badge className={getPriorityColor(rfq.priority)}>
                    {rfq.priority}
                  </Badge>
                  <Badge className={getStatusColor(rfq.status)}>
                    {rfq.status}
                  </Badge>
                </div>
              </div>
              
              <p className="text-sm text-gray-700 mb-3 line-clamp-2">{rfq.description}</p>
              
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-3">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {rfq.location}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {rfq.quantity}
                </div>
                <div className="font-medium text-gray-900">
                  {rfq.budget}
                </div>
                <div>
                  Due: {new Date(rfq.deadline).toLocaleDateString()}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  Posted: {new Date(rfq.postedDate).toLocaleDateString()}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  {rfq.status === "open" && (
                    <Button size="sm" className="bg-[#faad14] hover:bg-[#faad14]/90">
                      Submit Quote
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Button className="w-full mt-4 bg-[#faad14] hover:bg-[#faad14]/90">
          View All RFQs
        </Button>
      </CardContent>
    </Card>
  );
};
