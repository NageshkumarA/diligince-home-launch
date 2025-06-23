
import React from "react";
import { Check, CheckCircle, CreditCard, MapPin, Package, Settings, Truck, User, Users } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useVendorSpecialization } from "@/contexts/VendorSpecializationContext";
import { useUser } from "@/contexts/UserContext";
import { getSpecializationDisplayName, getSpecializationBadgeColor } from "@/utils/vendorSpecializationMapping";

type MenuSection = 
  | "company-info" 
  | "fleet-equipment" 
  | "service-areas" 
  | "licenses-permits"
  | "drivers-personnel"
  | "payment-settings"
  | "account-settings";

interface LogisticsVendorCustomSidebarProps {
  activeSection: MenuSection;
  onSectionChange: (section: MenuSection) => void;
}

export const LogisticsVendorCustomSidebar = ({ activeSection, onSectionChange }: LogisticsVendorCustomSidebarProps) => {
  const { specialization } = useVendorSpecialization();
  const { user } = useUser();
  const profileCompletion = 65;

  const displayName = getSpecializationDisplayName(specialization);
  const badgeColor = getSpecializationBadgeColor(specialization);

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

  return (
    <aside className="w-80 bg-white border-r border-gray-200 shrink-0 hidden md:block overflow-y-auto h-[calc(100vh-4rem)]">
      <div className="flex flex-col items-center py-12 px-6 border-b border-gray-200">
        <div className="relative mb-6">
          <Avatar className="h-32 w-32 bg-blue-100">
            <AvatarFallback className="text-blue-600 text-3xl font-semibold">
              {user?.name?.charAt(0) || "TL"}
            </AvatarFallback>
          </Avatar>
          <div className="absolute bottom-2 right-2 bg-green-500 text-white rounded-full p-2">
            <CheckCircle className="h-5 w-5" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          {user?.name || "TransLog India"}
        </h2>
        
        <div className="flex flex-col items-center gap-3 mb-8">
          <Badge className="bg-[#eb2f96] hover:bg-[#eb2f96]/90 text-white px-4 py-2 text-sm font-medium">
            Logistics Provider
          </Badge>
          <Badge className={`${badgeColor} px-4 py-2 text-sm font-medium`}>
            {displayName}
          </Badge>
          <Badge className="bg-green-600 hover:bg-green-700 flex items-center gap-2 px-4 py-2 text-white text-sm font-medium">
            <Check className="h-4 w-4" /> Verified
          </Badge>
        </div>
        
        <div className="w-full space-y-3">
          <div className="flex justify-between text-sm font-medium">
            <span className="text-gray-700">Profile Completion</span>
            <span className="text-blue-600">{profileCompletion}%</span>
          </div>
          <Progress value={profileCompletion} className="h-3 bg-gray-100" />
        </div>
      </div>
      
      <nav className="py-6">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onSectionChange(item.id as MenuSection)}
                className={`w-full flex items-center gap-4 px-6 py-4 text-left rounded-lg transition-all duration-200 ${
                  activeSection === item.id
                    ? "bg-blue-50 text-blue-700 border-r-4 border-blue-600 font-medium shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <span className={activeSection === item.id ? "text-blue-600" : "text-gray-500"}>
                  {item.icon}
                </span>
                <span className="text-sm">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="px-6 py-4 border-t border-gray-200 mt-auto">
        <div className="text-xs text-gray-500">
          Last updated: May 5, 2025
        </div>
      </div>
    </aside>
  );
};
