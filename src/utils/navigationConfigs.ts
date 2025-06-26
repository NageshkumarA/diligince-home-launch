import { Home, FileText, ShoppingCart, MessageSquare, Users, Workflow, Building2, Package, Truck, User, Calendar, Briefcase } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
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
    buttonHoverColor: string;
    avatarBgColor: string;
    avatarBorderColor?: string;
  };
}

// Industry Dashboard Navigation - ISO 9001 Compliant Flow
export const industryHeaderConfig: HeaderConfig = {
  brandName: "Diligince.ai",
  brandHref: "/industry-dashboard",
  navItems: [
    {
      label: "Dashboard",
      href: "/industry-dashboard",
      icon: <Home size={18} />
    },
    {
      label: "Requirements",
      href: "/create-requirement",
      icon: <FileText size={18} />
    },
    {
      label: "Workflows",
      href: "/industry-workflows",
      icon: <Workflow size={18} />
    },
    {
      label: "Messages",
      href: "/industry-messages",
      icon: <MessageSquare size={18} />
    },
    {
      label: "Stakeholders",
      href: "/industry-stakeholders",
      icon: <Users size={18} />
    }
  ],
  avatarInitials: "IN",
  theme: {
    bgColor: "bg-white",
    textColor: "text-gray-900",
    hoverColor: "text-gray-600 hover:text-blue-600",
    buttonHoverColor: "hover:bg-gray-100",
    avatarBgColor: "bg-blue-100",
    avatarBorderColor: "border-blue-200"
  }
};

// Vendor Dashboard Navigation
export const vendorHeaderConfig: HeaderConfig = {
  brandName: "Diligence.ai",
  brandHref: "/vendor-dashboard",
  navItems: [
    {
      label: "Dashboard",
      href: "/vendor-dashboard",
      icon: <Home size={18} />
    },
    {
      label: "Requirements",
      href: "/vendor-requirements",
      icon: <FileText size={18} />
    },
    {
      label: "Projects",
      href: "/vendor-projects",
      icon: <Workflow size={18} />
    },
    {
      label: "Messages",
      href: "/vendor-messages",
      icon: <MessageSquare size={18} />
    },
    {
      label: "Profile",
      href: "/vendor-profile",
      icon: <User size={18} />
    }
  ],
  avatarInitials: "VE",
  theme: {
    bgColor: "bg-gray-900",
    textColor: "text-gray-50",
    hoverColor: "text-gray-400 hover:text-blue-300",
    buttonHoverColor: "hover:bg-gray-800",
    avatarBgColor: "bg-gray-700",
  }
};

// Logistics Vendor Dashboard Navigation
export const logisticsHeaderConfig: HeaderConfig = {
  brandName: "Diligence.ai",
  brandHref: "/logistics-dashboard",
  navItems: [
    {
      label: "Dashboard",
      href: "/logistics-dashboard",
      icon: <Home size={18} />
    },
    {
      label: "Shipments",
      href: "/logistics-shipments",
      icon: <Truck size={18} />
    },
    {
      label: "Warehouse",
      href: "/logistics-warehouse",
      icon: <Building2 size={18} />
    },
    {
      label: "Messages",
      href: "/logistics-messages",
      icon: <MessageSquare size={18} />
    },
    {
      label: "Profile",
      href: "/logistics-profile",
      icon: <User size={18} />
    }
  ],
  avatarInitials: "LG",
  theme: {
    bgColor: "bg-white",
    textColor: "text-gray-900",
    hoverColor: "text-gray-600 hover:text-blue-600",
    buttonHoverColor: "hover:bg-gray-100",
    avatarBgColor: "bg-blue-100",
    avatarBorderColor: "border-blue-200"
  }
};

// Expert Dashboard Navigation
export const expertHeaderConfig: HeaderConfig = {
  brandName: "Diligence.ai",
  brandHref: "/expert-dashboard",
  navItems: [
    {
      label: "Dashboard",
      href: "/expert-dashboard",
      icon: <Home size={18} />
    },
    {
      label: "Projects",
      href: "/expert-projects",
      icon: <Briefcase size={18} />
    },
    {
      label: "Calendar",
      href: "/expert-calendar",
      icon: <Calendar size={18} />
    },
    {
      label: "Messages",
      href: "/expert-messages",
      icon: <MessageSquare size={18} />
    },
    {
      label: "Profile",
      href: "/expert-profile",
      icon: <User size={18} />
    }
  ],
  avatarInitials: "EX",
  theme: {
    bgColor: "bg-white",
    textColor: "text-gray-900",
    hoverColor: "text-gray-600 hover:text-blue-600",
    buttonHoverColor: "hover:bg-gray-100",
    avatarBgColor: "bg-blue-100",
    avatarBorderColor: "border-blue-200"
  }
};
