
import React from "react";
import { Building, Tag, Award, CreditCard, Settings, Box, Truck } from "lucide-react";
import { BaseSidebar } from "../shared/BaseSidebar";
import { VendorData } from "@/types/vendor-sidebar";

type ProductMenuSection = 
  | "company-info" 
  | "product-catalog" 
  | "brands-partners" 
  | "certifications" 
  | "shipping-returns" 
  | "payment-settings" 
  | "account-settings";

interface ProductVendorSidebarProps {
  activeSection: ProductMenuSection;
  onSectionChange: (section: ProductMenuSection) => void;
  vendorData: VendorData;
  profileCompletion: number;
}

export const ProductVendorSidebar = ({
  activeSection,
  onSectionChange,
  vendorData,
  profileCompletion
}: ProductVendorSidebarProps) => {
  const menuItems = [
    { id: "company-info", label: "Company Info", icon: <Building className="h-5 w-5" /> },
    { id: "product-catalog", label: "Product Catalog", icon: <Box className="h-5 w-5" /> },
    { id: "brands-partners", label: "Brands & Partners", icon: <Tag className="h-5 w-5" /> },
    { id: "certifications", label: "Certifications", icon: <Award className="h-5 w-5" /> },
    { id: "shipping-returns", label: "Shipping & Returns", icon: <Truck className="h-5 w-5" /> },
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
      vendorType="product"
    />
  );
};
