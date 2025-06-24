
import React from "react";
import { GenericDashboardStats } from "@/components/shared/dashboard/GenericDashboardStats";
import { professionalStats } from "@/utils/dashboardConfigs";

export const DashboardStats = () => {
  // Update stats with purple theme colors
  const updatedStats = professionalStats.map(stat => ({
    ...stat,
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  }));

  return <GenericDashboardStats stats={updatedStats} />;
};
