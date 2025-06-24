
import React from "react";
import { Building, Users, Briefcase, Award, FolderOpen, CreditCard, Settings } from "lucide-react";
import { BaseSidebar } from "../shared/BaseSidebar";
import { VendorData } from "@/types/vendor-sidebar";

type ServiceMenuSection = 
  | "company-info" 
  | "team-members" 
  | "services-skills" 
  | "certifications" 
  | "projects-portfolio" 
  | "payment-settings" 
  | "account-settings";

interface ServiceVendorSidebarProps {
  activeSection: ServiceMenuSection;
  onSectionChange: (section: ServiceMenuSection) => void;
  vendorData: VendorData;
  profileCompletion: number;
}

export const ServiceVendorSidebar = ({
  activeSection,
  onSectionChange,
  vendorData,
  profileCompletion
}: ServiceVendorSidebarProps) => {
  const menuItems = [
    { id: "company-info", label: "Company Info", icon: <Building className="h-5 w-5" /> },
    { id: "team-members", label: "Team Members", icon: <Users className="h-5 w-5" /> },
    { id: "services-skills", label: "Services & Skills", icon: <Briefcase className="h-5 w-5" /> },
    { id: "certifications", label: "Certifications", icon: <Award className="h-5 w-5" /> },
    { id: "projects-portfolio", label: "Projects Portfolio", icon: <FolderOpen className="h-5 w-5" /> },
    { id: "payment-settings", label: "Payment Settings", icon: <CreditCard className="h-5 w-5" /> },
    { id: "account-settings", label: "Account Settings", icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <BaseSidebar
      activeSection={activeSection}
      onSectionChange={onSectionChange}
      vendorData={vendorData}
      profileCompletion={profileCompletion}
      menuItems={menuItems}
      vendorType="service"
    />
  );
};
