
import React from "react";
import { useLocation } from "react-router-dom";
import { GenericHeader } from "@/components/shared/layout/GenericHeader";
import { productVendorHeaderConfig } from "@/utils/navigationConfigs";

export const ProductVendorHeader = () => {
  const location = useLocation();
  
  // Update nav items to reflect current active state
  const config = {
    ...productVendorHeaderConfig,
    navItems: productVendorHeaderConfig.navItems.map(item => ({
      ...item,
      active: location.pathname === item.href
    }))
  };

  return <GenericHeader config={config} />;
};
