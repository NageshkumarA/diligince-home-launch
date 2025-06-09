
import React from "react";
import { GenericDashboardStats } from "@/components/shared/dashboard/GenericDashboardStats";
import { professionalStats } from "@/utils/dashboardConfigs";

export const DashboardStats = () => {
  return <GenericDashboardStats stats={professionalStats} />;
};
