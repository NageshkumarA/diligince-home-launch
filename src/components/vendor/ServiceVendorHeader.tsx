
import React from "react";
import { useLocation } from "react-router-dom";
import { GenericHeader } from "@/components/shared/layout/GenericHeader";
import { vendorHeaderConfig } from "@/utils/navigationConfigs";

export const ServiceVendorHeader = () => {
  const location = useLocation();
  
  // Update nav items to reflect current active state
  const config = {
    ...vendorHeaderConfig,
    navItems: vendorHeaderConfig.navItems.map(item => ({
      ...item,
      active: location.pathname === item.href
    }))
  };

  return <GenericHeader config={config} />;
};
