
import { Bell, MessageSquare, FileText, LayoutGrid, ShoppingCart, User, Home } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const VendorHeader = () => {
  const location = useLocation();
  
  // Navigation menu items - updated to include all vendor dashboard types
  const navItems = [
    { label: "Dashboard", icon: <Home size={18} />, href: "/service-vendor-dashboard" },
    { label: "RFQs", icon: <FileText size={18} />, href: "#" },
    { label: "Services", icon: <LayoutGrid size={18} />, href: "#" },
    { label: "Projects", icon: <ShoppingCart size={18} />, href: "#" },
    { label: "Messages", icon: <MessageSquare size={18} />, href: "#" },
    { label: "Profile", icon: <User size={18} />, href: "/service-vendor-profile" }
  ];

  // Determine dashboard and profile links based on current path
  const getDashboardAndProfileLinks = () => {
    if (location.pathname.includes('product-vendor')) {
      return {
        dashboard: "/product-vendor-dashboard",
        profile: "/product-vendor-profile",
        navItems: [
          { label: "Dashboard", icon: <Home size={18} />, href: "/product-vendor-dashboard" },
          { label: "RFQs", icon: <FileText size={18} />, href: "#" },
          { label: "Catalog", icon: <LayoutGrid size={18} />, href: "#" },
          { label: "Orders", icon: <ShoppingCart size={18} />, href: "#" },
          { label: "Messages", icon: <MessageSquare size={18} />, href: "#" },
          { label: "Profile", icon: <User size={18} />, href: "/product-vendor-profile" }
        ]
      };
    } else if (location.pathname.includes('logistics-vendor')) {
      return {
        dashboard: "/logistics-vendor-dashboard",
        profile: "/logistics-vendor-profile",
        navItems: [
          { label: "Dashboard", icon: <Home size={18} />, href: "/logistics-vendor-dashboard" },
          { label: "Requests", icon: <FileText size={18} />, href: "#" },
          { label: "Fleet", icon: <LayoutGrid size={18} />, href: "#" },
          { label: "Deliveries", icon: <ShoppingCart size={18} />, href: "#" },
          { label: "Messages", icon: <MessageSquare size={18} />, href: "#" },
          { label: "Profile", icon: <User size={18} />, href: "/logistics-vendor-profile" }
        ]
      };
    } else {
      // Default to service vendor
      return {
        dashboard: "/service-vendor-dashboard",
        profile: "/service-vendor-profile",
        navItems: [
          { label: "Dashboard", icon: <Home size={18} />, href: "/service-vendor-dashboard" },
          { label: "RFQs", icon: <FileText size={18} />, href: "#" },
          { label: "Services", icon: <LayoutGrid size={18} />, href: "#" },
          { label: "Projects", icon: <ShoppingCart size={18} />, href: "#" },
          { label: "Messages", icon: <MessageSquare size={18} />, href: "#" },
          { label: "Profile", icon: <User size={18} />, href: "/service-vendor-profile" }
        ]
      };
    }
  };

  const { navItems: currentNavItems } = getDashboardAndProfileLinks();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#faad14] text-white z-10 shadow-md">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        <div className="flex items-center gap-10">
          <Link to="/" className="text-xl font-bold">diligince.ai</Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            {currentNavItems.map((item) => (
              <Link 
                key={item.label} 
                to={item.href} 
                className={`flex items-center gap-2 text-sm ${
                  location.pathname === item.href
                    ? "text-white font-medium" 
                    : "text-yellow-100 hover:text-white transition-colors"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-yellow-100 hover:text-white hover:bg-yellow-600">
            <Bell size={20} />
          </Button>
          
          <Avatar className="h-8 w-8 bg-yellow-700 border-2 border-yellow-300">
            <AvatarFallback className="text-white text-sm">
              {location.pathname.includes('product-vendor') ? 'PP' : 
               location.pathname.includes('logistics-vendor') ? 'LL' : 'TS'}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default VendorHeader;
