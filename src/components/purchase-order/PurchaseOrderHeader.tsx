
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

const PurchaseOrderHeader: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="w-full bg-[#1890ff] text-white fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className="flex items-center">
              <span className="text-xl font-bold">Diligince.ai</span>
            </Link>
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/dashboard">
                    <NavigationMenuLink className={cn(
                      navigationMenuTriggerStyle(), 
                      "text-white bg-transparent hover:bg-blue-600",
                      isActive("/dashboard") && "bg-blue-600"
                    )}>
                      Dashboard
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/create-requirement">
                    <NavigationMenuLink className={cn(
                      navigationMenuTriggerStyle(), 
                      "text-white bg-transparent hover:bg-blue-600",
                      isActive("/create-requirement") && "bg-blue-600"
                    )}>
                      Requirements
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={cn(
                    "text-white bg-transparent hover:bg-blue-600",
                    (isActive("/vendors") || isActive("/experts")) && "bg-blue-600"
                  )}>
                    Stakeholders
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[200px]">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/vendors" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                            <div className="text-sm font-medium">Vendors</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/experts" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                            <div className="text-sm font-medium">Experts</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/messages">
                    <NavigationMenuLink className={cn(
                      navigationMenuTriggerStyle(), 
                      "text-white bg-transparent hover:bg-blue-600",
                      isActive("/messages") && "bg-blue-600"
                    )}>
                      Messages
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/documents">
                    <NavigationMenuLink className={cn(
                      navigationMenuTriggerStyle(), 
                      "text-white bg-transparent hover:bg-blue-600",
                      isActive("/documents") && "bg-blue-600"
                    )}>
                      Documents
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/industry-profile">
              <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center cursor-pointer hover:bg-white/40 transition-colors">
                <span className="font-semibold text-sm">JD</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PurchaseOrderHeader;
