
import { Building, Users, Briefcase, Award, FolderOpen, CreditCard, Settings } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ContentType } from "@/pages/ServiceVendorProfile";

interface VendorSidebarProps {
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

const VendorSidebar = ({
  vendorData,
  activeMenuItem,
  onMenuItemClick,
  profileCompletion,
}: VendorSidebarProps) => {
  // Sidebar menu items
  const menuItems = [
    { id: "company-info", label: "Company Info", icon: <Building size={18} /> },
    { id: "team-members", label: "Team Members", icon: <Users size={18} /> },
    { id: "services-skills", label: "Services & Skills", icon: <Briefcase size={18} /> },
    { id: "certifications", label: "Certifications", icon: <Award size={18} /> },
    { id: "projects-portfolio", label: "Projects Portfolio", icon: <FolderOpen size={18} /> },
    { id: "payment-settings", label: "Payment Settings", icon: <CreditCard size={18} /> },
    { id: "account-settings", label: "Account Settings", icon: <Settings size={18} /> },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 shrink-0 hidden md:block overflow-y-auto h-[calc(100vh-4rem)]">
      <div className="flex flex-col items-center py-8 px-4 border-b border-gray-200">
        <Avatar className="h-24 w-24 mb-4 bg-orange-100">
          <AvatarFallback className="text-orange-600 text-2xl font-medium">
            {vendorData.initials}
          </AvatarFallback>
        </Avatar>
        
        <h2 className="text-lg font-semibold text-gray-800">{vendorData.companyName}</h2>
        
        <div className="flex flex-col items-center gap-2 mt-2">
          <Badge variant="secondary" className="bg-orange-100 text-orange-600 hover:bg-orange-200 border-orange-200">
            {vendorData.specialization}
          </Badge>
          
          {vendorData.isVerified && (
            <Badge variant="secondary" className="bg-green-100 text-green-600 hover:bg-green-200 border-green-200">
              ✓ Verified
            </Badge>
          )}
        </div>
        
        <div className="w-full mt-6 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Profile Completion</span>
            <span className="text-orange-600 font-medium">{profileCompletion}%</span>
          </div>
          <Progress value={profileCompletion} className="h-2 bg-orange-100" indicatorClassName="bg-orange-600" />
        </div>
      </div>
      
      <nav className="py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onMenuItemClick(item.id as ContentType)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm ${
                  activeMenuItem === item.id
                    ? "bg-orange-50 text-orange-700 border-r-4 border-orange-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className={activeMenuItem === item.id ? "text-orange-600" : "text-gray-500"}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default VendorSidebar;
