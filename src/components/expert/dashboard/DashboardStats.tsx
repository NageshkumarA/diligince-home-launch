
import React from "react";
import { GenericDashboardStats } from "@/components/shared/dashboard/GenericDashboardStats";
import { expertStats } from "@/utils/dashboardConfigs";

export const DashboardStats = () => {
  return <GenericDashboardStats stats={expertStats} />;
};
