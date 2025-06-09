
import React from "react";
import { useLocation } from "react-router-dom";
import { GenericHeader } from "@/components/shared/layout/GenericHeader";
import { professionalHeaderConfig, NavItem } from "@/utils/navigationConfigs";

interface ProfessionalHeaderProps {
  navItems?: NavItem[];
}

const ProfessionalHeader = ({ navItems }: ProfessionalHeaderProps) => {
  const location = useLocation();
  
  // If custom navItems are provided, update the config
  const config = navItems ? {
    ...professionalHeaderConfig,
    navItems: navItems.map(item => ({
      ...item,
      href: item.href || "#" // Fallback for legacy usage
    }))
  } : {
    ...professionalHeaderConfig,
    navItems: professionalHeaderConfig.navItems.map(item => ({
      ...item,
      active: location.pathname === item.href
    }))
  };

  return <GenericHeader config={config} />;
};

export default ProfessionalHeader;
