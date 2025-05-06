
import { Building, FileText, Users, CreditCard, Bell, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export type ContentType = 
  | "Company Profile" 
  | "Team Members" 
  | "Documents & Certification" 
  | "Payment Settings" 
  | "Notification Preferences" 
  | "Security & Login";

interface IndustrySidebarProps {
  companyData: {
    name: string;
    industryType: string;
    initials: string;
  };
  activeMenu: string;
  onMenuItemClick: (menuItem: ContentType) => void;
  profileCompletion: number;
}

const IndustrySidebar = ({
  companyData,
  activeMenu,
  onMenuItemClick,
  profileCompletion
}: IndustrySidebarProps) => {
  const menuItems = [
    { name: "Company Profile", icon: <Building className="w-5 h-5" /> },
    { name: "Team Members", icon: <Users className="w-5 h-5" /> },
    { name: "Documents & Certification", icon: <FileText className="w-5 h-5" /> },
    { name: "Payment Settings", icon: <CreditCard className="w-5 h-5" /> },
    { name: "Notification Preferences", icon: <Bell className="w-5 h-5" /> },
    { name: "Security & Login", icon: <Lock className="w-5 h-5" /> },
  ];

  return (
    <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 p-6 space-y-6 h-[calc(100vh-4rem)] overflow-y-auto">
      {/* Profile Section */}
      <div className="flex flex-col items-center text-center">
        <Avatar className="w-24 h-24 mb-4 bg-blue-50">
          <AvatarFallback className="text-blue-500 text-3xl font-bold">
            {companyData.initials}
          </AvatarFallback>
        </Avatar>
        
        <h2 className="text-lg font-bold text-gray-800 mb-2">{companyData.name}</h2>
        
        <Badge className="bg-blue-50 text-blue-500 hover:bg-blue-100 border border-blue-200 mb-6">
          {companyData.industryType.split(" - ")[0]}
        </Badge>
        
        {/* Profile Completion */}
        <div className="w-full mb-6">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600">Profile Completion</span>
            <span className="text-sm text-blue-500">{profileCompletion}%</span>
          </div>
          <Progress value={profileCompletion} className="h-2" />
        </div>
      </div>
      
      {/* Navigation Menu */}
      <nav className="w-full">
        <ul className="space-y-1 w-full">
          {menuItems.map((item) => (
            <li key={item.name}>
              <button
                className={`w-full flex items-center px-4 py-3 rounded-md text-left ${
                  activeMenu === item.name
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => onMenuItemClick(item.name as ContentType)}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default IndustrySidebar;
