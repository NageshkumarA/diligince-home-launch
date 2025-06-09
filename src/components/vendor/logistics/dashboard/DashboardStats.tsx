
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, FileText, Package, Wrench } from "lucide-react";

export const DashboardStats = () => {
  const stats = [
    {
      title: "Transport Requests",
      value: "7",
      subtitle: "available jobs",
      icon: <FileText className="h-6 w-6" />,
      color: "text-[#eb2f96]",
      bgColor: "bg-[#eb2f96]/10"
    },
    {
      title: "Quotes Submitted", 
      value: "5",
      subtitle: "awaiting approval",
      icon: <Package className="h-6 w-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Active Deliveries",
      value: "3", 
      subtitle: "in transit",
      icon: <Truck className="h-6 w-6" />,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Equipment Status",
      value: "12/15",
      subtitle: "vehicles available", 
      icon: <Wrench className="h-6 w-6" />,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.subtitle}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <div className={stat.color}>
                  {stat.icon}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
