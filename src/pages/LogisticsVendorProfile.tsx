
import React from "react";
import { LogisticsVendorHeader } from "@/components/vendor/LogisticsVendorHeader";
import { LogisticsVendorSidebar } from "@/components/vendor/LogisticsVendorSidebar";

const LogisticsVendorProfile = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <LogisticsVendorHeader />
      <div className="flex-1 pt-16">
        <LogisticsVendorSidebar />
      </div>
    </div>
  );
};

export default LogisticsVendorProfile;
