import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, TrendingUp, Award } from "lucide-react";
import { VendorPerformance as VendorPerformanceType } from "@/types/industry-dashboard";

interface VendorPerformanceProps {
  data: VendorPerformanceType[];
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Product":
      return "bg-purple-100 text-purple-800";
    case "Service":
      return "bg-blue-100 text-blue-800";
    case "Expert":
      return "bg-green-100 text-green-800";
    case "Logistics":
      return "bg-amber-100 text-amber-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getRankBadge = (rank: number) => {
  if (rank === 1) return <Award className="h-5 w-5 text-yellow-500 fill-yellow-500" />;
  if (rank === 2) return <Award className="h-5 w-5 text-gray-400 fill-gray-400" />;
  if (rank === 3) return <Award className="h-5 w-5 text-orange-500 fill-orange-500" />;
  return <span className="text-sm font-semibold text-muted-foreground">#{rank}</span>;
};

export const VendorPerformance: React.FC<VendorPerformanceProps> = ({ data }) => {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2 text-sm font-semibold">Rank</th>
                <th className="text-left py-3 px-4 text-sm font-semibold">Vendor</th>
                <th className="text-left py-3 px-4 text-sm font-semibold">Category</th>
                <th className="text-left py-3 px-4 text-sm font-semibold">Rating</th>
                <th className="text-left py-3 px-4 text-sm font-semibold">Orders</th>
                <th className="text-left py-3 px-4 text-sm font-semibold">On-Time %</th>
              </tr>
            </thead>
            <tbody>
              {data.map((vendor) => (
                <tr 
                  key={vendor.rank} 
                  className="border-b last:border-b-0 hover:bg-muted/30 transition-colors cursor-pointer"
                >
                  <td className="py-4 px-2">
                    <div className="flex items-center justify-center">
                      {getRankBadge(vendor.rank)}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {vendor.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-semibold">{vendor.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <Badge className={getCategoryColor(vendor.category)}>
                      {vendor.category}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{vendor.rating}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-semibold">{vendor.orders}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold ${vendor.onTimeDelivery >= 95 ? 'text-green-600' : 'text-yellow-600'}`}>
                        {vendor.onTimeDelivery}%
                      </span>
                      {vendor.onTimeDelivery >= 95 && (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {data.map((vendor) => (
            <div 
              key={vendor.rank} 
              className="p-4 bg-muted/30 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8">
                    {getRankBadge(vendor.rank)}
                  </div>
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {vendor.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{vendor.name}</p>
                    <Badge className={`${getCategoryColor(vendor.category)} text-xs mt-1`}>
                      {vendor.category}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3 mt-3 pt-3 border-t">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">Rating</p>
                  <div className="flex items-center justify-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-sm">{vendor.rating}</span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">Orders</p>
                  <p className="font-semibold text-sm">{vendor.orders}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">On-Time</p>
                  <p className={`font-semibold text-sm ${vendor.onTimeDelivery >= 95 ? 'text-green-600' : 'text-yellow-600'}`}>
                    {vendor.onTimeDelivery}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
