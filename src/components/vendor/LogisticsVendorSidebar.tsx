
import React, { useState } from "react";
import { Check, CheckCircle, CreditCard, MapPin, Package, Settings, Truck, User, Users } from "lucide-react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CompanyInfoForm } from "@/components/vendor/logistics/CompanyInfoForm";
import { FleetEquipmentSection } from "@/components/vendor/logistics/FleetEquipmentSection";
import { ServiceAreasSection } from "@/components/vendor/logistics/ServiceAreasSection";
import { LicensesPermitsSection } from "@/components/vendor/logistics/LicensesPermitsSection";
import { DriversPersonnelSection } from "@/components/vendor/logistics/DriversPersonnelSection";
import PaymentSettingsForm from "@/components/vendor/forms/PaymentSettingsForm";
import AccountSettingsForm from "@/components/vendor/forms/AccountSettingsForm";

type MenuSection = 
  | "company-info" 
  | "fleet-equipment" 
  | "service-areas" 
  | "licenses-permits"
  | "drivers-personnel"
  | "payment-settings"
  | "account-settings";

export const LogisticsVendorSidebar = () => {
  const [activeSection, setActiveSection] = useState<MenuSection>("company-info");
  const profileCompletion = 65; // Profile completion percentage (mock data)

  return (
    <div className="flex w-full pt-32">
      <aside className="h-full">
        <Sidebar>
          <SidebarHeader className="pb-0">
            <div className="flex flex-col items-center space-y-2 py-4">
              <div className="relative">
                <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-600">
                  TL
                </div>
                <div className="absolute bottom-1 right-1 bg-green-500 text-white rounded-full p-1">
                  <CheckCircle className="h-4 w-4" />
                </div>
              </div>
              <h2 className="text-xl font-semibold mt-2">TransLog India</h2>
              <div className="flex space-x-2">
                <Badge className="bg-[#eb2f96] hover:bg-[#eb2f96]/90">Logistics Provider</Badge>
                <Badge className="bg-green-600 hover:bg-green-700 flex items-center gap-1">
                  <Check className="h-3 w-3" /> Verified
                </Badge>
              </div>
              <div className="w-full px-4 pt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>Profile Completion</span>
                  <span>{profileCompletion}%</span>
                </div>
                <Progress value={profileCompletion} className="h-2" />
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeSection === "company-info"} 
                  onClick={() => setActiveSection("company-info")}
                >
                  <User className="h-5 w-5" />
                  <span>Company Info</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeSection === "fleet-equipment"} 
                  onClick={() => setActiveSection("fleet-equipment")}
                >
                  <Truck className="h-5 w-5" />
                  <span>Fleet & Equipment</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeSection === "service-areas"} 
                  onClick={() => setActiveSection("service-areas")}
                >
                  <MapPin className="h-5 w-5" />
                  <span>Service Areas</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeSection === "licenses-permits"} 
                  onClick={() => setActiveSection("licenses-permits")}
                >
                  <Package className="h-5 w-5" />
                  <span>Licenses & Permits</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeSection === "drivers-personnel"} 
                  onClick={() => setActiveSection("drivers-personnel")}
                >
                  <Users className="h-5 w-5" />
                  <span>Drivers & Personnel</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeSection === "payment-settings"} 
                  onClick={() => setActiveSection("payment-settings")}
                >
                  <CreditCard className="h-5 w-5" />
                  <span>Payment Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeSection === "account-settings"} 
                  onClick={() => setActiveSection("account-settings")}
                >
                  <Settings className="h-5 w-5" />
                  <span>Account Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="px-3 py-2">
            <div className="text-xs text-gray-500">
              Last updated: May 5, 2025
            </div>
          </SidebarFooter>
        </Sidebar>
      </aside>

      {/* Main content area with full width */}
      <main className="flex-1 p-6 overflow-auto pt-8">
        <div className="w-full max-w-4xl mx-auto">
          {activeSection === "company-info" && <CompanyInfoForm />}
          {activeSection === "fleet-equipment" && <FleetEquipmentSection />}
          {activeSection === "service-areas" && <ServiceAreasSection />}
          {activeSection === "licenses-permits" && <LicensesPermitsSection />}
          {activeSection === "drivers-personnel" && <DriversPersonnelSection />}
          {activeSection === "payment-settings" && <PaymentSettingsForm />}
          {activeSection === "account-settings" && <AccountSettingsForm />}
        </div>
      </main>
    </div>
  );
};
