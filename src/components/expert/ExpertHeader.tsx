
import { Bell } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type NavItem = {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
};

interface ExpertHeaderProps {
  navItems: NavItem[];
}

const ExpertHeader = ({ navItems }: ExpertHeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#722ed1] text-white z-10 shadow-md">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        <div className="flex items-center gap-10">
          <h1 className="text-xl font-bold">diligince.ai</h1>
          
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a 
                key={item.label} 
                href="#" 
                className={`flex items-center gap-2 text-sm ${
                  item.active 
                    ? "text-white font-medium" 
                    : "text-purple-200 hover:text-white transition-colors"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="text-purple-200 hover:text-white transition-colors">
            <Bell size={20} />
          </button>
          
          <Avatar className="h-8 w-8 bg-purple-800">
            <AvatarFallback className="text-white text-sm">RS</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default ExpertHeader;
