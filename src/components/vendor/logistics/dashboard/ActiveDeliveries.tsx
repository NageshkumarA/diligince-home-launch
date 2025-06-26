import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Truck, Clock, User } from "lucide-react";
export const ActiveDeliveries = () => {
  const deliveries = [{
    id: 1,
    title: "Chemical Tanks Transport",
    client: "Chem Industries",
    equipment: "Low-bed Trailer LB-40",
    driver: "A. Kumar",
    eta: "May 5, 16:30",
    progress: 70,
    status: "in-transit"
  }, {
    id: 2,
    title: "Generator Unit Delivery",
    client: "Power Gen Co.",
    equipment: "Heavy Truck HT-25",
    driver: "S. Patel",
    eta: "May 6, 11:00",
    progress: 30,
    status: "in-transit"
  }];
  const getProgressColor = (progress: number) => {
    if (progress >= 70) return "bg-green-600";
    if (progress >= 40) return "bg-blue-600";
    return "bg-yellow-600";
  };
  return <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-gray-900">Active Deliveries</CardTitle>
        <Button variant="outline" size="sm" className="border-blue-200 text-blue-50 bg-pink-700 hover:bg-pink-600">Track All</Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {deliveries.map(delivery => <div key={delivery.id} className="bg-white border border-gray-100 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 text-xl">{delivery.title}</h4>
                <p className="text-sm text-gray-600">{delivery.client}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{delivery.progress}%</p>
                <p className="text-xs text-gray-500">Complete</p>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Truck className="h-4 w-4 mr-2" />
                {delivery.equipment}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <User className="h-4 w-4 mr-2" />
                {delivery.driver}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2" />
                ETA: {delivery.eta}
              </div>
            </div>
            
            <div className="mb-3">
              <Progress value={delivery.progress} className="h-2" indicatorClassName={getProgressColor(delivery.progress)} />
            </div>
            
            <Button variant="outline" size="sm" className="w-full border-blue-200 text-blue-50 bg-pink-700 hover:bg-pink-600">
              View Details
            </Button>
          </div>)}
      </CardContent>
    </Card>;
};