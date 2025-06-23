
import { useState } from "react";
import IndustryHeader from "@/components/industry/IndustryHeader";
import IndustrySidebar from "@/components/industry/IndustrySidebar";
import CompanyInfoForm from "@/components/industry/forms/CompanyInfoForm";
import LocationsForm from "@/components/industry/forms/LocationsForm";
import ContactsForm from "@/components/industry/forms/ContactsForm";
import CertificationsForm from "@/components/industry/forms/CertificationsForm";
import PaymentSettingsForm from "@/components/industry/forms/PaymentSettingsForm";
import AccountSettingsForm from "@/components/industry/forms/AccountSettingsForm";

export type ContentType = 
  | "company-info" 
  | "locations" 
  | "contacts" 
  | "certifications" 
  | "payment-settings" 
  | "account-settings";

const IndustryProfile = () => {
  const [activeContent, setActiveContent] = useState<ContentType>("company-info");
  const [profileCompletion, setProfileCompletion] = useState(75);
  
  const industryData = {
    companyName: "SteelWorks Manufacturing",
    industry: "Steel Production",
    initials: "SM",
    isVerified: true
  };

  const handleMenuItemClick = (contentType: ContentType) => {
    setActiveContent(contentType);
  };

  const renderContent = () => {
    switch (activeContent) {
      case "company-info":
        return <CompanyInfoForm />;
      case "locations":
        return <LocationsForm />;
      case "contacts":
        return <ContactsForm />;
      case "certifications":
        return <CertificationsForm />;
      case "payment-settings":
        return <PaymentSettingsForm />;
      case "account-settings":
        return <AccountSettingsForm />;
      default:
        return <CompanyInfoForm />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <IndustryHeader />
      
      <div className="flex flex-grow pt-16">
        <IndustrySidebar
          industryData={industryData}
          activeMenuItem={activeContent}
          onMenuItemClick={handleMenuItemClick}
          profileCompletion={profileCompletion}
        />
        
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default IndustryProfile;
