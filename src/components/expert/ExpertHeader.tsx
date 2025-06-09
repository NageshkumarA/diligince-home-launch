
import React from "react";
import { useLocation } from "react-router-dom";
import { GenericHeader } from "@/components/shared/layout/GenericHeader";
import { expertHeaderConfig } from "@/utils/navigationConfigs";

type NavItem = {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
};

interface ExpertHeaderProps {
  navItems?: NavItem[];
}

const ExpertHeader = ({ navItems }: ExpertHeaderProps) => {
  const location = useLocation();
  
  // If custom navItems are provided, update the config
  const config = navItems ? {
    ...expertHeaderConfig,
    navItems: navItems.map(item => ({
      ...item,
      href: item.href || "#" // Fallback for legacy usage
    }))
  } : {
    ...expertHeaderConfig,
    navItems: expertHeaderConfig.navItems.map(item => ({
      ...item,
      active: location.pathname === item.href
    }))
  };

  return <GenericHeader config={config} />;
};

export default ExpertHeader;
