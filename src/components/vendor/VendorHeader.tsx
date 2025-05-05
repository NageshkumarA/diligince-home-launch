
import { Bell, MessageSquare, FileText, LayoutGrid, Briefcase, User, Home } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const VendorHeader = () => {
  // Navigation menu items
  const navItems = [
    { label: "Dashboard", icon: <Home size={18} />, href: "#" },
    { label: "RFQs", icon: <FileText size={18} />, href: "#" },
    { label: "Services", icon: <LayoutGrid size={18} />, href: "#" },
    { label: "Projects", icon: <Briefcase size={18} />, href: "#" },
    { label: "Messages", icon: <MessageSquare size={18} />, href: "#" },
    { label: "Profile", icon: <User size={18} />, href: "#", active: true }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#fa8c16] text-white z-10 shadow-md">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        <div className="flex items-center gap-10">
          <h1 className="text-xl font-bold">diligince.ai</h1>
          
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a 
                key={item.label} 
                href={item.href} 
                className={`flex items-center gap-2 text-sm ${
                  item.active 
                    ? "text-white font-medium" 
                    : "text-orange-100 hover:text-white transition-colors"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-orange-100 hover:text-white hover:bg-orange-600">
            <Bell size={20} />
          </Button>
          
          <Avatar className="h-8 w-8 bg-orange-700 border-2 border-orange-300">
            <AvatarFallback className="text-white text-sm">TS</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default VendorHeader;
