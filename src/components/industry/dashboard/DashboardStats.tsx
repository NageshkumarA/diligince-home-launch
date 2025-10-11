import React from "react";
import { GenericDashboardStats } from "@/components/shared/dashboard/GenericDashboardStats";
import { DashboardStats as DashboardStatsType } from "@/types/industry-dashboard";
import { DollarSign, ShoppingCart, TrendingUp, PiggyBank } from "lucide-react";

interface DashboardStatsProps {
  data: DashboardStatsType;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ data }) => {
  const stats = [
    {
      title: "Total Procurement Spend",
      value: `$${((data?.totalProcurementSpend ?? 0) / 1000000).toFixed(2)}M`,
      subtitle: data?.period ?? "N/A",
      icon: DollarSign,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Purchase Orders",
      value: (data?.activePurchaseOrders ?? 0).toString(),
      subtitle: "in progress",
      icon: ShoppingCart,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Budget Utilization",
      value: `${data?.budgetUtilization ?? 0}%`,
      subtitle: "of allocated budget",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Cost Savings",
      value: `$${((data?.costSavings ?? 0) / 1000).toFixed(0)}K`,
      subtitle: "through competitive bidding",
      icon: PiggyBank,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return <GenericDashboardStats stats={stats} />;
};
