import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
export interface StatItem {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}
interface GenericDashboardStatsProps {
  stats: StatItem[];
  className?: string;
}
export const GenericDashboardStats = ({
  stats,
  className = ""
}: GenericDashboardStatsProps) => {
  return <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {stats.map((stat, index) => <Card key={index} className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-semibold text-gray-600 uppercase tracking-wide mb-2 text-xs">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm font-medium text-gray-500">{stat.subtitle}</p>
              </div>
              <div className="flex-shrink-0 ml-4">
                <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>)}
    </div>;
};