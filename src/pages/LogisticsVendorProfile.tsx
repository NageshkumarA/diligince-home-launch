
import React from "react";
import { LogisticsVendorHeader } from "@/components/vendor/LogisticsVendorHeader";
import { LogisticsVendorSidebar } from "@/components/vendor/LogisticsVendorSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const LogisticsVendorProfile = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <LogisticsVendorHeader />
      <div className="flex-1 pt-32">
        <SidebarProvider>
          <div className="grid grid-cols-1 min-h-[calc(100vh-4rem)] w-full">
            <LogisticsVendorSidebar />
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
};

export default LogisticsVendorProfile;
