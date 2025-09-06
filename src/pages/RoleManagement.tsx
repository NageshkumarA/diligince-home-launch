import React from "react";
import { RoleManagementDashboard } from "@/components/roleManagement";
import { UserType } from "@/types/roleManagement";

// This would normally come from your auth context/user context
const getCurrentUserType = (): UserType => {
  // For demo purposes, we'll default to IndustryAdmin
  // In real implementation, this would come from your authentication system
  return 'IndustryAdmin';
};

export default function RoleManagement() {
  const userType = getCurrentUserType();

  return (
    <div className="container mx-auto py-6">
      <RoleManagementDashboard userType={userType} />
    </div>
  );
}