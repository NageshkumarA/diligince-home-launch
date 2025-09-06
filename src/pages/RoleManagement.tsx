import React from "react";
import { RoleManagementDashboard } from "@/components/roleManagement";
import { useUser } from "@/contexts/UserContext";
import { mapUserRoleToUserType } from "@/utils/moduleMapper";
import { LoadingSpinner } from "@/components/shared/loading";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function RoleManagement() {
  const { user, isLoading } = useUser();
  
  // Add debugging
  console.log("RoleManagement - User:", user);
  console.log("RoleManagement - Loading:", isLoading);
  
  if (isLoading) {
    return (
      <div className="container mx-auto py-6">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto py-6">
        <Alert>
          <AlertDescription>
            Unable to load user information. Please try refreshing the page.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const userType = mapUserRoleToUserType(user);
  console.log("RoleManagement - UserType:", userType);

  return (
    <div className="container mx-auto py-6">
      <RoleManagementDashboard userType={userType} />
    </div>
  );
}