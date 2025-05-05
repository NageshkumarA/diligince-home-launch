
import React from "react";
import { Link } from "react-router-dom";
import { Bell, MessageSquare, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export const LogisticsVendorHeader = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-[#eb2f96] text-white">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link 
            to="/" 
            className="flex items-center gap-2 font-bold text-xl"
          >
            <span>Diligince.ai</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/logistics-vendor-profile" className="text-sm font-medium opacity-90 hover:opacity-100">
              Dashboard
            </Link>
            <Link to="/logistics-vendor-profile" className="text-sm font-medium opacity-90 hover:opacity-100">
              Opportunities
            </Link>
            <Link to="/logistics-vendor-profile" className="text-sm font-medium opacity-90 hover:opacity-100">
              Equipment
            </Link>
            <Link to="/logistics-vendor-profile" className="text-sm font-medium opacity-90 hover:opacity-100">
              Messages
            </Link>
            <Link to="/logistics-vendor-profile" className="text-sm font-medium opacity-90 hover:opacity-100">
              Profile
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button size="icon" variant="ghost" className="text-white hover:bg-[#d4267d] hover:text-white">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button size="icon" variant="ghost" className="text-white hover:bg-[#d4267d] hover:text-white">
            <MessageSquare className="h-5 w-5" />
            <span className="sr-only">Messages</span>
          </Button>
          <Button size="icon" variant="ghost" className="text-white hover:bg-[#d4267d] hover:text-white">
            <User className="h-5 w-5" />
            <span className="sr-only">User</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
