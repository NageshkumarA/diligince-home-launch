
import React from "react";
import { Home, Briefcase, Calendar, MessageSquare, User, FileText, LayoutGrid, ShoppingCart, Truck, Settings } from "lucide-react";

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

export const expertHeaderConfig: HeaderConfig = {
  brandName: "diligince.ai",
  brandHref: "/",
  navItems: [
    { label: "Dashboard", icon: React.createElement(Home, { size: 18 }), href: "/expert-dashboard", active: true },
    { label: "Opportunities", icon: React.createElement(Briefcase, { size: 18 }), href: "#" },
    { label: "Calendar", icon: React.createElement(Calendar, { size: 18 }), href: "#" },
    { label: "Messages", icon: React.createElement(MessageSquare, { size: 18 }), href: "#" },
    { label: "Profile", icon: React.createElement(User, { size: 18 }), href: "#" },
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
  brandName: "diligince.ai",
  brandHref: "/",
  navItems: [
    { label: "Dashboard", icon: React.createElement(Home, { size: 18 }), href: "/service-vendor-dashboard" },
    { label: "RFQs", icon: React.createElement(FileText, { size: 18 }), href: "#" },
    { label: "Services", icon: React.createElement(LayoutGrid, { size: 18 }), href: "#" },
    { label: "Projects", icon: React.createElement(ShoppingCart, { size: 18 }), href: "#" },
    { label: "Messages", icon: React.createElement(MessageSquare, { size: 18 }), href: "#" },
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
  brandName: "diligince.ai",
  brandHref: "/",
  navItems: [
    { label: "Dashboard", icon: React.createElement(Home, { size: 18 }), href: "/product-vendor-dashboard" },
    { label: "RFQs", icon: React.createElement(FileText, { size: 18 }), href: "#" },
    { label: "Catalog", icon: React.createElement(LayoutGrid, { size: 18 }), href: "#" },
    { label: "Orders", icon: React.createElement(ShoppingCart, { size: 18 }), href: "#" },
    { label: "Messages", icon: React.createElement(MessageSquare, { size: 18 }), href: "#" },
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
  brandName: "diligince.ai",
  brandHref: "/",
  navItems: [
    { label: "Dashboard", icon: React.createElement(Home, { size: 18 }), href: "/logistics-vendor-dashboard" },
    { label: "Requests", icon: React.createElement(FileText, { size: 18 }), href: "#" },
    { label: "Fleet", icon: React.createElement(Truck, { size: 18 }), href: "#" },
    { label: "Deliveries", icon: React.createElement(ShoppingCart, { size: 18 }), href: "#" },
    { label: "Messages", icon: React.createElement(MessageSquare, { size: 18 }), href: "#" },
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
  if (pathname.includes('expert')) {
    return expertHeaderConfig;
  } else if (pathname.includes('product-vendor')) {
    return productVendorHeaderConfig;
  } else if (pathname.includes('logistics-vendor')) {
    return logisticsVendorHeaderConfig;
  } else {
    return serviceVendorHeaderConfig; // default to service vendor
  }
};
