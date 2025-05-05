
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SidebarMenuItem, ContentType } from "@/pages/ProfessionalProfile";

interface ExpertSidebarProps {
  expertData: {
    name: string;
    expertise: string;
    initials: string;
  };
  menuItems: SidebarMenuItem[];
  activeMenuItem: string;
  onMenuItemClick: (id: ContentType) => void;
  profileCompletion: number;
}

const ExpertSidebar = ({
  expertData,
  menuItems,
  activeMenuItem,
  onMenuItemClick,
  profileCompletion,
}: ExpertSidebarProps) => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 shrink-0 hidden md:block overflow-y-auto h-[calc(100vh-4rem)]">
      <div className="flex flex-col items-center py-8 px-4 border-b border-gray-200">
        <Avatar className="h-24 w-24 mb-4 bg-purple-100">
          <AvatarFallback className="text-purple-600 text-2xl font-medium">
            {expertData.initials}
          </AvatarFallback>
        </Avatar>
        
        <h2 className="text-lg font-semibold text-gray-800">{expertData.name}</h2>
        
        <Badge variant="secondary" className="mt-2 bg-purple-100 text-purple-600 hover:bg-purple-200 border-purple-200">
          {expertData.expertise}
        </Badge>
        
        <div className="w-full mt-6 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Profile Completion</span>
            <span className="text-purple-600 font-medium">{profileCompletion}%</span>
          </div>
          <Progress value={profileCompletion} className="h-2 bg-purple-100" indicatorClassName="bg-purple-600" />
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
                    ? "bg-purple-50 text-purple-700 border-r-4 border-purple-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className={activeMenuItem === item.id ? "text-purple-600" : "text-gray-500"}>
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

export default ExpertSidebar;
