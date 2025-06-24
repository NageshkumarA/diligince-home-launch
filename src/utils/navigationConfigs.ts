
import React from "react";
import { Home, Briefcase, Calendar, MessageSquare, User, FileText, LayoutGrid, ShoppingCart, Truck, Settings, Users, FolderOpen } from "lucide-react";

export interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  active?: boolean;
}

export interface HeaderConfig {
  brandName: string;
  brandHref: string;
  navItems: NavItem[];
  avatarInitials: string;
  theme: {
    bgColor: string;
    textColor: string;
    hoverColor: string;
    avatarBgColor: string;
    avatarBorderColor?: string;
    buttonHoverColor: string;
  };
}

export const industryHeaderConfig: HeaderConfig = {
  brandName: "Diligince.ai",
  brandHref: "/industry-dashboard",
  navItems: [
    { label: "Dashboard", icon: React.createElement(Home, { size: 18 }), href: "/industry-dashboard" },
    { label: "Requirements", icon: React.createElement(FileText, { size: 18 }), href: "/create-requirement" },
    { label: "Stakeholders", icon: React.createElement(Users, { size: 18 }), href: "/vendors" },
    { label: "Create PO", icon: React.createElement(ShoppingCart, { size: 18 }), href: "/create-purchase-order" },
    { label: "Messages", icon: React.createElement(MessageSquare, { size: 18 }), href: "/industry-messages" },
    { label: "Documents", icon: React.createElement(FolderOpen, { size: 18 }), href: "/industry-documents" },
    { label: "Profile", icon: React.createElement(User, { size: 18 }), href: "/industry-profile" }
  ],
  avatarInitials: "SPL",
  theme: {
    bgColor: "bg-blue-600",
    textColor: "text-white",
    hoverColor: "text-blue-100 hover:text-white",
    avatarBgColor: "bg-blue-100",
    buttonHoverColor: "hover:text-white hover:bg-blue-700"
  }
};

export const professionalHeaderConfig: HeaderConfig = {
  brandName: "Diligince.ai",
  brandHref: "/",
  navItems: [
    { label: "Dashboard", icon: React.createElement(Home, { size: 18 }), href: "/professional-dashboard", active: true },
    { label: "Opportunities", icon: React.createElement(Briefcase, { size: 18 }), href: "/professional-opportunities" },
    { label: "Calendar", icon: React.createElement(Calendar, { size: 18 }), href: "/professional-calendar" },
    { label: "Messages", icon: React.createElement(MessageSquare, { size: 18 }), href: "/professional-messages" },
    { label: "Profile", icon: React.createElement(User, { size: 18 }), href: "/professional-profile" },
  ],
  avatarInitials: "RS",
  theme: {
    bgColor: "bg-[#722ed1]",
    textColor: "text-white",
    hoverColor: "text-purple-200 hover:text-white",
    avatarBgColor: "bg-purple-800",
    buttonHoverColor: "hover:text-white hover:bg-purple-600"
  }
};

export const serviceVendorHeaderConfig: HeaderConfig = {
  brandName: "Diligince.ai",
  brandHref: "/",
  navItems: [
    { label: "Dashboard", icon: React.createElement(Home, { size: 18 }), href: "/service-vendor-dashboard" },
    { label: "RFQs", icon: React.createElement(FileText, { size: 18 }), href: "/service-vendor-rfqs" },
    { label: "Services", icon: React.createElement(LayoutGrid, { size: 18 }), href: "/service-vendor-services" },
    { label: "Projects", icon: React.createElement(ShoppingCart, { size: 18 }), href: "/service-vendor-projects" },
    { label: "Messages", icon: React.createElement(MessageSquare, { size: 18 }), href: "/service-vendor-messages" },
    { label: "Profile", icon: React.createElement(User, { size: 18 }), href: "/service-vendor-profile" }
  ],
  avatarInitials: "TS",
  theme: {
    bgColor: "bg-[#faad14]",
    textColor: "text-white",
    hoverColor: "text-yellow-100 hover:text-white",
    avatarBgColor: "bg-yellow-700",
    avatarBorderColor: "border-yellow-300",
    buttonHoverColor: "hover:text-white hover:bg-yellow-600"
  }
};

export const productVendorHeaderConfig: HeaderConfig = {
  brandName: "Diligince.ai",
  brandHref: "/",
  navItems: [
    { label: "Dashboard", icon: React.createElement(Home, { size: 18 }), href: "/product-vendor-dashboard" },
    { label: "RFQs", icon: React.createElement(FileText, { size: 18 }), href: "/product-vendor-rfqs" },
    { label: "Catalog", icon: React.createElement(LayoutGrid, { size: 18 }), href: "/product-vendor-catalog" },
    { label: "Orders", icon: React.createElement(ShoppingCart, { size: 18 }), href: "/product-vendor-orders" },
    { label: "Messages", icon: React.createElement(MessageSquare, { size: 18 }), href: "/product-vendor-messages" },
    { label: "Profile", icon: React.createElement(User, { size: 18 }), href: "/product-vendor-profile" }
  ],
  avatarInitials: "PP",
  theme: {
    bgColor: "bg-[#faad14]",
    textColor: "text-white",
    hoverColor: "text-yellow-100 hover:text-white",
    avatarBgColor: "bg-yellow-700",
    avatarBorderColor: "border-yellow-300",
    buttonHoverColor: "hover:text-white hover:bg-yellow-600"
  }
};

export const logisticsVendorHeaderConfig: HeaderConfig = {
  brandName: "Diligince.ai",
  brandHref: "/",
  navItems: [
    { label: "Dashboard", icon: React.createElement(Home, { size: 18 }), href: "/logistics-vendor-dashboard" },
    { label: "Requests", icon: React.createElement(FileText, { size: 18 }), href: "/logistics-vendor-requests" },
    { label: "Fleet", icon: React.createElement(Truck, { size: 18 }), href: "/logistics-vendor-fleet" },
    { label: "Deliveries", icon: React.createElement(ShoppingCart, { size: 18 }), href: "/logistics-vendor-deliveries" },
    { label: "Messages", icon: React.createElement(MessageSquare, { size: 18 }), href: "/logistics-vendor-messages" },
    { label: "Profile", icon: React.createElement(User, { size: 18 }), href: "/logistics-vendor-profile" }
  ],
  avatarInitials: "LL",
  theme: {
    bgColor: "bg-[#eb2f96]",
    textColor: "text-white",
    hoverColor: "text-pink-100 hover:text-white",
    avatarBgColor: "bg-pink-700",
    avatarBorderColor: "border-pink-300",
    buttonHoverColor: "hover:text-white hover:bg-pink-600"
  }
};

export const getHeaderConfigByPath = (pathname: string): HeaderConfig => {
  if (pathname.includes('professional')) {
    return professionalHeaderConfig;
  } else if (pathname.includes('product-vendor')) {
    return productVendorHeaderConfig;
  } else if (pathname.includes('logistics-vendor')) {
    return logisticsVendorHeaderConfig;
  } else if (pathname.includes('industry')) {
    return industryHeaderConfig;
  } else {
    return serviceVendorHeaderConfig; // default to service vendor
  }
};
