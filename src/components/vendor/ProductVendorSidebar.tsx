
import { Building, Tag, Award, CreditCard, Settings, Box, Truck } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ContentType } from "@/pages/ProductVendorProfile";

interface ProductVendorSidebarProps {
  vendorData: {
    companyName: string;
    specialization: string;
    initials: string;
    isVerified: boolean;
  };
  activeMenuItem: string;
  onMenuItemClick: (id: ContentType) => void;
  profileCompletion: number;
}

const ProductVendorSidebar = ({
  vendorData,
  activeMenuItem,
  onMenuItemClick,
  profileCompletion,
}: ProductVendorSidebarProps) => {
  // Sidebar menu items
  const menuItems = [
    { id: "company-info", label: "Company Info", icon: <Building size={18} /> },
    { id: "product-catalog", label: "Product Catalog", icon: <Box size={18} /> },
    { id: "brands-partners", label: "Brands & Partners", icon: <Tag size={18} /> },
    { id: "certifications", label: "Certifications", icon: <Award size={18} /> },
    { id: "shipping-returns", label: "Shipping & Returns", icon: <Truck size={18} /> },
    { id: "payment-settings", label: "Payment Settings", icon: <CreditCard size={18} /> },
    { id: "account-settings", label: "Account Settings", icon: <Settings size={18} /> },
  ];

  return (
    <aside className="w-80 bg-white border-r border-gray-200 shrink-0 hidden md:block overflow-y-auto h-[calc(100vh-4rem)]">
      <div className="flex flex-col items-center py-12 px-6 border-b border-gray-200">
        <Avatar className="h-32 w-32 mb-6 bg-orange-100">
          <AvatarFallback className="text-orange-600 text-3xl font-semibold">
            {vendorData.initials}
          </AvatarFallback>
        </Avatar>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          {vendorData.companyName}
        </h2>
        
        <div className="flex flex-col items-center gap-3 mb-8">
          <Badge variant="secondary" className="bg-orange-100 text-orange-600 hover:bg-orange-200 border-orange-200 px-4 py-2 text-sm font-medium">
            {vendorData.specialization}
          </Badge>
          
          {vendorData.isVerified && (
            <Badge className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm font-medium">
              ✓ Verified
            </Badge>
          )}
        </div>
        
        <div className="w-full space-y-3">
          <div className="flex justify-between text-sm font-medium">
            <span className="text-gray-700">Profile Completion</span>
            <span className="text-orange-600">{profileCompletion}%</span>
          </div>
          <Progress 
            value={profileCompletion} 
            className="h-3 bg-orange-100" 
            indicatorClassName="bg-orange-600" 
          />
        </div>
      </div>
      
      <nav className="py-6">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onMenuItemClick(item.id as ContentType)}
                className={`w-full flex items-center gap-4 px-6 py-4 text-left rounded-lg transition-all duration-200 ${
                  activeMenuItem === item.id
                    ? "bg-orange-50 text-orange-700 border-r-4 border-orange-600 font-medium shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <span className={activeMenuItem === item.id ? "text-orange-600" : "text-gray-500"}>
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

export default ProductVendorSidebar;
