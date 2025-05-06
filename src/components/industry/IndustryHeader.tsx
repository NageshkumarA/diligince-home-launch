
import { Link } from "react-router-dom";
import { Bell, User, Home, FileText, Users, Mail } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type NavItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
  active?: boolean;
};

interface IndustryHeaderProps {
  navItems?: NavItem[];
  companyInitials: string;
}

const IndustryHeader = ({ navItems, companyInitials }: IndustryHeaderProps) => {
  // Default navigation items
  const defaultNavItems: NavItem[] = [
    { label: "Dashboard", path: "/industry-dashboard", icon: <Home size={18} /> },
    { label: "Requirements", path: "/create-requirement", icon: <FileText size={18} /> },
    { label: "Stakeholders", path: "/vendors", icon: <Users size={18} /> },
    { label: "Messages", path: "/messages", icon: <Mail size={18} /> },
    { label: "Profile", path: "/industry-profile", icon: <User size={18} />, active: true },
  ];

  const items = navItems || defaultNavItems;

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-blue-600 flex items-center justify-between px-4 lg:px-8 z-10">
      <div className="flex items-center">
        <Link to="/" className="text-xl md:text-2xl font-bold text-white">
          diligince.ai
        </Link>
      </div>
      
      {/* Navigation Links */}
      <nav className="hidden md:flex items-center space-x-6">
        {items.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`flex items-center gap-2 text-sm ${
              item.active 
                ? "text-white font-medium" 
                : "text-blue-100 hover:text-white transition-colors"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      
      {/* User Profile */}
      <div className="flex items-center space-x-4">
        <button className="text-blue-100 hover:text-white transition-colors">
          <Bell size={20} />
        </button>
        <Avatar className="h-8 w-8 bg-white">
          <AvatarFallback className="text-blue-600 font-bold">
            {companyInitials}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default IndustryHeader;
