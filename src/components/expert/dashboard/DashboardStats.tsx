
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Calendar, Star, TrendingUp } from "lucide-react";

export const DashboardStats = () => {
  const stats = [
    {
      title: "Available Jobs",
      value: "8",
      subtitle: "matched to skills",
      icon: <Briefcase className="h-6 w-6" />,
      color: "text-[#722ed1]",
      bgColor: "bg-[#722ed1]/10"
    },
    {
      title: "Applied Jobs",
      value: "3",
      subtitle: "awaiting response",
      icon: <Calendar className="h-6 w-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Ongoing Projects",
      value: "2",
      subtitle: "in progress",
      icon: <TrendingUp className="h-6 w-6" />,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Average Rating",
      value: "4.9",
      subtitle: "★★★★★",
      icon: <Star className="h-6 w-6" />,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
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
