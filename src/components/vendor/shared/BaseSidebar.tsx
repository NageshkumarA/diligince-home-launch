import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Check, CheckCircle } from "lucide-react";
import { VendorSidebarProps } from "@/types/vendor-sidebar";
const getVendorTypeColor = (vendorType: string) => {
  switch (vendorType) {
    case 'service':
      return {
        avatar: 'bg-orange-100',
        text: 'text-orange-600',
        badge: 'bg-orange-100 text-orange-600 hover:bg-orange-200 border-orange-200',
        active: 'bg-orange-50 text-orange-700 border-orange-600',
        progress: 'bg-orange-100',
        progressIndicator: 'bg-orange-600'
      };
    case 'product':
      return {
        avatar: 'bg-yellow-100',
        text: 'text-yellow-600',
        badge: 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200 border-yellow-200',
        active: 'bg-yellow-50 text-yellow-700 border-yellow-600',
        progress: 'bg-yellow-100',
        progressIndicator: 'bg-yellow-600'
      };
    case 'logistics':
      return {
        avatar: 'bg-blue-100',
        text: 'text-blue-600',
        badge: 'bg-[#eb2f96] hover:bg-[#eb2f96]/90 text-white',
        active: 'bg-blue-50 text-blue-700 border-blue-600',
        progress: 'bg-blue-100',
        progressIndicator: 'bg-blue-600'
      };
    default:
      return {
        avatar: 'bg-gray-100',
        text: 'text-gray-600',
        badge: 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-200',
        active: 'bg-gray-50 text-gray-700 border-gray-600',
        progress: 'bg-gray-100',
        progressIndicator: 'bg-gray-600'
      };
  }
};
export const BaseSidebar = ({
  activeSection,
  onSectionChange,
  vendorData,
  profileCompletion,
  menuItems,
  vendorType
}: VendorSidebarProps) => {
  const colors = getVendorTypeColor(vendorType);
  const isLogistics = vendorType === 'logistics';
  return <aside className="w-80 bg-white border-r border-gray-200 shrink-0 hidden md:block overflow-y-auto h-[calc(100vh-4rem)]">
      <div className="flex flex-col items-center border-b border-gray-200 py-0 px-[10px]">
        <div className="relative mb-6">
          <Avatar className={`h-32 w-32 ${colors.avatar}`}>
            <AvatarFallback className={`${colors.text} text-3xl font-semibold`}>
              {vendorData.initials}
            </AvatarFallback>
          </Avatar>
          {vendorData.isVerified && <div className="absolute bottom-2 right-2 bg-green-500 text-white rounded-full p-2">
              <CheckCircle className="h-5 w-5" />
            </div>}
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          {vendorData.companyName}
        </h2>
        
        <div className="flex flex-col items-center gap-3 mb-8">
          {isLogistics ? <>
              <Badge className="bg-[#eb2f96] hover:bg-[#eb2f96]/90 text-white px-4 py-2 text-sm font-medium">
                Logistics Provider
              </Badge>
              <Badge className={`${colors.badge} px-4 py-2 text-sm font-medium`}>
                {vendorData.specialization}
              </Badge>
            </> : <Badge variant="secondary" className={`${colors.badge} px-4 py-2 text-sm font-medium`}>
              {vendorData.specialization}
            </Badge>}
          
          {vendorData.isVerified && <Badge className="bg-green-600 hover:bg-green-700 flex items-center gap-2 px-4 py-2 text-white text-sm font-medium">
              <Check className="h-4 w-4" /> Verified
            </Badge>}
        </div>
        
        <div className="w-full space-y-3">
          <div className="flex justify-between text-sm font-medium">
            <span className="text-gray-700">Profile Completion</span>
            <span className={colors.text}>{profileCompletion}%</span>
          </div>
          <Progress value={profileCompletion} className={`h-3 ${colors.progress}`} indicatorClassName={colors.progressIndicator} />
        </div>
      </div>
      
      <nav className="py-6">
        <ul className="space-y-2 px-4">
          {menuItems.map(item => <li key={item.id}>
              <button onClick={() => onSectionChange(item.id)} className={`w-full flex items-center gap-4 px-6 py-4 text-left rounded-lg transition-all duration-200 ${activeSection === item.id ? `${colors.active} border-r-4 font-medium shadow-sm` : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}>
                <span className={activeSection === item.id ? colors.text : "text-gray-500"}>
                  {item.icon}
                </span>
                <span className="text-sm">{item.label}</span>
              </button>
            </li>)}
        </ul>
      </nav>
      
      <div className="px-6 py-4 border-t border-gray-200 mt-auto">
        <div className="text-xs text-gray-500">
          Last updated: May 5, 2025
        </div>
      </div>
    </aside>;
};