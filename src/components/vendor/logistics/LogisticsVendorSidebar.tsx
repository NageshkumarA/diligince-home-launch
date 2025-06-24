
import React from "react";
import { User, Truck, MapPin, Package, Users, CreditCard, Settings } from "lucide-react";
import { BaseSidebar } from "../shared/BaseSidebar";
import { VendorData } from "@/types/vendor-sidebar";
import { useVendorSpecialization } from "@/contexts/VendorSpecializationContext";
import { getSpecializationDisplayName } from "@/utils/vendorSpecializationMapping";

type LogisticsMenuSection = 
  | "company-info" 
  | "fleet-equipment" 
  | "service-areas" 
  | "licenses-permits"
  | "drivers-personnel"
  | "payment-settings"
  | "account-settings";

interface LogisticsVendorSidebarProps {
  activeSection: LogisticsMenuSection;
  onSectionChange: (section: LogisticsMenuSection) => void;
  vendorData: VendorData;
  profileCompletion: number;
}

export const LogisticsVendorSidebar = ({
  activeSection,
  onSectionChange,
  vendorData,
  profileCompletion
}: LogisticsVendorSidebarProps) => {
  const { specialization } = useVendorSpecialization();

  const menuItems = [
    { id: "company-info", label: "Company Info", icon: <User className="h-5 w-5" /> },
    { 
      id: "fleet-equipment", 
      label: specialization === 'heavy-equipment' || specialization === 'crane-services' 
        ? 'Equipment & Fleet' 
        : 'Fleet & Equipment',
      icon: <Truck className="h-5 w-5" />
    },
    { id: "service-areas", label: "Service Areas", icon: <MapPin className="h-5 w-5" /> },
    { id: "licenses-permits", label: "Licenses & Permits", icon: <Package className="h-5 w-5" /> },
    { 
      id: "drivers-personnel", 
      label: specialization === 'heavy-equipment' || specialization === 'crane-services'
        ? 'Operators & Personnel'
        : 'Drivers & Personnel',
      icon: <Users className="h-5 w-5" />
    },
    { id: "payment-settings", label: "Payment Settings", icon: <CreditCard className="h-5 w-5" /> },
    { id: "account-settings", label: "Account Settings", icon: <Settings className="h-5 w-5" /> },
  ];

  // Update vendor data with specialization display name
  const enhancedVendorData = {
    ...vendorData,
    specialization: getSpecializationDisplayName(specialization)
  };

  return (
    <BaseSidebar
      activeSection={activeSection}
      onSectionChange={onSectionChange}
      vendorData={enhancedVendorData}
      profileCompletion={profileCompletion}
      menuItems={menuItems}
      vendorType="logistics"
    />
  );
};
