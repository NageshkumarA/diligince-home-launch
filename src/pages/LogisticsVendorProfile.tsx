
import React, { useEffect } from "react";
import { LogisticsVendorHeader } from "@/components/vendor/LogisticsVendorHeader";
import { LogisticsVendorSidebar } from "@/components/vendor/LogisticsVendorSidebar";
import { ProfileCompletionWidget } from "@/components/shared/ProfileCompletionWidget";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { calculateProfileCompleteness } from "@/utils/profileCompleteness";

const LogisticsVendorProfile = () => {
  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
    }
  }, [isAuthenticated, navigate]);

  // Calculate actual profile completion based on current user data
  const profileCompletion = user ? calculateProfileCompleteness(user) : {
    percentage: 0,
    isComplete: false,
    missingFields: [],
    completedFields: []
  };

  // Handle profile completion action
  const handleCompleteProfile = () => {
    navigate('/profile-completion');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <LogisticsVendorHeader />
      <div className="flex-1 pt-16">
        <div className="flex">
          <LogisticsVendorSidebar />
          
          <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
            <div className="w-full max-w-4xl mx-auto">
              {/* Profile Completion Widget */}
              <ProfileCompletionWidget
                completion={profileCompletion}
                onCompleteProfile={handleCompleteProfile}
                showCompleteButton={!profileCompletion.isComplete}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default LogisticsVendorProfile;
