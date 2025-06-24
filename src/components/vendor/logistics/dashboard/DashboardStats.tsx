
import React from "react";
import { GenericDashboardStats } from "@/components/shared/dashboard/GenericDashboardStats";
import { logisticsVendorStats } from "@/utils/dashboardConfigs";

export const DashboardStats = () => {
  // Update stats with blue theme colors for logistics
  const updatedStats = logisticsVendorStats.map(stat => ({
    ...stat,
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  }));

  return <GenericDashboardStats stats={updatedStats} />;
};
