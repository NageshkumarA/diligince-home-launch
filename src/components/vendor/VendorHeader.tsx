
import React from "react";
import { useLocation } from "react-router-dom";
import { GenericHeader } from "@/components/shared/layout/GenericHeader";
import { getHeaderConfigByPath } from "@/utils/navigationConfigs";

const VendorHeader = () => {
  const location = useLocation();
  
  // Get the appropriate config based on current path
  const config = getHeaderConfigByPath(location.pathname);
  
  // Update nav items to reflect current active state
  const configWithActiveState = {
    ...config,
    navItems: config.navItems.map(item => ({
      ...item,
      active: location.pathname === item.href
    }))
  };

  return <GenericHeader config={configWithActiveState} />;
};

export default VendorHeader;
