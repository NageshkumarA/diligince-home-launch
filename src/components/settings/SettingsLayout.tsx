import React from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { mapUserRoleToUserType } from "@/utils/moduleMapper";
import { 
  Settings, 
  Users, 
  CreditCard, 
  Workflow, 
  Database, 
  User, 
  Bell, 
  Shield, 
  Plug,
  Package,
  Truck,
  MapPin,
  FileText,
  Award,
  Wrench
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SettingsMenuItem {
  id: string;
  label: string;
  path: string;
  icon: React.ReactNode;
  userTypes: string[];
}

const settingsMenuItems: SettingsMenuItem[] = [
  { id: "personal", label: "Personal Info", path: "/dashboard/settings/personal", icon: <User className="h-4 w-4" />, userTypes: ["IndustryAdmin", "ServiceVendor", "ProductVendor", "LogisticsVendor"] },
  { id: "members", label: "Team Members", path: "/dashboard/settings/members", icon: <Users className="h-4 w-4" />, userTypes: ["IndustryAdmin"] },
  { id: "payments", label: "Payments", path: "/dashboard/settings/payments", icon: <CreditCard className="h-4 w-4" />, userTypes: ["IndustryAdmin"] },
  { id: "workflows", label: "Workflows", path: "/dashboard/settings/workflows", icon: <Workflow className="h-4 w-4" />, userTypes: ["IndustryAdmin"] },
  { id: "data", label: "Data Management", path: "/dashboard/settings/data", icon: <Database className="h-4 w-4" />, userTypes: ["IndustryAdmin"] },
  { id: "notifications", label: "Notifications", path: "/dashboard/settings/notifications", icon: <Bell className="h-4 w-4" />, userTypes: ["IndustryAdmin", "ServiceVendor", "ProductVendor", "LogisticsVendor"] },
  { id: "privacy", label: "Privacy & Security", path: "/dashboard/settings/privacy", icon: <Shield className="h-4 w-4" />, userTypes: ["IndustryAdmin", "ServiceVendor", "ProductVendor", "LogisticsVendor"] },
  { id: "integrations", label: "Integrations", path: "/dashboard/settings/integrations", icon: <Plug className="h-4 w-4" />, userTypes: ["IndustryAdmin"] },
  { id: "services", label: "Services", path: "/dashboard/settings/services", icon: <Wrench className="h-4 w-4" />, userTypes: ["ServiceVendor"] },
  { id: "certifications", label: "Certifications", path: "/dashboard/settings/certifications", icon: <Award className="h-4 w-4" />, userTypes: ["ServiceVendor", "ProductVendor", "LogisticsVendor"] },
  { id: "categories", label: "Product Categories", path: "/dashboard/settings/categories", icon: <Package className="h-4 w-4" />, userTypes: ["ProductVendor"] },
  { id: "shipping", label: "Shipping Settings", path: "/dashboard/settings/shipping", icon: <Truck className="h-4 w-4" />, userTypes: ["ProductVendor"] },
  { id: "fleet", label: "Fleet Management", path: "/dashboard/settings/fleet", icon: <Truck className="h-4 w-4" />, userTypes: ["LogisticsVendor"] },
  { id: "service-areas", label: "Service Areas", path: "/dashboard/settings/service-areas", icon: <MapPin className="h-4 w-4" />, userTypes: ["LogisticsVendor"] },
  { id: "licenses", label: "Licenses & Permits", path: "/dashboard/settings/licenses", icon: <FileText className="h-4 w-4" />, userTypes: ["LogisticsVendor"] }
];

export const SettingsLayout: React.FC = () => {
  const { user } = useUser();
  const location = useLocation();
  const userType = mapUserRoleToUserType(user);

  // Filter menu items based on user type
  const availableMenuItems = settingsMenuItems.filter(item => 
    item.userTypes.includes(userType)
  );

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="container-responsive section-padding">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and configurations</p>
        <Badge variant="outline" className="mt-2">
          {userType.replace(/([A-Z])/g, ' $1').trim()}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <Card className="lg:col-span-1 p-4 h-fit">
          <nav className="space-y-1">
            {availableMenuItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>
        </Card>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};