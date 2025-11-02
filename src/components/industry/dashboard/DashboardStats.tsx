import React from "react";
import { GenericDashboardStats } from "@/components/shared/dashboard/GenericDashboardStats";
import { DashboardStats as DashboardStatsType } from "@/types/industry-dashboard";
import { extractValue } from "@/types/api-common";
import { DollarSign, ShoppingCart, TrendingUp, PiggyBank } from "lucide-react";

interface DashboardStatsProps {
  data: DashboardStatsType;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ data }) => {
  // Helper to safely extract numeric values from both flat and enhanced formats
  const getValue = (field: any): number => {
    return extractValue(field) as number ?? 0;
  };

  const stats = [
    {
      title: "Total Procurement Spend",
      value: `$${(getValue(data?.totalProcurementSpend) / 1000000).toFixed(2)}M`,
      subtitle: data?.period ?? "N/A",
      icon: DollarSign,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Purchase Orders",
      value: getValue(data?.activePurchaseOrders).toString(),
      subtitle: "in progress",
      icon: ShoppingCart,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Budget Utilization",
      value: `${getValue(data?.budgetUtilization)}%`,
      subtitle: "of allocated budget",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Cost Savings",
      value: `$${(getValue(data?.costSavings) / 1000).toFixed(0)}K`,
      subtitle: "through competitive bidding",
      icon: PiggyBank,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return <GenericDashboardStats stats={stats} />;
};
