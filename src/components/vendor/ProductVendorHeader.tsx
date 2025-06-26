
import React from "react";
import { useLocation } from "react-router-dom";
import { GenericHeader } from "@/components/shared/layout/GenericHeader";
import { vendorHeaderConfig } from "@/utils/navigationConfigs";

export const ProductVendorHeader = () => {
  const location = useLocation();
  
  // Update nav items to reflect current active state and correct profile link
  const config = {
    ...vendorHeaderConfig,
    navItems: vendorHeaderConfig.navItems.map(item => {
      if (item.href === '/vendor-profile') {
        return {
          ...item,
          href: '/product-vendor-profile',
          active: location.pathname === '/product-vendor-profile'
        };
      }
      return {
        ...item,
        active: location.pathname === item.href
      };
    })
  };

  return <GenericHeader config={config} />;
};
