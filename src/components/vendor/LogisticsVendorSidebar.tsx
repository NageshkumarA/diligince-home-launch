
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CompanyInfoForm } from "@/components/vendor/logistics/CompanyInfoForm";
import { FleetEquipmentSection } from "@/components/vendor/logistics/FleetEquipmentSection";
import { ServiceAreasSection } from "@/components/vendor/logistics/ServiceAreasSection";
import { LicensesPermitsSection } from "@/components/vendor/logistics/LicensesPermitsSection";
import { DriversPersonnelSection } from "@/components/vendor/logistics/DriversPersonnelSection";
import PaymentSettingsForm from "@/components/vendor/forms/PaymentSettingsForm";
import AccountSettingsForm from "@/components/vendor/forms/AccountSettingsForm";
import { LogisticsVendorSidebar as StandardizedLogisticsVendorSidebar } from "@/components/vendor/logistics/LogisticsVendorSidebar";
import { SpecializationFeatures } from "@/components/vendor/logistics/SpecializationFeatures";
import { useUser } from "@/contexts/UserContext";

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
  const { user } = useUser();
  const profileCompletion = 65;

  const vendorData = {
    companyName: user?.name || "TransLog India",
    specialization: "Logistics Provider", // This will be enhanced by the sidebar component
    initials: user?.name?.charAt(0) || "TL",
    isVerified: true
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case "company-info":
        return "Company Information";
      case "fleet-equipment":
        return "Fleet & Equipment";
      case "service-areas":
        return "Service Areas";
      case "licenses-permits":
        return "Licenses & Permits";
      case "drivers-personnel":
        return "Drivers & Personnel";
      case "payment-settings":
        return "Payment Settings";
      case "account-settings":
        return "Account Settings";
      default:
        return "Company Information";
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "company-info":
        return <CompanyInfoForm />;
      case "fleet-equipment":
        return <FleetEquipmentSection />;
      case "service-areas":
        return <ServiceAreasSection />;
      case "licenses-permits":
        return <LicensesPermitsSection />;
      case "drivers-personnel":
        return <DriversPersonnelSection />;
      case "payment-settings":
        return <PaymentSettingsForm />;
      case "account-settings":
        return <AccountSettingsForm />;
      default:
        return <CompanyInfoForm />;
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      <StandardizedLogisticsVendorSidebar 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        vendorData={vendorData}
        profileCompletion={profileCompletion}
      />

      {/* Main content area */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {getSectionTitle()}
            </h1>
            <p className="text-gray-600">
              Manage your logistics vendor profile and business information
            </p>
          </div>

          {/* Specialization Features Card - Only show on company-info */}
          {activeSection === "company-info" && (
            <div className="mb-8">
              <SpecializationFeatures />
            </div>
          )}

          {/* Main Content Card */}
          <Card className="shadow-sm">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="text-xl text-gray-800">
                {getSectionTitle()}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              {renderContent()}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};
