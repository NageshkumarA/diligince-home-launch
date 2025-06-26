
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, Clock, User, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Delivery {
  id: string;
  title: string;
  client: string;
  driver: string;
  progress: number;
  status: string;
  eta: string;
  location: string;
}

export const ActiveDeliveries = () => {
  const navigate = useNavigate();
  const [deliveries] = useState<Delivery[]>([
    {
      id: "DEL-001",
      title: "Chemical Tanks Transport",
      client: "Chem Industries",
      driver: "A. Kumar",
      progress: 70,
      status: "In Transit",
      eta: "May 5, 16:30",
      location: "Highway NH-48, 45km from destination"
    },
    {
      id: "DEL-002", 
      title: "Heavy Equipment Move",
      client: "Steel Plant Ltd.",
      driver: "R. Singh",
      progress: 25,
      status: "Loading",
      eta: "May 6, 14:00",
      location: "Loading Bay - Steel Plant"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Transit":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Loading":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Delivered":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleTrackAll = () => {
    navigate('/logistics-vendor-deliveries');
  };

  const handleViewDetails = (deliveryId: string) => {
    console.log("View details for delivery:", deliveryId);
    // TODO: Open delivery details modal
  };

  return (
    <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-gray-900">Active Deliveries</CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          className="border-blue-200 text-blue-600 hover:bg-blue-50"
          onClick={handleTrackAll}
        >
          Track All
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {deliveries.map((delivery) => (
          <div key={delivery.id} className="bg-white border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 text-sm">{delivery.title}</h4>
                <p className="text-sm text-gray-600">{delivery.client}</p>
              </div>
              <Badge className={getStatusColor(delivery.status)}>
                {delivery.status}
              </Badge>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <User className="h-4 w-4 mr-2" />
                Driver: {delivery.driver}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2" />
                ETA: {delivery.eta}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                {delivery.location}
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Progress</span>
                <span className="text-gray-900 font-medium">{delivery.progress}%</span>
              </div>
              <Progress 
                value={delivery.progress} 
                className="h-2 bg-gray-100" 
                indicatorClassName="bg-blue-500"
              />
            </div>
            
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleViewDetails(delivery.id)}
              className="w-full flex items-center gap-1 border-gray-200 hover:bg-gray-50"
            >
              <Eye className="h-3 w-3" />
              View Details
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
