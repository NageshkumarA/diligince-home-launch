
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Send, ShoppingCart, Package } from "lucide-react";

export const DashboardStats = () => {
  const stats = [
    {
      title: "Product RFQs",
      value: "9",
      subtitle: "open requests",
      icon: <FileText className="h-6 w-6" />,
      color: "text-[#faad14]",
      bgColor: "bg-[#faad14]/10"
    },
    {
      title: "Quotations Sent",
      value: "6",
      subtitle: "awaiting response",
      icon: <Send className="h-6 w-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Active Orders",
      value: "4",
      subtitle: "in progress",
      icon: <ShoppingCart className="h-6 w-6" />,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Total Products",
      value: "84",
      subtitle: "in catalog",
      icon: <Package className="h-6 w-6" />,
      color: "text-[#722ed1]",
      bgColor: "bg-[#722ed1]/10"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer">
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
