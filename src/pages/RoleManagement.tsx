import React from "react";
import { RoleManagementDashboard } from "@/components/roleManagement";
import { useUser } from "@/contexts/UserContext";
import { mapUserRoleToUserType } from "@/utils/moduleMapper";

export default function RoleManagement() {
  const { user } = useUser();
  const userType = mapUserRoleToUserType(user);

  return (
    <div className="container mx-auto py-6">
      <RoleManagementDashboard userType={userType} />
    </div>
  );
}