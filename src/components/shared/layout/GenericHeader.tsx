
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { HeaderConfig } from "@/utils/navigationConfigs";
import { NotificationBell } from "@/components/shared/notifications/NotificationBell";

interface GenericHeaderProps {
  config: HeaderConfig;
  className?: string;
}

export const GenericHeader = ({ config, className = "" }: GenericHeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 h-16 ${config.theme.bgColor} ${config.theme.textColor} z-50 shadow-md ${className}`}>
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        <div className="flex items-center gap-10">
          <Link to={config.brandHref} className="text-xl font-bold">
            {config.brandName}
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {config.navItems.map((item) => (
              <Link 
                key={item.label} 
                to={item.href} 
                className={`flex items-center gap-2 text-sm transition-colors ${
                  location.pathname === item.href || item.active
                    ? `${config.theme.textColor} font-medium` 
                    : `${config.theme.hoverColor}`
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden ${config.theme.buttonHoverColor}`}
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
        
        <div className="flex items-center space-x-4">
          <NotificationBell theme={config.theme} />
          
          <Avatar className={`h-8 w-8 ${config.theme.avatarBgColor} ${config.theme.avatarBorderColor ? `border-2 ${config.theme.avatarBorderColor}` : ''}`}>
            <AvatarFallback className={`${config.theme.textColor} text-sm`}>
              {config.avatarInitials}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className={`md:hidden ${config.theme.bgColor} border-t border-opacity-20`}>
          <nav className="container mx-auto px-4 py-4 space-y-2">
            {config.navItems.map((item) => (
              <Link 
                key={item.label}
                to={item.href}
                className={`flex items-center gap-3 py-2 px-3 rounded text-sm transition-colors ${
                  location.pathname === item.href || item.active
                    ? `${config.theme.textColor} font-medium bg-black bg-opacity-10` 
                    : `${config.theme.hoverColor} hover:bg-black hover:bg-opacity-10`
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
