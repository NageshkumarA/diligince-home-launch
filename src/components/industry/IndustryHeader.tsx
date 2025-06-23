
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  FileText, 
  Users, 
  ShoppingCart, 
  MessageSquare, 
  FolderOpen, 
  User,
  Bell
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const IndustryHeader = () => {
  const location = useLocation();

  const navItems = [
    { 
      label: "Dashboard", 
      icon: <Home size={18} />, 
      href: "/industry-dashboard" 
    },
    { 
      label: "Requirements", 
      icon: <FileText size={18} />, 
      href: "/create-requirement" 
    },
    { 
      label: "Stakeholders", 
      icon: <Users size={18} />, 
      href: "/vendors" 
    },
    { 
      label: "Purchase Orders", 
      icon: <ShoppingCart size={18} />, 
      href: "/create-purchase-order" 
    },
    { 
      label: "Messages", 
      icon: <MessageSquare size={18} />, 
      href: "/industry-messages" 
    },
    { 
      label: "Documents", 
      icon: <FolderOpen size={18} />, 
      href: "/industry-documents" 
    },
    { 
      label: "Profile", 
      icon: <User size={18} />, 
      href: "/industry-profile" 
    }
  ];

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-blue-600 border-b border-blue-700 z-50">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link to="/industry-dashboard" className="text-xl font-bold text-white">
            diligince.ai
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                to={item.href} 
                className={`flex items-center gap-2 transition-colors ${
                  isActive(item.href) 
                    ? "text-white font-medium" 
                    : "text-blue-100 hover:text-white"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="text-blue-100 hover:text-white hover:bg-blue-700 relative">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </Button>
          
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
              JD
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default IndustryHeader;
