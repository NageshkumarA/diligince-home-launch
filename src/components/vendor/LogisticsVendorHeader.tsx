
import React from "react";
import { useLocation } from "react-router-dom";
import { GenericHeader } from "@/components/shared/layout/GenericHeader";
import { logisticsVendorHeaderConfig } from "@/utils/navigationConfigs";

export const LogisticsVendorHeader = () => {
  const location = useLocation();
  
  // Update nav items to reflect current active state
  const config = {
    ...logisticsVendorHeaderConfig,
    navItems: logisticsVendorHeaderConfig.navItems.map(item => ({
      ...item,
      active: location.pathname === item.href
    }))
  };

  return <GenericHeader config={config} />;
};
