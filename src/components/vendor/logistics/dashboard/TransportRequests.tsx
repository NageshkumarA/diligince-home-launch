import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Truck, Clock } from "lucide-react";
import { QuoteModal } from "./QuoteModal";
export const TransportRequests = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const requests = [{
    id: 1,
    title: "Heavy Machinery Transport",
    client: "Steel Plant Ltd.",
    equipment: "Low-bed Trailer, 35T",
    distance: "120km",
    date: "May 10",
    status: "pending",
    priority: "high"
  }, {
    id: 2,
    title: "Factory Relocation Support",
    client: "AutoParts Ltd.",
    equipment: "Crane, 75T • Heavy Trucks",
    duration: "5 days",
    dateRange: "May 15-20",
    status: "pending",
    priority: "medium"
  }];
  const handleQuoteClick = request => {
    setSelectedRequest(request);
    setShowQuoteModal(true);
  };
  const getPriorityColor = priority => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  return <>
      <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">Transport Requests</CardTitle>
          <Button variant="outline" size="sm" className="border-blue-200 text-blue-50 bg-pink-700 hover:bg-pink-600">View All</Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {requests.map(request => <div key={request.id} className="bg-white border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{request.title}</h4>
                  <p className="text-sm text-gray-600">{request.client}</p>
                </div>
                <Badge className={getPriorityColor(request.priority)}>
                  {request.priority}
                </Badge>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Truck className="h-4 w-4 mr-2" />
                  {request.equipment}
                </div>
                {request.distance && <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {request.distance}
                  </div>}
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  {request.date || request.dateRange}
                  {request.duration && <span className="ml-1">({request.duration})</span>}
                </div>
              </div>
              
              <Button onClick={() => handleQuoteClick(request)} className="w-full text-white bg-pink-700 hover:bg-pink-600">
                Quote Now
              </Button>
            </div>)}
        </CardContent>
      </Card>

      <QuoteModal isOpen={showQuoteModal} onClose={() => setShowQuoteModal(false)} request={selectedRequest} />
    </>;
};